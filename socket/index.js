const io = require("socket.io")(8900, {
    cors: {
        origin: (origin, callback) => {
            // Check if the origin is allowed
            const allowedOrigins = ["http://localhost:3000", "https://socialtea.onrender.com"];
            if (allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
    },
});

let users = [];


const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
        users.push({ userId, socketId })
}

const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId)
}

const getUser=(userId)=>{
    return users.find((user)=>user.userId===userId)
}

io.on('connection', (socket) => {
    console.log("A user connected")
    //when connect
    socket.on("addUser", userId => {
        addUser(userId, socket.id);
        io.emit("getUsers", users)
    })

    //send a message
    socket.on("sendMessage",({senderId,receiverId,text})=>{
        const user=getUser(receiverId);

        io.to(user.socketId).emit("getMessage",{
            senderId,
            text
        });
    });

    //when disconnect
    socket.on("disconnect", () => {
        console.log('User disconnected!')
        removeUser(socket.id);
        io.emit("getUsers", users);
    })
});

