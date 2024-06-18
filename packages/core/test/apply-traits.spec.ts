import { applyTraits } from "../src/helpers/apply-traits.helper";
import { makeTrait } from "../src/helpers/make-trait.helper";

describe("applyTraits", () => {
  const target = class {
    targetProp = 0;
    targetFn() {
      return "targetFn";
    }
  };

  it("is a function", () => {
    expect(typeof applyTraits).toBe("function");
  });

  it("returns target when no trait is provided", () => {
    const result = applyTraits(target, [], {});
    expect(result).toBe(target);
  });

  it("should have all functionalities from all traits", () => {
    const trait1 = makeTrait(
      (target, options) =>
        class extends (target ?? Object) {
          trait1 = 1;
          traitfn1() {
            return "traitfn1";
          }
        },
      []
    );
    const looseTrait = makeTrait((target, options: any) => {
      return class extends (target ?? Object) {
        looseTrait = -1;
        looseTraitFn() {
          return "looseTraitFn";
        }
      };
    }, []);
    const trait2 = makeTrait(
      (target, options) =>
        class extends target {
          trait2 = 2;
          traitfn2() {
            return "traitfn2";
          }
        },
      [trait1]
    );
    const trait3 = makeTrait(
      (target, options) =>
        class extends target {
          trait3 = 3;
          traitfn3() {
            return "traitfn3";
          }
        },
      [trait2]
    );

    const result = applyTraits(
      target,
      [trait3, trait1, trait2, looseTrait],
      {}
    );
    const instance = new (result as any)();

    expect(instance.targetProp).toBe(0);
    expect(instance).toHaveProperty("targetFn");
    expect(instance.targetFn).toBeInstanceOf(Function);
    expect(instance.targetFn()).toBe("targetFn");

    expect(instance.trait1).toBe(1);
    expect(instance).toHaveProperty("traitfn1");
    expect(instance.traitfn1).toBeInstanceOf(Function);
    expect(instance.traitfn1()).toBe("traitfn1");

    expect(instance.trait2).toBe(2);
    expect(instance).toHaveProperty("traitfn2");
    expect(instance.traitfn2).toBeInstanceOf(Function);
    expect(instance.traitfn2()).toBe("traitfn2");

    expect(instance.trait3).toBe(3);
    expect(instance).toHaveProperty("traitfn3");
    expect(instance.traitfn3).toBeInstanceOf(Function);
    expect(instance.traitfn3()).toBe("traitfn3");

    expect(instance.looseTrait).toBe(-1);
    expect(instance).toHaveProperty("looseTraitFn");
    expect(instance.looseTraitFn).toBeInstanceOf(Function);
    expect(instance.looseTraitFn()).toBe("looseTraitFn");
  });
});
