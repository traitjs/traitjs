import { ITrait, compileTraits } from "@traitjs/core";
import { IFeature } from "../types/i-feature.type";
import { IFeatureResult } from "../types/i-feature-result.type";
import { IGroupedFeatures } from "../types/i-grouped-features.type";
import { IProvideFeatureAs } from "../types/i-provide-feature-as";

export const compileFeatures = <
  TOptions extends any,
  TFeature extends IFeature<TOptions>,
>(
  provideFeatureAs: IProvideFeatureAs<TOptions, TFeature>,
  features: TFeature[],
  options: TOptions,
  ignoreTraits?: Array<keyof TFeature>
): IFeatureResult<TFeature> => {
  const traits = features.reduce(
    (acc, feature) => {
      Object.entries(feature)
        .filter(([key]) => !ignoreTraits?.includes(key))
        .forEach(([key, value]: [keyof TFeature, ITrait<TOptions>]) => {
          if (!acc[key]) {
            acc[key] = [];
          }
          acc[key].push(value);
        });
      return acc;
    },
    {} as IGroupedFeatures<TOptions, TFeature>
  );
  return Object.entries(traits).reduce(
    (acc, [key, value]: [keyof TFeature, ITrait<TOptions>[]]) => {
      acc[key] = {
        provide: provideFeatureAs[key]?.(options),
        useClass: compileTraits(value, options),
      };
      return acc;
    },
    {} as IFeatureResult<TFeature>
  );
};
