---
sidebar_position: 1
---

# Types Modifiers

The types modifiers in JSONClasses define field types, reading/writing rules, validation rules and value transformers.

## Data Types
### Primitive Data Types
#### Usage
`types.str`, `types.int`, `types.float`, `types.bool`, `types.date`, `types.datetime`.

Define and mark the field's type. This is normally put at the beginning of the types modifiers. If there is a transformer in the chain which transforms other data types into the desired data type, the data type modifier should be preceded by the transformer. A transformer in the chain triggers eager validation.

#### Examples
```python
@jsonclass
class MyClass:
    str_value: str = types.str.required
    optional_int_value: Optional[int] = types.int
```

### Enum Data Types

#### enum
`enum` marks the field as enum data type.

#### Usage
`enum(type[Enum] | str)`

#### Parameters

`type[Enum]` The enum class marked with `@jsonenum`.
`str` The string represents the enum class marked with `@jsonenum`.

#### Examples

```python
@jsonclass
class Dog:
    sex: Sex = types.enum(Sex).required
    breed: Breed = types.enum('Breed').required
```
#### inputvalue
This enum field accepts enum value.

#### Examples

```python
@jsonclass
class Dog:
    sex: Sex = types.enum(Sex).inputvalue.required
```

#### inputname
This enum field accepts enum name. This is the default behavior.

#### Examples
```python
@jsonclass
class Dog:
    sex: Sex = types.enum(Sex).inputname.required
```

#### inputlname
This enum field accepts lowercased enum name.

#### Examples
```python
@jsonclass
class Dog:
    sex: Sex = types.enum(Sex).inputlname.required
```
#### inputall
This enum field accepts any value which is acceptable.

#### Examples
```python
@jsonclass
class Dog:
    sex: Sex = types.enum(Sex).inputall.required
```

#### outputvalue
This enum field outputs enum value.

#### Examples
```python
@jsonclass
class Dog:
    sex: Sex = types.enum(Sex).outputvalue.required
```

#### outputname
This enum field outputs enum name.

#### Examples
```python
@jsonclass
class Dog:
    sex: Sex = types.enum(Sex).outputname.required
```

#### outputlname
This enum field outputs lowercased enum name.

#### Examples
```python
@jsonclass
class Dog:
    sex: Sex = types.enum(Sex).outputlname.required
```

### Collection Data Types

#### listof
`listof` marks the field as `list` data type.

#### Usage
`listof(Types | type[JObject] | type[Enum] | str)`

#### Parameters
`Types`: The item types definition.
`type[JObject]`: The JSONClasses object class.
`type[Enum]`: The enum class marked with @jsonenum.
`str`: The string representation of object class, enum class or typed dict class.

#### Examples
```python
@jsonclass
class MyClass:
    field_one: list[str] = types.nonnull.listof(str)
    field_two: list[int] = types.listof(types.int).required
    field_three: list[MyEnum] = types.listof(MyEnum).required
    field_four: list[MyObject] = types.nonnull.listof('MyObject')
```

#### dictof
`dictof` marks the field as dict data type. Only `str` key is supported.

#### Usage
`dictof(Types | type[JObject] | type[Enum] | str)`
#### Parameters
`Types`: The item types definition.
`type[JObject]`: The JSONClasses object class.
`type[Enum]`: The enum class marked with @jsonenum.
`str`: The string representation of object class, enum class or typed dict class.

#### Examples
```python
@jsonclass
class MyClass:
    field_one: dict[str, str] = types.nonnull.dictof(str)
    field_two: dict[str, int] = types.dictof(types.int).required
    field_three: dict[str, MyEnum] = types.dictof(MyEnum).required
    field_four: dict[str, MyObject] = types.nonnull.dictof('MyObject')
```
### Object Data Types

#### instanceof
`instanceof` is a type represents a JSONClasses object of specific class.
#### Usage
`instanceof(type[JObject], str)`
#### Parameters
`type[JObject]`: The JSONClasses class.
`str`: A string which represents a JSONClasses class.

#### Examples
```python
@jsonclass
class User:
    username: str = types.str.unique.required
    articles: list[Article] = types.nonnull.listof('Article').linkedby('author')
    profile: Profile = types.instanceof('Profile').linkto.required
```
### Union Data Types

