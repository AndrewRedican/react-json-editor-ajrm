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
2. Go to [footFolder/example/](https://github.com/AndrewRedican/react-json-editor-ajrm/tree/master/example):
```
    $ cd path/to/repo/example
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


## Latest Release Notes - May 8, 2018
1. Enhanced validations and information.
2. Previous issue where the content format changed to due errors in syntax, has been fixed.
3. Includes additional properties to further customize component.
4. Version 2.0.0, contains a do-over of logic core mechanics. It is advised to update this dependency as soon as possible.
5. Component now contains some subtle transitions effects based on the syntax's status.
6. New light theme included in example files. Enjoy!

## Features

1. Write as if you are in a text editor.
2. Checks for syntax mistakes and provides feedback.
3. You can customize color palette as you please.
4. Accepts a javascript object in props.placeholder to display after component mounts. 
5. For any valid textContent, calculates and makes available in this.state as plain text, markup text, and javascript object.

## Component Properties

| Name   | Description | Type   | Required |
| ------ |-------------| :-----:| :-----:  |
| [id]()          | A unique id to identify component.                                                     | string  | Mandatory |
| [colors]()      | Contains the following properties to customize the color used for each data type:
                    `default`, `string`, `number`, `colon`, `keys`, `keys_whiteSpace`, `primitive`, 
                    `error`, `background`, and `background_warning`                                        | object  | Optional  |
| [confirmGood]() | Send `false` if you would like for the checkmark to confirm good syntax to be hidden.  | boolean | Optional  |
| [height]()      | Set a specific height for the entire component                                         | string  | Optional  |
| [viewOnly]()    | Send `true` if you would like for content shown not to be editable.                    | boolean | Optional  |
| [placeholder]() | Send a valid javascript object to be shown once when component is mounted              | object  | Optional  |
| [onChange]()    | Whenever `onBlur` event takes place it will return content values                      | object  | Optional  |

## Built With

* [**React.js**](https://reactjs.org/) and Vanilla Javascript [**Javascript**](https://betterexplained.com/articles/the-single-page-javascript-overview/), ES5, [**ES6**](http://es6-features.org/#Constants)

## Authors

* **Andrew Redican** [andrewredican](https://github.com/andrewredican)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.