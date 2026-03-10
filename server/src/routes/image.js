import express from 'express'
import { getImages } from '../controllers/image.js';

const imageRouter = express.Router();

imageRouter.get("/",getImages);

export default imageRouter;