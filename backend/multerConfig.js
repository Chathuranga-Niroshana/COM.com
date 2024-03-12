import multer from "multer";
import path from "path";

const storage = (folder) =>
  multer.diskStorage({
    destination: `./upload/images/${folder}`,
    filename: (req, file, cb) => {
      return cb(
        null,
        `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
      );
    },
  });

export const upload = (folder) => multer({ storage: storage(folder) });
