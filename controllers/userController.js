import passport from "passport";
import routes from "../routes";
import User from "../models/User";

const getjoin = (req, res) => res.render("join", { pageTitle: "Join" });
const postjoin = async (req, res, next) => {
  const {
    body: { name, email, password, password2 }
  } = req;
  if (password !== password2) {
    res.status(400);
    res.render("join", { pageTitle: "Join" });
  } else {
    try {
      const user = await User({
        name,
        email
      });
      await User.register(user, password);
      next();
    } catch (error) {
      console.log(error);
      res.redirect(routes.home);
    }
  }
};

const getlogin = (req, res) => res.render("login", { pageTitle: "Log In" });
const postlogin = passport.authenticate("local", {
  failureRedirect: routes.login,
  successRedirect: routes.home
});

const logout = (req, res) => {
  // TO Do: 로그아웃 처리
  res.redirect(routes.home);
};

const userDetail = (req, res) =>
  res.render("userDetail", { pageTitle: "User Detail" });
const editProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "Edit Profile" });
const changePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "Change Password" });

export {
  getjoin,
  postjoin,
  getlogin,
  postlogin,
  logout,
  userDetail,
  editProfile,
  changePassword
};
