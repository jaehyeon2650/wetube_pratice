export const search = (req, res) => {
    return res.send("Search");
}
export const trending = (req, res) => {
    return res.send("Trending");
}
export const see = (req, res) => {
    return res.send(`See #${req.params.id}`);
}
export const edit = (req, res) => {
    return res.send(`Edit #${req.params.id}`);
}
export const remove = (req, res) => {
    return res.send(`Delete #${req.params.id}`);
}
export const upload = (req, res) => {
    return res.send("Upload");
}