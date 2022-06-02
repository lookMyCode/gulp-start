export function OnWindowLoad() {
  return (target: any, propertyName: string, descriptor: PropertyDescriptor) => {
    window.addEventListener('load', target[propertyName].call(target));
  }
}