/* General Utility */

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
  * Check if the given value is a function
  * @param {any} obj - value to validate is a function
  * @return {boolean} - bool if the given value is a function
  */
export function isFunction(obj: any): boolean {
  return obj && {}.toString.call(obj) === '[object Function]';
}

/**
  * Merge the given objects into the target
  * @param {Record<string, any>} target - Target of the merged objects
  * @param {Array<Record<string, any>>} params - Objects to merge into the target
  * @returns {Record<string, any>} - Merged object
  */
export function mergeObjects(target: Record<string, any>, ...params: Array<Record<string, any>>): Record<string, any> {
  params.forEach((param, i) => {
    Object.keys(param).forEach(key => {
      if (key in target) {
        if (typeof param[key] === typeof target[key]) {
          switch (true) {
            case typeof param[key] === 'string':
              target[key] += param[key];
              break;
            case param[key] instanceof Array:
              target[key].push(...param[key]);
              break;
            default:
              console.warn(`unknown merge type ${typeof target[key]}`);
          }
        } else {
          throw new TypeError(`Target key of ${key}(${typeof target[key]}) is not the same type as param[${i}] key of ${key}(${typeof param[key]})`);
        }
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        target[key] = param[key];
      }
    });
  });
  return target;
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
  // eslint-disable-next-line no-param-reassign, @typescript-eslint/no-unsafe-assignment
  def = def === null ? null : def;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const val = obj[key];
  if (hasProperty(obj, key)) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return val === null || val === undefined ? def : val;
  }
  if (key in obj) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return val === null || val === undefined ? def : val;
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return def;
}

/**
 * Count the line breaks of the given string
 * @param {string} str - string to count line breaks of
 * @returns {number} - line break count
 */
export function countCarrigeReturn(str: string): number {
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    count += ['\n', '\r'].includes(str[i]) ? 1 : 0;
  }
  return count;
}
