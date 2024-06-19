import { ITrait } from "@traitjs/core";
import { IFeature } from "./i-feature.type";

export type IGroupedFeatures<
  TOptions extends any,
  TFeature extends IFeature<TOptions>,
> = {
  [key in keyof TFeature]: ITrait<TOptions>[];
};
