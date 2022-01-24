---
sidebar_position: 5
---
# Get Started

To get started on JSONClasses is quite easy as it designs. In less than several
minutes, you can get your first JSONClasses server running.

## Setup Dependencies

JSONClasses requires [Python 3.10](https://www.python.org). If you don't have
it installed, you can follow the download guide
[here](https://www.python.org/downloads/).

JSONClasses uses MongoDB for its ORM feature. In the future, SQL databases will
be supported. But for now, the only supporting database is MongoDB. If you don't
have it installed, you can download it [here](https://docs.mongodb.com/manual/administration/install-community/).

## Install

Read the [installation guide](./installation) to create a starter JSONClasses server project.

## The First Model

Let's declare the very first model of our own. To declare a model is easy in JSONClasses.
Just declare a plain python class with type hint and decorate it with the convenient
decorators. You can try to declare your own or paste the code into your project.

```python
@api
@pymongo
@jsonclass
class Article:
    id: str = types.readonly.str.primary.mongoid.required
    title: str = types.str.trim.required
    content: str
    created_at: datetime = types.readonly.datetime.tscreated.required
    updated_at: datetime = types.readonly.datetime.tsupdated.required
```

## Start the Server

Now type `flask run` to start the server. You can send HTTP requests documented
in this [guide](../guide/synthesized-api-routes) to the server.

## Going Next

- Read our [Guide](../guide/data-type-definition) to learn the basics of JSONClasses.
- Check our [API Documentation](../api-documentation/types-modifiers) for detailed API explanation.
