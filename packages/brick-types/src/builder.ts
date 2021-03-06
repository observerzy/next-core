import { ContextConf } from "./manifest";

/** @internal */
export type BuilderRouteOrBrickNode =
  | BuilderBrickNode
  | BuilderRouteNode
  | BuilderCustomTemplateNode;

/** @internal */
export interface BuilderBaseNode {
  parent?: BuilderBaseNode[];
  children?: BuilderRouteOrBrickNode[];
  id: string;
  instanceId?: string;
  mountPoint?: string;
  alias?: string;
  [key: string]: unknown;
}

/** @internal */
export interface BuilderRouteNode extends BuilderBaseNode {
  type: "bricks" | "routes" | "redirect";
  path: string;
  menu?: string;
  providers?: string;
  segues?: string;
  defineResolves?: string;
  redirect?: string;
  context?: ContextConf[];
}

/** @internal */
export interface BuilderBrickNode extends BuilderBaseNode {
  type: "brick" | "provider" | "template";
  brick: string;
  properties?: string;
  events?: string;
  bg?: boolean;
  portal?: boolean;
  context?: ContextConf[];
}

/** @internal */
export interface BuilderCustomTemplateNode extends BuilderBaseNode {
  type: "custom-template";
  templateId: string;
  proxy?: string;
}
