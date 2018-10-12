import React from "react";
import JSONInput from '../../src';
import locale from '../../src/locale/en'
import sampleData from "./../sampleData";

const sampleFunctions = {
  getResults: function (data) {
    console.log(data);
  },
  modWarning: function (text) {
    return text;
  }
};

function run() {
  test(`Basic Component Render`, () => {
    let wrapper = mount(
      <JSONInput
        locale={locale}
      />,
      { attachTo: window.domNode }
    );
    expect(wrapper).toMatchSnapshot();
  });

  test(`All Component Properties Render [1]`, () => {
    let wrapper = mount(
      <JSONInput
        locale={locale}
        placeholder={sampleData}
        viewOnly={true}
        onChange={sampleFunctions.getResults}
        confirmGood={false}
        height='500px'
        width='100%'
        onKeyPressUpdate={true}
        waitAfterKeyPress={1200}
        modifyErrorText={sampleFunctions.modWarning}
        theme='dark_vscode_tribute'
        colors={{
          string: '#E25E29'
        }}
        style={{
          outerBox: {
            border: '5px solid grey'
          },
          container: {
            backgroundColor: ''
          }
        }}
      />,
      { attachTo: window.domNode }
    );
    expect(wrapper).toMatchSnapshot();
  });

  test(`All Component Properties Render [2]`, () => {
    let wrapper = mount(
      <JSONInput
        locale={locale}
        placeholder={sampleData}
        viewOnly={false}
        onChange={sampleFunctions.getResults}
        confirmGood={true}
        height='500px'
        width='100%'
        onKeyPressUpdate={false}
        waitAfterKeyPress={600}
        modifyErrorText={sampleFunctions.modWarning}
        theme='light_mitsuketa_tribute'
        colors={{
          string: '#DAA520'
        }}
        style={{
          labelColumn: {
            display: 'hidden'
          },
          contentBox: {
            pointerEvents: 'none'
          }
        }}
      />,
      { attachTo: window.domNode }
    );
    expect(wrapper).toMatchSnapshot();
  });
}

export default run;