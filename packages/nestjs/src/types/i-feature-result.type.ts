import { ClassProvider } from "@nestjs/common";
import { IFeature } from "./i-feature.type";

export type IFeatureResult<TFeature extends IFeature<any>> = {
  [key in keyof TFeature]: ClassProvider;
};