#### union
The value of a union field can be one of provided types.

#### Usage
`union(list[Union[Types, type[JObject], type[Enum], type[TypedDict], str]])`

#### Examples
```python
@jsonclass
class MyClass:
    field_one: int | str = types.union([str, int])
    field_two: Union[int, str] = types.union([types.str, types.int])
```

### Any Data Types

#### any
The value of this field can be anything.

#### Examples
```python
@jsonclass
class MyClass:
    field_one: Any = types.any.required
    field_two: Optional[Any] = types.any
```

## Field Definitions

#### primary
Marks a `str` or `int` field as primary field.

#### Examples
```python
@pymongo
@jsonclass
class Article:
    id: str = types.readonly.str.primary.mongoid.required
    title: str
    content: str
```

#### tscreated
Marks a datetime field's usage to timestamp for recording creation date. This automatically gains a default value feature.

#### Examples
```python
@pymongo
@jsonclass
class Article:
    id: str = types.readonly.str.primary.mongoid.required
    title: str
    content: str
    created_at: datetime = types.readonly.datetime.tscreated.required
```

#### tsupdated
Marks a datetime field's usage to timestamp for recording modification date. This automatically gains a default value and a `setonsave` feature.

#### Examples
```python
@pymongo
@jsonclass
class Article:
    id: str = types.readonly.str.primary.mongoid.required
    title: str
    content: str
    created_at: datetime = types.readonly.datetime.tscreated.required
    updated_at: datetime = types.readonly.datetime.tsupdated.required
```

## Accessibility
#### writeonly
Field marked with `writeonly` can only be written to. Values of these fields are hidden from the JSON output.

#### Examples
```python
@pymongo
@jsonclass
class User:
    id: str = types.readonly.str.primary.mongoid.required
    username: str = types.str.unique.required
    password: str = types.writeonly.str.required
```

#### writeonce
For optional fields, the value is optional. And on creating, it can be null. After assigning a nonnull value, this field doesn't accept new value anymore. For required fields, the value cannot be changed after assigning on creation.

#### Examples
```python
@jsonclass
class User:
    # a sex value shouldn't be changed after it's set
    sex: Optional[Sex] = types.writeonce.enum(Sex)
```

#### writenonnull
The value is optional. And on creating, it can be null. After assigning a nonnull value, this field doesn't accept null value anymore.

#### Examples
```python
@jsonclass
class User:
    name: Optional[str] = types.writenonnull.str
```

#### readonly
The value of the field cannot be set. It can only be set internally or through special transformer and callbacks.

#### Examples
```python
@pymongo
@jsonclass
class User:
    id: str = types.readonly.str.primary.mongoid.required
```

#### readwrite
The value of the field can be set and can be get. This is the default field behavior.

#### Examples
```python
@jsonclass
class User:
    name: Optional[str] = types.readwrite.str
```

#### temp
This field is a temporary field. Values of temporary fields won't be serialized into database. Temp fields are optional fields.

#### Examples
```python
@jsonclass
class User:
    password: str = types.str.required
    old_password: Optional[str] = types.str.temp
```

## Transformers
#### default
Assign field a default value if the value of field is 'None'.
#### Usage
`default(Any | Callable | Types)`
#### Examples
```python
@jsonclass
class User:
    name: str = types.str.default('Snoopy').required
```

### String Transformers

#### truncate
Truncate the str or list. This should not be used on a reference field.

#### Usage
`truncate(int | Callable | Types)`

#### Examples
```python
@jsonclass
class Article:
    title: str
    content: str = types.str.truncate(5000).required
```

#### trim
Remove whitespaces and newlines from the beginning and end of the string.

#### Examples
```python
@jsonclass
class Article:
    title: str = types.str.trim.required
    content: str = types.str.truncate(5000).required
```

#### totitle
Transform the string to title case.

#### Examples
```python
@jsonclass
class Article:
    title: str = types.str.trim.totitle.required
    content: str = types.str.truncate(5000).required
```

#### tocap
Capitalize the string value.

