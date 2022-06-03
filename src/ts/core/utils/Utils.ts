import { RealType } from "../../libs/RealType.js";


export class Utils {
  static objectToQueryString(obj: any) {
    if (!RealType.isObject(obj)) throw new Error('Parametr "obj" must have the object type');
      
    return Object.entries(obj)
      .map(row => row.map((col: any) => {
        try {
          return col?.trim() || ''
        } catch (_) {
          return col;
        }
      }))
      .map(row => {
        if (RealType.isObject(row[1]) || RealType.isArray(row[1])) {
          row[1] = JSON.stringify(row[1]);
        }

        return row;
      })
      .map(row => `${row[0]}=${row[1]}`)
      .join('&');
  }

  static queryStringToObject(queryStr: string) {
    queryStr = queryStr.charAt(0) === '?' ? queryStr.substring(1) : queryStr;
    const entries = queryStr
      .split('&')
      .map(row => row.split('='))
      .filter(row => !!row[0]);

    return Object.fromEntries(entries);
  }

  static getEventPath(e: Event & {path: HTMLElement[]}) {
    try {
      if (e?.path?.length) return [...e.path];

      const path = e.composedPath();
      if (!path?.length) return [];
      return path;
    } catch (_) {
      return [];
    }
  }

  static closest(e: Event, selector: string) {
    if (!selector) return null;
    
    const typeSymbol = selector.charAt(0);
    const selectorName = selector.substring(1);

    let fn = (_: any) => {};

    if (typeSymbol === '.') {
      fn = x => {
        if (x.classList?.contains(selectorName)) return true;
        return false;
      }
    } else if (typeSymbol === '#') {
      fn = x => {
        if (x?.id === selectorName) return true;
        return false;
      }
    } else {
      fn = x => {
        if (x?.tagName === selector) return true;
        return false;
      }
    }
    
    const path = this.getEventPath(e as any);
    const elem = path.find(fn);

    return elem || null;
  }
}