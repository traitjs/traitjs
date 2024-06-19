import { IFeature } from "./i-feature.type";

export type IProvideFeatureAs<
  TOptions extends any,
  TFeature extends IFeature<TOptions>,
> = {
  [key in keyof TFeature]: (options: TOptions) => string;
};
