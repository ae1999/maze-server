const mongoose = require('mongoose');
const User = mongoose.model('users');
const keys = require('../config/keys');

let JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrkey;

module.exports = passport => {
	passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
		User.findById(jwt_payload.id)
			.then(user => {
				return user? done(null, user) : done(null, false)
			})
			.catch(err => console.log(err));
}));
}