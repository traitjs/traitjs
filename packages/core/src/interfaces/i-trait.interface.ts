export interface ITrait<TOptions> {
  dependsOn?: ITrait<TOptions>[];
  traitFn: (...args: any[]) => any;
}
