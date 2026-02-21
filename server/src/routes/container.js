import express from 'express'
import { getContainers, stopContainer } from '../controllers/container.js';

const containerRouter = express.Router();

containerRouter.post("/stop/:id",stopContainer);
containerRouter.get("/",getContainers);

export default containerRouter;
