// globalErrorHandler.js

const globalErrorHandler = (err, req, res, next) => {
    console.error(`[Error]: ${err.message}`);

    // Set default status and message if not provided
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    // Log stack trace in development mode
    if (process.env.NODE_ENV === 'development') {
        console.error(err.stack);
    }

    // Send JSON response for errors
    res.status(statusCode).json({
        success: false,
        error: {
            message,
            ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
        }
    });
};

module.exports = globalErrorHandler;
