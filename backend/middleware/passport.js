const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const JwtStrategy = require('passport-jwt').Strategy;

let environment = process.env.NODE_ENV || 'development';
const dynamicCallbackURL = (environment=="development" ? 'http://localhost:3000/': "https://academiesalumni-production.up.railway.app/") + process.env.AUTH0_CALLBACK_URL

const auth0Strategy = new Auth0Strategy(
    {
        domain: process.env.AUTH0_DOMAIN,
        clientID: process.env.AUTH0_CLIENT_ID,
        clientSecret: process.env.AUTH0_SECRET,
        callbackURL: dynamicCallbackURL,
    },
    (accessToken, refreshToken, extraParams, profile, done) => {
        return done(null, profile);
    }
);

const jwtStrategy = new JwtStrategy(
    {
        jwtFromRequest: (req) => req.session.jwt,
        secretOrKey: process.env.JWT_SECRET_KEY,
    },
    (payload, done) => {
        return done(null, payload);
    }
);

passport.use(auth0Strategy);
passport.use(jwtStrategy);

module.exports = passport;