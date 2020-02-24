const home = (req, res) => res.render("home", { pageTitle: "Home"});
const search = (req, res) => res.render("search", { pageTitle: "Search"});
const videos = (req, res) => res.render("videos", { pageTitle: "Videos"});
const upload = (req, res) => res.render("upload", { pageTitle: "Upload"});
const videoDetail = (req, res) => res.render("video Detail", { pageTitle: "Video Detail"});
const editVideo = (req, res) => res.render("editVideo", { pageTitle: "Edit Video"});
const deleteVideo = (req, res) => res.render("deleteVideo", { pageTitle: "Delete Video"});

export { home, search, videos, upload, videoDetail, editVideo, deleteVideo };