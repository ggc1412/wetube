import routes from "./routes";
import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";

const videoMaxSize = 200 * 1024 * 1024;
const avatarMaxSize = 10 * 1024 * 1024;

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: "ap-northeast-2"
});

const multerVideo = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: "wetube1.0/video"
  }),
  limits: { fileSize: videoMaxSize },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.match(/^video\//)) {
      return cb(new Error("Only video file allowed"));
    }
    return cb(null, true);
  }
});
const multerAvatar = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: "wetube1.0/avatar"
  }),
  limits: { fileSize: avatarMaxSize },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.match(/^image\//)) {
      return cb(new Error("Only image file allowed"));
    }
    return cb(null, true);
  }
});

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

const videoSingle = multerVideo.single("videoFile");

const uploadVideo = (req, res, next) => {
  videoSingle(req, res, err => {
    if (err) {
      console.log(err);
      return res.redirect(`${routes.videos}${routes.upload}`);
    }
    next();
  });
};

const avatarSingle = multerAvatar.single("avatar");

const uploadAvatar = (req, res, next) => {
  avatarSingle(req, req, err => {
    if (err) {
      console.log(err);
      return res.redirect(`${routes.users}${routes.editProfile}`);
    }
    next();
  });
};

export { localsMiddleware, uploadVideo, uploadAvatar, onlyPrivate, onlyPublic };
