import { ListFilesOptions, listFiles } from "./list-files.helper";

export interface AutoloadOptions extends ListFilesOptions {
  selector?: (imported: unknown) => boolean;
}

export const autoloadTypes = (path: string, options?: AutoloadOptions): any[] =>
  listFiles(path, options)
    .flatMap((file) => Object.values<any>(require(file)))
    .filter((loadedFeat) => loadedFeat instanceof Function)
    .filter((loadedFeat) => !options?.selector || options.selector(loadedFeat));
