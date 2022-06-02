export function AddEventListener(eventType: keyof HTMLElementEventMap, methodName: string) {
  return (target: any, propertyKey: string) => {
    if (!Array.isArray(target[propertyKey])) {
      target[propertyKey].addEventListener(eventType, target[methodName].bind(target));
    } else {
      target[propertyKey].forEach((elem: HTMLElement) => {
        elem.addEventListener(eventType, target[methodName].bind(target));
      });
    }
  }
}