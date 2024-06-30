import { makeAbstractTrait } from "../src/helpers/make-abstract-trait.helper";
import { ITrait } from "../src/interfaces/i-trait.interface";

describe("makeAbstractTrait", () => {
  it("should return an object with traitFn, dependsOn, and abstract properties", () => {
    const traitFn = () => class {};
    const dependsOn: ITrait<any>[] = [];
    const result = makeAbstractTrait(traitFn, dependsOn);

    expect(result).toHaveProperty("traitFn");
    expect(result).toHaveProperty("dependsOn");
    expect(result).toHaveProperty("abstract", true);
  });

  it("should correctly assign the traitFn property", () => {
    const traitFn = () => class {};
    const result = makeAbstractTrait(traitFn);

    expect(result.traitFn).toBe(traitFn);
  });

  it("should correctly assign the dependsOn property", () => {
    const traitFn = () => class {};
    const dependsOn: ITrait<any>[] = [
      { traitFn: () => class {}, dependsOn: [], abstract: true },
    ];
    const result = makeAbstractTrait(traitFn, dependsOn);

    expect(result.dependsOn).toBe(dependsOn);
  });

  it("should set the abstract property to true", () => {
    const traitFn = () => class {};
    const result = makeAbstractTrait(traitFn);

    expect(result.abstract).toBe(true);
  });

  it("should work correctly without dependsOn argument", () => {
    const traitFn = () => class {};
    const result = makeAbstractTrait(traitFn);

    expect(result).toHaveProperty("traitFn");
    expect(result).toHaveProperty("dependsOn", undefined);
    expect(result).toHaveProperty("abstract", true);
  });
});
