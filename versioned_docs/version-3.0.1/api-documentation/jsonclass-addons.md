---
sidebar_position: 3
---

# JSONClass Addons

These properties and methods are installed to a class after `@jsonclass` is
decorated. These include data transformation, validation, serializing and
presentation.

### Methods

#### `__init__(**kwargs)`

Create an object of this class. The parameters are valid name value pairs.
The keys of valid name value pairs include decoded keys and undecoded keys. It
allows direct input through the web. Transformers and eager validations are
applied.

#### Example

```python
@jsonclass
class User:
    email_address: str
    phone_number: str


User(email_address='john@fillmula.com', phone_number='12345')
# this is valid
User(**{'emailAddress': 'john@fillmula.com', 'phoneNumber': '12345'})
# this is also valid
```

#### `set(**kwargs)`

Set values of some fields of this class to be new values. The parameter is the
same with `__init__` method. It allows direct input through the web.
Transformers and eager validations are applied.

#### Example

```python
@jsonclass
class User:
    email_address: str
    phone_number: str


user.set(email_address='john@fillmula.com', phone_number='12345')
# this is valid
user.set(**{'emailAddress': 'john@fillmula.com', 'phoneNumber': '12345'})
# this is also valid
```

#### `update(**kwargs)`

Set values of some fields of this class to be new values. Only valid object
keys are accepted. It bypasses transformer and eager validations. This is used
for batching update internally. Do not expose this method to the open web.

#### Example

```python
@jsonclass
class User:
    email_address: str
    phone_number: str


user.update(email_address='john@fillmula.com', phone_number='12345')
```

#### `validate(all_fields: bool | None)`

Validate this object. It raises `ValidationException` if some fields of this
object is not valid.

#### Parameters

`all_fields`: Whether validate all fields. The default is `False`.

#### `tojson(ignore_writeonly: bool | None, reverse_relationship: bool : None)`

Convert the object to a dict represents its JSON data.

#### Parameters

`ignore_writeonly`: Include writeonly fields in the output json. Use with
caution. The default value is `False`.

`reverse_relationship`: Whether include reverse relationship in the output
json.

#### `opby(ORMObject)`

Set the operator who is operating on this object. This is used for permission
validation.

#### `reset()`

Reset the values of modified fields to the previous values. It can only be used
when `reset_all_fields` option is on.

#### `save(validate_all_fields: bool | None, skip_validation: bool | None)`

Save the object into the database. This is used with ORM integration.

#### Parameters

`validate_all_fields`: Whether validate all fields when validating.

`skip_validation`: Whether skip the object validation during saving.

#### `delete()`

Delete the object from the database. This is used with ORM integration.

#### `complete()`

When this object is partial, fetch the underlying database and get a full
object representation.

### Properties

#### `is_new`

Whether this object is newly created and hasn't been saved into database yet.
This is used with ORM integration.

#### `is_modified`

Whether this object is modified. This is used with ORM integration.

#### `is_valid`

Whether this object is valid. This triggers the validating process.

#### `is_partial`

An object is partial if it's fetched from database with `pick` and `omit`. This
is used with ORM integration.

#### `is_deleted`

Whether this object is deleted from the database. This is used with ORM
integration.
