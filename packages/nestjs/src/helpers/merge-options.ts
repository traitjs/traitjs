import cloneDeep from "lodash.clonedeep";
import merge from "lodash.merge";
import { IFeatureDefaultOptions } from "../interfaces/i-feature-default-options.interface";
import { IFeatureOptions } from "../interfaces/i-feature-options.interface";
import { IFeature } from "../types/i-feature.type";

export const mergeOptions = <
  TOptions extends any,
  TFeature extends IFeature<TOptions>,
>(
  defaultOptions: IFeatureDefaultOptions<TOptions, TFeature>,
  options: IFeatureOptions<TFeature> & TOptions
): IFeatureOptions<TFeature> & TOptions => {
  return {
    ...merge(cloneDeep(defaultOptions.options ?? {}), options),
    features: [
      ...(defaultOptions.features ?? []),
      ...(options?.features ?? []),
    ],
  };
};
