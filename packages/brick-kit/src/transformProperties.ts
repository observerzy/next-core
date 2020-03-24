import { get, set } from "lodash";
import { GeneralTransform, TransformMap } from "@easyops/brick-types";
import { isObject, transform } from "@easyops/brick-utils";
import { isCookable, evaluate } from "./evaluate";

export function transformProperties(
  props: Record<string, any>,
  data: any,
  to: GeneralTransform,
  from?: string | string[]
): Record<string, any> {
  const transformedProps = preprocessTransformProperties(
    from ? get(data, from) : data,
    to
  );
  for (const [propName, propValue] of Object.entries(transformedProps)) {
    set(props, propName, propValue);
  }
  return props;
}

export function doTransform(data: any, to: any): any {
  if (typeof to === "string") {
    if (isCookable(to)) {
      return evaluate(to, { data });
    }
    return transform(to, data);
  }

  return Array.isArray(to)
    ? to.map(item => doTransform(data, item))
    : isObject(to)
    ? Object.entries(to).reduce<Record<string, any>>((acc, [k, v]) => {
        acc[k] = doTransform(data, v);
        return acc;
      }, {})
    : to;
}

function preprocessTransformProperties(
  data: any,
  to: GeneralTransform
): Record<string, any> {
  const props: Record<string, any> = {};
  if (Array.isArray(to)) {
    for (const item of to) {
      pipeableTransform(props, data, item.to, item.from, item.mapArray);
    }
  } else {
    pipeableTransform(props, data, to);
  }
  return props;
}

function pipeableTransform(
  props: Record<string, any>,
  data: any,
  to: string | TransformMap,
  from?: string | string[],
  mapArray?: boolean | "auto"
): void {
  if (!to) {
    // Do nothing if `to` is falsy.
    return;
  }

  let fromData = from ? get(data, from) : data;

  let isArray = Array.isArray(fromData);
  if (!isArray && mapArray === true) {
    isArray = true;
    fromData = [fromData];
  } else if (isArray && mapArray === false) {
    isArray = false;
  }

  if (typeof to === "string") {
    props[to] = fromData;
    return;
  }

  for (const [transformedPropName, transformTo] of Object.entries(to)) {
    // If `fromData` is an array, mapping it's items.
    props[transformedPropName] = isArray
      ? (fromData as any[]).map(item => doTransform(item, transformTo))
      : doTransform(fromData, transformTo);
  }
}

export function transformIntermediateData(
  data: any,
  to: GeneralTransform,
  from?: string | string[]
): any {
  const intermediateData = from ? get(data, from) : data;
  if (!to) {
    return intermediateData;
  }
  return transformProperties({}, intermediateData, to);
}