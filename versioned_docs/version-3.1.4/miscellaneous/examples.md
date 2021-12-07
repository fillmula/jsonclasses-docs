---
sidebar_position: 3
---

# Examples

You may want to know what JSONClasses is and how it can be used. The best way to introduce is providing examples.

## A Validation Example

A simplest JSONClasses usage looks like this. This is quite similar to pydantic however JSONClasses has more
natural and intuitive syntax.

```python
@jsonclass
class UserInput:
    email: str = types.str.email.required
    password: str = types.str.securepw.length(8, 16).required
    theme_color: str = types.str.hexcolor.default('007aff').required


user_input = UserInput(**input)
user_input.validate()
```

## A Database Example

JSONClasses has database integrated. In this example, the data is structured as `Article` class with field definitions. The detailed typing, validating and transforming rules are written in the intuitive chained pipelines. The class also gains ORM integration functionalities through the magical decorator `@pymongo`.
```python
@pymongo
@jsonclass
class Article:
    id: str = types.readonly.str.primary.mongoid.required
    name: str = types.str.trim.minlength(2).required
    content: str = types.str.minlength(300).required


article = Article(name='Name', content='Content')
article.save()
```

## A Server Example

JSONClasses generates default RESTful API routes for its models. An `@api` decorator is used to do the magic.
It can be integrated into Flask or FastAPI.

```python
@authorized
@api
@pymongo
@jsonclass
class User:
    id: str = types.readonly.str.primary.mongoid.required
    email: str = types.str.email.authidentity.unique.required
    password: str = types.writeonly.str.securepw.length(8, 16).salt.authbycheckpw.required
    articles: list[Article] = types.listof('Article').linkedby('author')


@api
@pymongo
@jsonclass
class Article:
    id: str = types.readonly.str.primary.mongoid.required
    name: str = types.str.trim.minlength(2).required
    content: str = types.str.minlength(300).required
    author: User = types.objof('User').linkto.required


flask_app = create_flask_server()
fastapi_app = create_fastapi_server()
```
