import React, { Component } from 'react';
import ReactDOM             from 'react-dom';

/** 
 * Import JSONInput component
 */
import JSONInput            from 'react-json-editor-ajrm';

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
         * If no colors property is passed to this component, it'll use
         * this darkTheme as default color pallette.
         * (Which by the way, iy looks a lot like VSCode dark theme, I am a big fan!)
         */
        const darkTheme = {
            default            : '#D4D4D4',
            background         : '#1E1E1E',
            background_warning : '#1E1E1E',
            string             : '#CE8453',
            number             : '#B5CE9F',
            colon              : '#49B8F7',
            keys               : '#9CDCFE',
            keys_whiteSpace    : '#AF74A5',
            primitive          : '#6392C6'
        };

        /**
         * Another "light" theme that you can use.
         * Basically you can create your own theme that fits your style.
         */
        const lightTheme = {
            default            : '#D4D4D4',
            background         : '#E3E9EA1A',
            background_warning : '#f443361A',
            string             : '#FA7921',
            number             : '#70CE35',
            colon              : '#49B8F7',
            keys               : '#59A5D8',
            keys_whiteSpace    : '#835FB6',
            primitive          : '#386FA4'
        };
        
        /**
         * Rendeing this JSONInput component with some properties
         */
        return(
            <div style = {{ maxWidth: '1400px', maxHeight: '100%' }} >
                <JSONInput
                    id          = {'uniqueString-jsonInut'}
                    placeholder = { sampleData }
                    colors      = { darkTheme }
                    height      = '550px'
                />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.querySelector('#app'));