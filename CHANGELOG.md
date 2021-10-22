# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.5.13] - 2020-10-15
### Fix
- Re-published project to fix import issue introduced on version `2.5.10`. @andrewredican

## [2.5.12] - 2020-10-15 - DO NOT USE

## [2.5.11] - 2020-10-12
### Added
- onBlur property. @tonynguyenit18.

## [2.5.10] - 2020-08-25
### Added
- Custom errors can now be displayed on editor from props. @rm-hull.

### Changed
- Newline is now accepted in strings @terencehuynh.

## [2.5.9] - 2018-12-08
### Added
- EsLint added to project @JustFly1984.

## [2.5.8] - 2018-10-13
### Added
- Japanese translation for warnings @Adityaperiwal.
- Tamil translation for warnings @vasind.

## [2.5.7] - 2018-10-10
### Added
- Hindi translation for warnings @shehbazjafri.

### Changed
- `id` property is no longer mandatory @PatrickSachs.
- Project is now server-side rendering/testing friendly @PatrickSachs.

## [2.5.6] - 2018-10-07
### Added
- Reset option @AndrewRedican.
- Russian translation for warnings @askesis.
- French translation for warnings @cbonaudo.
- Bahasa Indonesia translation for warnings @radityasurya.

### Fixed
- Issue where component did not compare new and previous `placeholder` object correctly. 

## [2.5.5] - 2018-09-19
### Added
- Simplified Chinese translation for warnings @ADirtyCat.
- Missing Portuguese terms translation for warnings @AllanKDeveloper.
- Specfic backslash-related incorrect syntax warning @AndrewRedican.

## [2.5.4] - 2018-09-06
### Added
- Additional terms for locale support, and spanish translation @AndrewRedican.
- Portuguese translation for warnings @AllanKDeveloper.
- IE 11 Support @PatrickSachs @AndrewRedican.

### Fixed
- Pressing the "Tab" key in the editor no longer switches focus @PatrickSachs @ankitr.
- Text can now be copied in `viewOnly` mode @rickbrunstedt.
- Correct line is now provided for incomplete property/value assignment warning @AndrewRedican.

## [2.5.3] - 2018-08-13
### Added
- `@babel/runtime` as dependency @PatrickSachs.

## [2.5.2] - 2018-08-04
### Changed
- Switched build system from webpack to babel @PatrickSachs.
- Overhauled test structure & system @AndrewRedican.
- `locale` import statement made shorter @PatrickSachs.

### Added
- New build output: `/build/es` using the latest ES features @PatrickSachs.
- New syntax logic tests @AndrewRedican.
- New locale tests @PatrickSachs.

## [2.5.1] - 2018-07-27
### Changed
- Documentation and example/src/index.js with correct locale import statement @AndrewRedican.

## [2.5.0] - 2018-07-26
### Added
- CHANGELOG.md @AndrewRedican.
- Locale Support System @PatrickSachs.
- German translation for warnings @PatrickSachs.
- Spanish translation for warnings @AndrewRedican.
- Contributors list @AndrewRedican.

### Changed
- Some original warning texts in English @PatrickSachs.

### Fixed
- React depency module casing warning due to webpack's bundle configuation of external peer dependencies @AndrewRedican.

## [2.4.9] - 2018-07-24
### Added
- `modifyErrorText` property to customize warnings @AndrewRedican.

### Fixed
- Shorthand properties `width` and `height` not properly working with percentages @AndrewRedican.

...

## [2.3.3] - 2018-05-25
### Added
- Re-render on KeyPress feature @AndrewRedican.

## [2.2.2] - 2018-05-14
### Added
- Added more customization options @AndrewRedican.

## [2.0.3] - 2018-05-09
### Added
- New logic for syntax recognition and rendering by @AndrewRedican.