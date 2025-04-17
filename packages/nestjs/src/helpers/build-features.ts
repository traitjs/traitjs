import merge from "lodash.merge";
import { IFeatureDefaultOptions } from "../interfaces/i-feature-default-options.interface";
import { IFeatureOptions } from "../interfaces/i-feature-options.interface";
import { IFeatureResult } from "../types/i-feature-result.type";
import { IFeature } from "../types/i-feature.type";
import { compileFeatures } from "./compile-features.helper";

export const buildFeatures = <
  TOptions extends any,
  TKey extends string,
  TFeature extends IFeature<TOptions>,
>(
  options: IFeatureOptions<TFeature> & TOptions,
  { provideFeatureAs }: IFeatureDefaultOptions<TOptions, TFeature>
) => {
  let overridedFeatures = {} as IFeatureResult<TFeature>;
  if (options.overrideFeatures) {
    overridedFeatures = compileFeatures<TOptions, TKey, TFeature>({
      provideFeatureAs,
      features: options.overrideFeatures,
      options,
      ignoreTraits: options.ignoreTraits,
    });
    options.ignoreTraits = [
      ...(options.ignoreTraits ?? []),
      ...Object.keys(overridedFeatures),
    ];
  }
  const features = compileFeatures<TOptions, TKey, TFeature>({
    provideFeatureAs,
    features: options.features ?? [],
    options,
    ignoreTraits: options.ignoreTraits,
  });
  merge(features, overridedFeatures);
  return features;
};
