// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import registerServiceWorker from './registerServiceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();

import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.css";

// todo: use the imported version in prod, source in dev.
/**
 * Import RJEA component
 */

//Using distribution version in node_modules
//import JSONInput  from 'react-json-editor-ajrm';
//import locale     from 'react-json-editor-ajrm/locale/en';

//Using distribution version from project
//import JSONInput  from '../../dist';
//import locale     from '../../dist/locale/en';

//Using source code
import JSONInput from "react-json-editor-ajrm/index";
import locale from "react-json-editor-ajrm/locale/en";

/**
 * Import some data. This is a sample object, which will be passed down to JSONInput placeholder properperties.
 * You can use placeholder to show data once, after component has mounted.
 */
import sampleData from "./sampledata";

class App extends Component {
  render() {
    /**
     * Rendering this JSONInput component with some properties
     */
    return (
      <div style={{ maxWidth: "1400px", maxHeight: "100%" }}>
        <JSONInput
          placeholder={sampleData} // data to display
          theme="light_mitsuketa_tribute"
          locale={locale}
          colors={{
            string: "#DAA520" // overrides theme colors with whatever color value you want
          }}
          height="550px"
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
