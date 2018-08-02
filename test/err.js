import { 
    getType,
    locate
} from 'mitsuketa';

const err = {
    throwError: (fxName='unknown function',paramName='unknown parameter',expectation='to be defined') => {
        throw ['@',fxName,'(): Expected parameter \'',paramName,'\' ',expectation].join('');
    },

    isUndefined: (fxArguments,paramName='<unknown parameter>',param) => {
        if([null,undefined].indexOf(param)>-1) err.throwError(fxArguments.callee.name,paramName); 
    },

    isFalsy: (fxArguments,paramName='<unknown parameter>',param) => { 
        if(!param)  err.throwError(fxArguments.callee.name,paramName);
    },

    isNoneOf: (fxArguments,paramName='<unknown parameter>',param,contains=[]) => { 
        if(contains.indexOf(param)===-1) err.throwError(fxArguments.callee.name,paramName,'to be any of' + JSON.stringify(contains));
    },

    isAnyOf: (fxArguments,paramName='<unknown parameter>',param,contains=[]) => { 
        if(contains.indexOf(param)>-1) err.throwError(fxArguments.callee.name,paramName,'not to be any of' + JSON.stringify(contains));
    },

    isNotType: (fxArguments,paramName='<unknown parameter>',param,type='') => { 
        if(getType(param)!==type.toLowerCase()) err.throwError(fxArguments.callee.name,paramName,'to be type ' + type.toLowerCase());
    },

    isAnyTypeOf: (fxArguments,paramName='<unknown parameter>',param,types=[]) => { 
        types.forEach( type => {
            if(getType(param)===type) err.throwError(fxArguments.callee.name,paramName,'not to be type of ' + type.toLowerCase());
        });
    },

    missingKey: (fxArguments,paramName='<unknown parameter>',param,keyName='') => { 
        err.isUndefined (fxArguments,paramName,param);
        if(Object.keys(param).indexOf(keyName)===-1) err.throwError(fxArguments.callee.name,paramName,'to contain \'' + keyName + '\' key');
    },

    missingAnyKeys: (fxArguments,paramName='<unknown parameter>',param,keyNames=['']) => { 
        err.isUndefined (fxArguments,paramName,param);
        const keyList = Object.keys(param);
        keyNames.forEach( keyName => { 
            if(keyList.indexOf(keyName)===-1) err.throwError(fxArguments.callee.name,paramName,'to contain \'' + keyName + '\' key');
        });
    },

    containsUndefined : (fxArguments,paramName='<unknown parameter>',param) => { 
        [undefined,null].forEach( value => {
            const location = locate(param,value);
            if(location) err.throwError(fxArguments.callee.name,paramName,'not to contain \'' + JSON.stringify(value) + '\' at ' + location); 
        });
    },

    isInvalidPath: (fxArguments,paramName='<unknown parameter>',param) => { 
        err.isUndefined (fxArguments,paramName,param);
        err.isNotType   (fxArguments,paramName,param,'string');
        err.isAnyOf     (fxArguments,paramName,param,['','/']);
        '.$[]#'.split().forEach( invalidChar => {
            if(param.indexOf(invalidChar)>-1) err.throwError(fxArguments.callee.name,paramName,'not to contain invalid character \'' + invalidChar + '\''); 
        });
        if(param.match(/\/{2,}/g)) err.throwError(fxArguments.callee.name,paramName,'not to contain consecutive forward slash characters');
    },

    isInvalidWriteData: (fxArguments,paramName='<unknown parameter>',param) => { 
        err.isUndefined(fxArguments,paramName,param);
        err.containsUndefined(fxArguments,paramName,param);
    }

};

export default err;