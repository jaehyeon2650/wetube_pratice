import express from "express";
const app = express();
const handleHome = (req, res) => {
    return res.send("Hi");
}
const handleLogin = (req, res) => {
    return res.send("Login");
}
app.get("/", handleHome);
app.get("/login", handleLogin);
const handleListening = () => {
    console.log("Server listening on port 4000");
}
app.listen(4000, handleListening);