#### Examples
```python
@jsonclass
class Article:
    title: str = types.str.trim.tocap.required
```

#### tolower
Convert the string value to lowercase.

#### Examples
```python
@jsonclass
class User:
    username: str = types.str.trim.tolower.required
```

#### toupper
Convert the string value to uppercase.

#### Examples
```python
@jsonclass
class Term:
    abbr: str = types.str.trim.toupper.required
```

#### replace
Replace old substring with new substring.

#### Usage
`replace(str | Callable | Types, str | Callable | Types)`

#### Examples
```python
@jsoncalss
class Paper:
    title: str = types.str.replace("?", ".").required
```

#### replacer
Replace the pattern with new substring.

#### Usage
`replacer(str | Callable | Types, str | Callable | Types)`

#### Examples
```python
@jsoncalss
class Paper:
    content_with_number_hidden: str = types.str.replacer("\d", "*").required
```

#### split
Split a string value into a string list.

#### Usage
`split(str | Callable | Types)`

#### Example
```python
@jsonclass
class Article:
    keywords: list[str] = types.split(' ').listof(str).required
```

#### join
Take all items in an iterable and joins them into one string.

#### Usage
`join(str | Callable | Types)`

#### Example
```python
@jsonclass
class Band:
    all_member_name: str = types.join('-').str.required
```

#### salt
Add a salt to a string.

#### Example
```python
@jsonclass
class User:
    password: str = types.str.salt.required
```

#### tostr
Transforms value into a string.

#### Example
```python
@jsonclass
class Student:
    age_str: str = types.tostr.required
```

#### padstart
Pad the current string of the start with a given char to reache a given length.

#### Usage
`padstart(str | Callable | Types, int | Callable | Types)`

#### Example
 ```python
@jsonclass
class Entrants:
    two_digit_number: str = types.str.padstart('0', 2).required
```

#### padend
Pad the current string of the end with a given char to reache a given length.
#### Usage
`padend(str | Callable | Types, int | Callable | Types)`

#### Example
```python
@jsonclass
class User:
    mask_id: str = types.str.padend('*', 18).required
```

### Number Transformer

#### upperbond
Decrease the value of the field to `upperbond` if the value of the field is larger than `upperbond`.

#### Usage
`upperbond(int | float | Callable | Types)`

#### Examples
```python
@jsonclass
class User:
    age: int = types.int.upperbond(150).required
```

#### lowerbond
Increase the value of the field to `lowerbond` if the value of the field is smaller than `lowerbond`.

#### Usage
`lowerbond(int | float | Callable | Types)`

#### Examples
```python
@jsonclass
class User:
    age: int = types.int.lowerbond(1).required
```

#### filter
Filter the list of the field with the help of a function.
#### Usage
`filter(callable)`

#### Examples
```python
@jsonclass
class User:
    name: list[str] = typse.listof(str).filter(['a', 'b', 'c', 'd']).required
```

#### map
Return a map list after applying the given function to each item of the list of the field.

#### Usage
`map(callable)`

#### Examples
```python
@jsonclass
class User:
    name: list[str] = types.listof(str).map(['Victor', 'Ben', 'Snoopy']).required
```

#### sqrt
Return the square root of any number that can not less than 0.

#### Examples
```python
@jsonclass
class Math:
    num1: int = types.int.sqrt.required    num2: float = types.float.sqrt.required
```

#### pow
Return the value of the field to the power of the value of pow.

#### Usage
`pow(int | float | Callable | Types)`

#### Examples
```python
@jsonclass
class Math:
    num: int = types.int.pow(3).required
```

#### mod
Return the remainder after the division of the value of field by another value. The value of field can be either int or float.

#### Usage
`mod(int | float | Callable | Types)`

#### Examples
```python
@jsonclass
class Math:
    num: int = types.int.mod(10).required
```

#### div

Divide the value of field by another value.

#### Usage
`div(int | float | Callable | Types)`

#### Examples
```python
@jsonclass
class Math:
    num: int = types.int.div(10).required
```

#### mul
Multiply the value of field.

#### Usage
`mul(int | float | Callable | Types)`

#### Examples
```python
@jsonclass
class Math:
    num: int = types.int.mul(10).required
```

