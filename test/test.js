import renderTest from './render';
import logicTest from './logic';
import changeTest from './change';

beforeAll(() => {
  const div = document.createElement('div');
  window.domNode = div;
  document.body.appendChild(div);
});

renderTest();
logicTest();
changeTest();