---
sidebar_position: 4
---

# Pymongo Decorator

`@pymongo` is used to decorate a JSON class. Decorated classes gain the
standard JSONClasses ORM methods with MongoDB and pymongo underhood. It's
usually put on top of `@jsonclass` decorator. The parameters represent a JSON
class' database configuration. All parameters are optional.

### Parameters

#### `collection_name: str | None`

When this value is set, the underlying database table or collection uses this
table name or collection name rather than the default generated table or
collection name. The default value is `None`.

#### `camelize_db_keys: str | None`

Whether camelize database field names and reference id names when serializing
to the database. The default value is `True`.
