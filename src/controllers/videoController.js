import routes from "../routes";
import Video from "../models/Video";
import Comment from "../models/Comment";
import User from "../models/User";

// Home
const home = async (req, res) => {
  try {
    const videos = await Video.find({}).sort({ _id: -1 });
    res.render("home", { pageTitle: "Home", videos });
  } catch (error) {
    console.log(error);
    res.render("home", { pageTitle: "Home", videos: [] });
  }
};

// Search
const search = async (req, res) => {
  const {
    query: { term: searchingBy }
  } = req; //const searchigBy = req.query.term;
  let videos = [];
  try {
    videos = await Video.find({
      title: { $regex: searchingBy, $options: "i" }
    });
  } catch (error) {
    console.log(error);
  }
  res.render("search", { pageTitle: "Search", searchingBy, videos }); //key:value인데 key=value면 한번만 써도 됨.
};

// Upload
const getUpload = (req, res) => res.render("upload", { pageTitle: "Upload" });
const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: { location },
    user
  } = req;

  const newVideo = await Video.create({
    fileUrl: location,
    title,
    description,
    creator: user._id
  });
  req.user.videos.push(newVideo.id);
  req.user.save();
  res.redirect(routes.videoDetail(newVideo.id));
};

// Video Detail
const videoDetail = async (req, res) => {
  const {
    params: { id }
  } = req;

  try {
    const video = await Video.findById(id)
      .populate("creator")
      .populate("comments");
    res.render("videoDetail", { pageTitle: video.title, video });
  } catch (error) {
    res.redirect(routes.home);
  }
};

// Edit Video
const getEditVideo = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const video = await Video.findById(id);
    if (JSON.stringify(video.creator) !== JSON.stringify(req.user._id)) {
      throw Error();
    } else {
      res.render("editVideo", { pageTitle: "Edit Video", video });
    }
  } catch (error) {
    console.error("error");
    res.redirect(routes.home);
  }
};

const postEditVideo = async (req, res) => {
  const {
    params: { id },
    body: { title, description }
  } = req;
  try {
    await Video.findOneAndUpdate({ _id: id }, { title, description });
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    res.redirect(routes.home);
  }
};

// Delete Video
const deleteVideo = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const video = await Video.findById(id);
    if (JSON.stringify(video.creator) !== JSON.stringify(req.user._id)) {
      throw Error();
    } else {
      await Video.findOneAndDelete({ _id: id });
    }
  } catch (error) {
    console.log(error);
  }
  res.redirect(routes.home);
};

// Register Video View
const postRegisterView = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const video = await Video.findById(id);
    video.views += 1;
    video.save();
    res.status(200);
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};

// Add Comments
const postAddComment = async (req, res) => {
  const {
    params: { id },
    body: { comment },
    user: loggedUser
  } = req;
  try {
    const video = await Video.findById(id);
    const user = await User.findById(loggedUser.id);
    const newComment = await Comment.create({
      text: comment,
      creator: user.id
    });
    video.comments.push(newComment.id);
    video.save();
    user.comments.push(newComment.id);
    user.save();
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};

// Delete Comment
const deleteComment = async (req, res) => {
  const {
    params: { id },
    body: { commentId },
    user
  } = req;
  try {
    const video = await Video.findById(id);
    const loggedUser = await User.findById(user.id);
    deleteArray(video, commentId);
    deleteArray(loggedUser, commentId);
    Comment.findOneAndDelete({ _id: commentId });
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};

const deleteArray = (model, commentId) => {
  const index = model.comments.indexOf(commentId);
  if (index > -1) {
    model.comments.splice(index, 1);
  }
  model.save();
};

export {
  home,
  search,
  getUpload,
  postUpload,
  videoDetail,
  getEditVideo,
  postEditVideo,
  deleteVideo,
  postRegisterView,
  postAddComment,
  deleteComment
};
