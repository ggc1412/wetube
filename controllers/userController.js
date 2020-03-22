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

const githubLogin = passport.authenticate("github");
const postGithubLogin = (req, res) => {
  res.redirect(routes.home);
};

const githubLoginCallback = async (_, __, profile, cb) => {
  const {
    _json: { id, avatar_url: avatarUrl, name, email }
  } = profile;
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.githubId = id;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      email: email,
      name,
      githubId: id,
      avatarUrl
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};

const logout = (req, res) => {
  req.logout();
  res.redirect(routes.home);
};

const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("videos");
    res.render("userDetail", { pageTitle: "User Detail", user });
  } catch (error) {
    res.redirect(routes.home);
  }
};

const userDetail = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const user = await User.findById(id).populate("videos");
    res.render("userDetail", { pageTitle: "User Detail", user });
  } catch (error) {
    res.redirect(routes.home);
  }
};
const getEditProfile = async (req, res) => {
  res.render("editProfile", { pageTitle: "Edit Profile" });
};
const postEditProfile = async (req, res) => {
  const {
    body: { name, email },
    file
  } = req;
  try {
    await User.findByIdAndUpdate(req.user.id, {
      name,
      email,
      avatarUrl: file ? file.path : req.user.avatarUrl
    });
    res.redirect(routes.me);
  } catch (error) {
    res.redirect(routes.editProfile);
  }
};

const getChangePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "Change Password" });

const postChangePassword = async (req, res) => {
  const {
    body: { oldPassword, newPassword, newPassword1 }
  } = req;
  try {
    if (newPassword !== newPassword1) {
      res.status(400);
      res.redirect(`/users/${routes.changePassword}`);
      return;
    }
    await req.user.changePassword(oldPassword, newPassword);
    res.redirect(routes.me);
  } catch (error) {
    res.status(400);
    res.redirect(`/users/${routes.changePassword}`);
  }
};

export {
  getjoin,
  postjoin,
  getlogin,
  postlogin,
  githubLogin,
  postGithubLogin,
  githubLoginCallback,
  logout,
  userDetail,
  getEditProfile,
  postEditProfile,
  getChangePassword,
  postChangePassword,
  getMe
};
