import React     from "react";
import JSONInput from './src/index';



/**
 * Avoid Warning: render(): Rendering components directly into document.body is discouraged.
 */
beforeAll(() => {
    const div = document.createElement('div');
    window.domNode = div;
    document.body.appendChild(div);
});

/**
 * Render Component and Attach to DOM
 */
test('Basic Component Render', () => {
    let wrapper = mount(
        <JSONInput test id = 'unique_string'/>,
        { attachTo: window.domNode }
    );
    expect(wrapper).toMatchSnapshot();
});

/**
 * CORE TESTS TO ADD:
 * 
 * 1. Test successful render on use of all component propertiies
 * 2. Pass common valid javascript object to placeholder property
 * 3. Pass rare valid javascript object top placeholder property. Shound include:
 *      + Quotes on key names and values
 *      + Other non-alphanumeical characters on key names
 *      + Html markup on key names and values
 * 4. Test error messages are displayed correctly
 * 5. Test user-triggered events
 * 6. Test onChange results for different sets of data
 */