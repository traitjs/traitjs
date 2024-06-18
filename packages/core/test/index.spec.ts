import * as index from "../index";

describe("Index", () => {
  it("should export makeTrait", () => {
    expect(index.makeTrait).toBeDefined();
  });

  it("should export compileTraits", () => {
    expect(index.compileTraits).toBeDefined();
  });
});
