import { get, set } from "lodash";
import { GeneralTransform, TransformMap } from "@next-core/brick-types";
import { isObject, transform, isEvaluable } from "@next-core/brick-utils";
import {
  evaluate,
  EvaluateOptions,
  isPreEvaluated,
  shouldDismissRecursiveMarkingInjected,
} from "./evaluate";
import { haveBeenInjected, recursiveMarkAsInjected } from "./injected";
import { devtoolsHookEmit } from "./devtools";
import { setRealProperties } from "./setProperties";

interface TransformOptions {
  isReTransformation?: boolean;
  transformationId?: number;
}

/** @internal */
export function transformElementProperties(
  element: HTMLElement,
  data: unknown,
  to: GeneralTransform,
  from?: string | string[],
  mapArray?: boolean | "auto"
): void {
  const result = preprocessTransformProperties(data, to, from, mapArray);
  setRealProperties(element, result, true);
}

/** @internal */
export function transformProperties(
  props: Record<string, unknown>,
  data: unknown,
  to: GeneralTransform,
  from?: string | string[],
  mapArray?: boolean | "auto"
): Record<string, unknown> {
  const result = preprocessTransformProperties(data, to, from, mapArray);
  for (const [propName, propValue] of Object.entries(result)) {
    set(props, propName, propValue);
  }
  return props;
}

/** @internal */
export function doTransform(
  data: unknown,
  to: unknown,
  options?: {
    evaluateOptions?: EvaluateOptions;
  }
): unknown {
  const preEvaluated = isPreEvaluated(to);
  if (preEvaluated || typeof to === "string") {
    let result: unknown;
    let dismissRecursiveMarkingInjected = false;
    if (preEvaluated || isEvaluable(to as string)) {
      result = evaluate(to as string, { data }, options?.evaluateOptions);
      dismissRecursiveMarkingInjected = shouldDismissRecursiveMarkingInjected(
        to as string
      );
    } else {
      result = transform(to as string, data);
    }
    if (!dismissRecursiveMarkingInjected) {
      recursiveMarkAsInjected(result);
    }
    return result;
  }

  if (isObject(to) && haveBeenInjected(to)) {
    return to;
  }

  return Array.isArray(to)
    ? to.map((item) => doTransform(data, item, options))
    : isObject(to)
    ? Object.fromEntries(
        Object.entries(to).map((entry) => [
          entry[0],
          doTransform(data, entry[1], options),
        ])
      )
    : to;
}

/** @internal */
export function reTransformForDevtools(
  transformationId: number,
  data: unknown,
  to: GeneralTransform,
  from?: string | string[],
  mapArray?: boolean | "auto"
): void {
  try {
    preprocessTransformProperties(data, to, from, mapArray, {
      isReTransformation: true,
      transformationId,
    });
  } catch (error) {
    devtoolsHookEmit("re-transformation", {
      id: transformationId,
      error: error.message,
      detail: {
        transform: to,
        data,
        options: { from, mapArray },
      },
    });
  }
}

/** @internal */
export function preprocessTransformProperties(
  data: unknown,
  to: GeneralTransform,
  from?: string | string[],
  mapArray?: boolean | "auto",
  options?: TransformOptions
): Record<string, unknown> {
  const props: Record<string, unknown> = {};
  const processedData = from ? get(data, from) : data;

  if (Array.isArray(to)) {
    for (const item of to) {
      pipeableTransform(
        props,
        processedData,
        item.to,
        item.from,
        item.mapArray
      );
    }
  } else {
    pipeableTransform(props, processedData, to, undefined, mapArray);
  }
  const detail = {
    transform: to,
    data,
    options: { from, mapArray },
    result: props,
  };
  if (options?.isReTransformation) {
    devtoolsHookEmit("re-transformation", {
      id: options.transformationId,
      detail,
    });
  } else {
    devtoolsHookEmit("transformation", detail);
  }
  return props;
}

function pipeableTransform(
  props: Record<string, unknown>,
  data: unknown,
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
      ? (fromData as unknown[]).map((item) => doTransform(item, transformTo))
      : doTransform(fromData, transformTo);
  }
}

/** @internal */
export function transformIntermediateData(
  data: unknown,
  to: GeneralTransform,
  from?: string | string[],
  mapArray?: boolean | "auto"
): unknown {
  const intermediateData = from ? get(data, from) : data;
  if (!to) {
    return intermediateData;
  }
  return transformProperties({}, intermediateData, to, undefined, mapArray);
}
