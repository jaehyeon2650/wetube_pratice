const videos = [{
    title: "First Video",
    rating: 5,
    comments: 5,
    createdAt: "2023-08-09",
    views: 5,
    id: 1
},
{
    title: "Second Video",
    rating: 5,
    comments: 5,
    createdAt: "2023-08-09",
    views: 5,
    id: 2,
}, {
    title: "Third Video",
    rating: 5,
    comments: 5,
    createdAt: "2023-08-09",
    views: 5,
    id: 3
}]
export const search = (req, res) => {
    return res.send("Search");
}
export const trending = (req, res) => {
    return res.render("home", { pageTitle: "Home", videos });
}
export const watch = (req, res) => {
    const id = req.params.id;
    const video = videos[id - 1];
    return res.render("watch", { pageTitle: `Watch : ${video.title}`, video });
}
export const getEdit = (req, res) => {
    const { id } = req.params;
    const video = videos[id - 1];
    return res.render("edit", { pageTitle: `Edit : ${video.title}`, video });
}
export const postEdit = (req, res) => {
    const title = req.body.title;
    const id = req.params.id;
    videos[id - 1].title = title;
    return res.redirect("/");
}
export const remove = (req, res) => {
    return res.send(`Delete #${req.params.id}`);
}
export const getUpload = (req, res) => {
    return res.render("upload", { pageTitle: "Upload Video" })
}
export const postUpload = (req, res) => {
    const title = req.body.title;
    const newVideo = {
        title,
        rating: 0,
        comments: 0,
        createdAt: "Just Now",
        views: 0,
        id: videos.length
    }
    videos.push(newVideo);
    return res.redirect("/");
}