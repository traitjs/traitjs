import { Module, ModuleMetadata } from "@nestjs/common";
import { IFeatureDefaultOptions } from "../interfaces/i-feature-default-options.interface";
import { IFeatureModuleOptions } from "../interfaces/i-feature-module-options.interface";
import { IFeatureOptions } from "../interfaces/i-feature-options.interface";
import { IFeature } from "../types/i-feature.type";
import { compileFeatures } from "./compile-features.helper";
import merge from "lodash.merge";

const mergeOptions = <
  TOptions extends any,
  TFeature extends IFeature<TOptions>,
>(
  defaultOptions: IFeatureDefaultOptions<TOptions, TFeature>,
  options: IFeatureOptions<TFeature> & TOptions
): IFeatureOptions<TFeature> & TOptions => {
  return {
    ...merge(defaultOptions ?? {}, options),
    features: [
      ...(defaultOptions.features ?? []),
      ...(options?.features ?? []),
    ],
  };
};

export const crudModuleFactory =
  <TOptions extends any, TFeature extends IFeature<TOptions>>(
    defaultOptions: IFeatureDefaultOptions<TOptions, TFeature>
  ) =>
  (optionsCollection: IFeatureModuleOptions<TOptions, TFeature>) => {
    if (defaultOptions.optionsTransform) {
      optionsCollection = defaultOptions.optionsTransform(optionsCollection);
    }
    const modulesMetadata = optionsCollection.featureOptions.reduce(
      (acc, options) => {
        const mergedOptions = mergeOptions(defaultOptions, options);
        const features = compileFeatures<TOptions, TFeature>(
          defaultOptions.provideFeatureAs,
          mergedOptions.features ?? [],
          mergedOptions,
          mergedOptions.ignoreTraits
        );

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
