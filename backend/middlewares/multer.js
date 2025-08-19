import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //stores the uploaded file temporarily in temp folder before it gets uploaded to cloudinary
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    //stores the file in its original name
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage: storage });
