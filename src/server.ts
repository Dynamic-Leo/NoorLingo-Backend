import http from "http";
import app from "./app";
// import socketConnection from "./socket";

const PORT = Number(process.env.PORT);
const server = http.createServer(app);
// socketConnection(server);

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
