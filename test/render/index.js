import React from 'react';
import { mount } from 'enzyme'
import JSONInput from '../../src';
import locale from '../../src/locale/en'
import sampleData from './../sampleData';

const sampleFunctions = {
  getResults: (data) => {
    console.log(data);
  },
  modWarning: (text) => {
    return text;
  }
};

const colors = {
  string: '#E25E29'
}

const colors2 = {
  string: '#DAA520'
}

const style = {
  outerBox: {
    border: '5px solid grey'
  },
  container: {
    backgroundColor: ''
  }
}

const style2 = {
  labelColumn: {
    display: 'hidden'
  },
  contentBox: {
    pointerEvents: 'none'
  }
}

function run () {
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
        viewOnly
        onChange={sampleFunctions.getResults}
        confirmGood={false}
        height='500px'
        width='100%'
        onKeyPressUpdate
        waitAfterKeyPress={1200}
        modifyErrorText={sampleFunctions.modWarning}
        theme='dark_vscode_tribute'
        colors={colors}
        style={style}
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
        confirmGood
        height='500px'
        width='100%'
        onKeyPressUpdate={false}
        waitAfterKeyPress={600}
        modifyErrorText={sampleFunctions.modWarning}
        theme='light_mitsuketa_tribute'
        colors={colors2}
        style={style2}
      />,
      { attachTo: window.domNode }
    );
    expect(wrapper).toMatchSnapshot();
  });
}

export default run;
