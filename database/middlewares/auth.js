const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'secreto_super_seguro';

module.exports = function (req, res, next) {
	const authHeader = req.headers.authorization || req.headers.Authorization;
	if (!authHeader) return res.status(401).json({ message: 'Token no proporcionado' });

	const parts = authHeader.split(' ');
	if (parts.length !== 2) return res.status(401).json({ message: 'Formato de token inválido' });

	const [scheme, token] = parts;
	if (!/^Bearer$/i.test(scheme)) return res.status(401).json({ message: 'Formato de token inválido' });

	try {
		const payload = jwt.verify(token, secret);
		req.user = payload;
		next();
	} catch (err) {
		return res.status(401).json({ message: 'Token inválido' });
	}
};
