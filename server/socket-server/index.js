
let express = require("express");
let mongoose = require("mongoose");
let admin = require("firebase-admin");
let http = require("http");
let cors = require("cors");

require("dotenv").config();


const app = express();
let server = http.Server(app);

var serviceAccount = require("./service.json");
const sockets = new Map();
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

const mongo_url = process.env.MONGO_URL;
console.log(mongo_url);
mongoose.connect(mongo_url,
    {useNewUrlParser : true, useUnifiedTopology : true
});

let io = require("socket.io")(server, {
    cors: {
        origin : "*"
    }
});

let User = mongoose.model("User",{
    name : {type: String},
    phone : {type: String, unique: true},
    firebaseId: {type: String, unique: true},
});

const port = 8000;

app.use(express.json());
app.use(cors());

app.get("/users/",function(req,res){
    User.find().then(function(response){
        res.send(response);
    })
});

app.post("/users/",function(req,res){
    let {name,phone} = req.body;
    let user = User.create({name,phone});
    user.then(function(out){
        res.send(out);
    })
});


server.listen(port,()=>{
    console.log(`App listening on port ${port}`);
});

io.use(function(socket,next){
    if (socket.request.headers.authorization) {
        let authorization = socket.request.headers.authorization;
        let token  = authorization.slice(7);
        admin
            .auth()
            .verifyIdToken(token)
            .then(function (user)  {
                sockets.set(user.uid, socket);
                User.find({firebaseId : user.uid}).then( function(output) {
                    if(output.length == 0){
                        admin
                            .auth()
                            .getUser(user.uid)
                            .then((userRecord) => {
                                User.create({
                                    firebaseId : user.uid,
                                    name : userRecord.displayName,
                                    phone : user.firebase.identities.phone[0],
                                });
                            })
                            .catch((error) => {
                                console.log("ERROR IN FETCHING USER DATA",error);
                            });
                    } else {
                        console.log(output);
                    }

                });
                socket.user = user;
                next();
            })
            .catch(function(error) {
                console.log(error);
            });
    } else {
        socket.close();
    }
});

io.on("connection",function(socket){
    socket.on("message",function(payload){
        payload.sender = socket.user.uid;

        if(payload.reciever && sockets.has(payload.reciever)){

            let rsoc = sockets.get(payload.reciever)
            rsoc.emit("message",payload);

        }
        console.log(payload);
    });
});




