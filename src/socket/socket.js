import { io } from 'socket.io-client';

export const socket = io(
  "https://podilska.pp.ua/",
  {
    transports: ["websocket"],
  }
);

