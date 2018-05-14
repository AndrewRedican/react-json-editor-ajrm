# react-json-editor-ajrm

<p align="center"><img src=https://i.imgur.com/ewtebIW.gif><br /><br />A stylish, editor-like, modular, react component for viewing, editing, and debugging javascript object syntax!</p>

## Installing Dependency

* Using node package manager:

```
   $ npm i --save react-json-editor-ajrm
```

## How to Use

```
    import JSONInput from 'react-json-editor-ajrm';

    <JSONInput
        placeholder = { sampleObject }
        colors      = { darktheme }
        height      = '550px'
    />
```

## Live Demo ? Test it right away!

1. Clone or fork this Github repository
2. Go to [react-json-editor-ajrm/example/](https://github.com/AndrewRedican/react-json-editor-ajrm/tree/master/example):
```
    $ cd path/to/repo/react-json-editor-ajrm/example
```
3. Install example project dependencies:
```
    $ npm i
```
4. Serve sample website to port 8080:
```
   $ npm start
```
5. Open `http://localhost:8080` in the web browser


## Latest Release Notes [v2.2.2] - May 14, 2018
1. Fixed issues when data is pasted into component.

## Features

1. Write as if you are in a text editor.
2. Checks for syntax mistakes and provides feedback.
3. You can customize color palette as you please.
4. Accepts a javascript object in props.placeholder to display after component mounts. 
5. For any valid textContent, calculates and makes available in this.state as plain text, markup text, and javascript object.

## Component Properties

| Name   | Description | Type   | Required |
| ------ |-------------| :-----:| :-----:  |
| [id]()                        | A unique id to identify component.                                                    | string  | Mandatory |
| [placeholder]()               | Send a valid javascript object to be shown once when component is mounted             | object  | Optional  |
| [viewOnly]()                  | Send `true` if you would like for content shown not to be editable.                   | boolean | Optional  |
| [onChange]()                  | Whenever `onBlur` event takes place it will return content values                     | object  | Optional  |
| [confirmGood]()               | Send `false` if you would like for the checkmark to confirm good syntax to be hidden. | boolean | Optional  |
| [height]()                    | A shorthand property to set a specific height for the entire component                | string  | Optional  |
| [width]()                     | A shorthand property to set a specific width for the entire component                 | string  | Optional  |
| [colors]()                    | **Contains the following properties:**                                                | object  | Optional  |
| colors.[default]()            | Hex color code for any symbols, like curly `braces`, and `comma`.                     | string  | Optional  |
| colors.[string]()             | Hex color code for tokens identified as `string` values.                              | string  | Optional  |
| colors.[number]()             | Hex color code for tokens identified as `integeter`, `double`, or `float` values.     | string  | Optional  |
| colors.[colon]()              | Hex color code for tokens identified as `colon`.                                      | string  | Optional  |
| colors.[keys]()               | Hex color code for tokens identified as `keys` or property names.                     | string  | Optional  |
| colors.[keys_whiteSpace]()    | Hex color code for tokens identified as `keys` wrapped in quotes.                     | string  | Optional  |
| colors.[primitive]()          | Hex color code for tokens identified as `boolean` values and null.                    | string  | Optional  |
| colors.[error]()              | Hex color code for tokens marked with an `error` tag.                                 | string  | Optional  |
| colors.[background]()         | Hex color code for component's background.                                            | string  | Optional  |
| colors.[background_warning]() | Hex color code for warning message displaying at the top in component.                | string  | Optional  |
| [style]()                     | **Contains the following properties:**                                                | object  | Optional  |
| style.[outerBox]()            | Property to modify the default style of the outside container div of component        | string  | Optional  |
| style.[container]()           | Property to modify the default style of the `container` of component                  | string  | Optional  |
| style.[warningBox]()          | Property to modify the default style of the container div of the warning message      | string  | Optional  |
| style.[errorMessage]()        | Property to modify the default style of the warning message                           | string  | Optional  |
| style.[body]()                | Property to modify the default style of the container div of row labels and code      | string  | Optional  |
| style.[labelColumn]()         | Property to modify the default style of the container div of row labels               | string  | Optional  |
| style.[labels]()              | Property to modify the default style of each row label                                | string  | Optional  |
| style.[contentBox]()          | Property to modify the default style of the container div of the code                 | string  | Optional  |

## Component Sections

```
    outerBox
    +-- container
        +--- warningBox
             +---- errorMessage
        +--- body
             +---- labelColumn
                   +----- labels
             +---- contentBox
                   +----- auto generated markup
```

The [distribution version](https://github.com/AndrewRedican/react-json-editor-ajrm/blob/master/dist/index.js) of this component has been transpiled down to `ES5`, then `minified` and `uglified` for maximum compatability and performance.
You can check the source code here [react-json-editor-ajrm/src/](https://github.com/AndrewRedican/react-json-editor-ajrm/tree/master/src):

## Built With

* [**React.js**](https://reactjs.org/)
* [**Babel.js**](https://babeljs.io/) for transpiling
* [**Webpack**](https://webpack.js.org/) for bundling npm module.

## Authors

* **Andrew Redican** [andrewredican](https://github.com/andrewredican)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.