# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Added
- Portuguese translation for warnings @AllanKDeveloper.
- Pressing the "Tab" key in the editor no longer switches focus @PatrickSachs @ankitr.

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