---
sidebar_position: 1
---
# Introduction

You may want to know what JSONClasses is and how it can be used. The best way to introduce is providing examples.

## A Database Example

A simplest JSONClasses usage looks like this. In this example, the data is structured as `Article` class with field definitions. The detailed typing, validating and transforming rules are written in the intuitive chained pipelines. The class also gains ORM integration functionalities through the magical decorator `@pymongo`.
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

## Installation

Install JSONClasses with pip.
```sh
pip install jsonclasses
```
Integration packages are also installed with pip
```sh
pip install jsonclasses-pymongo
pip install jsonclasses-server
```

## Going Next

- Read our [Guide](../guide/data-type-definition) to learn the basics of JSONClasses.
- Check our [API Documentation](../api-documentation/types-modifiers) for detailed API explanation.
