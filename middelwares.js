import routes from "./routes";
import multer from "multer";

const multerVideo = multer({dest: "uploads/videos/"});

const localsMiddleware = (req, res, next) => {
    res.locals.siteName = "WeTube";
    res.locals.routes = routes;
    res.locals.user={
        isAuthenticated: true,
        id: 1
    }
    next();
}

const uploadVideo = multerVideo.single("videofile");

export { localsMiddleware, uploadVideo };