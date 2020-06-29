const imageFilter = function(req, file, cb) {
    if (!file.originalname.match(/\.(mp4)$/)) {
        req.fileValidationError = 'Only mp4 files are allowed!';
        return cb(new Error('Only mp4 files are allowed!'), false);
    }
    cb(null, true);
};
exports.imageFilter = imageFilter;