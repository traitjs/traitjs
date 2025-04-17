import { makeTrait } from "@traitjs/core";
import { compileFeatures } from "../src/helpers/compile-features.helper";
import { IFeature } from "../src/types/i-feature.type";

describe("compileFeatures", () => {
  let provideFeatureAs: any;
  let features: IFeature<any>[];
  let options: Partial<any>;

  beforeEach(() => {
    const traitA1 = makeTrait((_, options: any) => {
      return class {
        traitA1 = "A1";
      };
    }, []);
    const traitA2 = makeTrait(
      (target, options: any) => {
        return class extends target {
          traitA2 = "A2";
        };
      },
      [traitA1]
    );

    const traitB1 = makeTrait((_, options: any) => {
      return class {
        traitB1 = "B1";
      };
    }, []);

    const traitC1 = makeTrait((_, options: any) => {
      return class {
        traitC1 = "C1";
      };
    }, []);

    provideFeatureAs = {
      key1: jest.fn(() => "key1-provider"),
      key2: jest.fn(() => "key2-provider"),
      key3: jest.fn(() => "key3-provider"),
    };

    features = [
      { key1: traitA1, key2: traitB1 },
      { key1: traitA2, key3: traitC1 },
    ];
    options = { opt1: "value1", opt2: "value2" };
  });

  it("should be defined", () => {
    expect(compileFeatures).toBeDefined();
  });

  it("should return an object", () => {
    const result = compileFeatures({ provideFeatureAs, features, options });
    expect(typeof result).toBe("object");
  });

  it("should correctly compile features and options into a result object", () => {
    const result = compileFeatures({ provideFeatureAs, features, options });

    expect(result).toHaveProperty("key1");
    expect(result.key1).toHaveProperty("provide");
    expect(result.key1.provide).toBe("key1-provider");
    expect(result.key1).toHaveProperty("useClass");
    expect(result.key1.useClass).toBeDefined();
    const k1Instance = new result.key1.useClass();
    expect(k1Instance).toHaveProperty("traitA1");
    expect(k1Instance.traitA1).toBe("A1");
    expect(k1Instance).toHaveProperty("traitA2");
    expect(k1Instance.traitA2).toBe("A2");

    expect(result).toHaveProperty("key2");
    expect(result.key2).toHaveProperty("provide");
    expect(result.key2.provide).toBe("key2-provider");
    expect(result.key2).toHaveProperty("useClass");
    expect(result.key2.useClass).toBeDefined();
    const k2Instance = new result.key2.useClass();
    expect(k2Instance).toHaveProperty("traitB1");
    expect(k2Instance.traitB1).toBe("B1");

    expect(result).toHaveProperty("key3");
    expect(result.key3).toHaveProperty("provide");
    expect(result.key3.provide).toBe("key3-provider");
    expect(result.key3).toHaveProperty("useClass");
    expect(result.key3.useClass).toBeDefined();
    const k3Instance = new result.key3.useClass();
    expect(k3Instance).toHaveProperty("traitC1");
    expect(k3Instance.traitC1).toBe("C1");
  });
});
