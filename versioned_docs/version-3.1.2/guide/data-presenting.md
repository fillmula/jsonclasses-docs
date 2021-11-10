---
sidebar_position: 4
---

# Data Presenting

As the name of the framework implies, a JSONClasses object can be serialized into a JSON dict. Therefore, it can be converted, displayed and interoperated with other data frameworks. It can also be transfered on the web.

## Converting to JSON

Calling `tojson` method on JSONClasses objects generates a JSON dict representation of the object.
```python
@jsonclass
class Product:
    name: str = 'iPhone 13'
    size: float = 4.7
    supported_oss: list[str] = ['iOS 15']


product = Product()
product.tojson()
# {
#    'name': 'iPhone 13',
#    'size': 4.7,
#    'supportedOss': ['iOS 15']
# }
```

## Using JSONEncoder
You can pass `JSONEncoder` to Python's default `json.dumps` method to stringify JSONClasses objects in any nested depth.
```python
@jsonclass
class Product:
    name: str = 'iPhone 13'
    size: float = 4.7
    supported_oss: list[str] = ['iOS 15']
product = Product()
json.dumps(product, cls=JSONEncoder)
# {'name': 'iPhone 13', 'size': 4.7, 'supportedOss': ['iOS 15']}
```

## Ignoring Writeonly

By default, values of writeonly fields are not present in the output JSON dict. You can ignore this behavior by adding `ignore_writeonly=True` to the calling method.
```python
@jsonclass
class User:
    username: str
    password: str = types.writeonly.str.required


user = User(username='admin', password='123456')
user.tojson()
# {'username': 'admin'}
user.tojson(ignore_writeonly=True)
# {'username': 'admin', 'password': '123456'}
```
