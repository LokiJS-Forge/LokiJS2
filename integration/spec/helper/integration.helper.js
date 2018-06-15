// Determine environment.
const ENVIRONMENT = (() => {
  if (typeof exports === 'object' && typeof module === 'object') {
    return "node";
  } else if (typeof define === 'function' && define.amd) {
    // TODO: Handle AMD.
    return "amd";
  } else if (typeof exports === 'object') {
    // TODO: Handle CommonJS.
    return "commonjs"
  }
  return "browser";
})();

function loadScriptByTag(src) {
  const script = document.createElement("script");
  script.setAttribute("src", src);
  document.head.appendChild(script);

  return new Promise(resolve => {
    script.onload = resolve
  });
}

function loadScript(name) {
  if (ENVIRONMENT === "browser") {
    return loadScriptByTag(`base/node_modules/@lokidb/${name}/lokidb.${name}.js`);
  } else if (ENVIRONMENT === "node") {
    return Promise.resolve(require(`@lokidb/${name}`))
  }
}

/**
 * Loads a library with dependencies.
 * @param {string} name - the library name
 * @param {string[]} dependencies - the dependencies
 * @returns {Promise<object>}
 */
function loadLibrary(name, dependencies) {
  let promise = Promise.resolve();
  if (ENVIRONMENT === "browser") {
    for (let dependency of dependencies) {
      promise = promise.then(() => loadScript(dependency));
    }
  }

  return promise
    .then(() => loadScript(name))
    .then((script) => {
      if (ENVIRONMENT === "browser") {
        return this[`@lokidb/${name}`];
      } else {
        return script;
      }
    });
}

/**
 * Creates a generic integration test for a specific library.
 * @param {string} name - the library name
 * @param {string[]} dependencies - the dependencies (needed for browser)
 * @param {object.<string, Function>} tests - the test functions for each export
 */
test_integration = function (name, dependencies, tests) {
  describe(name, () => {
    let loaded = null;
    beforeEach(() => {
      loaded = loadLibrary(name, dependencies);
    });

    for (let [name, test] of Object.entries(tests)) {
      it(name, (done) => {
        loaded.then((parent) => {
          const target = parent[name];
          expect(target).toBeDefined();
          test(target);
          done();
        }).catch((e) => {
          fail(e);
          done();
        });
      });
    }

    it("coverage", (done) => {
      loaded.then((parent) => {
        // Remove all defined tests from exported tag.
        const defines = Object.keys(parent);
        const remaining = Object.keys(tests).filter((test) => !defines.includes(test));

        // All exported properties must be tested.
        expect(remaining).toBeEmptyArray();
        done();
      }).catch((e) => {
        fail(e);
        done();
      })
    });
  });
};