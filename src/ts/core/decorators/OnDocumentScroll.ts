export function OnDocumentScroll() {
  return (target: any, propertyName: string, descriptor: PropertyDescriptor) => {
    document.addEventListener('scroll', e => {
      target[propertyName].call(target, e);
    });
  }
}