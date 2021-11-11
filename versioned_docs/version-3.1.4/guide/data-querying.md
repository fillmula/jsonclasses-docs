---
sidebar_position: 6
---

# Data Querying

Querying data from the database is well supported by JSONClasses ORM integrations. Query can be a expensive operation. Data query in JSONClasses supports async syntax and normal syntax.
```python
# async syntax
await User.find().order('created_at', -1)
# normal syntax
User.find().order('created_at', -1).exec()
```

## Query
There are mainly 3 kinds of query. **ID query**, **single query** and **batch query**. Use `id`, `one` and `find` to perform corresponding query.
```python
await User.id(str_id_value) # a result with id
await User.one(name='His/Her Name') # single result which matches
await User.one(name='His/Her Name').optional # can return None
await User.find(age=20) # a list of results
```

## Sorting
Batch results can be sorted and ordered.
```python
await Analysis.find().order('created_at', 1) # ASC, old first
await Analysis.find().order('created_at', -1) # DESC, new first
```
Multiple sorting descriptors can be chained together.


## Pagination
Page size and page number can be used to calculate the value of `skip` and `limit`.
```python
await Analysis.find().skip((page_number - 1) * page_size).limit(page_size)
```

## Including

Querying an object without it's relationships is not handy and useful some of the times. JSONClasses supports querying object with it's linked objects included.
```python
await User.id(user_id).include('profile')
await Author.find().include('posts', Post.find(title={'$regex': 'Python'}))
```
Including can be chained and nested unlimited levels.
