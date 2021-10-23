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


Artist.find(sex='MALE').exec()
# find all male artists.
Album.find(year=2021, name={'_prefix': 'A'}).exec()
# find all albums with name starts with 'A' in 2021.
Album.find(artist_ids={'_or': ['<...id of A>', '<...id of B>']}).exec()
# find all albums by artist A and all albums by artist B.
Album.find(artist_ids={'_and': ['<...id of A>', '<...id of B>']}).exec()
# find all albums that is performed by both artist A and artist B.
Artist.find({'_pageNumber': 1, '_pageSize': 30, '_order': 'name'}).exec()
# find the first 30 artists in the database ordered by name.
Artist.find({'_pageNumber': 1, '_pageSize': 20, '_order': '-createdAt'}).exec()
# find the newest 20 artists in the database.
Album.find(name={'_contains': 'Star'}, _includes=['artists']).exec()
# find the albums which name contains 'Star', with artists included and returned.
Album.find({'_pick': ['name']}).exec()
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

### Query Methods

#### `include(name: str, query: ORMQuery | None)`

Include linked fields in the results.

#### Example

```python
@jsonenum
class Sex(Enum):
    MALE = 1
    FEMALE = 2


@pymongo
@jsonclass
class Author:
    id: str = types.readonly.str.primary.mongoid.required
    name: str
    articles: Annotated[list[Article], linkedby('user')]
    created_at: datetime = types.readonly.datetime.tscreated.required
    updated_at: datetime = types.readonly.datetime.tsupdated.required


@pymongo
@jsonclass
class Article:
    id: str = types.readonly.str.primary.mongoid.required
    title: str
    content: str
    author: Annotated[Artist, linkto]
    created_at: datetime = types.readonly.datetime.tscreated.required
    updated_at: datetime = types.readonly.datetime.tsupdated.required


Article.find().include('author', Author.linked({'_pick': ['id', 'name']})).exec()
# find all articles includes author name.
Author.find().include('articles', Article.find().pick(['id', 'title'])).exec()
# find all authors includes article titles.
```

#### `order(field_name: str, sort: 1 | -1 | None)`

Order the query results by field named `field_name`.

#### Example

```python
Article.find().order('created_at').exec()
# find all articles, old ones first.
Article.find().order('created_at', -1).exec()
# find all articles, new ones first.
```

#### `skip(n: int)`

Skip the first `n` matched objects in the result.

#### Example

```python
Article.find().skip(50).exec()
# find all articles, except the first 50.
```

#### `limit(n: int)`

Only return `n` records if matched results are more than `n`.

#### Example

```python
Article.find().limit(5).exec()
# find only 5 results.
```

#### `page_number(n: int)` | `page_no(n: int)`

Return the `n`th page of the results.

#### Example

```python
Article.find().page_number(2).exec()
# find the results of the 2nd page.
```

#### `page_size(n: int)`

Set the page size used to calculate page numbers.

#### Example

```python
Article.find().page_size(30).page_number(1).exec()
# find the first 30 records.
```

#### `pick(field_names: list[str])`

Only return picked fields in the result.

#### Example

```python
Article.find().pick(['title', 'content']).exec()
# only return title and content in the result.
```

#### `omit(field_names: list[str])`

Do not return listed fields in the result.

#### Example

```python
Article.find().omit(['createdAt', 'updatedAt']).exec()
# do not include timestamps in the result.
```

#### `avg(field_name: str)`

Get the average value for matched records on field named `field_name`.

#### `min(field_name: str)`

Get the minimum value for matched records on field named `field_name`.

#### `max(field_name: str)`

Get the maximum value for matched records on field named `field_name`.

#### `sum(field_name: str)`

Get the sum value for matched records on field named `field_name`.

#### `pages()`

Get the number of pages for matched records.

#### Example

```python
Article.find(author_id="<...Author Id...>").page_size(20).pages().exec()
```

#### `optional`

Turn single query or id query into optional query. It will return `None`
instead of raise error when object is not found.

#### Example

```python
Article.one(author_id="<...Author Id...>").optional.exec()
```

#### `exec()`

Execute this query.

### Value Descriptors

#### String Descriptors

#### Number Descriptors

#### Datetime Descriptors

#### Enum Descriptors

### Processing Instructions

These processing instructions are used inside `find`, `one` or `id` method. It
represents the features provided by query methods. This allows direct query
from the web.
