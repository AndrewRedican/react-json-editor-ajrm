import React                  from "react";
import JSONInput              from '../src';
import locale                 from '../src/locale/en'
import JSONInput_Distribution from '../dist';
import locale_distribution    from '../dist/locale/en';
import testSyntaxLogic        from './testSyntaxLogic';

const 
    sampleFunctions = {
        getResults : function(data){
            console.log(data);
        },
        modWarning : function(text){
            return text;
        }
    };

beforeAll(() => {
    const div = document.createElement('div');
    window.domNode = div;
    document.body.appendChild(div);
});

test('Basic Component Render [SOURCE]', () => {
    let wrapper = mount(
        <JSONInput
            test
            id     = 'unique_string'
            locale = {locale}
        />,
        { attachTo: window.domNode }
    );
    expect(wrapper).toMatchSnapshot();
});

test('Basic Component Render [DISTRIBUTION]', () => {
    let wrapper = mount(
        <JSONInput_Distribution
            test
            id     = 'unique_string'
            locale = {locale_distribution}
        />,
        { attachTo: window.domNode }
    );
    expect(wrapper).toMatchSnapshot();
});

test('All Component Properties Render [SOURCE]', () => {
    let wrapper = mount(
        <JSONInput
            test
            id                = 'unique_string'
            locale            = {locale}
            placeholder       = {[0,1,2,3,4]}
            viewOnly          = {true}
            onChange          = {sampleFunctions.getResults}
            confirmGood       = {false}
            height            = '500px'
            width             = '100%'
            onKeyPressUpdate  = {true}
            waitAfterKeyPress = {1200}
            modifyErrorText   = {sampleFunctions.modWarning}
            theme             = 'dark_vscode_tribute'
            colors            = {{
                string : '#E25E29'
            }}
            style             = {{
                outerBox : {
                    border : '5px solid grey'
                },
                container : {
                    backgroundColor : ''
                }
            }}
        />,
        { attachTo: window.domNode }
    );
    expect(wrapper).toMatchSnapshot();
});

test('All Component Properties Render [DISTRIBUTION]', () => {
    let wrapper = mount(
        <JSONInput_Distribution
            test
            id                = 'unique_string'
            locale            = {locale_distribution}
            placeholder       = {{
                hello : 'world',
                foo   : 'bar'
            }}
            viewOnly          = {false}
            onChange          = {sampleFunctions.getResults}
            confirmGood       = {true}
            height            = '500px'
            width             = '100%'
            onKeyPressUpdate  = {false}
            waitAfterKeyPress = {600}
            modifyErrorText   = {sampleFunctions.modWarning}
            theme             = 'light_mitsuketa_tribute'
            colors            = {{
                string : '#DAA520'
            }}
            style             = {{
                labelColumn : {
                    display : 'hidden'
                },
                contentBox : {
                    pointerEvents : 'none'
                }
            }}
        />,
        { attachTo: window.domNode }
    );
    expect(wrapper).toMatchSnapshot();
});

sampleData = {
    basic : {
        hello : 'world',
        foo   : 'bar'
    },
    common : {
        strings : [
            'xyz',
            'This is a test',
            '+_)(*&^%$#@!~/|}{:?/.,;][=-`'
        ],
        numbers : [ 0, 1, -100, -7.5, 500, 1.823 ],
        primitives : [false,true]
    }
};

testSyntaxLogic('JS','Basic Sample',sampleData.basic,{
    jsObject : { ...sampleData.basic },
    json     : `{"hello":"world","foo":"bar"}`,
    lines    : 5,
    noSpaces : `{hello:'world',foo:'bar'}`,
    tokens   : [
        { depth: 1, string: '{',       type: 'symbol', value: '{'       },
        { depth: 1, string: 'hello',   type: 'key',    value: 'hello'   },
        { depth: 1, string: ':',       type: 'symbol', value: ':'       },
        { depth: 1, string: "'world'", type: 'string', value: "'world'" },
        { depth: 1, string: ',',       type: 'symbol', value: ','       },
        { depth: 1, string: 'foo',     type: 'key',    value: 'foo'     },
        { depth: 1, string: ':',       type: 'symbol', value: ':'       },
        { depth: 1, string: "'bar'",   type: 'string', value: "'bar'"   },
        { depth: 0, string: '}',       type: 'symbol', value: '}'       }
    ]
});

