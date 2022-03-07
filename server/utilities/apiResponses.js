exports.successResponse = function (res, msg) {
  // response data
  var resData = {
    message:
      typeof msg === "object" && !Array.isArray(msg) && msg !== null
        ? {
            title: msg.title,
            content: msg.content,
          }
        : msg,
  };
  return res.status(200).json(resData);
};

exports.successResponseWithData = function (res, msg, data) {
  var resData = {
    message:
      typeof msg === "object" && !Array.isArray(msg) && msg !== null
        ? {
            title: msg.title,
            content: msg.content,
          }
        : msg,
    data: data,
  };
  return res.status(200).json(resData);
};

exports.errorResponse = function (res, msg) {
  var resData = {
    message:
      typeof msg === "object" && !Array.isArray(msg) && msg !== null
        ? {
            title: msg.title,
            content: msg.content,
          }
        : msg,
  };
  return res.status(500).json(resData);
};

exports.notFoundResponse = function (res, msg) {
  var resData = {
    message:
      typeof msg === "object" && !Array.isArray(msg) && msg !== null
        ? {
            title: msg.title,
            content: msg.content,
          }
        : msg,
  };
  return res.status(404).json(resData);
};

exports.validationError = function (res, msg) {
  var resData = {
    message:
      typeof msg === "object" && !Array.isArray(msg) && msg !== null
        ? {
            title: msg.title,
            content: msg.content,
          }
        : msg,
  };
  return res.status(400).json(resData);
};

exports.validationErrorWithData = function (res, msg, data) {
  var resData = {
    message:
      typeof msg === "object" && !Array.isArray(msg) && msg !== null
        ? {
            title: msg.title,
            content: msg.content,
          }
        : msg,
    data: data,
  };
  return res.status(400).json(resData);
};

exports.unauthorizedResponse = function (res, msg) {
  var resData = {
    message:
      typeof msg === "object" && !Array.isArray(msg) && msg !== null
        ? {
            title: msg.title,
            content: msg.content,
          }
        : msg,
  };
  return res.status(401).json(resData);
};
