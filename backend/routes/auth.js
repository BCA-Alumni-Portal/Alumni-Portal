const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const jwtRequired = passport.authenticate('jwt', { session: false });
var mysql = require('mysql');
const sqlAccess = require("../sqlAccess");

const router = express.Router();

router.get('/login',
    passport.authenticate('auth0', {
        scope: 'openid email profile',
    }),
    (req, res) => {
        res.redirect('/');
    }
);
router.get('/logout', (req, res) => {
    req.session = null;
    let environment = process.env.NODE_ENV || 'development';
    const homeURL = encodeURIComponent(environment == "development" ? 'http://localhost:3000/' : "https://academiesalumni-production.up.railway.app/");
    res.redirect(
        `https://${process.env.AUTH0_DOMAIN}/v2/logout?returnTo=${homeURL}&client_id=${process.env.AUTH0_CLIENT_ID}`
    );
});


router.get('/callback', (req, res, next) => {
    passport.authenticate('auth0', async (err, user) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.redirect('/login');
        }
        
        console.log("CALLBACK SUCCESSFUL!");
        console.log(user);

        let email = user._json.email;
        let picture = user.picture;

        const userReturnObject = {
            email: email,
            picture: picture
        };
        let isAlum = await sqlAccess.verifyAlumEmail(userReturnObject.email);
        if (!isAlum) {
            return res.redirect('/invalid');
        }

        // Write the user's profile picture to the SQL database
        sqlAccess.readClientID(email).then((id) => {
            sqlAccess.writeProfilePictureToSQL(id, picture);
        })

        req.session.jwt = jwt.sign(userReturnObject, process.env.JWT_SECRET_KEY);
        return res.redirect('/');
    })(req, res, next);
});

// var axios = require("axios").default;

// var options = {
//     method: 'POST',
//     url: 'https://dev-f59msytf.us.auth0.com/oauth/token',
//     headers: { 'content-type': 'application/x-www-form-urlencoded' },
//     data: new URLSearchParams({
//         grant_type: 'client_credentials',
//         client_id: process.env.AUTH0_CLIENT_ID,
//         client_secret: process.env.AUTH0_SECRET,
//         audience: "https://academies-alumni-server-api"
//     })
// };

router.get('/current-session', (req, res) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
        if (err || !user) {
            res.send(false);
        } else {
            // axios.request(options).then(function (response) {
            //     //   console.log(response.data);
            //     user.access_token = response.data.access_token;

            //     res.send(user);
            // }).catch(function (error) {
            //     console.log("Error in requesting response data");
            //     console.error(error);
            // });
            res.send(user);
        }
    })(req, res);
});

module.exports = router;
