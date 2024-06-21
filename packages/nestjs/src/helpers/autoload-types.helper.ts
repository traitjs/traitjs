import { ListFilesOptions, listFiles } from "./list-files.helper";

export interface AutoloadOptions extends ListFilesOptions {
  selector?: (imported: unknown) => boolean;
}

export const autoloadTypes = (
  path: string,
  {
    selector = (loadedFeat) => loadedFeat instanceof Function,
    ...options
  }: AutoloadOptions = {}
): any[] =>
  listFiles(path, options)
    .flatMap((file) => Object.values<any>(require(file)))
    .filter((loadedFeat) => !selector || selector(loadedFeat));
