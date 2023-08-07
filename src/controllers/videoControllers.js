export const search = (req, res) => {
    return res.send("Search");
}
export const trending = (req, res) => {
    return res.render("home", { pageTitle: "Home" });
}
export const see = (req, res) => {
    return res.render("watch", { pageTitle: "Watch" });
}
export const edit = (req, res) => {
    return res.render("edit", { pageTitle: "Edit" });
}
export const remove = (req, res) => {
    return res.send(`Delete #${req.params.id}`);
}
export const upload = (req, res) => {
    return res.send("Upload");
}