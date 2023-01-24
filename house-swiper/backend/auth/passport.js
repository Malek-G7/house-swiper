// passport implementation here
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Profile = require("../Schemas/profile")
const crypto = require('crypto');

 async function verify (username,password,done) {
    try {
        const profile = await Profile.findOne({username : username})
        if(!profile){
            return done(null,false)
        }
        const isValid = validatePassword(password,profile.hash,profile.salt);
        if(isValid){
            return done(null,profile)
        }
        else{
            return done(null,false)
        }
    }
    catch (error) {
        // res.send(500).json({
        //     message : err.message
        // })
        console.log(error)
    }
}
const strategy  = new LocalStrategy(verify);

passport.use(strategy);

passport.serializeUser((profile, done) => {
    done(null, profile.id);
});

passport.deserializeUser( async (profileId, done) => {
    try{
        const deserializedProfile = await Profile.findById(profileId)
        done(null,deserializedProfile)
    }
    catch{
        res.send(500).json({
            message : err.message
        })
    }
});

function genPassword(password) {
    var salt = crypto.randomBytes(32).toString('hex');
    var genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    
    return {
      salt: salt,
      hash: genHash
    };
}

function validatePassword(password, hash, salt) {
    var hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return hash === hashVerify;
}

// module.exports.validPassword = validPassword;
module.exports.genPassword = genPassword;