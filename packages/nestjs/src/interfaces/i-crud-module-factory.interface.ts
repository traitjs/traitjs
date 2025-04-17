import { ModuleMetadata } from "@nestjs/common";
import { IFeatureModuleOptions } from "./i-feature-module-options.interface";
import { IFeatureOptions } from "./i-feature-options.interface";
import { IFeatureResult } from "../types/i-feature-result.type";
import { IFeature } from "../types/i-feature.type";
import { IProvideFeatureAs } from "../types/i-provide-feature-as";

export interface ICrudModuleFactory<
  TOptions extends any,
  TKey extends string,
  TFeature extends IFeature<TOptions, TKey>,
> {
  addFeatures(...features: TFeature[]): this;
  provideFeatureAs(provideAs: IProvideFeatureAs<TOptions, TFeature>): this;
  addOptions(options: Partial<TOptions>): this;
  addControllers(controllers: Array<keyof TFeature>): this;
  addProviders(providers: Array<keyof TFeature>): this;
  addExports(exports: Array<keyof TFeature>): this;
  addFeatureResultTransform(
    featureResultTransform: (
      featureResult: IFeatureResult<TFeature>,
      options: IFeatureOptions<TFeature> & TOptions
    ) => IFeatureResult<TFeature>
  ): Omit<this, "addFeatureResultTransform">;
  addOptionsTransform(
    optionsTransform: (
      options: IFeatureModuleOptions<TOptions, TFeature>
    ) => IFeatureModuleOptions<TOptions, TFeature>
  ): Omit<this, "addOptionsTransform">;
  addModuleTransform(
    moduleTransform: (
      moduleConstructor: Function,
      options: ModuleMetadata
    ) => ModuleMetadata
  ): Omit<this, "addModuleTransform">;
  addDecorators(...decorators: ClassDecorator[]): this;
  build(): (
    optionsCollection: IFeatureModuleOptions<TOptions, TFeature>
  ) => ClassDecorator;
}
