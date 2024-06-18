# TraitJS/Core & TraitJS/NestJS

TraitJS/NestJS and TraitJS/Core are libraries that provide an unconventional architectural approach in TypeScript and NestJS applications. They aim to streamline CRUD operations by introducing the concept of features/traits. A trait is a list of dependencies and a function that combines their functionalities into a class, creating new functionality on top of existing code. This approach promotes code reuse and reduces redundancy in your application.

## Features

TraitJS/NestJS and TraitJS/Core provide the following key features:

- **Feature/Trait System**: This system allows you to define a set of functionalities (traits) that can be applied to a class (feature). This promotes code reuse and reduces redundancy.

- **Apply Traits**: This function applies the functionality of an array of traits to a class. It allows you to extend a class with multiple traits, combining their functionalities into a single class.

- **Compile Traits**: Similar to `applyTraits`, this function also applies the functionality of an array of traits to a class. However, it doesn't expect a class as a parameter. Instead, it creates a new class with the traits applied, starting from the first trait in the array.

- **Make Trait**: This function is used to create a new trait. It allows you to define a trait with a specific set of functionalities. The target parameter provided by `makeTrait` allows TypeScript and IDEs to infer the type of all the functionalities provided by the trait array.

- **CRUD Module Factory**: This helper function allows you to create a NestJS module with CRUD operations. It takes a set of default options and a collection of feature options, and returns a NestJS module with the specified features.

- **Compile Features**: This helper function compiles a set of features into a single object, which can be used to provide the features as dependencies in a NestJS module.

- **Autoload Types**: This helper function allows you to automatically load all types from a specified path. This can be useful for automatically loading all features from a directory.

- **Provide Feature As**: This helper function allows you to define how a feature should be provided as a dependency in a NestJS module. This can be useful for customizing the way features are provided in a module.

## Usage Examples

- [@traitjs/code](./packages/core/README.md)
- [@traitjs/nestjs](./packages/nestjs/README.md)

## Conclusion

TraitJS/NestJS and TraitJS/Core provide an unconventional approach to structuring your TypeScript and NestJS applications. By using features and traits, you can reduce redundancy and promote code reuse in your application. These libraries serve as a starting point for further exploration and are open to feedback, additional functionalities, and different perspectives. Contributions are highly encouraged and welcomed to enhance the TraitJS/NestJS and TraitJS/Core libraries according to specific needs and requirements.
