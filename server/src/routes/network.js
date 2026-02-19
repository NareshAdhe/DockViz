import express from 'express'
import { getNetworks } from '../controllers/network.js';

const networkRouter = express.Router();

networkRouter.get("/",getNetworks);

export default networkRouter;