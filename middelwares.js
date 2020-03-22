import routes from "./routes";
import multer from "multer";

const multerVideo = multer({ dest: "uploads/videos/" });
const multerAvatar = multer({ dest: "uploads/avatars/" });

const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "WeTube";
  res.locals.routes = routes;
  res.locals.loggedUser = req.user || null;
  next();
};

const onlyPublic = (req, res, next) => {
  if (req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};

const onlyPrivate = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect(routes.home);
  }
};

const uploadVideo = multerVideo.single("videoFile");
const uploadAvatar = multerAvatar.single("avatar");

export { localsMiddleware, uploadVideo, uploadAvatar, onlyPrivate, onlyPublic };
