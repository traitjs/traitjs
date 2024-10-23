import { ListFilesOptions, listFiles } from "./list-files.helper";

export interface AutoloadOptions extends ListFilesOptions {
  selector?: (imported: unknown) => boolean;
  sortFn?: (a: [string, number], b: [string, number]) => number;
}

export const autoloadTypes = (
  path: string,
  {
    selector = (loadedFeat) => loadedFeat instanceof Function,
    sortFn: orderBy = ([, depthA], [, depthB]) => depthA - depthB,
    ...options
  }: AutoloadOptions = {}
): any[] =>
  listFiles(path, options)
    .sort(orderBy)
    .flatMap(([file]) => Object.values<any>(require(file)))
    .filter((loadedFeat) => !selector || selector(loadedFeat));
