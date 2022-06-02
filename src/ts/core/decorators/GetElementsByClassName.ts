export function HTMLElementsByClassName(className: string) {
  return (target: any, propertyKey: string) => {
    target[propertyKey] = [...document.getElementsByClassName(className)];
  }
}