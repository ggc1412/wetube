import { videos } from "../db";
const home = (req, res) => {
    res.render("home", { pageTitle: "Home", videos });
};
const search = (req, res) => {
    const { query:{term:searchingBy} } = req; //const searchigBy = req.query.term;
    res.render("search", { pageTitle: "Search", searchingBy, videos }); //key:value인데 key=value면 한번만 써도 됨.
};
const upload = (req, res) => res.render("upload", { pageTitle: "Upload"});
const videoDetail = (req, res) => res.render("video Detail", { pageTitle: "Video Detail"});
const editVideo = (req, res) => res.render("editVideo", { pageTitle: "Edit Video"});
const deleteVideo = (req, res) => res.render("deleteVideo", { pageTitle: "Delete Video"});

export { home, search, upload, videoDetail, editVideo, deleteVideo };