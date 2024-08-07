export interface ITrait<TOptions> {
  uniqueId: string;
  dependsOn?: ITrait<TOptions>[];
  traitFn: (...args: any[]) => any;
  abstract?: boolean;
  activator?: (options: TOptions) => boolean;
}
