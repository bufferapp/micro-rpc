const {
  send,
  json,
  createError,
} = require('micro');

module.exports = {
  rpc: (...methods) => async (req, res) => {
    const data = await json(req);
    req.body = data;
    const { name, args } = data;
    const matchingMethod = methods.find((method) => method.name === name);
    if (matchingMethod) {
      const parsedArgs = args ? JSON.parse(args) : [];
      try {
        const result = Array.isArray(parsedArgs) ?
          await matchingMethod.fn(...parsedArgs, req, res) :
          await matchingMethod.fn(parsedArgs, req, res);
        send(res, 200, { result });
      } catch (err) {
        // error was handled
        if (err.handled) {
          send(res, err.statusCode, {
            error: err.message
          });
        } else {
          // unhandled exception
          throw err;
        }
      }
    } else if (name === 'methods') {
      send(res, 200, {
        result: methods.map((method) => ({
          name: method.name,
          docs: method.docs,
        })).concat({
          name: 'methods',
          docs: 'list all available methods',
        }),
      });
    } else {
      send(res, 404, {
        error: 'unknown method'
      });
    }
  },
  method: (name, ...args) => ({
    name,
    fn: args[1] ? args[1] : args[0],
    docs: args[1] ? args[0] : undefined,
  }),
  createError: ({ message, statusCode = 400 }) => {
    const err = createError(statusCode, message);
    err.handled = true;
    return err;
  },
};
