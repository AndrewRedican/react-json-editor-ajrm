import * as localeSystem from "../../src/locale";

function run() {
  test('Formatting with all arguments present and used', () => {
    const string = 'The {adjective} {color} {animal} jumps over the lazy dog.';
    const result = localeSystem.format(string, {
      adjective: 'smart',
      color: 'blue',
      animal: 'cat'
    });
    expect(result).toEqual("The smart blue cat jumps over the lazy dog.")
  });

  test('Formatting with some arguments used twice', () => {
    const string = 'The {adjective} {color} {animal} jumps over the {adjective} dog.';
    const result = localeSystem.format(string, {
      adjective: 'smart',
      color: 'blue',
      animal: 'cat'
    });
    expect(result).toEqual("The smart blue cat jumps over the smart dog.")
  });

  test('Formatting with some arguments not used', () => {
    const string = 'The {adjective} brown {animal} jumps over the lazy dog.';
    const result = localeSystem.format(string, {
      adjective: 'smart',
      color: 'blue',
      animal: 'cat'
    });
    expect(result).toEqual("The smart brown cat jumps over the lazy dog.")
  });

  test('Formatting with some arguments missing', () => {
    const string = 'The {adjective} {color} {animal} jumps over the lazy dog.';
    const result = localeSystem.format(string, {
      adjective: 'smart',
      color: 'blue'
    });
    expect(result).toEqual("The smart blue {animal} jumps over the lazy dog.")
  });

  test('Formatting with some arguments having different casing', () => {
    const string = 'The {aDjecTIVe} {Color} {animal} jumps over the lazy dog.';
    const result = localeSystem.format(string, {
      AdJECtivE: 'smart',
      color: 'blue',
      Animal: 'cat'
    });
    expect(result).toEqual("The smart blue cat jumps over the lazy dog.")
  });
}

export default run;