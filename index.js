const {
  send,
  json,
  createError,
} = require('micro');

module.exports = {
  rpc: (...methods) => async (req, res) => {
    const data = await json(req);
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
        if (err.statusCode) {
          res.statusMessage = err.message;
          throw createError(err.statusCode, err.message)
        }
        throw err;
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
      const errorMessage = 'unknown method';
      res.statusMessage = errorMessage;
      throw createError(404, errorMessage);
    }
  },
  method: (name, ...args) => ({
    name,
    fn: args[1] ? args[1] : args[0],
    docs: args[1] ? args[0] : undefined,
  }),
  createError: ({ message, statusCode = 400}) => createError(statusCode, message),
};
