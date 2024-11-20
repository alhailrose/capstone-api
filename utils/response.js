const response = (statusCode, data, message, res) => {
    res.status(statusCode).json({
      data,
      message,
    });
  };
  
  export default response;
  