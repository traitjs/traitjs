import { Module, ModuleMetadata, Type, applyDecorators } from "@nestjs/common";
import { IFeatureDefaultOptions } from "../interfaces/i-feature-default-options.interface";
import { IFeatureModuleOptions } from "../interfaces/i-feature-module-options.interface";
import { IFeatureOptions } from "../interfaces/i-feature-options.interface";
import { IFeature } from "../types/i-feature.type";
import { compileFeatures } from "./compile-features.helper";
import merge from "lodash.merge";
import cloneDeep from "lodash.clonedeep";

const buildFeatures = <
  TOptions extends any,
  TKey extends string,
  TFeature extends IFeature<TOptions>,
>(
  options: IFeatureOptions<TFeature> & TOptions,
  defaultOptions: IFeatureDefaultOptions<TOptions, TFeature>,
  mergedOptions: IFeatureOptions<TFeature> & TOptions
) => {
  let ovirridedFeatures = {};
  if (options.overrideFeatures) {
    ovirridedFeatures = compileFeatures<TOptions, TKey, TFeature>(
      defaultOptions.provideFeatureAs,
      options.overrideFeatures,
      mergedOptions,
      options.ignoreTraits
    );
    options.ignoreTraits = [
      ...(options.ignoreTraits ?? []),
      ...Object.keys(options.overrideFeatures),
    ];
  }
  const features = compileFeatures<TOptions, TKey, TFeature>(
    defaultOptions.provideFeatureAs,
    mergedOptions.features ?? [],
    mergedOptions,
    mergedOptions.ignoreTraits
  );
  merge(features, ovirridedFeatures);
  return features;
};

const mergeOptions = <
  TOptions extends any,
  TFeature extends IFeature<TOptions>,
>(
  defaultOptions: IFeatureDefaultOptions<TOptions, TFeature>,
  options: IFeatureOptions<TFeature> & TOptions
): IFeatureOptions<TFeature> & TOptions => {
  return {
    ...merge(cloneDeep(defaultOptions.options ?? {}), options),
    features: [
      ...(defaultOptions.features ?? []),
      ...(options?.features ?? []),
    ],
  };
};

export const crudModuleFactory =
  <
    TOptions extends any,
    TKey extends string,
    TFeature extends IFeature<TOptions, TKey>,
  >(
    defaultOptions: IFeatureDefaultOptions<TOptions, TFeature>,
    ...decorators: Array<ClassDecorator | MethodDecorator | PropertyDecorator>
  ) =>
  (optionsCollection: IFeatureModuleOptions<TOptions, TFeature>) => {
    if (defaultOptions.optionsTransform) {
      optionsCollection = defaultOptions.optionsTransform(optionsCollection);
    }
    const modulesMetadata = optionsCollection.featureOptions.reduce(
      (acc, options) => {
        const mergedOptions = mergeOptions(defaultOptions, options);
        const features = buildFeatures(options, defaultOptions, mergedOptions);

        acc.controllers!.push(
          ...(defaultOptions.controllers
            ?.map((x) => features[x])
            ?.filter((x) => x)
            .map((x) => x.useClass) ?? [])
        );

        acc.providers!.push(
          ...(defaultOptions.providers
            ?.map((x) => features[x])
            ?.filter((x) => x) ?? [])
        );

        acc.exports!.push(
          ...(defaultOptions.exports
            ?.map((x) => features[x])
            ?.filter((x) => x) ?? [])
        );

        return acc;
      },
      {
        controllers: [],
        providers: [],
        exports: [],
      } as ModuleMetadata
    );

    let moduleMetadata: ModuleMetadata = {
      imports: optionsCollection.imports,
      controllers: [
        ...modulesMetadata.controllers!,
        ...(optionsCollection.controllers ?? []),
      ],
      providers: [
        ...modulesMetadata.providers!,
        ...(optionsCollection.providers ?? []),
      ],
      exports: [
        ...modulesMetadata.exports!,
        ...(optionsCollection.exports ?? []),
      ],
    };

    return applyDecorators(
      ...decorators,
      <TFunction extends Function>(constructor: TFunction) => {
        if (defaultOptions?.moduleTransform) {
          moduleMetadata = defaultOptions.moduleTransform(
            constructor,
            moduleMetadata
          );
        }
        Module(moduleMetadata)(constructor);
      }
    );
  };
