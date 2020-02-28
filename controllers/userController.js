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
        // TO Do: 회원등록
        // TO Do: 유저 로그인
        res.redirect(routes.home);
    }    
};

const getlogin = (req, res) => res.render("login", { pageTitle: "Log In"});
const postlogin = (req, res) => {
    res.redirect(routes.home);
};

const logout = (req, res) => {
    // TO Do: 로그아웃 처리
    res.redirect(routes.home);
};

const userDetail = (req, res) => res.render("userDetail", { pageTitle: "User Detail"});
const editProfile = (req, res) => res.render("editProfile", { pageTitle: "Edit Profile"});
const changePassword = (req, res) => res.render("changePassword", { pageTitle: "Change Password"});

export { getjoin, postjoin, getlogin, postlogin, logout, userDetail, editProfile, changePassword };