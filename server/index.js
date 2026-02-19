import express from 'express';
import cors from 'cors';
import http from 'http';
import { initSocket } from './src/config/socket.js';
import socketServices from './src/utils/socketServices.js';
import containerRouter from './src/routes/container.js';
import imageRouter from './src/routes/image.js';
import networkRouter from './src/routes/network.js';
import volumeRouter from './src/routes/volume.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const server = http.createServer(app);

const io = initSocket(server);
socketServices(io);

app.use(cors({
    origin: process.env.FRONTEND_URL
}));
app.use(express.json());

app.use('/api/containers',containerRouter);
app.use('/api/images',imageRouter);
app.use('/api/networks',networkRouter);
app.use('/api/volumes',volumeRouter);


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);
});