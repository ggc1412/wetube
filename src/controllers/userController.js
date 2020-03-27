import passport from "passport";
import routes from "../routes";
import User from "../models/User";

// Join
const getjoin = (req, res) => res.render("join", { pageTitle: "Join" });
const postjoin = async (req, res, next) => {
  const {
    body: { name, email, password, password2 }
  } = req;
  if (password !== password2) {
    req.flash("error", "Passwords don't match");
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

// Login
const getlogin = (req, res) => res.render("login", { pageTitle: "Log In" });
const postlogin = passport.authenticate("local", {
  failureRedirect: routes.login,
  successRedirect: routes.home,
  successFlash: "Welcome",
  failureFlash: "Can't log in. Check email and/or password"
});

// github Login
const githubLogin = passport.authenticate("github");
const postGithubLogin = (req, res) => {
  res.redirect(routes.home);
};

const githubLoginCallback = async (_, __, profile, cb) => {
  const {
    _json: { id, avatar_url: avatarUrl, name, email }
  } = profile;
  try {
    let user = null;
    if (email) user = await User.findOne({ email });
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

// kakao Login
const kakaoLogin = passport.authenticate("kakao");
const postKakaoLogin = (req, res) => {
  res.redirect(routes.home);
};

const kakaoLoginCallback = async (_, __, profile, cb) => {
  const {
    _json: {
      id,
      properties: { nickname: name, profile_image: avatarUrl },
      kakao_account: { email }
    }
  } = profile;
  try {
    let user = null;
    if (email) user = await User.findOne({ email });
    if (user) {
      user.kakaoId = id;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      email: email,
      name,
      kakaoId: id,
      avatarUrl
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};

// Logout
const logout = (req, res) => {
  req.flash("info", "Logged out, see you later");
  req.logout();
  res.redirect(routes.home);
};

// Profile
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("videos");
    console.log(user);
    res.render("userDetail", { pageTitle: "User Detail", user });
  } catch (error) {
    req.flash("error", "User not found");
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
    req.flash("error", "User not found");
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
      avatarUrl: file ? file.location : req.user.avatarUrl
    });
    req.flash("success", "Profile updated");
    res.redirect(routes.me);
  } catch (error) {
    req.flash("error", "Sorry, Can't update profile");
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
      req.flash("error", "Can't change password. Check password");
      res.redirect(`/users/${routes.changePassword}`);
      return;
    }
    await req.user.changePassword(oldPassword, newPassword);
    req.flash("success", "Password changed");
    res.redirect(routes.me);
  } catch (error) {
    res.status(400);
    req.flash("error", "Sorry, Can't change password");
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
  kakaoLogin,
  postKakaoLogin,
  kakaoLoginCallback,
  logout,
  userDetail,
  getEditProfile,
  postEditProfile,
  getChangePassword,
  postChangePassword,
  getMe
};
