/* React-JSON-Editor utilities */

/**
 * Check is object has property
 * @param {Record<string, any>} obj - object to check against
 * @param {string} prop - property to check for
 * @returns {boolean} object contains property or not
 * @public
 */
export function hasProperty(obj: Record<string, any>, prop: string): boolean {
  return Object.prototype.hasOwnProperty.call(obj, prop) || prop in obj;
}

/**
 * SafeGet a property from an object
 * @param {Record<string, any>} obj - Object to attempt to get a property from
 * @param {string} key - property name to get value of
 * @param {any} def - default value of not value for the property exists - default of null
 * @return {any} value of the property or default value given/null
 * @public
 */
export function safeGet(obj: Record<string, any>, key: string, def?: any): any {
  obj = ['null', 'undefined'].includes(typeof obj) ? {} : obj;
  def = def === null ? null : def;
  
  const val = obj[key];
  if (hasProperty(obj, key)) {
    return val === null || val === undefined ? def : val;
  }
  if (key in obj) {
    return val === null || val === undefined ? def : val;
  }
  return def;
}