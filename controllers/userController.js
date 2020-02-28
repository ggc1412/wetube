import routes from "../routes";

const getjoin = (req, res) => res.render("join", { pageTitle: "Join"});
const postjoin = (req, res) => {
    const {
        body: { name, email, password, password2 }
    } = req;
    if( password !== password2){
        res.status(400);
        res.render("join", { pageTitle: "Join"});
    }else{
        // 회원등록
        // 유저 로그인
        res.redirect(routes.home);
    }    
};

const login = (req, res) => res.render("login", { pageTitle: "Log In"});
const logout = (req, res) => res.render("logout", { pageTitle: "Log Out"});
const userDetail = (req, res) => res.render("user Detail", { pageTitle: "User Detail"});
const editProfile = (req, res) => res.render("editProfile", { pageTitle: "Edit Profile"});
const changePassword = (req, res) => res.render("changePassword", { pageTitle: "Change Password"});

export { getjoin, postjoin, login, logout, userDetail, editProfile, changePassword };