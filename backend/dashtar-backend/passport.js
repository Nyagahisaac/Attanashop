const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const passport = require("passport");

const GOOGLE_CLIENT_ID = "297433249878-4kjlph3b1qot31frsuuqmfp8iip17tio.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

const FACEBOOK_APP_ID = "563313035177421";
const FACEBOOK_APP_SECRET = "a9c0c0a373f3f2750fedea0058cdf4d2";

// @ts-ignore
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    done (null,profile)
  }
));

passport.use(new FacebookStrategy ({
  clientID: FACEBOOK_APP_ID,
  clientSecret: FACEBOOK_APP_SECRET,
  callbackURL: "auth/facebook/callback"
},
  function (accessToken, refreshToken, profile, done) {
    done(null, profile)
  }

));

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null , user)
});
