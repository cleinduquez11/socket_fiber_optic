const express = require("express");
const app = express();
const http = require('http');
const httpServer = http.createServer(app);
const path = require('path');
const options = { /* ... */ };
const request = require("request");
const io = require("socket.io")(httpServer, {
    cors: {
        origin: "*"
    }
});

var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "try"
});

con.connect(function (err) {
    // if (err) throw err;
    // console.log("Connected!");
    // res.send('Connected to DATABASE');
});

//var request=require('request');

app.get('/', function (req, res) {

    res.send('Welcome');
    con.query(`INSERT INTO sensorreadings1 ( id, Water_Temperature, Ph_Value,Ec_Value) VALUES (?,?, ?, ?);`,[null,req.query.water_temp,req.query.ph_val,req.query.ec_val], function (err, result, fields) {
    con.query(`INSERT INTO sensorreadings2 (id, Humidity, Room_Temp) VALUES (?, ? ,?);`,[null,req.query.humid,req.query.room_temp]) 
     
        // if (err) throw err;

        //console.log(result[0]['fan_status']);
    });
   // console.log(req);
});


app.use(express.static(__dirname + "/views"));

io.sockets.on("connection", socket => {



    setInterval(() => {
        con.query("SELECT * FROM `sensorreadings1` ORDER BY `id` DESC", function (err, result, fields) {
            // if (err) throw err;
            io.emit("water_temp", result[0]['Water_Temperature']);
            io.emit("ph_value", result[0]['Ph_Value']);
            io.emit("ec_value", result[0]['Ec_Value']);

            //console.log(result[0]['fan_status']);
        });
    }, 2000);


    setInterval(() => {
        con.query("SELECT * FROM `sensorreadings2` ORDER BY `id` DESC", function (err, result, fields) {
            // if (err) throw err;
            io.emit("humid", result[0]['Humidity']);
            io.emit("room_temp", result[0]['Room_Temp']);

            //console.log(result[0]['fan_status']);
        });
    }, 2000);

    socket.on("fan", (arg) => {

        if (arg == true) {
            io.emit("fan", arg);
            const url = "http://192.168.1.245/cm?cmnd=Power%20On";

            request.get(url, (error, response, body) => {
          //      console.log(response)

            });
            // httpGetAsync(url);
           // console.log(arg); // world
        }
        else {
            io.emit("fan", arg);
            const url = "http://192.168.1.245/cm?cmnd=Power%20Off";

            request.get(url, (error, response, body) => {
             //   console.log(response)

            });
            // httpGetAsync(url);
          //  console.log(arg);
        }
    });


    socket.on("light", (arg) => {

        if (arg == true) {
            io.emit("light", arg);
            const url = "http://192.168.1.130/cm?cmnd=Power%20On";

            request.get(url, (error, response, body) => {
             //   console.log(response)

            });
            // httpGetAsync(url);
           // console.log(arg); // world
        }
        else {
            io.emit("light", arg);
            const url = "http://192.168.1.130/cm?cmnd=Power%20Off";

            request.get(url, (error, response, body) => {
               // console.log(response)

            });
            // httpGetAsync(url);
         //   console.log(arg);
        }
    });
    socket.on("pump", (arg) => {

        if (arg == true) {
            io.emit("pump", arg);
            const url = "http://192.168.1.188/cm?cmnd=Power%20On";

            request.get(url, (error, response, body) => {
             //   console.log(response)

            });
            // httpGetAsync(url);
           // console.log(arg); // world
        }
        else {
            io.emit("pump", arg);
            const url = "http://192.168.1.188/cm?cmnd=Power%20Off";

            request.get(url, (error, response, body) => {
                console.log(response)

            });
            // httpGetAsync(url);
          //  console.log(arg);
        }
    });
    socket.on("mist", (arg) => {

        if (arg == true) {
            io.emit("mist", arg);
            const url = "http://192.168.1.107/cm?cmnd=Power%20On";

            request.get(url, (error, response, body) => {
              //  console.log(response)

            });
            // httpGetAsync(url);
          //  console.log(arg); // world
        }
        else {
            io.emit("mist", arg);
            const url = "http://192.168.1.107/cm?cmnd=Power%20Off";

            request.get(url, (error, response, body) => {
               // console.log(response)

            });
            // httpGetAsync(url);
         //   console.log(arg);
        }
    });
});


// client-side
io.sockets.on("connect", (socket) => {
    //  console.log(socket.id);

    // x8WIv7-mJelg7on_ALbx
});

io.sockets.on("disconnect", (socket) => {
    // console.log(socket.id); // undefined
});



httpServer.listen(3000);