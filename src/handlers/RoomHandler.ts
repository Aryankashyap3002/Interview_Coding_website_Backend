import { Socket } from "socket.io/dist";
import { v4 as UUIDv4 } from "uuid";
import IRoomsParams from "../Interfaces/IRoomParams";

const rooms : Record<string, string[]> = {}

const roomHAndler = (socket: Socket) => {

    

    const createRoom = () => {
        const roomId = UUIDv4();
        socket.join(roomId);
        rooms[roomId] = [];
        socket.emit("room-created", { roomId });
        console.log("Room created with roomID", roomId);
    };

    const joinedRoom = ({roomId, peerId}: IRoomsParams) => {
        if(rooms[roomId]) {
            console.log("New room joined", roomId, "with peer id as", peerId);
            rooms[roomId].push(peerId);
            socket.join(roomId);

            socket.emit("get-user", {
                roomId,
                participants: rooms[roomId]
            });
            console.log(rooms);
        }
    };

    socket?.on("create-room", createRoom);
    socket?.on("joined-room", joinedRoom);
};

export default roomHAndler;
