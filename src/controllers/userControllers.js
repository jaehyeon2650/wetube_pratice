import User from "../models/User";
import bcrypt from "bcrypt";
export const getJoin = (req, res) => {
    return res.render("join", { pageTitle: "Join" });
}
export const postJoin = async (req, res) => {
    const { username, email, password, password2, name, location } = req.body;
    if (password !== password2) {
        return res.status(400).render("join", {
            pageTitle: "Join",
            errorMessage: "Password confirmation does not match."
        })
    }
    const exist = await User.exists({ $or: [{ email }, { username }] });
    if (exist) {
        return res.status(400).render("join", {
            pageTitle: "Join",
            errorMessage: "This username/email is already taken."
        })
    }
    try {
        await User.create({
            username,
            email,
            password,
            name,
            location,
        })
        return res.redirect("/");
    } catch (error) {
        return res.status(400).render("join", {
            pageTitle: "Join",
            errorMessage: error._message,
        });
    }
}
export const getLogin = (req, res) => {
    return res.render("login", { pageTitle: "Login" });
}
export const postLogin = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(400).render("login", { pageTitle: "Login", errorMessage: "An account with this username does not exists." });
    }
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
        return res.status(400).render("login", { pageTitle: "Login", errorMessage: "Wrong password!" });
    }
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/");
}
export const logout = (req, res) => {
    return res.send("Logout");
}
export const edit = (req, res) => {
    return res.send("Edit");
}
export const remove = (req, res) => {
    return res.send("Remove");
}
export const see = (req, res) => {
    return res.send("See");
}