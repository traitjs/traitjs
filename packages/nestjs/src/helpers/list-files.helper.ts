import fs from "fs";
import path from "path";

export interface ListFilesOptions {
  directoryWhitelist?: string[];
  directoryBlacklist?: string[];
  allowedExtensions?: string[];
  recursive?: boolean;
}

export interface FileAddr {
  filePath: string;
  depth: number;
}

const fullExtname = (filePath: string): string =>
  `.${filePath.split(".").slice(1).join(".")}`;

export const listFiles = (
  dirName: string,
  options?: ListFilesOptions,
  depth: number = 0
): FileAddr[] =>
  fs
    .readdirSync(dirName, { withFileTypes: true })
    .flatMap<FileAddr>((e) => {
      const filePath = path.join(dirName, e.name);
      if (e.isDirectory()) {
        if (!options?.recursive) return [];
        if (!(options?.directoryWhitelist?.includes(e.name) ?? true)) return [];
        if (options?.directoryBlacklist?.includes(e.name)) return [];

        return listFiles(filePath, options, depth + 1);
      } else {
        return { filePath, depth };
      }
    })
    .filter(
      ({ filePath }) =>
        !options?.allowedExtensions ||
        options.allowedExtensions.includes(fullExtname(filePath))
    );
