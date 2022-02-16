const multer = require('multer');
const {
  returningError
} = require('../helpers/responseHandler');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const extension = file.originalname.split('.').pop();
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + extension);
  }
});

const fileFilter = (req, file, cb) => {
  const mimes = ['image/jpeg', 'image/png'];

  if (!mimes.includes(file.mimetype)) {
    return cb(new Error('Only jpeg and png are allowed'), false);
  } else {
    cb(null, true);
  }
};

exports.uploadMiddleware = (key, maxSize = null) => {
  const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
      fileSize: maxSize || 2097152 // max 2MB
    }
  }).single(key);

  // returning middleware
  return (req, res, next) => {
    upload(req, res, (err) => {
      if (err) {
        return returningError(res, 400, err.message);
      }
      next();
    });
  };
};
