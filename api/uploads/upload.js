const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: path.join(__dirname, "../../client/public/images"),
    filename: (req, file, cb) => {
      let ext = path.extname(file.originalname);
      cb(null, Date.now() + ext);
    },
  });
  const upload = multer({ storage: storage })
  const multipleUpload = upload.fields([{name: 'img', maxCount: 1}])



  module.exports = {multipleUpload};