#### sub
Subtracte the value of field.

#### Usage
`sub(int | float | Callable | Types)`

#### Examples
```python
@jsonclass
class Math:
    num: int = types.int.sub(5).required
```

#### add
Add the value of field.

#### Usage
`add(int | float | Callable | Types)`

#### Examples
```python
@jsonclass
class Math:
    num: int = types.int.add(5).required
```

#### toint
Convert the value of field to int.

#### Examples
```python
@jsonclass
class User:
    item: bool = types.bool.toint.required
```

#### tofloat
Convert the value of field to float.

#### Examples
```python
@jsonclass
class User:
    item: bool = types.bool.tofloat.required
```

#### abs
Return the absolute value of the value of field.

#### Examples
```python
@jsonclass
class Math:
    num: int = types.int.abs.required
```

#### floor
Return the floor of the value of field i.e., the least integer not less than the value of field.

#### Examples
```python
@jsonclass
class Math:
    num: int = types.int.floor.required
```

#### ceil
Return the ceiling of the value of field i.e., the largest integer not greater than the value of field.

#### Examples
```python
@jsonclass
class Math:
    num: int = types.int.ceil.required
```

#### round
Round the value of field to only two decimals.

#### Examples
```python
@jsonclass
class Math:
    num: int = typse.int.round.required
```

#### inverse
Change the value to false if value is true, vice versa.

#### Examples
```python
@jsonclass
class User:
    true_or_false: bool = types.bool.inverse.required
```

### Boolean Transformers

#### inverse
Change the value to false if value is true, vice versa.

#### Examples
```python
@jsonclass
class User:
    true_or_false: bool = types.bool.inverse.required
```

#### tobool
Transform the value of field into a bool
#### Examples
```python
@jsonclass
class User:
    is_admin: bool = types.tobool.bool.required
```


### Datetime Transformers

#### tobosec
Transform datetime into the beginning of the second
#### Examples
```python
@jsonclass
class Datetime:
    time: datetime = types.datetime.tobosec.required
```
#### tobomin
Transform datetime into the beginning of the minute
#### Examples
```python
@jsonclass
class Datetime:
    time: datetime = types.datetime.tobomin.required
```
#### tobohour
Transform datetime into the beginning of the hour
#### Examples
```python
@jsonclass
class Datetime:
    time: datetime = types.datetime.tobohour.required
```
#### toboday
Transform datetime or date into the beginning of the day
#### Examples
```python
@jsonclass
class Datetime:
    time: date = types.date.toboday.required
```
#### tobomon
Transform datetime or date into the beginning of the month
#### Examples
```python
@jsonclass
class Datetime:
    time: date = types.date.tobomon.required
```
#### toboyear
Transform datetime or date into the beginning of the year
#### Example
```python
@jsonclass
class Datetime:
    time: date = types.date.toboyear.required
```
#### tonextsec
Change datetime to the next second
#### Examples
```python
@jsonclass
class Datetime:
    time: datetime = types.datetime.tonextsec.required
```
#### tonextmin
Change datetime to the next minute
#### Examples
```python
@jsonclass
class Datetime:
    time: datetime = types.datetime.tonextmin.required
```
#### tonexthour
Change datetime to the next hour
#### Examples
```python
@jsonclass
class Datetime:
    time: datetime = types.datetime.tonexthour.required
```
#### tonextday
Change datetime or date to the next day
#### Examples
```python
@jsonclass
class Datetime:
    time: date = types.date.tonextday.required
```
#### tonextmon
Change datetime or date to the next mon
#### Examples
```python
@jsonclass
class Datetime:
    time: date = types.date.tonextmon.required
```
#### tonextyear
Change datetime or date to the next year
#### Examples
```python
@jsonclass
class Datetime:
    time: date = types.date.tonextyear.required
```
#### fmtd
Format datetime or date.
#### Usage
`fmtd(str | Callable | Types)`
#### Examples
```python
@jsonclass
class Datetime:
    time: datetime = types.datetime.fmtd("%Y年%m月%d日 %H:%M:%S").required
```

### Iterable Transformer
#### wrapintolist
Wrap value into a list.

