# micro-rpc

Async RPC microservices made easy

Made with [Micro](https://github.com/zeit/micro)

## Quickstart

Create a RPC method to add 2 numbers:

```js
// index.js
const { rpc, method, createError } = require('@bufferapp/micro-rpc');
module.exports = rpc(
  method('add', (a, b) => a + b)
);
```

Start the server

```sh
micro
```

Use the Micro RPC Client: https://github.com/bufferapp/micro-rpc-client to run the `add` method

```js
const RPCClient = require('@bufferapp/micro-rpc-client');

const rpc = new RPCClient({
  serverUrl: 'https://localhost:3000',
});

rpc.call('add', 2, 2)
  .then(result => console.log(result)); // output: 4
```

Or you can use curl to call the `add` method:

```sh
curl -H "Content-Type: application/json" -X POST -d '{"name": "add", "args": "[2, 3]"}' localhost:3000 | python -m json.tool

# {
#    "result": 5
# }
```

To see a list of all available methods use the `methods` call:

```sh
curl -H "Content-Type: application/json" -X POST -d '{"name": "methods"}' localhost:3000 | python -m json.tool

# {
#   result: [
#     {
#       "docs": "add two numbers"
#       "name": "add"
#     },
#     {
#       "docs": "list all available methods",
#       "name": "methods"
#     }
#   ]
# }
```

## Usage

Here's a few examples of how to hook up the handler methods:

```js
const { rpc, method, createError } = require('@bufferapp/micro-rpc');
module.exports = rpc(
  method('add', (a, b) => a + b),
  method('addAsync', (a, b) => new Promise((resolve) => {
    resolve(a + b);
  })),
  method('addItems', ({ a, b }) => a + b),
  method('addItemsAsync', ({ a, b }) => new Promise((resolve) => {
    resolve(a + b);
  })),
  method('throwError', () => {
    throw createError({ message: 'I\'m sorry I can\'t do that'});
  }),

  method('throwErrorAsync', () => new Promise((resolve, reject) => {
    reject(createError({ message: 'Something is broke internally', statusCode: 500 }));
  })),
  method('documentation',
  `
  # documentation

  Document what a method does.
  `,
  () => new Promise((resolve, reject) => {
    reject(createError({ message: 'Something is broke internally', statusCode: 500 }));
  }))
);
```

## API

### rpc

An async function that can be served by [Micro](https://github.com/zeit/micro), takes a bunch of methods as arguments.

```js
rpc(...methods)
```

**...methods** - _method_ - micro rpc method (see below)

### method

add a remote method

```js
method(name, [docs], fn)
```

**name** - _string_ - the name of the method  
**docs** - _string_ - documentation about a method  
**fn** - _function_ - the function to call and apply parameters the method is requested

### createError

create an error to be thrown, optionally set the status code

```js
createError({ message, statusCode = 400})
```

**message** - _string_ - error message to return  
**statusCode** - _string_ - optional HTTP status code (default to 400)
