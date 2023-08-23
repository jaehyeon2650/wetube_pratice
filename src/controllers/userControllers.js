import User from "../models/User";
import bcrypt from "bcrypt";
import fetch from "node-fetch";
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
    const user = await User.findOne({ username, socialOnly: false });
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
export const startGithubLogin = (req, res) => {
    const baseUrl = "https://github.com/login/oauth/authorize";
    const config = {
        client_id: process.env.CLIENT_ID,
        allow_signup: false,
        scope: "read:user user:email",
    }
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;
    return res.redirect(finalUrl);
}
export const finishGithubLogin = async (req, res) => {
    const baseUrl = "https://github.com/login/oauth/access_token";
    const config = {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        code: req.query.code,
    }
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;
    const tokenRequest = await (await fetch(finalUrl, {
        method: "POST",
        headers: {
            Accept: "application/json",
        }
    })).json();
    console.log(tokenRequest);
    if ("access_token" in tokenRequest) {
        const { access_token } = tokenRequest;
        const apiUrl = "https://api.github.com";
        const userData = await (await fetch(`${apiUrl}/user`, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        })).json();
        const emailData = await (await fetch(`${apiUrl}/user/emails`, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        })).json();
        const emailObj = emailData.find((email) => email.primary === true && email.verified == true);
        if (!emailObj) {
            return res.redirect("/login");
        }
        let user = await User.findOne({ email: emailObj.email });
        if (!user) {
            user = await User.create({
                avatarUrl: userData.avatar_url,
                name: userData.name,
                username: userData.login,
                email: emailObj.email,
                password: "",
                socialOnly: true,
                location: userData.location,
            });
        }
        req.session.loggedIn = true;
        req.session.user = user;
        return res.redirect("/");

    } else {
        return res.redirect("/login");
    }

}
export const logout = (req, res) => {
    req.session.destroy();
    return res.redirect("/");
}
export const edit = (req, res) => {
    return res.send("Edit");
}
export const getEdit = (req, res) => {
    return res.render("edit-profile", { pageTitle: "Edit Profile" });
}
export const postEdit = async (req, res) => {
    const {
        session: {
            user,
            user: { avatarUrl },
        },
        body: {
            name, email, username, location
        },
        file,
    } = req;
    if (user.email !== email) {
        const exist = await User.findOne({ email });
        if (exist) {
            return res.status(404).render("edit-profile", { pageTitle: "Edit-Profile", errorMessage: "Email already exists" });
        }
    } else if (user.username != username) {
        const exist = await User.findOne({ username });
        if (exist) {
            return res.status(404).render("edit-profile", { pageTitle: "Edit-Profile", errorMessage: "Username already exists" });
        }
    }
    const updateUser = await User.findByIdAndUpdate(user._id, {
        name,
        email,
        username,
        location,
        avatarUrl: file ? file.path : avatarUrl,
    }, { new: true })
    req.session.user = updateUser;
    return res.redirect("/users/edit");

}
export const getChangePassword = (req, res) => {
    if (req.session.user.socialOnly) {
        return res.render("/");
    }
    return res.render("change-password", { pageTitle: "Change Password" });
}
export const postChangePassword = async (req, res) => {
    const { user } = req.session;
    const { oldPassword, newPassword, newPassword2 } = req.body;
    const ok = await bcrypt.compare(oldPassword, user.password);
    if (!ok) {
        return res.status(400).render("change-password", { pageTitle: "Change Password", errorMessage: "Wrong Password" });
    }
    if (newPassword !== newPassword2) {
        return res.status(400).render("change-password", { pageTitle: "Change Password", errorMessage: "Password confirmation does not match." })
    }
    const existUser = await User.findById(user._id);
    existUser.password = newPassword;
    await existUser.save();
    return res.redirect("/users/logout");

}
export const remove = (req, res) => {
    return res.send("Remove");
}
export const see = (req, res) => {
    return res.send("See");
}