#### Example
```python
@jsonclass
class AlwaysList:
    something_list: list[Any] = types.wrapintolist.listof(Any).required
```

#### tolist
Transform the value of field into a list
#### Examples
```python
@jsonclass
class Student:
    age: int = types.int.tolist.required
```
#### reverse
Reverse the elements of the list
#### Examples
```python
@jsonclass
class Student:
    name: list[str] = types.listof(str).reverse.required
```

#### insertat
Insert an element to the list.

#### Usage
`insertat(Any | Callable | Types, int | Callable | Types)`

#### Example
```python
@jsonclass
class List:
    name_list: list[str] = types.append("Lucy", 3).listof(str).required
```

#### append
Add an element to the start of list.

#### Usage
`append(str | int | float | Callable | Types)`

#### Example
```python
@jsonclass
class List:
    name_list: list[str] = types.append("Jack").listof(str).required
```

#### prepend
Add an element to the end of list.

#### Usage
`prepend(str | int | float | Callable | Types)`

#### Example
```python
@jsonclass
class List:
    name_list: list[str] = types.append("Ben").listof(str).required
```


## Validators
#### invalid
Field marked with invalid will never be valid.
#### Example
```python
@jsonclass
class MyClass:
    invalid_field: str = types.str.invalid.required
```
#### compare
Validate field value by compare old and new values.
#### Usage
`compare(Callable)`
#### Examples
```python
@jsonclass
class Student:
    height: int = types.int.compare(15).required
```

### String Validators

#### match
Validate string value against pattern.

#### Usage
`match(str | Callable | Types)`

#### Example
```python
@jsonclass
class User:
    phone_number: str= types.str.match('^\+86').required
```

#### url
Validate string value against valid url.

#### Example
```python
@jsonclass
class User:
    user_link: str = types.str.url.required
```

#### email
Validate string value aganist valid email.

#### Example
```python
@jsaonclass
class User:
    email: str = types.str.email.required
```

#### digit
Validate a string value against digit string.

#### Example
```python
@jsonclass
class Product:
    digit_id: str = types.str.digit.required
```

#### alpha
Validate a string value against alpha string.

#### Example
```python
@jsonclass
class User:
    frist_name: str = types.str.alpha.required
```

#### numeric
Validate a string value against numeric string.

#### Example
```python
@jsonclass
class User:
    age: str = types.str.numeric.required
```

#### alnum
Validate a string value against alnum string.
#### Example
```python
@jsonclass
class User:
    alpha_age: str = types.str.alnum.required
```

### Number Validators

#### min
Validate number value against min value.

#### Usage
`min(int | float | Callable | Types)`

#### Example
```python
@jsonclass
class Teenager:
    age: int = types.int.min(13).required
```

#### max
Validate number value against max value.

#### Usage
`max(int | float | Callable | Types)`

#### Example
```python
@jsonclass
class Baby:
    age: int = types.int.max(1).required
```
#### lt
Validate number value less than min value.

#### Usage
`lt(int | float | Callable | Types)`

#### Example
```python
@jsonclass
class Preschool:
    age: int = types.int.lt(5).required
```

#### gt
Validate number value greater than max value.

#### Usage
`gt(int | float | Callable | Types)`

#### Example
```python
@jsonclass
class Adult:
    age: int = types.int.gt(18).required
```

#### nonnegative
Validate number value greater than or equal to zero.

#### Example
```python
@jsonclass
class Product:
    orders: int = types.int.nonnegative.required
```

#### nonpositive
Validate number value less than or equal to zero.

#### Example
```python
@jsonclass
class Ice:
    temperature: int = types.int.nonnegative.required
```

#### negative
Validate number value less than zero.

#### Example
```python
@jsonclass
class Product:
    price: int = types.int.negative.required
```

#### positive
Validate number value greater than zero.

#### Example
```python
@jsonclass
class Asset:
    debt: int = types.int.nonnegative.required
```

#### range
Validate number value against a range.

#### Example
```python
@jsonclass
class YoungAdult:
    age: int = types.int.range(18, 21).required
```

### Datetime Validators

