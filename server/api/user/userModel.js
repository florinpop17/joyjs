const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    github_id: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, unique: true },
    avatar_url: { type: String },
    points: { type: Number, default: 0 },
    admin: { type: Boolean, default: false }
});

module.exports = mongoose.model('User', userSchema);
