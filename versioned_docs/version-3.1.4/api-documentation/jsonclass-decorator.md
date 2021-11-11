---
sidebar_position: 2
---

# JSONClass Decorator

`@jsonclass` is used to decorate a plain Python class. After decorated, a class
gains the JSONClasses standard methods and properties. The parameters represent
a JSON class' configuration. All parameters are optional.

### Parameters

#### `class_graph: str | None`

On which class graph this JSON class is defined. The default value is
`'default'`.

#### `key_encoding_strategy: Callable[[str], str] | None`

The encoding strategy for converting class field name to JSON field name. The
default behavior is camelize.

#### `key_decoding_strategy: Callable[[str], str] | None`

The decoding strategy for converting JSON field name to class field name. The
default behavior is underscore.

#### `camelize_json_keys: bool | None`

This is a shortcut to both `key_encoding_strategy` and `key_decoding_strategy`.
When it's false, `key_encoding_strategy` and `key_decoding_strategy` uses
identical behavior: no converting is happened.

#### `strict_input: bool | None`

This option controls the strictness behavior of a JSON class. When it's true,
on initializing or `set`, unallowed keys are raised. When it's false, on
initializing or `set`, unallowed keys are ignored. The default value is `True`.

#### `validate_all_fields: bool | None`

Whether validate all fiends by default on `validate` and `save`. The default
behavior is false. If a JSON class represents a front end form, you may want
to set this to `True` to get a form validation behavior.

#### `abstract: bool | None`

Whether this class is abstract and can only be inherited. The default is false.
If you've written a class for other classes to inherit, you may set this to
true to disable initializing directly on the abstract parent class.

#### `reset_all_fields: bool | None`

Whether automatically records the values before changing for each embedded
field. The default value is false. If this is true, you can call `reset` method
to reset every value back to it's previous value.

#### `output_null: bool | None`

On `tojson`, whether output null values or leaving field unexisting. The
default value is false.

#### `can_create: Types | Callable[[JObject, ORMObject], bool | str | None] | None`

On permission validation, whether this operator can create objects of this
class. When using callable form, the first parameter is the object being
created. The second parameter is the operator. Returning `True` or `None`
indicates this operation is permitted. Returning `False` or `str` indicates
this operation is disallowed.

#### `can_update: Types | Callable[[JObject, ORMObject], bool | str | None] | None`

On permission validation, whether this operator can update objects of this
class. When using callable form, the first parameter is the object being
created. The second parameter is the operator. Returning `True` or `None`
indicates this operation is permitted. Returning `False` or `str` indicates
this operation is disallowed.

#### `can_delete: Types | Callable[[JObject, ORMObject], bool | str | None] | None`

On permission validation, whether this operator can delete objects of this
class. When using callable form, the first parameter is the object being
created. The second parameter is the operator. Returning `True` or `None`
indicates this operation is permitted. Returning `False` or `str` indicates
this operation is disallowed.

#### `can_read: Types | Callable[[JObject, ORMObject], bool | str | None] | None`

On permission validation, whether this operator can read objects of this
class. When using callable form, the first parameter is the object being
created. The second parameter is the operator. Returning `True` or `None`
indicates this operation is permitted. Returning `False` or `str` indicates
this operation is disallowed.
