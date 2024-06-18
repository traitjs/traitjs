import { IProvideFeatureAs } from "../types/i-provide-feature-as";
import { IFeature } from "../types/i-feature.type";

export interface IFeatureDefaultOptions<
  TOptions extends any,
  TFeature extends IFeature<any>,
> {
  features?: TFeature[];
  options?: Partial<TOptions>;
  provideFeatureAs: IProvideFeatureAs<TOptions, TFeature>;
  controllers?: Array<keyof TFeature>;
  providers?: Array<keyof TFeature>;
  exports?: Array<keyof TFeature>;
}
