import { Module, ModuleMetadata } from "@nestjs/common";
import { IFeatureDefaultOptions } from "../interfaces/i-feature-default-options.interface";
import { IFeatureModuleOptions } from "../interfaces/i-feature-module-options.interface";
import { IFeatureOptions } from "../interfaces/i-feature-options.interface";
import { IFeature } from "../types/i-feature.type";
import { compileFeatures } from "./compile-features.helper";

const mergeOptions = <TOptions extends any, TFeature extends IFeature<any>>(
  defaultOptions: IFeatureDefaultOptions<TOptions, TFeature>,
  options: IFeatureOptions<TFeature> & TOptions
): IFeatureOptions<TFeature> & TOptions => {
  return {
    ...defaultOptions,
    ...options,
    features: [
      ...(defaultOptions.features ?? []),
      ...(options?.features ?? []),
    ],
    options: { ...(defaultOptions.options ?? {}), ...options },
  };
};

export const crudModuleFactory =
  <TOptions extends any, TFeature extends IFeature<any>>(
    defaultOptions: IFeatureDefaultOptions<TOptions, TFeature>
  ) =>
  (optionsCollection: IFeatureModuleOptions<TOptions, TFeature>) => {
    const modulesMetadata = optionsCollection.featureOptions.reduce(
      (acc, options) => {
        const mergedOptions = mergeOptions(defaultOptions, options);
        const features = compileFeatures<TOptions, TFeature>(
          defaultOptions.provideFeatureAs,
          mergedOptions.features ?? [],
          mergedOptions,
          mergedOptions.ignoreTraits
        );

        acc.controllers!.concat(
          defaultOptions.controllers
            ?.map((x) => features[x])
            .map((x) => x.useClass) ?? []
        );

        acc.providers!.concat(
          defaultOptions.providers?.map((x) => features[x]) ?? []
        );

        acc.exports!.concat(
          defaultOptions.exports?.map((x) => features[x]) ?? []
        );

        return acc;
      },
      {
        controllers: [],
        providers: [],
        exports: [],
      } as ModuleMetadata
    );

    return Module({
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
    });
  };
