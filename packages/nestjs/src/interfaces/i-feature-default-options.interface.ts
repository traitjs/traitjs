import { IProvideFeatureAs } from "../types/i-provide-feature-as";
import { IFeature } from "../types/i-feature.type";
import { IFeatureModuleOptions } from "./i-feature-module-options.interface";
import { ModuleMetadata, Type } from "@nestjs/common";
import { IFeatureResult } from "../types/i-feature-result.type";

export interface IFeatureDefaultOptions<
  TOptions extends any,
  TFeature extends IFeature<TOptions>,
> {
  features?: TFeature[];
  options?: Partial<TOptions>;
  provideFeatureAs: IProvideFeatureAs<TOptions, TFeature>;
  controllers?: Array<keyof TFeature>;
  providers?: Array<keyof TFeature>;
  exports?: Array<keyof TFeature>;
  featureResultTransform?: (
    featureResult: IFeatureResult<TFeature>
  ) => IFeatureResult<TFeature>;
  optionsTransform?: (
    options: IFeatureModuleOptions<TOptions, TFeature>
  ) => IFeatureModuleOptions<TOptions, TFeature>;
  moduleTransform?: (
    moduleConstructor: Function,
    options: ModuleMetadata
  ) => ModuleMetadata;
}
