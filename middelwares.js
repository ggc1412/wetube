import routes from "./routes";

const localsMiddleware = (req, res, next) => {
    res.locals.siteName = "WeTube";
    res.locals.routes = routes;
    next();
}

export { localsMiddleware };