const multer = require('multer');

// Set up the storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // specify the folder where the uploaded files will be stored
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // generate a unique filename
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
