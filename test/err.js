import {
    getType,
    locate
} from 'mitsuketa';

const err = {
    getCaller: (skip = 1) => {
        // A somewhat hacky solution that will yield different results in different JS engines. 
        // Since we only call this function when an error will actually be thrown we typically don't 
        // rally mind the performance impact this might have if called too often.
        // Lucky for us we use nodeJS and thus only V8.
        const stackTrace = (new Error()).stack;
        var callerName = stackTrace.replace(/^Error\s+/, '');
        callerName = callerName.split("\n")[skip];
        callerName = callerName.replace(/^\s+at Object./, '').replace(/^\s+at /, '').replace(/ \(.+\)$/, '')
        return callerName;
    },

    throwError: (fxName = 'unknown function', paramName = 'unknown parameter', expectation = 'to be defined') => {
        throw ['@', fxName, '(): Expected parameter \'', paramName, '\' ', expectation].join('');
    },

    isUndefined: (paramName = '<unknown parameter>', param) => {
        if ([null, undefined].indexOf(param) > -1) err.throwError(err.getCaller(2), paramName);
    },

    isFalsy: (paramName = '<unknown parameter>', param) => {
        if (!param) err.throwError(err.getCaller(2), paramName);
    },

    isNoneOf: (paramName = '<unknown parameter>', param, contains = []) => {
        if (contains.indexOf(param) === -1) err.throwError(err.getCaller(2), paramName, 'to be any of' + JSON.stringify(contains));
    },

    isAnyOf: (paramName = '<unknown parameter>', param, contains = []) => {
        if (contains.indexOf(param) > -1) err.throwError(err.getCaller(2), paramName, 'not to be any of' + JSON.stringify(contains));
    },

    isNotType: (paramName = '<unknown parameter>', param, type = '') => {
        if (getType(param) !== type.toLowerCase()) err.throwError(err.getCaller(2), paramName, 'to be type ' + type.toLowerCase());
    },

    isAnyTypeOf: (paramName = '<unknown parameter>', param, types = []) => {
        types.forEach(type => {
            if (getType(param) === type) err.throwError(err.getCaller(2), paramName, 'not to be type of ' + type.toLowerCase());
        });
    },

    missingKey: (paramName = '<unknown parameter>', param, keyName = '') => {
        err.isUndefined(paramName, param);
        if (Object.keys(param).indexOf(keyName) === -1) err.throwError(err.getCaller(2), paramName, 'to contain \'' + keyName + '\' key');
    },

    missingAnyKeys: (paramName = '<unknown parameter>', param, keyNames = ['']) => {
        err.isUndefined(paramName, param);
        const keyList = Object.keys(param);
        keyNames.forEach(keyName => {
            if (keyList.indexOf(keyName) === -1) err.throwError(err.getCaller(2), paramName, 'to contain \'' + keyName + '\' key');
        });
    },

    containsUndefined: (paramName = '<unknown parameter>', param) => {
        [undefined, null].forEach(value => {
            const location = locate(param, value);
            if (location) err.throwError(err.getCaller(2), paramName, 'not to contain \'' + JSON.stringify(value) + '\' at ' + location);
        });
    },

    isInvalidPath: (paramName = '<unknown parameter>', param) => {
        err.isUndefined(paramName, param);
        err.isNotType(paramName, param, 'string');
        err.isAnyOf(paramName, param, ['', '/']);
        '.$[]#'.split().forEach(invalidChar => {
            if (param.indexOf(invalidChar) > -1) err.throwError(err.getCaller(2), paramName, 'not to contain invalid character \'' + invalidChar + '\'');
        });
        if (param.match(/\/{2,}/g)) err.throwError(err.getCaller(2), paramName, 'not to contain consecutive forward slash characters');
    },

    isInvalidWriteData: (paramName = '<unknown parameter>', param) => {
        err.isUndefined(paramName, param);
        err.containsUndefined(paramName, param);
    }

};

export default err;