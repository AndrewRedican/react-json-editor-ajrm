import React from "react";
import JSONInput from '../../src';
import locale from '../../src/locale/en'
import err from './../err';
import { deepRemoveAll_Key } from 'mitsuketa';

function removeKeys(identity={}, keys=[]){
  let newIdentity = identity;
  keys.forEach(keyName => {
    newIdentity = deepRemoveAll_Key(newIdentity, keyName);
  });
  return newIdentity;
}

function createElementFromHTML(htmlString='') {
  var div = document.createElement('div');
  div.setAttribute('id', 'AJRM-JSON-EDITOR-<RANDOM_NUMBER>-unique_string-content-box');
  div.innerHTML = htmlString.trim();
  return div;
}

function trimMarkupBasedResults(results) {
  let newResults = removeKeys(results, ['indented', 'markup', 'error']);
  newResults = {
    ...newResults,
    tokens: (tokens => {
      tokens = removeKeys(tokens, ['tokens']);
      let noWhiteSpaceTokens = [];
      let noColonTypeTokens  = [];
      tokens.forEach(token => {
        if (!['space', 'linebreak'].includes(token.type)) {
          noWhiteSpaceTokens.push(token);
        }
      });
      noColonTypeTokens = noWhiteSpaceTokens.map(token => {
        if (token.type !== 'colon') {
          return token;
        }
        return {
          ...token,
          type: 'symbol'
        };
      });
      return noColonTypeTokens;
    })(newResults.tokens)
  };
  return newResults;
}

function testSyntaxLogic(language='JS', scope, input, output) {
  err.isNotType('language', language, 'string');
  err.isNotType('scope', scope, 'string');
  err.isNotType('output', output, 'object');
  err.isUndefined('input', input);
  let markup;

  test(`[${language}] SYNTAX LOGIC for DATA INDENTITY with ${scope}`, () => {
    const wrapper = shallow(
      <JSONInput
        locale={ locale }
      />,
      { attachTo: window.domNode }
    );
    const results = wrapper.instance().tokenize(input);
    const trimmedResults = removeKeys(results, ['indented', 'markup']);
    markup = results.markup;
    expect(trimmedResults).toEqual(output);
  });

  test(`[${language}] SYNTAX LOGIC for DOM NODE with ${scope}`, () => {
    const wrapper = shallow(
      <JSONInput
        locale={ locale }
      />,
      { attachTo: window.domNode }
    );
    const results = wrapper.instance().tokenize(createElementFromHTML(markup));
    const trimmedResults = trimMarkupBasedResults(results);
    const trimmeOutput = removeKeys(output, ['depth', 'value']);
    if (results.error) {
      console.log({
        error: results.error
      });
    }
    expect(trimmedResults).toEqual(trimmeOutput);
  });
}

export default testSyntaxLogic;
