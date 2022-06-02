export function State() {
  return (target: any, propName: string) => {
    if (!target.__methodsToRender) {
      target.__methodsToRender = [];
    }

    if (!target.__render) {
      target.__render = () => {
        target.__methodsToRender.forEach((m: Function) => m.call(target));
      }
    }

    if (!target.__initializedState) {
      target.__initializedState = new Set<string>();
    }

    target[`__${propName}`] = target[propName];
    delete target[propName];
    Object.defineProperty(target, propName, {
      get: () => {
        return target[`__${propName}`];
      },
      set: (value: any) => {
        target[`__${propName}`] = value;

        if (target.__initializedState.has(propName)) {
          target.__render.call(target);
        } else {
          target.__initializedState.add(propName);
        }
      }
    });
  }
}