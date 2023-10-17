import { Server, Socket } from "socket.io";

const io = new Server({
    cors: {
        origin: "http://localhost:5173"
    },
})

io.listen(3000)


// Initializing new players

const players = [];
const generateRandomPosition = () => {
    return [Math.floor(Math.random() * 3), 0, Math.floor(Math.random() * 3)];
}
const generateRandomColor = () => {
    const h = Math.floor(Math.random() * 359);
    const s = 100 + "%";
    const l = 50 + "%";
    return "hsl(" + h + "," + s + "," + l + ")";
}


io.on("connection", (socket) => {
    console.log("user connected")
    players.push({
        id: socket.id,
        position: generateRandomPosition(),
        color: generateRandomColor()
    })

    socket.emit("hello")

    io.emit("players", players)

    socket.on("disconnect", () => {
        console.log("User Disconnected");

        players.splice(
            players.findIndex((player) => player.id === socket.id),
            1
        )
        io.emit("players", players)
    })
})