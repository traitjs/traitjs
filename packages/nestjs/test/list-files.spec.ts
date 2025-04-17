import { listFiles, ListFilesOptions } from "../src/helpers/list-files.helper";
import fs from "fs";
import path from "path";
import os from "os";

describe("listFiles", () => {
  let testDir: string;

  beforeAll(() => {
    // Create a temporary directory for testing
    testDir = fs.mkdtempSync(path.join(os.tmpdir(), "list-files-test-"));
    fs.writeFileSync(path.join(testDir, "file1.ts"), "");
    fs.writeFileSync(path.join(testDir, "file2.js"), "");
    fs.mkdirSync(path.join(testDir, "subDir"));
    fs.writeFileSync(path.join(testDir, "subDir", "file3.ts"), "");
    fs.mkdirSync(path.join(testDir, "subDir2"));
    fs.writeFileSync(path.join(testDir, "subDir2", "file4.ts"), "");
  });

  afterAll(() => {
    // Delete the temporary directory after testing
    fs.rmSync(testDir, { recursive: true });
  });

  it("should return an array of files in a directory", () => {
    const files = listFiles(testDir, { recursive: false });
    expect(files.map((x) => x.filePath)).toEqual([
      path.join(testDir, "file1.ts"),
      path.join(testDir, "file2.js"),
    ]);
  });

  it("should return an array of files in a directory and its subdirectories when recursive is set to true", () => {
    const files = listFiles(testDir, { recursive: true });
    expect(files.map((x) => x.filePath)).toEqual([
      path.join(testDir, "file1.ts"),
      path.join(testDir, "file2.js"),
      path.join(testDir, "subDir", "file3.ts"),
      path.join(testDir, "subDir2", "file4.ts"),
    ]);
  });

  it("should return an array of files only in the current directory when recursive is set to false", () => {
    const files = listFiles(testDir, { recursive: false });
    expect(files.map((x) => x.filePath)).toEqual([
      path.join(testDir, "file1.ts"),
      path.join(testDir, "file2.js"),
    ]);
  });

  it("should return an array of files with specified extensions when allowedExtensions is set", () => {
    const files = listFiles(testDir, {
      allowedExtensions: [".ts"],
      recursive: true,
    });
    expect(files.map((x) => x.filePath)).toEqual([
      path.join(testDir, "file1.ts"),
      path.join(testDir, "subDir", "file3.ts"),
      path.join(testDir, "subDir2", "file4.ts"),
    ]);
  });

  it("should return an array of files excluding the directories specified in directoryBlacklist", () => {
    const files = listFiles(testDir, {
      directoryBlacklist: ["subDir"],
      recursive: true,
    });
    expect(files.map((x) => x.filePath)).toEqual([
      path.join(testDir, "file1.ts"),
      path.join(testDir, "file2.js"),
      path.join(testDir, "subDir2", "file4.ts"),
    ]);
  });

  it("should return an array of files only from the directories specified in directoryWhitelist", () => {
    const files = listFiles(testDir, {
      directoryWhitelist: ["subDir"],
      recursive: true,
    });
    expect(files.map((x) => x.filePath)).toEqual([
      path.join(testDir, "file1.ts"),
      path.join(testDir, "file2.js"),
      path.join(testDir, "subDir", "file3.ts"),
    ]);
  });
});
