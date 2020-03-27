import passport from "passport";
import GitHubStrategy from "passport-github";
import KakaoStrategy from "passport-kakao";
import User from "./models/User";
import {
  githubLoginCallback,
  kakaoLoginCallback
} from "./controllers/userController";
import routes from "./routes";

// Local Strategy
passport.use(User.createStrategy());

// github Strategy
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.PRODUCTION
        ? `https://serene-dusk-80611.herokuapp.com${routes.githubCallback}`
        : `http://localhost:3000${routes.githubCallback}`
    },
    githubLoginCallback
  )
);

// kakao Strategy
passport.use(
  new KakaoStrategy(
    {
      clientID: process.env.KAKAO_CLIENT_ID,
      callbackURL: process.env.PRODUCTION
        ? `https://serene-dusk-80611.herokuapp.com${routes.kakaoCallback}`
        : `http://localhost:3000${routes.kakaoCallback}`
    },
    kakaoLoginCallback
  )
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
