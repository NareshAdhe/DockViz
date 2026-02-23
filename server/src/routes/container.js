import express from 'express'
import { getContainers, startContainer, stopContainer } from '../controllers/container.js';

const containerRouter = express.Router();

containerRouter.post("/stop/:id",stopContainer);
containerRouter.post("/start/:id",startContainer);
containerRouter.get("/",getContainers);

export default containerRouter;
