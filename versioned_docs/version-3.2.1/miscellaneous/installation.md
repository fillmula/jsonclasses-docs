---
sidebar_position: 4
---
# Installation

## Integrate into Existing Apps

If you integrate JSONClasses into an existing app, just install it with `pip`.

```sh
pip install jsonclasses
```

Integration packages are also installed with pip.
```sh
pip install jsonclasses-pymongo
pip install jsonclasses-server
```

## A JSONClasses Server

If you create a JSONClasses app and get the free automatic RESTful CRUD routes,
this is the coolest. Follow this guide with the great CLI tool, you can create
a running server under several minutes.

### Create a Virtual Env

Create a new directory and setup Python's virtual env inside of it.

```sh
mkdir first-project
cd first-project
python3.10 -m venv .venv
source .venv/bin/activate
```

### Generate Starter Code

Install JSONClasses CLI by typing this command.

```sh
pip install jsonclasses-cli
```

With JSONClasses CLI, we can easily create a new project.

```sh
jsonclasses new .
```

The CLI tool will prompt you for some answers, just press `return` or `enter`
to use the default option.

### Run the Server

After the project is setup, type `flask run` to run the generated app. A server
is running and waiting for your HTTP requests now.
