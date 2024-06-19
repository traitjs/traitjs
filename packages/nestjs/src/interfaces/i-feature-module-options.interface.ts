import { ModuleMetadata } from "@nestjs/common";
import { IFeatureOptions } from "./i-feature-options.interface";
import { IFeature } from "../types/i-feature.type";

export interface IFeatureModuleOptions<
  TOptions extends any,
  TFeature extends IFeature<TOptions>,
> extends ModuleMetadata {
  featureOptions: (IFeatureOptions<TFeature> & TOptions)[];
}
