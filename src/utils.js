/* React-JSON-Editor utilities */

/**
 * Check is object has property
 * @param {Record<string, any>} obj - object to check against
 * @param {string} prop - property to check for
 * @returns {boolean} object contains property or not
 * @public
 */
export function hasProperty(obj, prop) {
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
export function safeGet(obj, key, def) {
  def = def === null ? null : def;
  obj = [null, undefined].includes(obj) ? {} : obj;
  
  const val = obj[key];
  if (hasProperty(obj, key)) {
    return val === null || val === undefined ? def : val;
  }
  if (key in obj) {
    return val === null || val === undefined ? def : val;
  }
  return def;
}