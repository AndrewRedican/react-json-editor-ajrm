// DomNode

interface QuarkToken {
  string: 'string'|'number'|'symbol'|'space'|'delimiter';
  type: string;
}
export declare function quarkize(text: string, prefix: string): Array<QuarkToken>;
export {};
