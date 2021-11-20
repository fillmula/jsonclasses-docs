---
sidebar_position: 6
---

# Change Log

### Version 3.2.0 (Nov 25th, 2021)
* **[Core]** Added subtype to field definition
* **[Core]** `datetime` now uses UTC timezone by default
* **[Pymongo]** Added string id support
* **[Pymongo]** Remove `_containsi`, `_prefixi`, `_suffixi` and `_matchi`
* **[Pymongo]** Use `{'_mode': 'caseInsensitive'}` to represent case insensitive search
* **[Pymongo]** Supported primitive `_neq` and `_null` query
* **[Pymongo]** Supported query with `null`
* **[CLI]** Generate TypeScript package
* **[CLI]** Generate Swift package
* **[CLI]** Generate Kotlin package

### Version 3.1.4 (Nov 11th, 2021)
* **[Core]** `oneof` supports modifier pipeline and callable
* **[Core]** Added missing tests for `hexcolor` transforming
* **[Core]** Added `fmt` modifier
* **[Core]** `map` modifier supports pipeline
* **[Core]** `filter` modifier supports pipeline
* **[Core]** Added local file system uploader
* **[Server]** Flask supports local file system uploader
* **[Server]** FastAPI supports local file system uploader
* **[Server]** Fixed FastAPI AWS uploading bug
* **[CLI]** Do not install `orjson` by default for FastAPI projects
* **[CLI]** Added start server message to FastAPI projects

### Version 3.1.3 (Nov 10th, 2021)
* **[Core]** Object include can include join table records
* **[Pymongo]** Object include support for join table records
* **[CLI]** Added interactive console
* **[CLI]** Install all FastAPI dependencies for FastAPI projects
* **[Server]** Bug fixes
* **[CLI]** Bug fixes

### Version 3.1.2 (Nov 10th, 2021)
* **[Docs]** Renovated documentation
* **[Server]** Fixed JWT importing bug
* **[Server]** Fixed FastAPI initializing bugs
* **[CLI]** Bug fixes

### Version 3.1.1 (Nov 10th, 2021)
* **[Core]** Operator assigning by `asop` and `asopd` now uses id
* **[Core]** `isobj` now can uses class name and id to compare
* **[Core]** `fval` now can return id reference
* **[Core]** Added object method `include` to `JObject`
* **[Core]** Added query method `ids` to `ORMObject`
* **[Core]** Added `fobj` modifier
* **[Core]** Added `hexcolor` modifier
* **[Pymongo]** Added tests for object level `include`
* **[Pymongo]** Implement `ids` query method
* **[Server]** Set user itself as operator after signed in
* **[Server]** Set operator to get requests
* **[Core]** Bug fixes
* **[CLI]** Bug fixes

### Version 3.1.0 (Nov 5th, 2021)
* **[Core]** Support insertion and removal into linked local key lists
* **[Pymongo]** Fixed multiword bug when including
* **[Pymongo]** Fixed multiword bug when ordering
* **[Pymongo]** Support insertion and removal into linked local key lists
* **[CLI]** Added CLI, a great user experience way to create new project

### Version 3.0.2 (Oct 29th, 2021)
* **[Core]** Do not output partial non-picked fields to JSON
* **[Core]** Do not output null value to JSON by default
* **[Core]** Added `output_null` option to `@jsonclass`
* **[Pymongo]** Add `inflection` as formal dependency
* **[Server]** Added unit tests

### Version 3.0.1 (Oct 28th, 2021)
* **[Core]** Added modifier `len`
* **[Core]** Added modifier `securepw`
* **[Core]** Auto install `inflection` package
* **[Pymongo]** Added compare descriptors in string query
* **[Core]** Bug fixes
* **[Pymongo]** Bug fixes
* **[Server]** Bug fixes
