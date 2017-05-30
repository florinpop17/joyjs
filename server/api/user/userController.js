const User = require('./userModel');

exports.getAllUsers = (req, res, next) => {
    User.find({})
        .exec((err, users) => {
            if (err) next(new Error(err));
            res.json({ users });
        });
};
