---
sidebar_position: 2
---

# Data Validation

Performing data validation with JSONClasses is quite simple. It's as simple as calling a `validate` method. You can also use `is_valid` property to test if an object is valid.
```python
@jsonclass
class Article:
    title: str = types.str.required
    content: str = types.str.minlength(100).required


article = Article(title='Best Travel Places', content='Not enough length...')
article.validate() # throws Validation Exceptionarticle.is_valid # False
```

## Collecting Error Messages
By default, the `validate` method throws when it finds an invalid value. Sometimes, let's say, on form validation, you'd like to collect all error messages. In this case, you can decorate the class with a configuration.
```python
@jsonclass(validate_all_fields=True)
class MyForm:
    name: str
    title: strMyForm(**input).validate() # validate all fields
```
You can also pass the instruction to validate method as an optional argument.
```python
@jsonclass
class YetAnotherForm:
    name: str
    title: str


# This validates all fields
YetAnotherForm(**input).validate(all_fields=True)
```

## Validation Modifiers

By default, data type modifiers like `str`, `int`, etc... validates field values against it's type. The `required` modifier raises if field value is None. There are a lot of common and useful modifiers like `url`, `email`, `length`, `min`, `max`, `gt`, `match`, etc... For a complete list of validation modifiers, see Types Modifiers.

## Custom Validation Rule and Message

If builtin validation modifiers cannot satisfy your validation requirements, you can pass a custom callback to the `validate` modifier.
```python
@jsonclass
class OddLengthPassword:
    name: Optional[str]
    password: str = types.str.validate(lambda p: len(p) % 2 == 0).required
```
In this callback, if you return a string, this string is treated the desired error message.
```python
@jsonclass
class OddLengthPasswordWithMessage:
    name: Optional[str]
    password: str = types.str.validate(lambda p: None if len(p) % 2 == 0 else 'password is not odd length').required
```
