<div align="center">

[![npm status][npm]][npm-url]

[![build status][build]][build-url]
[![coverage status][coverage]][coverage-url]

</div>

<h1 align="center">LokiDB</h1>

LokiDB is a document oriented database written in TypeScript.

Its purpose is to store javascript objects as documents in a blazing fast nosql fashion and retrieve them with a similar mechanism.

LokiDB is the official successor of [LokiJS][lokijs-url].

<h2 align="center">Install</h2>

Install with npm:

```bash
npm install @lokidb/loki
```

<h2 align="center">Documentation</h2>

Check out our interactive [documentation](https://LokiJS-Forge.github.io/LokiDB/).

<h2 align="center">Plugins</h2>

<h3>Storage and Adapter</h3>

|Name|Description|
|:---|:----------|
|[@lokidb/fs-storage][fs-storage-npm-url]                             |  A persistence adapter which persists to node fs module storage. |
|[@lokidb/local-storage][local-storage-npm-url]                       |  A persistence adapter which persists to web browser's local storage. |
|[@lokidb/indexed-storage][indexed-storage-npm-url]                   |  A persistence adapter which persists to web browser's indexed db storage. |
|[@lokidb/memory-storage][memory-storage-npm-url]                     |  A persistence adapter which persists to memory. |
|[@lokidb/partitioning-adapter][partitioning-adapter-npm-url]         |  An adapter for adapters. Converts a non reference mode adapter into a reference mode adapter which can perform destructuring and partitioning.|

<h3>Full-Text Search</h3>

|Name|Description|
|:---|:----------|
|[@lokidb/full-text-search][full-text-search]                         |  A full-text search engine. |
|[@lokidb/full-text-search-language][full-text-search-language]       |  A language analyzer utility package. |
|[@lokidb/full-text-search-language-de][full-text-search-language-de] |  ![flag][full-text-search-language-de-flag] A german language analyzer. |
|[@lokidb/full-text-search-language-en][full-text-search-language-en] |  ![flag][full-text-search-language-en-flag] An english language analyzer. |

[build]: https://travis-ci.org/LokiJS-Forge/LokiDB.svg?branch=master
[build-url]: https://travis-ci.org/LokiJS-Forge/LokiDB
[coverage]: https://coveralls.io/repos/github/LokiJS-Forge/LokiDB/badge.svg?branch=master
[coverage-url]: https://coveralls.io/github/LokiJS-Forge/LokiDB?branch=master

[lokijs-url]: https://github.com/techfort/LokiJS

[npm]: https://img.shields.io/npm/v/@lokidb/loki.svg
[npm-url]: https://www.npmjs.com/package/@lokidb/loki

[fs-storage]: https://github.com/LokiJS-Forge/LokiDB
[fs-storage-npm-url]: https://www.npmjs.com/package/@lokidb/fs-storage

[local-storage]: https://github.com/LokiJS-Forge/LokiDB
[local-storage-npm-url]: https://www.npmjs.com/package/@lokidb/fs-storage

[indexed-storage]: https://github.com/LokiJS-Forge/LokiDB
[indexed-storage-npm-url]: https://www.npmjs.com/package/@lokidb/indexed-storage

[memory-storage]: https://github.com/LokiJS-Forge/LokiDB
[memory-storage-npm-url]: https://www.npmjs.com/package/@lokidb/memory-storage

[partitioning-adapter]: https://github.com/LokiJS-Forge/LokiDB
[partitioning-adapter-npm-url]: https://www.npmjs.com/package/@lokidb/partitioning-adapter

[full-text-search]: https://github.com/LokiJS-Forge/LokiDB
[full-text-search-npm-url]: https://www.npmjs.com/package/@lokidb/full-text-search
[full-text-search-language]: https://github.com/LokiJS-Forge/LokiDB
[full-text-search-language-npm-url]: https://www.npmjs.com/package/@lokidb/full-text-search-language
[full-text-search-language-de]: https://github.com/LokiJS-Forge/LokiDB
[full-text-search-language-de-flag]: https://raw.githubusercontent.com/stevenrskelton/flag-icon/master/png/16/country-4x3/de.png
[full-text-search-language-de-npm-url]: https://www.npmjs.com/package/@lokidb/full-text-search-language-de
[full-text-search-language-en]: https://github.com/LokiJS-Forge/LokiDB
[full-text-search-language-en-npm-url]: https://www.npmjs.com/package/@lokidb/full-text-search-language-en
[full-text-search-language-en-flag]: https://raw.githubusercontent.com/stevenrskelton/flag-icon/master/png/16/country-4x3/us.png
