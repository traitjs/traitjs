import { IFeature } from "../types/i-feature.type";

export interface IFeatureOptions<TFeature extends IFeature<any>> {
  features?: TFeature[];
  ignoreTraits?: Array<keyof TFeature>;
}
