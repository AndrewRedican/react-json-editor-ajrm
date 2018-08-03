// Allows us to pass arrays and numbers instead of just strings to the format function.
const stringify = arg => Array.isArray(arg) ? arg.join(", ") : typeof arg === "string" ? arg : "" + arg; // Replaces a string with the values of an object. Google "format unicorn" on an explanation of how to use.


const format = (str, args) => args ? Object.keys(args).reduce((str, arg) => str.replace(new RegExp(`\\{${arg}\\}`, 'gi'), stringify(args[arg])), str) : str;

export { format };