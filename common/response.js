module.exports.successResponse = (status, result = [], res) => {
	if (status !== false) {
		res.status(200).json({
			status: true,
			statusCode: 200,
			message: 'Success!',
			payload: result,
		});
	} else {
		res.status(200).json({
			status: false,
			statusCode: 200,
			message: 'Success!',
			payload: 'No Data Found!',
		});
	}
};

module.exports.badRequestResponse = (result, res) => {
	return res.status(400).json({
		status: false,
		statusCode: 400,
		message: 'Bad Request!',
		error: result,
	});
};

//change status code to proper one for this case
module.exports.validationErrorRequestResponse = (result, res) => {
	return res.status(400).json({
		status: false,
		statusCode: 400,
		message: 'Validation Error!',
		error: result,
	});
};

//change status code to proper one for this case
module.exports.UnAuthorizedRequestResponse = (result, res) => {
	return res.status(400).json({
		status: false,
		statusCode: 400,
		message: 'Authorization Access Error!',
		error: result,
	});
};

//change status code to proper one for this case
module.exports.invalidTokenRequestResponse = (result, res) => {
	return res.status(400).json({
		status: false,
		statusCode: 400,
		message: 'JWT Token Error!',
		error: result,
	});
};

module.exports.serverFailureResponse = (result, res) => {
	res.status(500).json({
		status: false,
		statusCode: 500,
		message: 'Internal Server Error!',
		error: result,
	});
};

module.exports.dbError = (err, res) => {
	res.status(533).json({
		status: false,
		statusCode: 533,
		message: 'Mysql Db Error!',
		error: err,
	});
};
