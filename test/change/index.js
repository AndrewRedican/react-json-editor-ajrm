import React from 'react';
import JSONInput from '../../src';
import locale from '../../src/locale/en';

function run() {
  test(`Update placeholder property value`, () => {
    let wrapper = mount(
      <JSONInput
        locale={locale}
        reset={false}
        placeholder={{ valueToChange : false }}
      />,
      { attachTo: window.domNode }
    );
    expect(wrapper).toMatchSnapshot();

    function checkState(componentState){
        Object.keys(componentState).forEach( keyName => {
            expect(wrapper.state()[keyName]).toEqual(componentState[keyName]);
        });
    }

    // Note: markupText not evaluated

    // Behavior On Component Initial Mount
    const intialState = {
        error: undefined,
        jsObject: undefined,
        json: '',
        lines: 4,
        plainText: undefined,
        prevPlaceholder: {
            valueToChange : false
        }
    };
    checkState(intialState);
    
    // Behavior On Component Update with New Property
    wrapper.setProps({ placeholder: { valueToChange : true }});
    const stateAfterPlaceholderChange = {
        error: undefined,
        jsObject: undefined,
        json: '',
        lines: 4,
        plainText: undefined,
        prevPlaceholder: {
            valueToChange : true
        }
    };
    checkState(stateAfterPlaceholderChange);

  });

}

export default run;