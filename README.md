**Warning:** 

As you may already know, the react-json-editor-ajrm's orignal project is not actively maintained and that
it will eventually be deprecated. So I've decided to set an official date for deprecation. The tentative date for this is June 15, 2023.

### What does deprecation mean?
- It means the Github project will be archived as read only.
- It means the npm packages will appear deprecated, but it **WILL NOT be deleted**.
- It means the new project will be available officially on that date.

I would like to thank those who used it in their projects and those who have contributed in some way to the project. I simply no longer wish to maintain this project. It was made in the early days of my software engineer career, and it has not caught up to today's standards nor mine.

But don't fret. I intend to breathe new life into this project rewriting it from the ground up.

I would like to take the learnings of the past, and avoid some of the issues react-json-editor-ajrm currently has. I would also like to highlight the things done well, and I wish to carry on.

I've setup home for this new project here [enio](https://github.com/enio-ireland/enio).
I've also set up a [discussion here](https://github.com/enio-ireland/enio/discussions/62) if you have any questions or comments.

<br>

# react-json-editor-ajrm

![npm](https://img.shields.io/npm/v/react-json-editor-ajrm.svg) ![Build Status](https://travis-ci.com/AndrewRedican/react-json-editor-ajrm.svg?branch=master) ![npm](https://img.shields.io/npm/dm/react-json-editor-ajrm.svg) [![Known Vulnerabilities](https://snyk.io/test/github/AndrewRedican/react-json-editor-ajrm/badge.svg)](https://snyk.io/test/github/{username}/{repo}) [![All Contributors](https://img.shields.io/badge/all_contributors-15-orange.svg?style=flat-square)](#contributors)

<p align="center"><img src=https://i.imgur.com/ewtebIW.gif><br /><br />A stylish, editor-like, modular, react component for viewing, editing, and debugging javascript object syntax!</p>

## Installing Dependency

- Using node package manager:

```
   $ npm i --save react-json-editor-ajrm
```

## How to Use

```
    import JSONInput from 'react-json-editor-ajrm';
    import locale    from 'react-json-editor-ajrm/locale/en';

    <JSONInput
        id          = 'a_unique_id'
        placeholder = { sampleObject }
        colors      = { darktheme }
        locale      = { locale }
        height      = '550px'
    />
```

*Hint*: There are two different root paths: `react-json-editor-ajrm` and `react-json-editor-ajrm/es`. The first contains polyfilled ES5 code, the second unpolyfilled ES6. The `react-json-editor-ajrm/es` version is **not compatible** with [`create-react-app`](https://github.com/facebook/create-react-app). If you are unsure of which one you need/want, pick the first - it has the best compatibility with tools and browsers.

## Examples

The `./examples` folder contains two examples:

1. webpack-project - A basic example without much overload
2. create-react-app-project - A small example using the create-react-app template

## Testing right away!

1. Fork and/or clone this Github repository
2. Go to an example project under [react-json-editor-ajrm/example](https://github.com/AndrewRedican/react-json-editor-ajrm/tree/master/example):

```
    $ cd path/to/repo/react-json-editor-ajrm/example/webpack-project
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

## Latest Spotlight Release Notes [v2.5.12] - October 15, 2020

1. Fixed [import issue](https://github.com/AndrewRedican/react-json-editor-ajrm/issues/140).

## Upcoming Features

1. Bug fixes.

## Features

1. Write as if you are in a text editor.
2. Checks for syntax mistakes and provides feedback; Custom errors can also be overlaid on the editor.
3. You can customize color palette as you please.
4. Accepts a javascript object in `placeholder` property to display after component mounts.
5. For any valid textContent, calculates and makes available in this.state as plain text, markup text, and javascript object.
6. Locale support for `English`, `German`, `Spanish`, `Chinese`, `French`, `Indonesian`, `Russian`, `Hindi`, `Japanese` and `Tamil`.

## Component Properties

| Name                          | Description                                                                                                                                                                                                                                                                                     |   Type   | Required  |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------: | :-------: |
| [locale]()                    | The locale of your editor. Import locales like this: `import locale from 'react-json-editor-ajrm/locale/en'`. [Learn More](https://github.com/AndrewRedican/react-json-editor-ajrm/wiki/Locale-Support)                                                                    |  object  | Mandatory |
| [id]()                        | An optional `id` to assign to the actual text input DOM node. Asides the from the text input, the following nodes will also receive an id: `{id}-outer-box`, `{id}-container`, `{id}-warning-box`, `{id}-labels`                                                                             |  string  | Optional  |
| [placeholder]()               | Send a valid javascript object to be shown once the component is mounted. Assign a different value to have the component's initial content re-rendered.                                                                                                                                     |  object  | Optional  |
| [reset]()                     | Send `true` to have component always re-render or 'reset' to the value provided on the `placeholder` property.                                                                                                                                                                                  |  boolean | Optional  |
| [viewOnly]()                  | Send `true` if you would like for content shown not to be editable.                                                                                                                                                                                                                             | boolean  | Optional  |
| [onChange]()                  | Whenever `onKeyPress` event take place, it will return content values.                                                                                                                                                                                                                          |  object  | Optional  |
| [onBlur]()                    | Whenever `onBlur` event take place, it will return content values.                                                                                                                                                                                                                              |  object  | Optional  |
| [confirmGood]()               | Send `false` if you would like for the checkmark to confirm good syntax to be hidden.                                                                                                                                                                                                           | boolean  | Optional  |
| [height]()                    | A shorthand property to set a specific height for the entire component.                                                                                                                                                                                                                         |  string  | Optional  |
| [width]()                     | A shorthand property to set a specific width for the entire component.                                                                                                                                                                                                                          |  string  | Optional  |
| [onKeyPressUpdate]()          | Send `false` if you would like for component not to automatically update on key press.                                                                                                                                                                                                          | boolean  | Optional  |
| [waitAfterKeyPress]()         | Amount of milliseconds to wait before re-rendering content after keypress. Value defaults to `1000` when not specified. In other words, component will update if there is no additional keystroke after the last one within 1 second. Less than `100` milliseconds does not makes a difference. |  number  | Optional  |
| [modifyErrorText]()           | A custom function to modify the component's original warning text. This function will receive a single parameter of type `string` and must equally return a `string`.                                                                                                                           | function | Optional  |
| [error]()                     | **Contains the following properties:**                                                                                                                                                                                                                                                          |  object  | Optional  |
| error.[reason]()              | A string containing a custom error messsage                                                                                                                                                                                                                                                     |  string  | Optional  |
| error.[line]()                | A number indicating the line number related to the custom error message                                                                                                                                                                                                                         |  number  | Optional  |
| [theme]()                     | Specify which [built-in theme](https://github.com/AndrewRedican/react-json-editor-ajrm/wiki/Built-In-Themes) to use.                                                                                                                                                                            |  string  | Optional  |
| [colors]()                    | **Contains the following properties:**                                                                                                                                                                                                                                                          |  object  | Optional  |
| colors.[default]()            | Hex color code for any symbols, like curly `braces`, and `comma`.                                                                                                                                                                                                                               |  string  | Optional  |
| colors.[string]()             | Hex color code for tokens identified as `string` values.                                                                                                                                                                                                                                        |  string  | Optional  |
| colors.[number]()             | Hex color code for tokens identified as `integeter`, `double`, or `float` values.                                                                                                                                                                                                               |  string  | Optional  |
| colors.[colon]()              | Hex color code for tokens identified as `colon`.                                                                                                                                                                                                                                                |  string  | Optional  |
| colors.[keys]()               | Hex color code for tokens identified as `keys` or property names.                                                                                                                                                                                                                               |  string  | Optional  |
| colors.[keys_whiteSpace]()    | Hex color code for tokens identified as `keys` wrapped in quotes.                                                                                                                                                                                                                               |  string  | Optional  |
| colors.[primitive]()          | Hex color code for tokens identified as `boolean` values and null.                                                                                                                                                                                                                              |  string  | Optional  |
| colors.[error]()              | Hex color code for tokens marked with an `error` tag.                                                                                                                                                                                                                                           |  string  | Optional  |
| colors.[background]()         | Hex color code for component's background.                                                                                                                                                                                                                                                      |  string  | Optional  |
| colors.[background_warning]() | Hex color code for warning message displaying at the top in component.                                                                                                                                                                                                                          |  string  | Optional  |
| [style]()                     | **Contains the following properties:**                                                                                                                                                                                                                                                          |  object  | Optional  |
| style.[outerBox]()            | Property to modify the default style of the outside container div of component.                                                                                                                                                                                                                 |  object  | Optional  |
| style.[container]()           | Property to modify the default style of the `container` of component.                                                                                                                                                                                                                           |  object  | Optional  |
| style.[warningBox]()          | Property to modify the default style of the container div of the warning message.                                                                                                                                                                                                               |  object  | Optional  |
| style.[errorMessage]()        | Property to modify the default style of the warning message.                                                                                                                                                                                                                                    |  object  | Optional  |
| style.[body]()                | Property to modify the default style of the container div of row labels and code.                                                                                                                                                                                                               |  object  | Optional  |
| style.[labelColumn]()         | Property to modify the default style of the container div of row labels.                                                                                                                                                                                                                        |  object  | Optional  |
| style.[labels]()              | Property to modify the default style of each row label.                                                                                                                                                                                                                                         |  object  | Optional  |
| style.[contentBox]()          | Property to modify the default style of the container div of the code.                                                                                                                                                                                                                          |  object  | Optional  |

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

## Content Values

Whenever RJEA re-renders its content, any function passed onto `onChange` property will receive a single object parameter with the following keys and values:

| Key        | Description                                                                                                                                                                                           |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| plainText  | A string representation of then content which includes linebreaks and indentation. Great to console.log()                                                                                             |
| markupText | A string representation of the auto-generated markup used to render content.                                                                                                                          |
| json       | A JSON.stringify version of content.                                                                                                                                                                  |
| jsObject   | A `javascript object` version of content. Will return `undefined` if the content's syntax is incorrect.                                                                                               |
| lines      | Number of lines rendered for content to be displayed.                                                                                                                                                 |
| error      | Returns `false` unless the content's syntax is incorrect, in which case returns an object with a `token` and a `line` number which corresponds to the location at which error occurred and a `reason` |

## Built-In Themes

RJEA supports built-in theme. Here is the [list](https://github.com/AndrewRedican/react-json-editor-ajrm/wiki/Built-In-Themes).

## Built With

- [**React.js**](https://reactjs.org/)
- [**Babel.js**](https://babeljs.io/) for transpiling.
- [**Enzyme**](http://airbnb.io/enzyme/) for react-specific testing utilities.
- [**Jest**](https://jestjs.io/docs/en/tutorial-react) for unit testing, also react-specific tests.
- [**Travis CI**](https://travis-ci.org/) for continuous integration.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Contributors

Thanks goes to these wonderful people :smile::

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/AndrewRedican"><img src="https://avatars2.githubusercontent.com/u/24832471?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Andrew Redican</b></sub></a><br /><a href="#talk-AndrewRedican" title="Talks">📢</a> <a href="https://github.com/AndrewRedican/react-json-editor-ajrm/commits?author=AndrewRedican" title="Code">💻</a> <a href="#translation-AndrewRedican" title="Translation">🌍</a> <a href="https://github.com/AndrewRedican/react-json-editor-ajrm/commits?author=AndrewRedican" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://patrick-sachs.de/"><img src="https://avatars3.githubusercontent.com/u/7840502?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Patrick Sachs</b></sub></a><br /><a href="https://github.com/AndrewRedican/react-json-editor-ajrm/commits?author=PatrickSachs" title="Code">💻</a> <a href="#translation-PatrickSachs" title="Translation">🌍</a> <a href="https://github.com/AndrewRedican/react-json-editor-ajrm/commits?author=PatrickSachs" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://allankehl.com"><img src="https://avatars3.githubusercontent.com/u/37770361?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Allan Kehl</b></sub></a><br /><a href="#translation-AllanKDeveloper" title="Translation">🌍</a></td>
    <td align="center"><a href="https://github.com/esbenvb"><img src="https://avatars3.githubusercontent.com/u/426051?v=4?s=100" width="100px;" alt=""/><br /><sub><b>esbenvb</b></sub></a><br /><a href="https://github.com/AndrewRedican/react-json-editor-ajrm/commits?author=esbenvb" title="Documentation">📖</a></td>
    <td align="center"><a href="http://markus-petrykowski.de"><img src="https://avatars2.githubusercontent.com/u/5831420?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Markus Petrykowski</b></sub></a><br /><a href="#example-PetrykowskiM" title="Examples">💡</a></td>
    <td align="center"><a href="https://github.com/rickbrunstedt"><img src="https://avatars0.githubusercontent.com/u/5797143?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Rick Brunstedt</b></sub></a><br /><a href="https://github.com/AndrewRedican/react-json-editor-ajrm/commits?author=rickbrunstedt" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/ADirtyCat"><img src="https://avatars3.githubusercontent.com/u/20251640?v=4?s=100" width="100px;" alt=""/><br /><sub><b>ADirtyCat</b></sub></a><br /><a href="#translation-ADirtyCat" title="Translation">🌍</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/cbonaudo"><img src="https://avatars0.githubusercontent.com/u/13097851?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Cédric</b></sub></a><br /><a href="#translation-cbonaudo" title="Translation">🌍</a></td>
    <td align="center"><a href="http://radityasurya.com"><img src="https://avatars3.githubusercontent.com/u/6660141?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Radit</b></sub></a><br /><a href="#translation-radityasurya" title="Translation">🌍</a></td>
    <td align="center"><a href="https://github.com/askesis"><img src="https://avatars2.githubusercontent.com/u/23220242?v=4?s=100" width="100px;" alt=""/><br /><sub><b>asketes</b></sub></a><br /><a href="#translation-askesis" title="Translation">🌍</a></td>
    <td align="center"><a href="https://github.com/cgvedant"><img src="https://avatars2.githubusercontent.com/u/40763859?v=4?s=100" width="100px;" alt=""/><br /><sub><b>C.G.Vedant</b></sub></a><br /><a href="#ideas-cgvedant" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/shehbazjafri"><img src="https://avatars2.githubusercontent.com/u/19728508?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Shehbaz Jafri</b></sub></a><br /><a href="#translation-shehbazjafri" title="Translation">🌍</a></td>
    <td align="center"><a href="https://www.linkedin.com/in/vasanthakumarbe"><img src="https://avatars0.githubusercontent.com/u/5652920?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Vasantha Kumar R B</b></sub></a><br /><a href="#translation-vasind" title="Translation">🌍</a></td>
    <td align="center"><a href="https://github.com/Adityaperiwal"><img src="https://avatars1.githubusercontent.com/u/35131225?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Aditya Periwal</b></sub></a><br /><a href="#translation-Adityaperiwal" title="Translation">🌍</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/JustFly1984"><img src="https://avatars3.githubusercontent.com/u/2255993?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Alexey Lyakhov</b></sub></a><br /><a href="https://github.com/AndrewRedican/react-json-editor-ajrm/commits?author=JustFly1984" title="Code">💻</a></td>
    <td align="center"><a href="http://terencehuynh.com/"><img src="https://avatars1.githubusercontent.com/u/1747517?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Terence Huynh</b></sub></a><br /><a href="https://github.com/AndrewRedican/react-json-editor-ajrm/commits?author=terencehuynh" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/rm-hull"><img src="https://avatars3.githubusercontent.com/u/1915543?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Richard Hull</b></sub></a><br /><a href="https://github.com/AndrewRedican/react-json-editor-ajrm/commits?author=rm-hull" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/tonynguyenit18"><img src="https://avatars2.githubusercontent.com/u/37351890?v=4?s=100" width="100px;" alt=""/><br /><sub><b>tonynguyenit18</b></sub></a><br /><a href="https://github.com/AndrewRedican/react-json-editor-ajrm/commits?author=tonynguyenit18" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!
