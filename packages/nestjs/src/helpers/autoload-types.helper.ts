import { FileAddr, ListFilesOptions, listFiles } from "./list-files.helper";

export interface AutoloadOptions extends ListFilesOptions {
  selector?: (imported: unknown) => boolean;
  sortFn?: (a: FileAddr, b: FileAddr) => number;
}

export const autoloadTypes = (
  path: string,
  {
    selector = (loadedFeat) => loadedFeat instanceof Function,
    sortFn: orderBy = ({ depth: depthA }, { depth: depthB }) => depthA - depthB,
    ...options
  }: AutoloadOptions = {}
): any[] =>
  listFiles(path, options)
    .sort(orderBy)
    .flatMap(({ filePath }) => Object.values<any>(require(filePath)))
    .filter((loadedFeat) => !selector || selector(loadedFeat));
