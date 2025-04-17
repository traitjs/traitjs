import { compileTraits } from "@traitjs/core";
import { IFeatureResult } from "../types/i-feature-result.type";
import { IFeature } from "../types/i-feature.type";
import { IGroupedFeatures } from "../types/i-grouped-features.type";
import { IProvideFeatureAs } from "../types/i-provide-feature-as";
import { featureEntries, groupedFeaturesEntries } from "./entries.helper";

export interface ICompileFeaturesArgs<
  TOptions extends any,
  TKey extends string,
  TFeature extends IFeature<TOptions, TKey>,
> {
  features: TFeature[];
  options: TOptions;
  ignoreTraits?: Array<keyof TFeature>;
  provideFeatureAs?: IProvideFeatureAs<TOptions, TFeature>;
}

export const compileFeatures = <
  TOptions extends any,
  TKey extends string,
  TFeature extends IFeature<TOptions, TKey>,
>({
  provideFeatureAs,
  features,
  options,
  ignoreTraits,
}: ICompileFeaturesArgs<
  TOptions,
  TKey,
  TFeature
>): IFeatureResult<TFeature> => {
  const traits = features.reduce(
    (acc, feature) => {
      featureEntries<TOptions, TKey, TFeature>(feature)
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
    const useClass = compileTraits(value, options);
    acc[key] = {
      provide: provideFeatureAs?.[key]?.(options) ?? useClass.name,
      useClass,
    };
    return acc;
  }, {} as IFeatureResult<TFeature>);
};
