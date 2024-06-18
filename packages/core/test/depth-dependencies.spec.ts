import { depthDependencies } from "../src/helpers/depth-dependencies.helper";
import { makeTrait } from "../src/helpers/make-trait.helper";

describe("depthDependencies", () => {
  it("is a function", () => {
    expect(typeof depthDependencies).toBe("function");
  });

  it("should return an empty array if dependsOn is undefined", () => {
    const trait = makeTrait(() => class {});
    expect(depthDependencies(trait)).toEqual([]);
  });

  it("should return an array with dependencies if dependsOn is defined", () => {
    const dependency = makeTrait(() => class {});
    const trait = makeTrait(() => class {}, [dependency]);
    expect(depthDependencies(trait)).toEqual([dependency]);
  });

  it("should return an array with dependencies and their dependencies if dependsOn is defined for them", () => {
    const subDependency = makeTrait(() => class {});
    const dependency = makeTrait(() => class {}, [subDependency]);
    const trait = makeTrait(() => class {}, [dependency]);
    expect(depthDependencies(trait)).toEqual([dependency, subDependency]);
  });
});
