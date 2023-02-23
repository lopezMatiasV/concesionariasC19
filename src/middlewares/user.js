module.exports = {
	isAdmin: (req, res, next) => {
		let user = "admin";
		if (user != "admin") {
			res.send("Sali de acá!!!");
		} else {
			next();
		}
	},
};