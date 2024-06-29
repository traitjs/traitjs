import { ITrait, compileTraits } from "@traitjs/core";
import { IFeature } from "../types/i-feature.type";
import { IFeatureResult } from "../types/i-feature-result.type";
import { IGroupedFeatures } from "../types/i-grouped-features.type";
import { IProvideFeatureAs } from "../types/i-provide-feature-as";
import { featureEntries, groupedFeaturesEntries } from "./entries.helper";

export const compileFeatures = <
  TOptions extends any,
  TKey extends string,
  TFeature extends IFeature<TOptions, TKey>,
>(
  provideFeatureAs: IProvideFeatureAs<TOptions, TFeature>,
  features: TFeature[],
  options: TOptions,
  ignoreTraits?: Array<keyof TFeature>
): IFeatureResult<TFeature> => {
  const traits = features.reduce(
    (acc, feature) => {
      featureEntries(feature)
        .filter(([key]) => !ignoreTraits?.includes(key))
        .forEach(([key, value]) => {
          if (!value) return;
          if (!acc[key]) {
            acc[key] = [];
          }
          acc[key].push(value);
        });
      return acc;
    },
    {} as IGroupedFeatures<TOptions, TFeature>
  );
  return groupedFeaturesEntries(traits).reduce((acc, [key, value]) => {
    acc[key] = {
      provide: provideFeatureAs[key]?.(options),
      useClass: compileTraits(value, options),
    };
    return acc;
  }, {} as IFeatureResult<TFeature>);
};
