import { isDependentOn } from "../src/helpers/is-dependent-on.helper";
import { makeTrait } from "../src/helpers/make-trait.helper";
import { ITrait } from "../src/interfaces/i-trait.interface";

describe("isDependentOn", () => {
  it("is a function", () => {
    expect(typeof isDependentOn).toBe("function");
  });

  it("should return false if a does not depend on b", () => {
    const a = makeTrait(() => class {});
    const b = makeTrait(() => class {});
    expect(isDependentOn(a, b)).toEqual(false);
  });

  it("should return true if a directly depends on b", () => {
    const b = makeTrait(() => class {});
    const a = makeTrait(() => class {}, [b]);
    expect(isDependentOn(a, b)).toEqual(true);
  });

  it("should return true if a indirectly depends on b", () => {
    const b = makeTrait(() => class {});
    const intermediary = makeTrait(() => class {}, [b]);
    const a = makeTrait(() => class {}, [intermediary]);
    expect(isDependentOn(a, b)).toEqual(true);
  });

  it("should return false if a and b are the same trait", () => {
    const a = makeTrait(() => class {});
    expect(isDependentOn(a, a)).toEqual(false);
  });
});
