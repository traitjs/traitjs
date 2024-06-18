import { IFeature } from "./i-feature.type";

export type IProvideFeatureAs<
  TOptions extends any,
  TFeature extends IFeature<any>,
> = {
  [key in keyof TFeature]: (options: TOptions) => string;
};
