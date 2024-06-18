import fs from "fs";
import path from "path";

export interface ListFilesOptions {
  directoryWhitelist?: string[];
  directoryBlacklist?: string[];
  allowedExtensions?: string[];
  recursive?: boolean;
}

const fullExtname = (filePath: string): string =>
  `.${filePath.split(".").slice(1).join(".")}` ?? "";

export const listFiles = (
  dirName: string,
  options?: ListFilesOptions
): string[] =>
  fs
    .readdirSync(dirName, { withFileTypes: true })
    .flatMap((e) => {
      const filePath = path.join(dirName, e.name);
      if (e.isDirectory()) {
        if (!options?.recursive) return [];
        if (!(options?.directoryWhitelist?.includes(e.name) ?? true)) return [];
        if (options?.directoryBlacklist?.includes(e.name)) return [];

        return listFiles(filePath, options);
      } else {
        return filePath;
      }
    })
    .filter(
      (x) =>
        !options?.allowedExtensions ||
        options.allowedExtensions.includes(fullExtname(x))
    );
