import { compileTraits } from "../src/helpers/compile-traits.helper";
import { makeAbstractTrait } from "../src/helpers/make-abstract-trait.helper";
import { makeTrait } from "../src/helpers/make-trait.helper";

describe("compileTraits", () => {
  it("is a function", () => {
    expect(typeof compileTraits).toBe("function");
  });

  it("returns a class {} when no traits are provided", () => {
    const result = compileTraits([], {});
    const instance = new result();
    expect(result).toBeInstanceOf(Function);
    expect(Object.keys(instance)).toHaveLength(0);
  });

  it("returns the result of the first trait if only one trait is provided", () => {
    const trait = makeTrait((_, options: any) => {
      return class {};
    }, []);

    const result = compileTraits([trait], {});
    expect(result).toBeInstanceOf(Function);
  });

  it("should have all functionalities from all traits", () => {
    class Empty {}
    const trait1 = makeAbstractTrait((target, options) => {
      abstract class Trait1 extends (target ?? Empty) {
        trait1 = 1;
        traitfn1() {}
      }
      return Trait1;
    }, []);
    const looseTrait = makeTrait((target, options: any) => {
      return class extends (target ?? Empty) {
        looseTrait = -1;
        looseTraitFn() {}
      };
    }, []);
    const trait2 = makeTrait(
      (target, options) =>
        class extends target {
          trait2 = 2;
          traitfn2() {}
        },
      [trait1]
    );
    const trait3 = makeTrait(
      (target, options) =>
        class extends target {
          trait3 = 3;
          traitfn3() {}
        },
      [trait2]
    );

    const result = compileTraits([trait3, trait1, trait2, looseTrait], {});
    const instance = new (result as any)();

    // Che if the result has all functionalities
    expect(instance.trait1).toBe(1);
    expect(instance.trait2).toBe(2);
    expect(instance.trait3).toBe(3);
    expect(instance.looseTrait).toBe(-1);
    expect(instance).toHaveProperty("traitfn1");
    expect(instance.traitfn1).toBeInstanceOf(Function);
    expect(instance).toHaveProperty("traitfn2");
    expect(instance.traitfn2).toBeInstanceOf(Function);
    expect(instance).toHaveProperty("traitfn3");
    expect(instance.traitfn3).toBeInstanceOf(Function);
    expect(instance).toHaveProperty("looseTraitFn");
    expect(instance.looseTraitFn).toBeInstanceOf(Function);
  });
});
