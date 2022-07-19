import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

import DaoUser from '../daos/DaosAuth.js';

const UserInstance = DaoUser.getInstance()

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      // Match Email's User
      const user = await UserInstance.find(email);
      if (!user) {
        return done(null, false, { message: "no existe el Usuario." });
      }
      // Match Password's User
      const isMatch = await UserInstance.comparePassword(user,password);
      if (!isMatch)
        return done(null, false, { message: "Password incorrecta." });
      
      return done(null, user);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
