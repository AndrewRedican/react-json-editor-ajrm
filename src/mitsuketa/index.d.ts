/// <reference types="node" />

export function getType(identity: any): string;
export function sameType(identityA: any, identityB: any): boolean;
export function sameStructure(identityA: any, identityB: any): string|false;
export function identical(identityA: any, identityB: any): boolean;
export function isIterable(identity: any): boolean;
export function containsKeys(identity: any, keyList: Array<any>): boolean;
export function trim(identity: any, keyList: any): Object|Array<any>|null;
export function locate(collection: any, identity: any, maxDepth?: number): string|false;
export function deepGet(collection: any, identity: any, maxDepth?: number): any; // TODO: better return type
export function locateAll(collection: any, identity: any, maxDepth?: number): Array<any>|false;
export function deepFilter(collection: any, identity: any, maxDepth?: number): Array<any>|false;
export function exists(collection: any, identity: any, maxDepth?: number): boolean;
export function onlyExisting(collection: any, identities: any, maxDepth?: number): any; // TODO: better return type
export function onlyMissing(collection: any, identities: any, maxDepth?: number): any; // TODO: better return type
export function length(identity: any): number;
export function isFalsy(identity: any): any|false;
export function isTruthy(identity: any): any|true;
export function foundTruthy(collection: any, identity: any, maxDepth?: number): boolean;
export function onlyTruthy(collection: any, identities: any, property: any, maxDepth?: number): any; // TODO: better return type
export function foundFalsy(collection: any, identity: any, maxDepth?: number): any; // TODO: better return type
export function onlyFalsy(collection: any, identities: any, property: any, maxDepth?: number): any; // TODO: better return type
export function countMatches(collection: any, identity: any, nthDepth: number, maxDepth?: number): any; // TODO: better return type
export function matchDepth(collection: any, identity: any, maxDepth?: number): boolean;
export function maxDepth(identity: any, maxLayer: number): number;
export function locate_Key(collection: any, keyName: any, maxDepth?: number): string|false;
export function deepGet_Key(collection: any, keyName: any, maxDepth?: number): any; // TODO: better return type
export function locateAll_Key(collection: any, keyName: any, maxDepth?: number): Array<any>|false;
export function deepFilter_Key(collection: any, keyName: any, maxDepth?: number): Array<any>|false;
export function deepClone(identity: any, maxDepth?: number, startDepth?: any): any; // TODO: better return type
export function renameKey(identity: any, keyName: string, newKeyName: string, maxDepth?: number): any; // TODO: better return type
export function renameKeys(identity: any, keyName: string, newKeyName: string, maxDepth?: number): any; // TODO: better return type
export function deepRemove_Key(identity: any, keyName: string, maxDepth?: number): any; // TODO: better return type
export function deepRemoveAll_Key(identity: any, keyName: string, maxDepth?: number): any; // TODO: better return type