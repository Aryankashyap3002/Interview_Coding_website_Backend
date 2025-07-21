import { Socket } from "socket.io/dist";
import { v4 as UUIDv4 } from "uuid";

const roomHAndler = (socket: Socket) => {
    const createRoom = () => {
        const roomId = UUIDv4();
        socket.join(roomId);
        socket.emit("room-created", { roomId });
        console.log("Room created with roomID", roomId);
    };

    const joinedRoom = () => {
        console.log("New room joined");
    };

    socket.on("create-room", createRoom);
    socket.on("joined-room", joinedRoom);
};

export default roomHAndler;
