import multer from "multer";
export const localMiddleware = (req, res, next) => {
    res.locals.siteName = "Wetube";
    res.locals.loggedIn = Boolean(req.session.loggedIn);
    res.locals.user = req.session.user;
    next();
}
export const protectorMiddleware = (req, res, next) => {
    if (req.session.loggedIn) {
        return next();
    }
    return res.redirect("/login");
}
export const publicOnlyMiddleware = (req, res, next) => {
    if (!req.session.loggedIn) {
        return next();
    }
    return res.redirect("/");
}
export const avatarUpload = multer({
    dest: "uploads/avatars/",
    limits: {
        fileSize: 30000000,
    }
})
export const videoUpload = multer({
    dest: "uploads/videos",
    limits: {
        fileSize: 1000000000,
    }
})