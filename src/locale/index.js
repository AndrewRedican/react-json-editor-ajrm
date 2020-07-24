// Allows us to pass arrays and numbers instead of just strings to the format function.
function stringify(arg) {
  if (Array.isArray(arg)) {
    return arg.join(', ');
  }
  return typeof arg === 'string' ? arg : `${arg}`;
}

// Replaces a string with the values of an object. Google "format unicorn" on an explanation of how to use.
function format(str, args) {
  if (args) {
    return Object.keys(args).reduce((s, arg) => s.replace(new RegExp(`\\{${arg}\\}`, 'gi'), stringify(args[arg])), str);
  }
  return str;
}

// eslint-disable-next-line import/prefer-default-export
export { format };