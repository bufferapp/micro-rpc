const micro = require('micro');
const {
  send,
  json,
  createError,
} = micro;

module.exports = () => {
  const methods = {};
  return {
    server: micro(async (req, res) => {
      const data = await json(req);
      const { name, args } = data;
      if (name === 'methods') {
        send(
          res,
          200,
          {
            result: Object.keys(methods)
              .map((name) => ({
                name,
                docs: methods[name].docs,
              }))
              .concat({
                name: 'methods',
                docs: 'list all available methods'
              })
          }
        );
      } else if (!(name in methods)) {
        throw createError(404, 'unknown method');
      } else {
        const parsedArgs = args ? JSON.parse(args) : [];
        const result = Array.isArray(parsedArgs) ?
          await methods[name].fn(...parsedArgs) :
          await methods[name].fn(parsedArgs);
        send(res, 200, { result });
      }
    }),
    method: (name, ...args) => methods[name] = {
      fn: args[1] ? args[1] : args[0],
      docs: args[1] ? args[0] : undefined,
    },
    createError: ({ message, statusCode = 400}) => createError(statusCode, message),
  };
};
