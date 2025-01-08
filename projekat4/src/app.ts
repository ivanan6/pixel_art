require('dotenv').config();
import express, {Application} from "express";
import mongoose from "mongoose";
//import userRoutes from "@/routes/userRoutes";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import pictureRoutes from "./routes/pictureRoutes";
import { errorHandler } from "./middleware/errorHandler";
import * as http from 'http'
import {Server} from 'socket.io'
import history from "connect-history-api-fallback";
import path from 'path'
// Povezivanje sa MongoDB
const connectToDatabase = async () => {
    try {
      await mongoose.connect('mongodb://localhost:27017/testdb');
      console.log('connected');
    } catch (error) {
      console.error('Greška pri povezivanju sa MongoDB:', error);
    }
  };
  
connectToDatabase();
const app: Application = express();
const server = http.createServer(app);




const io = require('socket.io')(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  //console.log('User connected:', socket.id);

  
  socket.on('join-room', (roomId) => {
    socket.join(roomId);
    //console.log(`User ${socket.id} joined room ${roomId}`);
  });
  socket.on('cursor-move', (cursorData) => {
    
    socket.to(cursorData.roomId).emit('cursor-update', cursorData);
  });
  
  socket.on('update-grid', ({ roomId, grid }) => {
    
    socket.to(roomId).emit('grid-updated', grid);
  });

  
  socket.on('disconnect', () => {
    if (socket.roomId) {
      io.to(socket.roomId).emit('user-disconnected', { userId: socket.id });
    }
    //console.log('User disconnected:', socket.id);
  });
});




const PORT = 3000;

app.use(cors())
app.use(express.json())

//app.use("/users",userRoutes);

app.use("/auth", authRoutes);
app.use("/pictures", pictureRoutes);

const dir_name = path.resolve();
app.use(history())
app.use(express.static(path.join(dir_name,'/dist/dist')));
app.use((req, res, next) => {
  res.status(200).sendFile(path.join(dir_name+'/dist/dist/index.html'));
});

app.use(errorHandler);


server.listen(PORT,'0.0.0.0', () => {
    console.log(`server j epokrenut na portu ${PORT}`)
    console.log(server.address())
})
