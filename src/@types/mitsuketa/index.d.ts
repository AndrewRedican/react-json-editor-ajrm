/// <reference types="node" />

declare module 'mitsuketa' {
  export function getType(identity: any): string;
  export function sameType(identityA: any, identityB: any): boolean;
  export function sameStructure(identityA: any, identityB: any): string;
  export function identical(identityA: any, identityB: any): boolean;
  export function isIterable(identity: any): boolean;
  export function containsKeys(identity: any, keyList: any): boolean;
  export function trim(identity: any, keyList: any): Object;
  export function locate(collection: any, identity: any, maxDepth: any): string;
  export function deepGet(collection: any, identity: any, maxDepth: any): any;
  export function locateAll(collection: any, identity: any, maxDepth: any): any[];
  export function deepFilter(collection: any, identity: any, maxDepth: any): any[];
  export function exists(collection: any, identity: any, maxDepth: any): boolean;
  export function onlyExisting(collection: any, identities: any, maxDepth: any): any;
  export function onlyMissing(collection: any, identities: any, maxDepth: any): any;
  export function length(identity: any): any;
  export function isFalsy(identity: any): boolean;
  export function isTruthy(identity: any): boolean;
  export function foundTruthy(collection: any, identity: any, maxDepth: any): boolean;
  export function onlyTruthy(collection: any, identities: any, property: any, maxDepth: any): any;
  export function foundFalsy(collection: any, identity: any, maxDepth: any): boolean;
  export function onlyFalsy(collection: any, identities: any, property: any, maxDepth: any): any;
  export function countMatches(collection: any, identity: any, nthDepth: any, maxDepth: any): any;
  export function matchDepth(collection: any, identity: any, maxDepth: any): boolean;
  export function maxDepth(identity: any, maxLayer: any): number;
  export function locate_Key(collection: any, keyName: any, maxDepth: any): string;
  export function deepGet_Key(collection: any, keyName: any, maxDepth: any): any;
  export function locateAll_Key(collection: any, keyName: any, maxDepth: any): any[];
  export function deepFilter_Key(collection: any, keyName: any, maxDepth: any): any[];
  export function deepClone(identity: any, maxDepth: any, startDepth: any): any;
  export function renameKey(identity: any, keyName: any, newKeyName: any, maxDepth: any): any;
  export function renameKeys(identity: any, keyName: any, newKeyName: any, maxDepth: any): any;
  export function deepRemove_Key(identity: any, keyName: any, maxDepth: any): any;
  export function deepRemoveAll_Key(identity: any, keyName: any, maxDepth: any): any;
}