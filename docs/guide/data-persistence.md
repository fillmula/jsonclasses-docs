---
sidebar_position: 5
---

# Data Persistence

It makes sense that validated and processed data can be serialized and persisted. Currently JSONClasses supports MongoDB integration with pymongo. SQL and other no-SQL databases will be supported in the future.

MongoDB has the most natural way to save JSON data. To support saving objects into MongoDB, simply add a pymongo magical decorator and a primary field.
```python
@pymongo
@jsonclass
class Article:
    id: str = types.readonly.str.primary.mongoid.required
    title: str
    content: str
    author: User = types.objof('User').linkto.required
```
The usage of the object is barely the same, except there is some additional attributes and an additional method named save. By calling it, the validation process is triggered, then the serialization process is triggered. After these two stages are passed, the object and it's modified linked objects are serialized into database.
article = Article(title='My Article', content='Article Content...', author=current_user)article.save() # article and user are saved into the database

## Timestamps
You may want timestamp fields like `created_at` and `updated_at`. It's simple to write them on your own.
```python
@pymongo
@jsonclass
class Article:
    id: str = types.readonly.str.primary.mongoid.required
    title: str
    content: str
    author: User = types.objof('User').linkto.required
    created_at: datetime = types.readonly.datetime.tscreated.required
    updated_at: datetime = types.readonly.datetime.tsupdated.required
```

## Custom Database Table Name
You can pass configurations to `@pymongo` just like how we can do to `jsonclass`. By default, the database table name is the pluralized and lowercased class name.
```python
@pymongo(collection_name='myarticles')
@jsonclass
class Article:
    id: str = types.readonly.str.primary.mongoid.required
    title: str
    content: str
    author: User = types.objof('User').linkto.required
    created_at: datetime = types.readonly.datetime.tscreated.required
    updated_at: datetime = types.readonly.datetime.tsupdated.required
```
## Object Key Encoding Strategy

By default, object keys are camelized and serialized into MongoDB. You can disable this behavior.
```python
@pymongo(camelize_db_keys=False)
@jsonclass
class Article:
    id: str = types.readonly.str.primary.mongoid.required
    title: str
    content: str
    author: User = types.objof('User').linkto.required
    created_at: datetime = types.readonly.datetime.tscreated.required
    updated_at: datetime = types.readonly.datetime.tsupdated.required
```

## Connecting the Database
At the beginning of your server's `app.py`, add this line. Passing your url and authentication settings into the connection configuration.
```python
Connection.default.set_url('mongodb://localhost:27017/yourdb')
```
