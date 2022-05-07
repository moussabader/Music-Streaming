const express = require('express')
const morgan = require ('morgan')
const Member = require('./util/Member.js')

const http = require("http");

require('dotenv').config({ path: '../../.env' })

require('../../db')

//Each Room is an array of Members
var rooms = []; //Array of Rooms
var roomNames = []; //Array of Room Names
var roomPasswords = []; //Array of Room Passwords
var roomInviteCodes = []; //parallel array to hold room invites

var publicRooms = []; //Array of Public Room Names for display purposes


const app = express()
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.get('/', async(req,res,next)=>{
     res.send("room services")
})



app.use(async(req,res,next)=>{
    // const error = new Error ("Not found")
    // error.status = 404
    // next(error)
    //next(createError.NotFound())
})

app.use((err,req,res,next)=>{
    res.status(err.status || 500)
    res.send({
        error :{
            status: err.status || 500,
            message: err.message,
        }
    })
})


const server = http.createServer(app);
const Server = require("socket.io");

const io = new Server(server);







io.on('connection', (socket) => {
    console.log("An user connected!");
    
    socket.on('joinRoom', (joiningRoomName, joiningRoomCode, username) => {
      if (verifyRoomPassword(joiningRoomName, joiningRoomCode)) {
         io.to(socket.id).emit("removeOtherElements");
        let joiner = new Member(socket.id, username);
        rooms[roomNames.indexOf(joiningRoomName)].push(joiner);
        
        socket.join(joiningRoomName);
        
        io.to(joiningRoomName).emit("welcomeMessage", getUsername(socket.id))
        io.to(socket.id).emit("changeTitle", joiningRoomName)
      }
      else {
        io.to(socket.id).emit("errorAlert", "Wrong room name or password. Please try again.")
      }
    });
    
    socket.on("joinRoomWithInvite", (inviteCode, username) => {
      var index = roomInviteCodes.indexOf(inviteCode);
      var joiningRoomName = roomNames[index];
      
      io.to(socket.id).emit("removeOtherElements");
      let joiner = new Member(socket.id, username);
      
      rooms[roomNames.indexOf(joiningRoomName)].push(joiner);
        
      socket.join(joiningRoomName);
        
      io.to(joiningRoomName).emit("welcomeMessage", getUsername(socket.id))
      io.to(socket.id).emit("changeTitle", joiningRoomName)
    })
    
    socket.on("makeRoom", (roomName, roomPassword, username) => {
      if (roomNames.includes(roomName)) {
        io.to(socket.id).emit("errorAlert", "A room with that name already exists. Pick a new name.")
        return;
      } else if (!roomName) {
        io.to(socket.id).emit("errorAlert", "Empty Room Names are not allowed.")
        return;
      }
      else if (!roomPassword) {
        io.to(socket.id).emit("errorAlert", "Enter a password. If you don't want to make a room with a password, make a public room.")
        return;
      }
      
      let owner = new Member(socket.id, username);
      
      rooms.push([owner]);
      roomNames.push(roomName);
      roomPasswords.push(roomPassword);
      roomInviteCodes.push(generateInviteCode());
      
      socket.join(roomName);
      
      io.to(socket.id).emit("removeOtherElements");
      io.to(socket.id).emit("changeTitle", roomName);
      io.to(roomName).emit("welcomeMessage", getUsername(socket.id));
    });
    
    socket.on("makePublicRoom", (roomName, username) => {
      if (roomNames.includes(roomName)) {
        io.to(socket.id).emit("errorAlert", "A room with that name already exists. Pick a new name.")
        return;
      } else if (!roomName) {
        io.to(socket.id).emit("errorAlert", "Empty Room Names are not allowed")
        return;
      }
      
      let owner = new Member(socket.id, username);
      
      rooms.push([owner]);
      roomNames.push(roomName);
      roomPasswords.push("publicRoom")
      roomInviteCodes.push(generateInviteCode());
      
      publicRooms.push(roomName);
      
      socket.join(roomName);
      io.to(socket.id).emit("removeOtherElements");
      io.to(socket.id).emit("changeTitle", roomName)
      io.to(roomName).emit("welcomeMessage", getUsername(socket.id));
      io.emit("addRoomToList", roomName);
    });
    
    socket.on("newMessage", (message, content) => {
      const currentRoom = getRoomName(socket.id);
      const message_words = message.split(" ");
      const first_word_in_message = message_words[0];
      
      
        switch (first_word_in_message) {
          case "!setUsername":
            const oldUsername = getUsername(socket.id);
            const newUsername = message
              .split(" ")
              .slice(1)
              .join(" ");
            changeUsername(socket.id, newUsername);
            io.to(currentRoom).emit("systemMessage", {
              command: "!setUsername",
              data: {
                newUsername: newUsername,
                oldUsername: oldUsername
              }
            })
            break;
          case "!invite":
            if (publicRooms.includes(currentRoom)) {
              io.to(currentRoom).emit(
                "systemMessage",
                {
                  command: "!invite",
                  data: {
                    username: getUsername(socket.id),
                    currentRoom: currentRoom,
                    inviteLink: getInviteLinkFromRoomName(currentRoom),
                    public: true
                  }
                }
              );
            } else if (
              publicRooms.includes(currentRoom) == false &&
              roomNames.includes(currentRoom) == true
            ) {
              io.to(currentRoom).emit(
                "systemMessage",
                {
                  command: "!invite",
                  data: {
                    username: getUsername(socket.id),
                    currentRoom: currentRoom,
                    inviteLink: getInviteLinkFromRoomName(currentRoom),
                    public: false
                  }
                }
              );
            }
            break;
          case "!users":
            io.to(currentRoom).emit(
              "systemMessage",
              {
                command: "!users",
                data: {
                  username: getUsername(socket.id),
                  onlineUsers: getOnlineUsers(currentRoom),
                  onlineUsersNames: getOnlineUsersNames(currentRoom).join(", ")
                }
              }
            );
            break;
          case "!color":
            if (fixColor(message_words[1]) == false) {
              io.to(socket.id).emit(
                "systemMessage", {
                  command: "!color",
                  data: {
                    failed: true
                  }
                }
              );
            } else {
              io.to(currentRoom).emit(
                "newMessage",
                message_words.slice(2).join(" "), {
                  usernameColor: getUsernameColor(socket.id),
                  username: getUsername(socket.id),
                  messageColor: fixColor(message_words[1])
                }
              );
            }
            break;
          case "!setColor":
            var newColor = message_words[1];
            if (fixColor(newColor) == false) {
              io.to(socket.id).emit(
                "systemMessage",
                {
                  command: "!setColor",
                  data: {
                    username: getUsername(socket.id),
                    newColor: fixColor(newColor),
                    failed: true
                  }
                }
              );
            } else {
              changeUsernameColor(socket.id, fixColor(newColor));
              io.to(currentRoom).emit(
                "systemMessage", {
                  command: "!setColor",
                  data: {
                    username: getUsername(socket.id),
                    newColor: fixColor(newColor),
                    failed: false
                  }
                }
              );
            }
            break;
          case "!help":
            io.to(currentRoom).emit(
              "systemMessage",
              {
                command: "!help",
                data: {
                  username: getUsername(socket.id),
                  helpMessage: help_message
                } 
              }
            );
            break;
          default:
            io.to(currentRoom).emit("newMessage", message, {
              usernameColor: getUsernameColor(socket.id),
              username: getUsername(socket.id),
              messageColor: "#fff"
            });
            break;
        }
      socket.to(currentRoom).emit("ping");
    });
    
    socket.on('disconnect', () => {
      const currentRoom = getRoomName(socket.id);
      io.to(currentRoom).emit("systemMessage", {
        command: "disconnect",
        data: {
          username: getUsername(socket.id)
        }
      })
      removeFromRoom(socket.id);
      if (getOnlineUsers(currentRoom) == 0) {
        deleteRoom(currentRoom);
      }
      io.emit("getPublicRooms")
    });
    
    socket.on("getPublicRooms", () => {
      publicRooms.forEach(rn => {
        socket.emit("addRoomToList", rn, getOnlineUsers(rn));
      });
    });
    
    socket.on("getRoomNameFromInvite", (inviteCode) => {
      var index = roomInviteCodes.indexOf(inviteCode);
      socket.emit("outputRoomNameFromInvite", roomNames[index]);
    });
    
    socket.on("suggestion", (contact, suggestion) => {
      const embed = new MessageBuilder()
        .setTitle("New Suggestion")
        .setColor("#FF00FF")
        .addField("Contact method:", contact)
        .addField("Suggestion: ", suggestion)
        .setTimestamp();
      
      hook.send(embed);
    });
  });
  




  function verifyRoomPassword(name, password) {
    if (password === roomPasswords[roomNames.indexOf(name)]) {
      return true
    }
    else {
      return false
    }
  }
  
  function getUsername(id) {
    for (var i = 0; i < rooms.length; i++) {
      for (var j = 0; j < rooms[i].length; j++) {
        if (rooms[i][j].id == id) {
          return rooms[i][j].username;
        }
      }
    } 
  } 
  
  function getUsernameColor(id) {
    for (var i = 0; i < rooms.length; i++) {
      for (var j = 0; j < rooms[i].length; j++) {
        if (rooms[i][j].id == id) {
          return rooms[i][j].usernameColor;
        }
      }
    }
  }
  
  function getRoomName(id) {
    for (var i = 0; i < rooms.length; i++) {
      for (var j = 0; j < rooms[i].length; j++) {
        if (rooms[i][j].id == id) {
          return roomNames[i];
        }
      }
    }
  }
  
  function changeUsername(id, newUsername) {
    for (let i = 0; i < rooms.length; i++) {
      for (let j = 0; j < rooms[i].length; j++) {
        if (rooms[i][j].id == id) {
          rooms[i][j].username = newUsername;
        }
      }
    } 
  }
  
  function changeUsernameColor(id, newColor) {
    for (let i = 0; i < rooms.length; i++) {
      for (let j = 0; j < rooms[i].length; j++) {
        if (rooms[i][j].id == id) {
          rooms[i][j].usernameColor = newColor;
        }
      }
    }
  }
  
  function getOnlineUsers(rn) {
    var index = roomNames.indexOf(rn);
    if (rooms[index]) {
      return rooms[index].length;
    }
  }
  
  function getOnlineUsersNames(rn) {
    var index = roomNames.indexOf(rn);
    var usernames = [];
    if (rooms[index]) {
      for (let i = 0; i < rooms[index].length; i++) {
        usernames.push(rooms[index][i].username);
      }
    }
    return usernames;
  }
  
  function removeFromRoom(id) {
    for (let i = 0; i < rooms.length; i++) {
      for (let j = 0; j < rooms[i].length; j++) {
        if (rooms[i][j].id == id) {
          rooms[i].splice(j, 1);
        }
      }
    }
  }
  
  function deleteRoom(rn) {
    var index = roomNames.indexOf(rn); 
    var publicIndex = publicRooms.indexOf(rn);
    rooms.splice(index, 1);
    roomNames.splice(index, 1);
    roomPasswords.splice(index, 1);
    roomInviteCodes.splice(index, 1);
    
    publicRooms.splice(publicIndex, 1);
  }
  
  function fixColor(color) {
    const regex = new RegExp('^#(?:[0-9a-fA-F]{3}){1,2}$');
    if (colorNamesArray.includes(color.toLowerCase())) {
      return color;
    } else if (color.charAt(0) != "#") {
      var x = "#" + color
      if (regex.test(x)) {
        return x;
      }
      else {
        return false;
      }
    } else {
      if (regex.test(color)) {
        return color;
      }
      else {
        return false;
      }
    }
  }
  
  function generateInviteCode() {
    var code = "";
    for (let i = 0; i < 6; i++) {
      if (Math.random() > 0.5) {
        code += (Math.floor(Math.random()*9) + 1)
      } else {
        code += "abcdefghijklmnopqrstuvwxyz"[Math.floor(Math.random() * 26)]
      }
    }
    if (roomInviteCodes.includes(code)) {
      generateInviteCode()
    } else {
      return code;
    }
  }
  
  function getInviteLinkFromRoomName(rn) {
    var index = roomNames.indexOf(rn);
    return "https://localhost:5000/invite/" + roomInviteCodes[index];
  }












 const PORT =  3001

 server.listen(PORT,()=>{
     console.log("server running on port "+PORT)
 })