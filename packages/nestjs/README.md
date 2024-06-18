# TraitJS/NestJS

TraitJS/NestJS is a library that provides a foundation for a unique architectural idea in NestJS applications. It aims to unify all CRUD operations into a single codebase, eliminating redundancy and the need for copy/pasting. It introduces the concept of features/traits, where a trait is a list of dependencies and a function that unites all dependency functionalities into a class, creating a new functionality on top of that.

## Features

TraitJS/NestJS provides the following key features:

- **Feature/Trait System**: This system allows you to define a set of functionalities (traits) that can be applied to a class (feature). This promotes code reuse and reduces redundancy.

- **CRUD Module Factory**: This helper function allows you to create a NestJS module with CRUD operations. It takes a set of default options and a collection of feature options, and returns a NestJS module with the specified features.

- **Compile Features**: This helper function compiles a set of features into a single object, which can be used to provide the features as dependencies in a NestJS module.

- **Autoload Types**: This helper function allows you to automatically load all types from a specified path. This can be useful for automatically loading all features from a directory.

- **Provide Feature As**: This helper function allows you to define how a feature should be provided as a dependency in a NestJS module. This can be useful for customizing the way features are provided in a module.

## Usage Examples

### Example: Creating a CRUD Module

```typescript
import { crudModuleFactory } from 'traitjs/nestjs';

interface ICrudFeature
  extends IFeature<ICrudOptions<Type<any>>, string> {
  controller?: ITrait<ICrudOptions<Type<any>>>;
  service?: ITrait<ICrudOptions<Type<any>>>;
  repository?: ITrait<ICrudOptions<Type<any>>>;
}

const crudFeature: ICrudFeature = {
  controller: makeTrait(
    (_, options: ICrudOptions<Type<any>>) => {
      return class BaseController {
      };
    },
  ),
  service: makeTrait(
    (_, options: ICrudOptions<Type<any>>) => {
      return class BaseService {
      };
    },
  ),
  repository: makeTrait(
    (_, options: ICrudOptions<Type<any>>) => {
      return class BaseRepository {
      };
    },
  ),
};

// Define the default options for the module
const defaultOptions = {
  features: [crudFeature],
  options: {anything: 'default'},
  provideFeatureAs: {
    controller: () => '',
    repository: ({ entity }: ICrudOptions<Type<any>>) =>
      crudRepositoryNameFor(entity),
    service: ({ entity }: ICrudOptions<Type<any>>) =>
      crudServiceNameFor(entity),
  },
  controllers: ['controller'],
  providers: ['service', 'repository'],
  exports: ['service', 'repository'],
};

// Create the module
const CrudModule = crudModuleFactory(defaultOptions);
```

In this example, `crudModuleFactory` is used to create a NestJS module with CRUD operations. The `defaultOptions` object defines the default options for the module, and the `featureOptions` object defines the options for the feature. The resulting `CrudModule` can be used as a NestJS module.

### Example: Using a CRUD Module

```typescript
import { Module } from '@nestjs/common';
import { CrudModule } from './crud.module';

class TestEntity {}

@CrudModule({
  featureOptions: {
    entity: TestEntity,
    anyOption: 'value',
    anything: 'override',
  },
})
export class AppModule {}
```

In this example, the `CrudModule` is used as a NestJS module in the `AppModule`. The `featureOptions` object specifies the options for the feature, including the entity type and other options.

## Conclusion

TraitJS/NestJS provides a unique approach to structuring your NestJS applications. By using features and traits, you can reduce redundancy and promote code reuse in your application. This library is a proof of concept and serves as a starting point for further exploration. Your feedback, additional functionalities, and different perspectives are highly encouraged and welcomed. Feel free to contribute and enhance the TraitJS/NestJS library according to your specific needs and requirements.