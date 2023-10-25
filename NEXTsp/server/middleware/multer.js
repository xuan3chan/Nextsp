const multer = require('multer');

// Set up the storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // specify the folder where the uploaded files will be stored
  },
  filename: (req, file, cb) => {
    // Generate a unique filename based on current timestamp and original filename
    const uniqueFilename = Date.now() + '-' + file.originalname;
    cb(null, uniqueFilename);
    
    // Add the filename to the request object for later use in the service
    req.filename = uniqueFilename;
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
