import express from "express";
import routes from "../routes";
import { home, search } from "../controllers/videoController";
import {
  getlogin,
  postlogin,
  githubLogin,
  logout,
  getjoin,
  postjoin,
  postGithubLogin,
  getMe,
  kakaoLogin,
  postKakaoLogin
} from "../controllers/userController";
import { onlyPublic, onlyPrivate } from "../middelwares";
import passport from "passport";

const globalRouter = express.Router();

globalRouter.get(routes.join, onlyPublic, getjoin);
globalRouter.post(routes.join, onlyPublic, postjoin, postlogin);

globalRouter.get(routes.login, onlyPublic, getlogin);
globalRouter.post(routes.login, onlyPublic, postlogin);

globalRouter.get(routes.github, githubLogin);
globalRouter.get(
  routes.githubCallback,
  passport.authenticate("github", {
    failureRedirect: "/login",
    successFlash: "Welcome",
    failureFlash: "Can't log in. Check email and/or password"
  }),
  postGithubLogin
);

globalRouter.get(routes.kakao, kakaoLogin);
globalRouter.get(
  routes.kakaoCallback,
  passport.authenticate("kakao", {
    failureRedirect: "/login",
    successFlash: "Welcome",
    failureFlash: "Can't log in. Check email and/or password"
  }),
  postKakaoLogin
);

globalRouter.get(routes.home, home);
globalRouter.get(routes.logout, onlyPrivate, logout);
globalRouter.get(routes.search, search);
globalRouter.get(routes.me, getMe);

export default globalRouter;
