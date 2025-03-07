import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

// Stratégie locale (Login avec email/mot de passe)
passport.use(new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
  console.log("bodyPassport" ,email, password,);
  
  try {

    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return done(null, false, { message: "Email ou mot de passe incorrect" });
    }
    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));

// Stratégie JWT
passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
}, async (jwt_payload, done) => {
  try {
    const user = await User.findByPk(jwt_payload.id);
    if (user) return done(null, user);
    return done(null, false);
  } catch (error) {
    return done(error, false);
  }
}));
