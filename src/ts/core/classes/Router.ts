import { IQueryParams } from './../models/interfaces.js';
import { RealType } from "../../libs/RealType.js";
import { IRouterNavigateParams } from "../models/interfaces.js";
import { Utils } from "../utils/Utils.js";

export class Router {
  private static subscribeQPCbs: Function[] = [];

  static navigate(path: string | string[], params: IRouterNavigateParams = {}) {
    if (RealType.isArray(path)) {
      path = (path as string[]).join('/');
    }

    path = (path as string).charAt(0) === '/' ? path : '/' + path;
    path = (path as string).split('?')[0];
    params.qp = params.qp || {};
    const {qp} = params;
    
    if (Object.keys(qp).length) {
      const qpStr = Utils.objectToQueryString(qp);
      path = path + '?' + qpStr;
    }

    location.href = path;
  }

  static parseQP() {
    const qpStr = location.search;
    return Utils.queryStringToObject(qpStr);
  }

  static search(qp: any) {
    const str = Utils.objectToQueryString(qp);
    location.search = '?' + str;
  }

  static pushQP(qp: IQueryParams) {
    history.pushState({}, null as unknown as string, '?' + Utils.objectToQueryString(qp));
    this.subscribeQPCbs.forEach((cb: Function) => cb.call(null, this.parseQP()));
  }

  static subscribeQP(cb: Function) {
    this.subscribeQPCbs.push(cb);
    cb.call(null, this.parseQP());
  }

  static getLocation(): Location {
    return window.location;
  }

  static getLocationPathname(): string {
    return this.getLocation().pathname;
  }
}
