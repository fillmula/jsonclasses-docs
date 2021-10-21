---
sidebar_position: 3
---

# Data Transformation

Data transformation is performed automatically when you call initializer.
```python
@jsonclass
class StringEntry:
    name: str
    value: str = types.str.trim.required


entry = StringEntry(name='Page Title', value=' \n My Title  \n  ')
# name: 'Page Title', value: 'My Title'
```
Data transformation is also performed when you call the `set` method.
```python
@jsonclass
class StringEntry:
    name: str
    value: str = types.str.trim.required


entry = StringEntry(**input)
entry.set(name='Page Title', value=' \n My Title  \n  ')
# name: 'Page Title', value: 'My Title'
```
## Avoid the Transformation

To avoid the transforming behavior, use `update` method or assign on the property directly. You may not want to expose these calls to web API, thus keep it private and only use them internally.
```python
@jsonclass
class StringEntry:
    name: str
    value: str = types.str.trim.required


entry = StringEntry(name='Page Title', value=' \n My Title  \n  ')
entry.update(value='  Padded Title')
# name: 'Page Title', value: '  Padded Title  '
```

## Transformation Modifiers

By default, data type modifiers like `enum`, `date` and `datetime` transforms raw and network input into the correct type. There are a lot of common and useful modifiers like `trim`, `tolower`, `toupper`, etc... For a complete list of validation modifiers, see [Types Modifiers]("...).

## Custom Transformers

If builtin transformers don't satisfy your transformation requirements, you can use the `transform` transformer with a custom callback.
```python
@jsonclass
class User:
    username: str = types.str.tolower.required
    password: str = types.writeonly.str.length(8, 16).transform(salt).required
```

## Eager Validation

In the previous example, the password is validated against `length(8, 16)` on initialization stage. This is because when `salt` is performed, the value wouldn't be within the length range anymore. This technic in JSONClasses is called Eager Validation.

## Uploader Callback

The `transform` modifier has a syntax sugar named `uploader`. This provides more readability when you are uploading multipart form data network input. In this case, your transform callback should take a file as it's argument and return an uploaded url.
```python
@jsonclass
class Article:
    title: str
    content: str
    cover: str = types.uploader(s3_uploader).str.url.required
```
