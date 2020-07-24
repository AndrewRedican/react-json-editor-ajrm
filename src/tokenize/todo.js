// DomNode
function pushAndStore(buffer, char, type, prefix = '') {
  switch (type) {
    case 'symbol':
    case 'delimiter':
      if (buffer.active) {
        buffer.quarks.push({
          string: buffer[buffer.active],
          type: `${prefix}-${buffer.active}`
        });
      }
      buffer[buffer.active] = '';
      buffer.active = type;
      buffer[buffer.active] = char;
      break;
    default:
      if (type !== buffer.active || [buffer.string, char].includes('\n')) {
        if (buffer.active) {
          buffer.quarks.push({
            string: buffer[buffer.active],
            type: `${prefix}-${buffer.active}`
          });
        }
        buffer[buffer.active] = '';
        buffer.active = type;
        buffer[buffer.active] = char;
      } else {
        buffer[type] += char;
      }
  }
}

function quarkize(text, prefix = '') {
  const buffer = {
    active: false,
    string: '',
    number: '',
    symbol: '',
    space: '',
    delimiter: '',
    quarks: []
  };

  text.split('').forEach((char, i) => {
    switch (char) {
      case '"':
      case "'":
        pushAndStore(buffer, char, 'delimiter', prefix);
        break;
      case ' ':
      case '\u00A0':
        pushAndStore(buffer, char, 'space', prefix);
        break;
      case '{':
      case '}':
      case '[':
      case ']':
      case ':':
      case ',':
        pushAndStore(buffer, char, 'symbol', prefix);
        break;
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        pushAndStore(buffer, char, buffer.active === 'string' ? 'string' : 'number', prefix);
        break;
      case '-':
        if (i < text.length - 1 && '0123456789'.includes(text.charAt(i + 1))) {
          pushAndStore(buffer, char, 'number', prefix);
          break;
        }
      case '.':
        if (i < text.length - 1 && i > 0 && '0123456789'.includes(text.charAt(i + 1)) && '0123456789'.includes(text.charAt(i - 1))) {
          pushAndStore(buffer, char, 'number', prefix);
          break;
        }
      default:
        pushAndStore(buffer, char, 'string', prefix);
    }
  });

  if (buffer.active) {
    buffer.quarks.push({
      string: buffer[buffer.active],
      type: `${prefix}-${buffer.active}`
    });
    buffer[buffer.active] = '';
    buffer.active = false;
  }
  return buffer.quarks;
}

export {
  pushAndStore,
  quarkize
};