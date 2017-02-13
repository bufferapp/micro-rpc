const micro = require('micro');
const {
  send,
  json,
  createError,
  sendError,
} = micro;

module.exports = () => {
  const methods = {};
  return {
    server: micro(async (req, res) => {
      const data = await json(req);
      const { name, args } = data;
      if (!(name in methods)) {
        throw createError(404, 'unknown method');
      }
      const parsedArgs = args ? JSON.parse(args) : [];
      const result = Array.isArray(parsedArgs) ?
        await methods[name](...parsedArgs) :
        await methods[name](parsedArgs);
      send(res, 200, { result });
    }),
    method: (name, fn) => methods[name] = fn,
    createError: ({ message, statusCode = 400}) => createError(statusCode, message),
  };
};
