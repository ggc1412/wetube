import passport from "passport";
import GitHubStrategy from "passport-github";
import User from "./models/User";
import { githubLoginCallback } from "./controllers/userController";
import routes from "./routes";

// Local Strategy
passport.use(User.createStrategy());

// github Strategy
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: `https://serene-dusk-80611.herokuapp.com${routes.githubCallback}`
      // process.env.PRODUCTION
      //   ? `https://serene-dusk-80611.herokuapp.com${routes.githubCallback}`
      //   : `http://localhost:3000${routes.githubCallback}`
    },
    githubLoginCallback
  )
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
