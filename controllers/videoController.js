import routes from "../routes";

const home = (req, res) => {
    res.render("home", { pageTitle: "Home", videos });
};
const search = (req, res) => {
    const { query:{term:searchingBy} } = req; //const searchigBy = req.query.term;
    res.render("search", { pageTitle: "Search", searchingBy, videos }); //key:value인데 key=value면 한번만 써도 됨.
};
const getUpload = (req, res) => res.render("upload", { pageTitle: "Upload"});
const postUpload = (req, res) => {
    const { 
        body: { file, title, description }
    } = req;
    // To Do: 비디오 업로드 처리
    res.redirect(routes.videoDetail(324393));
};

const videoDetail = (req, res) => res.render("videoDetail", { pageTitle: "Video Detail"});
const editVideo = (req, res) => res.render("editVideo", { pageTitle: "Edit Video"});
const deleteVideo = (req, res) => res.render("deleteVideo", { pageTitle: "Delete Video"});

export { home, search, getUpload, postUpload, videoDetail, editVideo, deleteVideo };