testSyntaxLogic('JS','Common Sample',sampleData.common,{
    jsObject : { ...sampleData.common },
    json     : "{\"strings\":[\"xyz\",\"This is a test\",\"+_)(*&^%$#@!~/|}{:?/.,;][=-`\"],\"numbers\":[0,1,-100,-7.5,500,1.823],\"primitives\":[false,true]}",
    lines    : 20,
    noSpaces : "{strings:['xyz','This is a test','+_)(*&^%$#@!~/|}{:?/.,;][=-`'],numbers:[0,1,-100,-7.5,500,1.823],primitives:[false,true]}",
    tokens   : [
        { depth : 1, string: "{",                type: "symbol",    value: "{"         },
        { depth : 1, string: "strings",          type: "key",       value: "strings"    },
        { depth : 1, string: ":",                type: "symbol",    value: ":"          }, 
        { depth : 2, string: "[",                type: "symbol",    value: "["          }, 
        { depth : 2, string: "'xyz'",            type: "string",    value: "'xyz'"      }, 
        { depth : 2, string: ",",                type: "symbol",    value: ","          }, 
        { depth : 2, string: "'This is a test'", type: "string",    value: "'This is a test'" }, 
        { depth : 2, string: ",",                type: "symbol",    value: ","          }, 
        { depth : 2, string: "'+_)(*&^%$#@!~/|}{:?/.,;][=-`'", type: "string", value: "'+_)(*&^%$#@!~/|}{:?/.,;][=-`'" }, 
        { depth : 1, string: "]",                type: "symbol",    value: "]"          }, 
        { depth : 1, string: ",",                type: "symbol",    value: ","          }, 
        { depth : 1, string: "numbers",          type: "key",       value: "numbers"    }, 
        { depth : 1, string: ":",                type: "symbol",    value: ":"          }, 
        { depth : 2, string: "[",                type: "symbol",    value: "["          }, 
        { depth : 2, string: "0",                type: "number",    value: 0            }, 
        { depth : 2, string: ",",                type: "symbol",    value: ","          }, 
        { depth : 2, string: "1",                type: "number",    value: 1            }, 
        { depth : 2, string: ",",                type: "symbol",    value: ","          }, 
        { depth : 2, string: "-100",             type: "number",    value: -100         }, 
        { depth : 2, string: ",",                type: "symbol",    value: ","          }, 
        { depth : 2, string: "-7.5",             type: "number",    value: -7.5         }, 
        { depth : 2, string: ",",                type: "symbol",    value: ","          }, 
        { depth : 2, string: "500",              type: "number",    value: 500          }, 
        { depth : 2, string: ",",                type: "symbol",    value: ","          }, 
        { depth : 2, string: "1.823",            type: "number",    value: 1.823        }, 
        { depth : 1, string: "]",                type: "symbol",    value: "]"          }, 
        { depth : 1, string: ",",                type: "symbol",    value: ","          }, 
        { depth : 1, string: "primitives",       type: "key",       value: "primitives" }, 
        { depth : 1, string: ":",                type: "symbol",    value: ":"          }, 
        { depth : 2, string: "[",                type: "symbol",    value: "["          }, 
        { depth : 2, string: "false",            type: "primitive", value: false        }, 
        { depth : 2, string: ",",                type: "symbol",    value: ","          }, 
        { depth : 2, string: "true",             type: "primitive", value: true         }, 
        { depth : 1, string: "]",                type: "symbol",    value: "]"          },
        { depth : 0, string: "}",                type: "symbol",    value: "}"          }
    ]
});

/**
 * TODO - Add missing Syntax Logic validations:
 * 1. Primitive words as key names
 * 2. Special characters in keys. I.e. @#$%    L32423    ""
 * 3. Quotes characters and nested. I.e.   "" ''  ``
 * 4. Escape character. I.e \
 * 5. Html Tags and stand alone reserved words I.e. <pre> <div>  <> >< <br/>
 * 
 * 6. Provide invalid information, validate warnings
 **/