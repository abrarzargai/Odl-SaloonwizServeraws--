
const catchAsync = require('../../utils/catchAsync');
const jwt = require('jsonwebtoken');

exports.authenticate = catchAsync(async (req, res, next) => {
	console.log(req.headers['authorization'])

	if (req.headers['authorization']) {
		try {
			let authorization = req.headers['authorization'].split(' ');
			if (authorization[0] !== 'Bearer') {
				throw new Error('Bearer Missing in token')
			} else {
				req.jwt = jwt.verify(authorization[1], process.env.JWT_SECRET);
				return next();
			}
		} catch (err) {
			throw new Error('invalid User')
			
		}
	} else {
		throw new Error('Token Not Found')
	}
});

