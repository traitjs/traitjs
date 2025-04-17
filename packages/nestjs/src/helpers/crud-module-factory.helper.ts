import { applyDecorators, ModuleMetadata, Type } from "@nestjs/common";
import { IFeatureDefaultOptions } from "../interfaces/i-feature-default-options.interface";
import { IFeatureModuleOptions } from "../interfaces/i-feature-module-options.interface";
import { IFeature } from "../types/i-feature.type";
import { IProvideFeatureAs } from "../types/i-provide-feature-as";
import { IFeatureResult } from "../types/i-feature-result.type";
import { IFeatureOptions } from "../interfaces/i-feature-options.interface";
import { ICrudModuleFactory } from "../interfaces/i-crud-module-factory.interface";
import { makeCrudModule } from "./make-crud-module";

class CrudModuleFactory<
  TOptions extends any,
  TKey extends string,
  TFeature extends IFeature<TOptions, TKey>,
> implements ICrudModuleFactory<TOptions, TKey, TFeature>
{
  private readonly defaultOptions: IFeatureDefaultOptions<TOptions, TFeature>;
  private readonly decorators: Array<ClassDecorator>;
  constructor() {
    this.defaultOptions = {
      features: [],
      options: {},
      provideFeatureAs: {},
      controllers: [],
      providers: [],
      exports: [],
      featureResultTransform: (featureResult) => featureResult,
      optionsTransform: (options) => options,
      moduleTransform: (moduleConstructor, options) => options,
    };
    this.decorators = [];
  }

  addFeatures(...features: TFeature[]) {
    this.defaultOptions.features?.push(...features);
    return this;
  }

  provideFeatureAs(provideAs: IProvideFeatureAs<TOptions, TFeature>) {
    this.defaultOptions.provideFeatureAs = {
      ...this.defaultOptions.provideFeatureAs,
      ...provideAs,
    };
    return this;
  }

  addOptions(options: Partial<TOptions>) {
    this.defaultOptions.options = {
      ...this.defaultOptions.options,
      ...options,
    };
    return this;
  }

  addControllers(controllers: Array<keyof TFeature>) {
    this.defaultOptions.controllers?.push(...controllers);
    return this;
  }

  addProviders(providers: Array<keyof TFeature>) {
    this.defaultOptions.providers?.push(...providers);
    return this;
  }

  addExports(exports: Array<keyof TFeature>) {
    this.defaultOptions.exports?.push(...exports);
    return this;
  }

  addFeatureResultTransform(
    featureResultTransform: (
      featureResult: IFeatureResult<TFeature>,
      options: IFeatureOptions<TFeature> & TOptions
    ) => IFeatureResult<TFeature>
  ) {
    this.defaultOptions.featureResultTransform = featureResultTransform;
    return this;
  }

  addOptionsTransform(
    optionsTransform: (
      options: IFeatureModuleOptions<TOptions, TFeature>
    ) => IFeatureModuleOptions<TOptions, TFeature>
  ) {
    this.defaultOptions.optionsTransform = optionsTransform;
    return this;
  }

  addModuleTransform(
    moduleTransform: (
      moduleConstructor: Function,
      options: ModuleMetadata
    ) => ModuleMetadata
  ) {
    this.defaultOptions.moduleTransform = moduleTransform;
    return this;
  }

  addDecorators(...decorators: ClassDecorator[]) {
    this.decorators.push(...decorators);
    return this;
  }

  build() {
    return makeCrudModule(this.defaultOptions, ...this.decorators);
  }
}

export const crudModuleBuilder = <
  TOptions extends any,
  TKey extends string,
  TFeature extends IFeature<TOptions, TKey>,
>(): ICrudModuleFactory<TOptions, TKey, TFeature> => {
  return new CrudModuleFactory();
};
