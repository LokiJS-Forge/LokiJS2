import {V2_0, V2_0 as Serialization} from "./v2_0";
import {V1_5} from "./v1_5";

export {Serialization};

export type MergeRightBiased<TLeft, TRight> =
  TLeft extends any[] ? TRight :
    TRight extends any[] ? TRight :
      TRight extends Function ? TRight :
        TLeft extends object ?
          TRight extends object ? {
            // All properties of Left and Right, recursive
            [P in keyof TLeft & keyof TRight]: MergeRightBiased<TLeft[P], TRight[P]>
          } & {
            // All properties of Left not in Right
            [P in Exclude<keyof TLeft, keyof TRight>]: TLeft[P];
          } & {
            // All properties of Right not in Left
            [P in Exclude<keyof TRight, keyof TLeft>]: TRight[P]
          }
            // Prefer Right
            : TRight
          : TRight;

function isObject(t: any): t is object {
  return t !== null && typeof t === "object" && !Array.isArray(t);
}

/**
 * Merges two objects to one using a proxy.
 * The properties of the right object are preferred.
 * @param {TLeft} left - the unfavored left object
 * @param {TRight} right - the favoured right object
 * @returns {MergeRightBiased<TLeft, TRight>}
 * @hidden
 */
export function mergeRightBiasedWithProxy<TLeft, TRight>(left: TLeft, right: TRight): MergeRightBiased<TLeft, TRight> {
  return new Proxy({},
    {
      get: function (target, prop) {
        if (target.hasOwnProperty(prop)) {
          return target[prop];
        }
        if (isObject(right) && right.hasOwnProperty(prop)) {
          if (isObject(right[prop]) && isObject(left) && isObject(left[prop])) {
            return mergeRightBiasedWithProxy(left[prop], right[prop]);
          }
          return right[prop];
        }
        if (isObject(left) && left.hasOwnProperty(prop)) {
          return left[prop];
        }
        return undefined;
      }
    }
  ) as any;
}

function V1_5toV2_0(obj: V1_5.Loki): V2_0.Loki {
  return mergeRightBiasedWithProxy(obj,
    {
      databaseVersion: 2.0,
      collections: obj.collections.map(coll => mergeRightBiasedWithProxy(coll, {
        dynamicViews: coll.DynamicViews.map(dv => mergeRightBiasedWithProxy(dv, {
          persistent: dv.options.persistent,
          sortPriority: dv.options.sortPriority,
          minRebuildInterval: dv.options.minRebuildInterval,
          resultSet: mergeRightBiasedWithProxy(dv.resultset, {
            filteredRows: dv.resultset.filteredrows,
            scoring: null
          }),
          sortByScoring: false,
          sortCriteriaSimple: {
            field: dv.sortCriteriaSimple.propname
          }
        })),
        cloneMethod: coll.cloneMethod,
        nestedProperties: [],
        ttl: undefined,
        ttlInterval: undefined,
        fullTextSearch: null,
      }))
    }) as any;
}

export function deserializeLegacyDB(obj: Serialization.Serialized): Serialization.Loki {
  if (obj.databaseVersion === 1.5) {
    return deserializeLegacyDB(V1_5toV2_0(obj as V1_5.Loki));
  }
  return obj as Serialization.Loki;
}