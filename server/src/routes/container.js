import express from 'express'
import { getContainers } from '../controllers/container.js';

const containerRouter = express.Router();

containerRouter.get("/",getContainers);

export default containerRouter;
