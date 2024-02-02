class ApiError extends Error {
    constructor(
        statusCode,
        message= "Something went wrong",
        errors = [],
        stack = ""
    ){
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false;
        this.errors = errors

        if (stack) {
            this.stack = stack
        } else{
            Error.captureStackTrace(this, this.constructor)
        }

    }
}



class ResponseUtility {
    static successResponse(res, data) {
      return res.status(200).json({ status: "success", data });
    }
  
    static errorResponse(res, error) {
      return res.status(500).json({ status: "error", error: error.message });
    }
  
    static validationErrorResponse(res, validationErrors) {
      return res.status(400).json({ status: "error", validationErrors });
    }
  }

module.exports= {ApiError,ResponseUtility}