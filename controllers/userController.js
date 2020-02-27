const join = (req, res) => res.render("join", { pageTitle: "Join"});
const login = (req, res) => res.render("login", { pageTitle: "Log In"});
const logout = (req, res) => res.render("logout", { pageTitle: "Log Out"});
const userDetail = (req, res) => res.render("user Detail", { pageTitle: "User Detail"});
const editProfile = (req, res) => res.render("editProfile", { pageTitle: "Edit Profile"});
const changePassword = (req, res) => res.render("changePassword", { pageTitle: "Change Password"});

export { join, login, logout, userDetail, editProfile, changePassword };