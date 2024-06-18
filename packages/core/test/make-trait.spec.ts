import { ITrait } from "../src/interfaces/i-trait.interface";
import { makeTrait } from "../src/helpers/make-trait.helper";

describe("makeTrait", () => {
  it("is a function", () => {
    expect(typeof makeTrait).toBe("function");
  });

  it("should return an object with traitFn and dependsOn properties", () => {
    const mockTraitFn = jest.fn();
    const mockDependsOn: ITrait<any>[] = [];

    const result = makeTrait(mockTraitFn, mockDependsOn);

    expect(result).toHaveProperty("traitFn");
    expect(result).toHaveProperty("dependsOn");
  });

  it("should correctly assign the provided trait function and dependencies to the returned object", () => {
    const mockTraitFn = jest.fn();
    const mockDependsOn: ITrait<any>[] = [];

    const result = makeTrait(mockTraitFn, mockDependsOn);

    expect(result.traitFn).toBe(mockTraitFn);
    expect(result.dependsOn).toBe(mockDependsOn);
  });
});
