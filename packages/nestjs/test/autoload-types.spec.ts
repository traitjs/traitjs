import fs from "fs";
import path from "path";
import os from "os";
import { autoloadTypes } from "../src/helpers/autoload-types.helper";

describe("autoloadTypes", () => {
  let testDir: string;

  beforeEach(() => {
    // Create a temporary directory for testing
    testDir = fs.mkdtempSync(path.join(os.tmpdir(), "autoloadTypes-"));

    // Create files in the test directory
    fs.writeFileSync(
      path.join(testDir, "file1.js"),
      "module.exports = { fn: function () { return 1; } };"
    );
    fs.writeFileSync(
      path.join(testDir, "file2.js"),
      "module.exports = { fn: function () { return 2; } };"
    );
  });

  afterEach(() => {
    // Remove the test directory after each test
    fs.rmSync(testDir, { recursive: true });
  });

  it("should return an empty array if no files are found", () => {
    fs.readdirSync(testDir).forEach((file) => {
      fs.rmSync(path.join(testDir, file));
    });
    const result = autoloadTypes(testDir);
    expect(result).toHaveLength(0);
  });

  it("should return an empty array if no functions are found", () => {
    fs.readdirSync(testDir).forEach((file) => {
      fs.rmSync(path.join(testDir, file));
    });
    fs.writeFileSync(
      path.join(testDir, "file3.js"),
      "module.exports = { fn: 3 };"
    );
    const result = autoloadTypes(testDir);
    expect(result).toHaveLength(0);
  });

  it("should return functions exported by files", () => {
    const result = autoloadTypes(testDir);
    expect(result).toHaveLength(2);
    expect(typeof result[0]).toBe("function");
    expect(typeof result[1]).toBe("function");
  });

  it("should return functions that pass the selector", () => {
    const result = autoloadTypes(testDir, {
      selector: (fn: unknown) => (fn as Function)() === 2,
    });
    expect(result).toHaveLength(1);
    expect(result[0]()).toBe(2);
  });
});
