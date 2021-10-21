---
sidebar_position: 1
---

# Data Type Definition

> Structured data in JSONClasses are defined with Python class syntax and type hint.

## The Decorated Class

Defining your data with JSONClasses is rather simple.
```python
@jsonclass
class Cat:
    name: str
    birthday: date
    weight: float
```
Declare a normal Python class, with magical `@jsonclass` decorator. There you get full power of JSONClasses.
```python
tom = Cat(name='Tom', birthday='2020-08-31', weight=5.4)
```

## Default Value

You can specify default value on class definition.
```python
@jsonclass
class Dog:
    name: str
    age: int
    is_sold: bool = false
    buyer_name: Optional[str]
```
Therefore, on object creation, a default value will be assigned if it's not provided.
```python
buddy = Dog(name='Buddy', age=1)
```

## Primitive Data Types

JSONClasses supports `str`, `int`, `float`, `bool`, `date` and `datetime`.
```python
@jsonclass
class MyObject:
    str_value: str
    int_value: int
    float_value: float
    bool_value: bool
    date_value: date
    datetime_value: datetime
```

## Enum

Enum is handy when defining a field with predictable limited amount of choices. Define enum in JSONClasses requires two steps just like in Python.
```python
@jsonenum
class Sex(Enum):
    MALE = 1
    FEMALE = 2


@jsonclass
class Dog:
    name: str
    sex: Sex
    age: int
```
To create an object with enum values, you can pass its capitalized name as value by default. You can tweak this behavior with `types` marker introduced in this guide.
```python
buddy = Dog(name='Buddy', sex='MALE', age=1)
```

## Collection Types

JSONClasses supports collection types `list` and `dict`. You can nest them anyway you'd like.
```python
@jsonclass
class MyObject:
    list_value: list[str]
    dict_value: dict[str, int]
    nested_dict_in_list_value: list[dict[str, str]]
    nested_list_in_dict_value: dict[str, list[int]]
```

## Shaped Type
JSONClasses supports light weight nested structure definition on objects.
```python
@jsondict
class TopicSettings(TypedDict):
    push_notification: bool
    send_email: bool
    send_sms: bool


@jsonclass
class Topic:
    name: str
    content: str
    settings: Settings
```

## Optional Type
You can define optional type with `Optional` type annotation.
```python
@jsonclass
class User:
    username: str
    email: str
    invitation_code: Optional[str]
```

## Embedded Object Types

JSONClasses objects can have other JSONClasses objects as their field values.
```python
@jsonclass
class ShippingAddress:
    line1: str
    line2: Optional[str]
    city: str
    country: str
    postal_code: str


@jsonclass
class User:
    username: str
    shipping_addresses: list[ShippingAddress]

```

## Linked Object Types

On an object graph, objects are linked with each other. JSONClasses utilizes Python's `Annotated` type hint to declare link relationships right in type definitions.
```python
@jsonclass
class Article:
    title: str
    content: str
    author: Annotated[Author, linkto]


@jsonclass
class Author:
    name: str
    articles: Annotated[list[Article], linkedby('author')]
```

Link relationships are categorized into 3: **1-to-1**, **1-to-many** and **many-to-many**.

An **1-to-1** link relationship is declared with 1 side `linkto` and 1 side `linkedby`.

An **1-to-many** link relationship is also declared with 1 side `linkto` and 1 side `linkedby`, while the declared type with `linkedby` is a JSONClasses object list of a specified class.

A **many-to-many** link relationship is declared with double side `linkedthru`. The field type must be a JSONClasses object list type.

## Types Modifiers

A simple type hint won't satisfy complex data validation and transformation needs. This is where types modifier comes in.

We specify other types information with an unintuitive yet innovative equal sign.
```python
@jsonclass
class User:
    username: str = types.str.required
    email: Optional[str] = types.str.email
    password: str = types.writeonly.str.transform(salt).required
    articles: list[Article] = types.nonnull.listof('Article').linkedby('author').required
    created_at: datetime = types.readonly.datetime.tscreated.required
    updated_at: datetime = types.readonly.datetime.tsupdated.required
```
For a complete list of available types modifiers, please visit API Documentation: Types Modifiers.

## ORM Integrated Models

You can turn a existing JSONClasses class into ORM model definition by adding yet another magical decorator. These decorators are provided through additional packages.
```python
@pymongo
@jsonclass
class User:
    id: str = types.readonly.str.primary.mongoid.required
    email: Optional[str] = types.str.email
    password: str = types.writeonly.str.transform(salt).required
    articles: list[Article] = types.nonnull.listof('Article').linkedby('author').required
    created_at: datetime = types.readonly.datetime.tscreated.required
    updated_at: datetime = types.readonly.datetime.tsupdated.required
```
