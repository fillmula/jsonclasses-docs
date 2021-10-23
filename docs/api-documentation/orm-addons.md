---
sidebar_position: 5
---

# ORM Addons

These properties and methods are installed to a JSON class after ORM decorators
like `@jsonclass` is decorated. These include data querying and persistence.
Currently only MongoDB through `pymongo` is supported. SQL databases will be
supported in the future.

### Class Methods

#### `find(*args, **kwargs)`

Find the objects which matches from the database. It returns a list of matched
objects.

#### Parameters

You can pass any of listed parameters to this method.
1. Named parameters represents the fields or processing instructions.
2. A dict contains named parameters.
3. A qsparser style query string which represents the dict above.

Values of fields are considered in this way:
1. Value of fields can be direct values, in this case, a direct equal match is
performed.
2. Value of fields can be a descriptor which describes the query creteria. See
the following example.
3. For referenced fields, virtual ids are accepted. See the following example.

Processing instructions are root level keys with `_` prefixed.

#### Example

```python
@jsonenum
class Sex(Enum):
    MALE = 1
    FEMALE = 2


@pymongo
@jsonclass
class Artist:
    id: str = types.readonly.str.primary.mongoid.required
    name: str
    birthday: date
    sex: Sex
    albums: Annotated[list[Album], linkedthru('artists')]
    created_at: datetime = types.readonly.datetime.tscreated.required
    updated_at: datetime = types.readonly.datetime.tsupdated.required


@pymongo
@jsonclass
class Album:
    id: str = types.readonly.str.primary.mongoid.required
    name: str
    year: int
    artists: Annotated[list[Artist], linkedthru('albums')]
    created_at: datetime = types.readonly.datetime.tscreated.required
    updated_at: datetime = types.readonly.datetime.tsupdated.required


Artist.find(sex='MALE')
# find all male artists.
Album.find(year=2021, name={'_prefix': 'A'})
# find all albums with name starts with 'A' in 2021.
Album.find(artist_ids={'_or': ['<...id of A>', '<...id of B>']})
# find all albums by artist A and all albums by artist B.
Album.find(artist_ids={'_and': ['<...id of A>', '<...id of B>']})
# find all albums that is performed by both artist A and artist B.
Artist.find({'_pageNumber': 1, '_pageSize': 30, '_order': 'name'})
# find the first 30 artists in the database ordered by name.
Artist.find({'_pageNumber': 1, '_pageSize': 20, '_order': '-createdAt'})
# find the newest 20 artists in the database.
Album.find(name={'_contains': 'Star'}, _includes=['artists'])
# find the albums which name contains 'Star', with artists included and returned.
Album.find({'_pick': ['name']})
# find all albums but only return its name, ignores anything other than that.
```

#### `one(*args, **kwargs)`

Find one object which matches from the database. Raises
`ObjectNotFoundException` if not found. The usage is same with `find`. It
returns the first object that matches.

#### `id(id, *args, **kwargs)`

Find one object by id. Raises `ObjectNotFoundException` if not found. It can
take some of find processing instructions including `_omit`, `_pick` and
`includes`.

#### `linked`

This is used for passing processing instructions inside of the `include` query
method.

#### Query Methods

#### Value Descriptors

#### Processing Instructions
