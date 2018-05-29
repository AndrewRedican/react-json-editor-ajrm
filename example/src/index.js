import React, { Component } from 'react';
import ReactDOM             from 'react-dom';

/** 
 * Import JSONInput component
 */
import JSONInput          from 'react-json-editor-ajrm'; // Using distribution version in node_modules 
//import JSONInput          from '../../src/index'; // Use source code

/**
 * Import some data. This is a sample object, which will be passed down to JSONInput component properperties.
 * You can use placeholder to show data once, after component has mounted.
 */
import sampleData           from './sampledata';


class App extends Component {
    constructor (props) { 
        super(props);
    } 
    render() {
        /**
         * Rendeing this JSONInput component with some properties
         */
        return(
            <div style = {{ maxWidth: '1400px', maxHeight: '100%' }} >
                <JSONInput
                    id          = 'unique_string' //an id is required
                    placeholder = {sampleData}    //data to display
                    theme       = 'light_mitsuketa_tribute'
                    colors      = {{
                        string : '#DAA520' // overrides a string's theme color with whatever color value you want
                    }}
                    height      = '550px'
                />
            </div>
        );
    }
}

ReactDOM.render(<App/>, document.querySelector('#app'));