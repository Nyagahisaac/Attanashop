
const {env } = require ("dotenv")
const users = require ('../models/User');
const passport = require("passport");

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


// const GoogleStarategy = require ('passport-google-token').Strategy;

const getProfile = (profile) => {
   const {id, displayName,emails, provider}  = profile;
   if (emails?.lenght){
       const email = emails[0].value;
       return{
           googleId: id,
           name: displayName,
           email,
           provider
       }
   }
   return null
}

passport.use(new GoogleStrategy({
    clientID: "60926471472-nq55t04qm4edlch1uk4fdo0uvt5pcsc0.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  async(accessToken, refreshToken, profile, done) => {
    try{
        const existingGoogleAccount = await  users.findOne({
            where: {googleId: profile.id}
        ,});
        if(!existingGoogleAccount){
            const existingEmailAccount = await users.findOne({ 
                where: { email: getProfile(profile).email},
            });
            if (!existingEmailAccount){
                const  newAccount = await users.create(getProfile(profile))
                return done(null, newAccount);
            }
            return done (null, existingEmailAccount);
        }
        return done(null , existingGoogleAccount);

    }catch(error){
        throw new Error(error)
    } 

  })
);

passport.serializeUser((users, done) => {
    done(null, users.id);
  });
  
  passport.deserializeUser((id, done) => {
    users.findBypk(id).then((user) => {
        done (null, user); 
    }).catch ((error) => done(error));
    
  });
  
  
      