import express from "express";
import routes from "../routes";
import {
  postRegisterView,
  postAddComment
} from "../controllers/videoController";

const apiRouter = express.Router();

apiRouter.post(routes.registerView, postRegisterView);
// db에 값을 변경할 경우 post
apiRouter.post(routes.addComment, postAddComment);

export default apiRouter;
