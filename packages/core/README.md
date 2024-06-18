## Overview

This library was created as a foundation for a unique architectural idea. The goal was to unify all CRUD operations into a single codebase, eliminating redundancy and the need for copy/pasting. However, there was a need to specialize some business rules, which led to the concept of features/traits. A trait is a list of dependencies and a function that unites all dependency functionalities into a class, creating a new functionality on top of that. This new functionality can now be used as a dependency. For example, a CRUD service is now a trait and can be extended for more specialization.

## Features

The traitjs library provides the following helper functions:

- `applyTraits`: This function applies the functionality of an array of traits to a class. It allows you to extend a class with multiple traits, combining their functionalities into a single class.
- `compileTraits`: Similar to `applyTraits`, this function also applies the functionality of an array of traits to a class. However, it doesn't expect a class as a parameter. Instead, it creates a new class with the traits applied, starting from the first trait in the array.
- `makeTrait`: This function is used to create a new trait. It allows you to define a trait with a specific set of functionalities. The target parameter provided by `makeTrait` allows TypeScript and IDEs to infer the type of all the functionalities provided by the trait array.

These helper functions in traitjs enable you to easily implement and apply traits to your classes, reducing redundancy and promoting code reuse.

## Usage Examples

### Example 1: Extending a class with CRUD traits

```typescript
import { makeTrait, applyTraits } from '@traitjs/core';

// Create a trait for CRUD operations
const crudTrait = makeTrait((target, options) => {
  return class extends target {
    create() {
      console.log('Create operation');
    }

    read() {
      console.log('Read operation');
    }

    update() {
      console.log('Update operation');
    }

    delete() {
      console.log('Delete operation');
    }
  };
});

class User {}
const UserWithCRUD = applyTraits(User, [crudTrait]);
const user = new UserWithCRUD();
user.create();  // Outputs: Create operation
user.read();  // Outputs: Read operation
user.update();  // Outputs: Update operation
user.delete();  // Outputs: Delete operation
```

### Example 2: Creating a class with CRUD traits

```typescript
import { makeTrait, compileTraits } from '@traitjs/core';

// Create a trait for CRUD operations
const crudTrait = makeTrait((target, options) => {
  return class extends (target ?? Object) {
    create() {
      console.log('Create operation');
    }

    read() {
      console.log('Read operation');
    }

    update() {
      console.log('Update operation');
    }

    delete() {
      console.log('Delete operation');
    }
  };
});

const UserWithCRUD = compileTraits([crudTrait]);
const user = new UserWithCRUD();
user.create();  // Outputs: Create operation
user.read();  // Outputs: Read operation
user.update();  // Outputs: Update operation
user.delete();  // Outputs: Delete operation
```

### Example 3: Creating a trait with overridden functionality

```typescript
import { makeTrait, applyTraits } from '@traitjs/core';

// Create a trait for CRUD operations
const crudTrait = makeTrait((target, options) => {
  return class extends target {
    create() {
      console.log('Create operation');
    }

    read() {
      console.log('Read operation');
    }

    update() {
      console.log('Update operation');
    }

    delete() {
      console.log('Delete operation');
    }
  };
});

// Create a trait that overrides the create functionality and adds a new functionality called readAll
const newTrait = makeTrait(
  (target, options) => {
    return class extends target {
      create() {
        console.log('Overridden create operation');
      }

      readAll() {
        console.log('Read all operation');
      }
    };
  },
  [crudTrait]
);

class User {}
const UserWithTraits = applyTraits(User, [newTrait]);
const user = new UserWithTraits();
user.create();  // Outputs: Overridden create operation
user.read();  // Outputs: Read operation
user.readAll();  // Outputs: Read all operation
user.update();  // Outputs: Update operation
user.delete();  // Outputs: Delete operation
```

## Conclusion

The traitjs library provides a proof of concept for implementing traits in TypeScript. With the help of the provided helper functions, you can experiment with creating and applying traits to your classes, exploring the potential benefits of reducing redundancy and promoting code reuse. It's important to note that this library is not fully polished or finished, and it serves as a starting point for further exploration. Your feedback, additional functionalities, and different perspectives are highly encouraged and welcomed. Feel free to contribute and enhance the traitjs library according to your specific needs and requirements.
