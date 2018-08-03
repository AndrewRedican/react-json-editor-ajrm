import React                  from "react";
import JSONInput_Distribution from '../dist';
import locale_distribution    from '../dist/locale/en';

var testBuild = function(){

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

};

module.exports =  testBuild;