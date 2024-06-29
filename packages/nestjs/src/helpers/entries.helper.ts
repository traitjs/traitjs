import { ITrait } from "@traitjs/core";
import { IFeature } from "../types/i-feature.type";
import { IGroupedFeatures } from "../types/i-grouped-features.type";

export const featureEntries = <
  TOptions extends any,
  TKey extends string,
  TFeature extends IFeature<TOptions, TKey>,
>(
  o: TFeature
) => Object.entries(o) as [keyof TFeature, ITrait<TOptions>][];

export const groupedFeaturesEntries = <
  TOptions extends any,
  TKey extends string,
  TFeature extends IFeature<TOptions, TKey>,
>(
  o: IGroupedFeatures<TOptions, TFeature>
) => Object.entries(o) as [keyof TFeature, ITrait<TOptions>[]][];
