import multer from "multer";
import DataParser from "datauri/parser.js";
import path from "path";

type DestinationCallback = (error: Error | null, destination: string) => void;

const storage = multer.memoryStorage();

const parser = new DataParser();
const upload = multer({ storage });

export const formatImage = (file: Express.Multer.File) => {
  const fileExtension = path.extname(file.originalname).toString();
  return parser.format(fileExtension, file.buffer).content;
};

export default upload;
