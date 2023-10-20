const handleErrorResponse = (res, error) => {
    console.error(error);

    if (error.status) {
        res.status(error.status).json({
            success: false,
            message: error.message,
        });
    } else {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

module.exports = handleErrorResponse;