#### before
Validate date against before date.
#### Usage
`before(date | datetime | Callable | Types)`
#### Examples
```python
@jsonclass
class Date:
    Monday: date = types.date.before(Tuesday).required
```
#### after
Validate date against after date.
#### Usage
`after(date | datetime | Callable | Types)`
#### Examples
```python
@jsonclass
class Date:
    Saturday: date = types.date.after(Firday).required
```

### Iterable Validators
#### oneof
Validate string value against a list of available values.

#### Usage
`oneof(list[Any])`

#### Example
```python
@jsonclass
class SchoolUser:
    role: str = types.str.oneof(['teacher', 'student']).required
```

#### length
Validate iterable value against the provided length.

#### Usage
`length(int | Callable | Types, int | Callable | Types)`

#### Example
```python
@jsonclass
class User:
    password: str = types.str.lenth(6, 16).required
```

#### minlength
Validate iterable value against min length.

#### Usage
`minlenth(int | Callable | Types)`

#### Example
```python
@jsonclass
class User:
    username: str = types.str.minlength(5).required
```

#### maxlength
Validate iterable value against max length.

#### Usage
`maxlenth(int | Callable | Types)`

#### Example
```python
@jsonclass
class Article:
    title: str = types.str.maxlength(50).required
```

#### hasprefix
Check if the value of field is prefix of the string or list value

#### Usage
`hasprefix(str | list[Any] | Callable | Types)`

#### Examples
```python
@jsonclass
class Student:
    phone_number: str = types.str.hasprefix("+86").required
```

#### hassuffix
Check if the value of field is suffix of the string or list value

#### Usage
`hassuffix((str | list[Any] | Callable | Types))`

#### Examples
```python
@jsonclass
class Student:
    qq_email: str = types.str.hassuffix("@qq.com").required
```

#### isprefixof
Check if the string or list value is prefix of the value of field


#### Usage
`isprefixof((str | list[Any] | Callable | Types))`

#### Examples
```python
@jsonclass
class Teacher:
    calling_code: str = types.str.isprefixof(types.this.fval('phone_number')).required
```

#### issuffixof
Check if the string or list value is suffix of the value of field

#### Usage
`issuffixof((str | list[Any] | Callable | Types))`

#### Examples
```python
@jsonclass
class Student:
    email_suffix: str = types.str.issuffixof(types.this.fval('email')).required
```

## Graph Relationships

#### embedded
This object is embedded into it's containing object. This is the default behavior.

#### linkto
This field has a local reference key defined on the object.

#### Examples
```python
@jsonclass
class User:
    articles: list[Article] = types.nonnull.listof('Article').linkedby('user')    @jsonclassclass Article:    user: User = types.instanceof('User').linkto.required
```

#### linkedby

This field has a foreign key reference on the referenced object.

#### Usage
`linkedby(str)`

#### Examples
```python
@jsonclass
class User:
    articles: list[Article] = types.nonnull.listof('Article').linkedby('user')    @jsonclassclass Article:    user: User = types.instanceof('User').linkto.required
```

#### linkedthru
This field has a foreign key mapping table with the referenced object.

#### Usage
`linkedthru(str)`

#### Examples
```python
@jsonclass
class User:
    products: list[Article] = types.nonnull.listof('Product').linkedthru('users')    @jsonclassclass Product:    users: list[User] = types.nonnull.listof('User').linkedthru('products')
```

#### deny
If there are any objects are linked on this field, this object's deletion is denied.

#### Examples
```python
@jsonclass
class Profile:
    user: User = types.instanceof('User').linkto.deny.required
```
#### cascade
If there are any objects are linked on this field, when this object is deleted, delete them, too.

#### Examples
```python
@jsonclass
class User:
    profile: Profile = types.instanceof('Profile').linkedby('user').cascade.required
```

#### nullify
If there are any objects are linked on this field, when this object is deleted, set the reference keys (if there is any) to null. This is the default behavior.

## ORM Instructions

#### index
Perform indexing on this field.

#### Examples
```python
@jsonclass
class User:
    score: int = types.int.index.required
```

#### unique
Perform unique indexing on this field.

#### Examples
```python
@jsonclass
class User:
    email: str = types.str.unique.required
```
