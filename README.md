# Simple-Notes-App
This is a simple notes web application to learn how to contact databases and further my knowledge with Express.

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Execution](#sExecution)

## Description

I created this app in order to learn how to use HTTP requests to contact a database. This project requires a .env formatted like this :

```.env

MYSQL_HOST=' '
MYSQL_USER=' '
MYSQL_PASSWORD=' '
MYSQL_DATABASE=' '

 ```

## Installation

After making your .env, make sure your data base is running. Node modules are included in this repository so simply choose a directory and then use get clone to copy the repository:

```Bash

git clone https://github.com/Pmacdon15/Simple-Notes-App

```
## Execution

After cloning the repository tpye:

```Bash

cd notes

node index.js

```

Your notes server is running. Now in your URL bar enter:


``` url

http://localhost:445/

```

If contacting remotely remember to turn on port forwarding and use your IP address as opposed to local host.

