import { ModuleMetadata, applyDecorators, Module } from "@nestjs/common";
import { IFeatureDefaultOptions } from "../interfaces/i-feature-default-options.interface";
import { IFeatureModuleOptions } from "../interfaces/i-feature-module-options.interface";
import { IFeature } from "../types/i-feature.type";
import { buildFeatures } from "./build-features";
import { mergeOptions } from "./merge-options";

export const makeCrudModule =
  <
    TOptions extends any,
    TKey extends string,
    TFeature extends IFeature<TOptions, TKey>,
  >(
    defaultOptions: IFeatureDefaultOptions<TOptions, TFeature>,
    ...decorators: Array<ClassDecorator | MethodDecorator | PropertyDecorator>
  ) =>
  (optionsCollection: IFeatureModuleOptions<TOptions, TFeature>) => {
    optionsCollection =
      defaultOptions.optionsTransform?.(optionsCollection) ?? optionsCollection;
    const modulesMetadata = optionsCollection.featureOptions.reduce(
      (acc, options) => {
        const mergedOptions = mergeOptions(defaultOptions, options);
        const featureResult = buildFeatures(mergedOptions, defaultOptions);
        const features =
          defaultOptions.featureResultTransform?.(
            featureResult,
            mergedOptions
          ) ?? featureResult;

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
        moduleMetadata =
          defaultOptions.moduleTransform?.(constructor, moduleMetadata) ??
          moduleMetadata;
        Module(moduleMetadata)(constructor);
      }
    );
  };
