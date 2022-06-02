export interface IConfig {
  componentName: string
}

export interface IForRenderProxy {
  [className: string]: {
    [key: string]: any
  }
}

export type ObjectForRender<T> = {
  value: T
}