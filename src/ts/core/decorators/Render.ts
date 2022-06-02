export function Render() {
  return (target: any, propertyName: string, descriptor: PropertyDescriptor) => {
    if (!target.__methodsToRender) {
      target.__methodsToRender = [];
    }

    if (!target.__render) {
      target.__render = () => {
        target.__methodsToRender.forEach((m: Function) => m.call(target));
      }
    }
    
    target.__methodsToRender.push(target[propertyName].bind(target));
  }
}