import { getType, locate } from 'mitsuketa';

const UNKNOWN = '<unknown parameter>';

export function getCaller(skip = 1) {
  // A somewhat hacky solution that will yield different results in different JS engines.
  // Since we only call this function when an error will actually be thrown we typically don't
  // rally mind the performance impact this might have if called too often.
  // Lucky for us we use nodeJS and thus only V8.
  const stackTrace = (new Error()).stack || '';
  let callerName = stackTrace.replace(/^Error\s+/, '');
  callerName = callerName.split('\n')[skip];
  callerName = callerName.replace(/^\s+at Object./, '').replace(/^\s+at /, '').replace(/ \(.+\)$/, '');
  return callerName;
}

export function throwError(fxName = 'unknown function', paramName = 'unknown parameter', expectation = 'to be defined') {
  throw ['@', fxName, '(): Expected parameter \'', paramName, '\' ', expectation].join('');
}

export function isUndefined(paramName = UNKNOWN, param: any, expectation?: string) {
  if ([null, undefined].includes(param)) {
    throwError(getCaller(2), paramName, expectation);
  }
}

export function isFalsy(paramName = UNKNOWN, param: any) {
  if (!param) {
    throwError(getCaller(2), paramName);
  }
}

export function isNoneOf(paramName: string = UNKNOWN, param: any, contains: Array<any> = []) {
  if (!contains.includes(param)) {
    throwError(getCaller(2), paramName, `to be any of ${JSON.stringify(contains)}`);
  }
}

export function isAnyOf(paramName: string = UNKNOWN, param: any, contains: Array<any> = []) {
  if (contains.includes(param)) {
    throwError(getCaller(2), paramName, `not to be any of ${JSON.stringify(contains)}`);
  }
}

export function isNotType(paramName: string = UNKNOWN, param: any, type = '') {
  if (getType(param) !== type.toLowerCase()) {
    throwError(getCaller(2), paramName, `to be type ${type.toLowerCase()}`);
  }
}

export function isAnyTypeOf(paramName: string = UNKNOWN, param: any, types: Array<string> = []) {
  types.forEach(type => {
      if (getType(param) === type) {
        throwError(getCaller(2), paramName, `not to be type of ${type.toLowerCase()}`);
      }
  });
}

export function missingKey(paramName: string = UNKNOWN, param: any, keyName = '') {
  isUndefined(paramName, param);
  if (!Object.keys(param).includes(keyName)) {
    throwError(getCaller(2), paramName, `to contain '${keyName}' key`);
  }
}

export function missingAnyKeys(paramName: string = UNKNOWN, param: any, keyNames: Array<string> = ['']) {
  isUndefined(paramName, param);
  const keyList = Object.keys(param);
  keyNames.forEach(keyName => {
      if (!keyList.includes(keyName)) {
        throwError(getCaller(2), paramName, `to contain '${keyName}' key`);
      }
  });
}

export function containsUndefined(paramName: string = UNKNOWN, param: any) {
  [undefined, null].forEach(value => {
      const location = locate(param, value, null);
      if (location) {
        throwError(getCaller(2), paramName, `not to contain '${JSON.stringify(value)}' at ${location}`);
      }
  });
}

export function isInvalidPath(paramName: string = UNKNOWN, param: any) {
  isUndefined(paramName, param);
  isNotType(paramName, param, 'string');
  isAnyOf(paramName, param, ['', '/']);
  ['.', '$', '[', ']', '#'].forEach(invalidChar => {
      if (param.indexOf(invalidChar) > -1) {
        throwError(getCaller(2), paramName, `not to contain invalid character '${invalidChar}'`);
      }
  });

  if (param.match(/\/{2,}/g)) {
    throwError(getCaller(2), paramName, 'not to contain consecutive forward slash characters');
  }
}

export  function isInvalidWriteData(paramName: string = UNKNOWN, param: any) {
  isUndefined(paramName, param);
  containsUndefined(paramName, param);
}
