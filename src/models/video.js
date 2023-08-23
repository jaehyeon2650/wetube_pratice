import mongoose from "mongoose";

const videoShema = new mongoose.Schema({
    fileUrl: { type: String, required: true },
    title: { type: String, required: true, maxLength: 80, trim: true },
    description: { type: String, required: true, minLength: 20, trim: true },
    createdAt: { type: Date, default: Date.now, required: true },
    hashtags: [{ type: String, trim: true }],
    meta: {
        views: { type: Number, default: 0 },
        rating: { type: Number, default: 0 },
    }
})

videoShema.static("formatHashtags", function (hashtags) {
    return hashtags.split(",").map((word) => (word.startsWith("#") ? word : `#${word}`));
})
const Video = mongoose.model("Video", videoShema);
export default Video;