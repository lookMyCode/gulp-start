export function ForRender(initValue?: any) {
  return (target: any, propertyKey: string) => {
    window.addEventListener('load', () => {
      if (!target[propertyKey]) {
        target[propertyKey] = {value: initValue};
      }

      if (!target[propertyKey] || typeof(target[propertyKey]) !== 'object') throw new Error('Property must be an object!');

      target[propertyKey] = new Proxy(target[propertyKey], {
        set(t: any, p: string, v: any, r: any): boolean {
          if (p !== 'value') return false;
          t[p] = v;
          target.__methodsToRender.forEach((m: Function) => m.call(target));
          return true;
        },
        get(t: any, p: string, r: any): number | undefined {
          if (p !== 'value') return undefined;
          return t[p];
        }
      });
    });
  }
}