import { Request } from "express";
import multer from "multer";

type DestinationCallback = (error: Error | null, destination: string) => void;

const storage = multer.diskStorage({
  destination: (
    _req: Request,
    _file: Express.Multer.File,
    cb: DestinationCallback
  ) => {
    cb(null, "./public/uploads");
  },
  filename: (
    _req: Request,
    file: Express.Multer.File,
    cb: DestinationCallback
  ) => {
    const fileName = file.originalname;
    cb(null, fileName);
  },
});

const upload = multer({ storage });

export default upload;
