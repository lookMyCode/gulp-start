export function HTMLElementById(id: string) {
  return (target: any, propertyKey: string) => {
    target[propertyKey] = document.getElementById(id);
  }
}