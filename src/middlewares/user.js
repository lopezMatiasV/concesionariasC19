module.exports = {
	isAdmin: (req, res, next) => {
		if (req.session.user && req.session.user.rol == 'admin') {
			next()
		} else {
			res.redirect('/')
		}
	},
	localsSession : (req, res, next) => {
		if (req.session.user) {
			res.locals.user = req.session.user
		}
		next()
	},
	cookieCheck : (req, res, next) => {
		if (req.cookies.concesionarias) {
			req.session.user = req.cookies.concesionarias
		}
		next()
	},
	inSession : (req, res, next) => {
		if (req.session.user) {
			res.redirect('/')
		}
		next()
	},
	offSession : (req, res, next) => {
		if (req.session.user) {
			next()
		} else {
			res.redirect('/users/login')
		}
	}
};