import { makeTrait } from "../src/helpers/make-trait.helper";
import { normalizeTraits } from "../src/helpers/normalize-traits.helper";

describe("normalizeTraits", () => {
  const noDependencyTrait = makeTrait((_, options: any) => {
    return class {};
  }, []);
  const trait1 = makeTrait((_, options: any) => {
    return class {};
  }, []);
  const trait2 = makeTrait(
    (target, options: any) => {
      return class extends target {};
    },
    [trait1]
  );
  const trait3 = makeTrait(
    (target, options: any) => {
      return class extends target {};
    },
    [trait2]
  );

  it("is a function", () => {
    expect(typeof normalizeTraits).toBe("function");
  });

  it("returns an empty array if no traits are provided", () => {
    const result = normalizeTraits([]);
    expect(result).toEqual([]);
  });

  it("returns the provided trait if only one trait is provided", () => {
    const trait = makeTrait((_, options: any) => {
      return class {};
    }, []);

    const result = normalizeTraits([trait]);
    expect(result).toEqual([trait]);
  });

  it("adds all dependencies when only one trait is provided", () => {
    const result = normalizeTraits([trait3]);

    expect(result).toEqual([trait1, trait2, trait3]);
  });

  it("sorts traits based on their dependencies", () => {
    const result = normalizeTraits([noDependencyTrait, trait3, trait1, trait2]);

    expect(result).toEqual([noDependencyTrait, trait1, trait2, trait3]);
  });

  it("traits with no dependencies must be at the start of the array", () => {
    const result = normalizeTraits([trait3, trait1, trait2, noDependencyTrait]);

    expect(result).toEqual([trait1, noDependencyTrait, trait2, trait3]);
  });

  it("removes duplicate traits", () => {
    const result = normalizeTraits([
      trait3,
      trait1,
      noDependencyTrait,
      trait3,
      trait2,
      trait1,
      noDependencyTrait,
      trait2,
      trait3,
    ]);

    expect(result).toEqual([trait1, noDependencyTrait, trait2, trait3]);
  });
});
