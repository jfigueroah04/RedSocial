const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'secreto_super_seguro';

function createToken(user) {
	const payload = {
		id: user._id,
		name: user.name,
		surname: user.surname,
		nick: user.nick,
		email: user.email,
		role: user.role,
		image: user.image
	};
	return jwt.sign(payload, secret, { expiresIn: '7d' });
}

module.exports = { createToken };
