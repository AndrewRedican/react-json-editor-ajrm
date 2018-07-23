import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter                            from 'enzyme-adapter-react-16';
import { JSDOM }                          from 'jsdom';


Enzyme.configure({ adapter: new Adapter() });

const { window } = new JSDOM('<!DOCTYPE html><html><body><div id="app"></div></body></html>');

global.shallow  = shallow;
global.render   = render;
global.mount    = mount;
global.window   = window;
global.document = window.document;