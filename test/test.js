import React                  from "react";
import JSONInput              from '../src';
import locale                 from '../src/locale/en'
import JSONInput_Distribution from '../dist';
import locale_distribution    from '../dist/locale/en';

const 
    sampleData = {
        basic : {
            hello : 'world',
            foo   : 'bar'
        }
    },
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
            placeholder       = {{
                ...sampleData.basic
            }}
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
                ...sampleData.basic
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

/**
 * CORE TESTS TO ADD:
 * 
 * 1. Pass common valid javascript object to placeholder property
 * 2. Pass rare valid javascript object top placeholder property. Shound include:
 *      + Quotes on key names and values
 *      + Other non-alphanumeical characters on key names
 *      + Html markup on key names and values
 * 3. Test error messages are displayed correctly
 * 4. Test user-triggered events
 * 5. Test onChange results for different sets of data
 */