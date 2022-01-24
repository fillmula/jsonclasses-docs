---
sidebar_position: 6
---

# Server API Decorator

`@api` is used to decorate a ORM integrated JSON class. Routes are generated
for the decorated classes. It's usually put on top of ORM integration
decorator. The parameters represent a route configuration. All parameters are
optional.

### Parameters

#### `name: str | None`

The base route used for the class. By default it's pluralized hyphen-concated.

#### `enable: str | None`

The generated routes for the class. The default value is `'CRUDL'`.

#### `disable: str | None`

Do not generate listed routes for this class. The default value is `None`.

#### `class_name_to_pathname: Callable[[str], str] | None`

The function for convert class name to pathname. By default it's pluralized
hyphen-concated.
