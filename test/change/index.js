import React from 'react';
import JSONInput from '../../src';
import locale from '../../src/locale/en';

function run() {
  test(`Update placeholder property value`, () => {
    let wrapper = shallow(
      <JSONInput
        locale={locale}
        reset={false}
        placeholder={{ valueToChange : false }}
      />
    );
    expect(wrapper).toMatchSnapshot();

    function checkState(componentState) {
      const wrapperState = wrapper.state();
      Object.keys(componentState).forEach( keyName => {
        expect(wrapperState[keyName]).toEqual(componentState[keyName]);
      });
    }

    // Note: markupText not evaluated

    // Behavior On Component Initial Mount
    const intialState = {
        error: undefined,
        jsObject: {},
        json: '',
        lines: 4,
        plainText: "{\n  valueToChange: false}",
        prevPlaceholder: {
            valueToChange : false
        }
    };
    checkState(intialState);
    
    // Behavior On Component Update with New Property
    wrapper.setProps({ placeholder: { valueToChange : true }});
    const stateAfterPlaceholderChange = {
        error: undefined,
        jsObject: {},
        json: '',
        lines: 4,
        plainText: "{\n  valueToChange: true}",
        prevPlaceholder: {
            valueToChange : true
        }
    };
    checkState(stateAfterPlaceholderChange);

  });

}

export default run;