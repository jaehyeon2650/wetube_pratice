import express from "express";
import morgan from "morgan";
const app = express();
const logger = morgan("dev");
const handleHome = (req, res) => {
    return res.send("Hi");
}
const handleLogin = (req, res) => {
    return res.send("Login");
}

app.use(logger);
app.get("/", handleHome);
app.get("/login", handleLogin);
const handleListening = () => {
    console.log("Server listening on port 4000");
}
app.listen(4000, handleListening);