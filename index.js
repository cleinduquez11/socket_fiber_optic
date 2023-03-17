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
//const { send } = require("process");

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

app.get('/api', function (req, res) {

    res.send('Nothing To see here');
    // console.log(req)
    con.query(`INSERT INTO sensorreadings1 ( id, Water_Temperature, Ph_Value,Ec_Value) VALUES (?,?, ?, ?);`,[null,req.query.water_temp,req.query.ph_val,req.query.ec_val], function (err, result, fields) {

        // if (err) throw err;

        //console.log(result[0]['fan_status']);
    });
    con.query(`INSERT INTO sensorreadings2 (id, Humidity, Room_Temp) VALUES (?, ? ,?);`,[null,req.query.humid,req.query.room_temp], function (err, result, fields) {
        if (req.query.room_temp !=null ) {
            con.query("SELECT * FROM `status`", function (err, result, fields) {

              if (req.query.room_temp >= 26 && (result[0]['fan_status'] == "ON")) {

                const url = "http://192.168.1.245/cm?cmnd=Power%20On";
                request.get(url, (error, response, body) => {});
              } else {
                const url = "http://192.168.1.245/cm?cmnd=Power%20Off";
                request.get(url, (error, response, body) => {});
                   
              }
            });
                 
        }
        if (req.query.humid !=null) {
            con.query("SELECT * FROM `status`", function (err, result, fields) {

              if (req.query.humid <= 80 && result[0]['mist_status'] == "ON") {
                const url = "http://192.168.1.107/cm?cmnd=Power%20On";
                request.get(url, (error, response, body) => {});
              } else {
                const url = "http://192.168.1.107/cm?cmnd=Power%20Off";
                request.get(url, (error, response, body) => {});
              }

            });
            
        }

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

        con.query("SELECT * FROM `sensorreadings2` ORDER BY `id` DESC", function (err, result, fields) {
            // if (err) throw err;
            io.emit("humid", result[0]['Humidity']);
            io.emit("room_temp", result[0]['Room_Temp']);

            //console.log(result[0]['fan_status']);
        });

        con.query("SELECT * FROM `status`", function (err, result, fields) {
            // if (err) throw err;
            io.emit("fan_status",result[0]['fan_status']);
            io.emit("light_status",result[0]['light_status']);
            io.emit("pump_status",result[0]['pump_status']);
            io.emit("mist_status",result[0]['mist_status']);

            // console.log(result[0]);

            //console.log(result[0]['fan_status']);
        });


    }, 2000);


    // setInterval(() => {
    //     con.query("SELECT * FROM `sensorreadings2` ORDER BY `id` DESC", function (err, result, fields) {
    //         // if (err) throw err;
    //         io.emit("humid", result[0]['Humidity']);
    //         io.emit("room_temp", result[0]['Room_Temp']);

    //         //console.log(result[0]['fan_status']);
    //     });
    // }, 2000);

    socket.on("fan", (arg) => {

        if (arg == true) {
            io.emit("fan", arg);
            const url = "http://192.168.1.245/cm?cmnd=Power%20On";
            con.query(`UPDATE status SET fan_status = 'ON' WHERE status.id = 1;`, function (err, result, fields) {
    
                // if (err) throw err;
                //console.log(result[0]['fan_status']);
            });

            request.get(url, (error, response, body) => {
          //      console.log(response)

            });
            // httpGetAsync(url);
           // console.log(arg); // world
        }
        else {
            io.emit("fan", arg);
            const url = "http://192.168.1.245/cm?cmnd=Power%20Off";
            con.query(` UPDATE status SET fan_status = 'OFF' WHERE status.id = 1;`, function (err, result, fields) {
    
                // if (err) throw err;
                //console.log(result[0]['fan_status']);
            });
           

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
            con.query(` UPDATE status SET light_status = 'ON' WHERE status.id = 1;`, function (err, result, fields) {
    
                // if (err) throw err;
                //console.log(result[0]['fan_status']);
            });

            request.get(url, (error, response, body) => {
             //   console.log(response)

            });
            // httpGetAsync(url);
           // console.log(arg); // world
        }
        else {
            io.emit("light", arg);
            con.query(` UPDATE status SET light_status = 'OFF' WHERE status.id = 1;`, function (err, result, fields) {
    
                // if (err) throw err;
                //console.log(result[0]['fan_status']);
            });
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
            con.query(` UPDATE status SET pump_status = 'ON' WHERE status.id = 1;`, function (err, result, fields) {
    
                // if (err) throw err;
                //console.log(result[0]['fan_status']);
            });

            request.get(url, (error, response, body) => {
             //   console.log(response)

            });
            // httpGetAsync(url);
           // console.log(arg); // world
        }
        else {
            io.emit("pump", arg);
            const url = "http://192.168.1.188/cm?cmnd=Power%20Off";
            con.query(` UPDATE status SET pump_status = 'OFF' WHERE status.id = 1;`, function (err, result, fields) {
    
                // if (err) throw err;
                //console.log(result[0]['fan_status']);
            });

            request.get(url, (error, response, body) => {
                // console.log(response)

            });
            // httpGetAsync(url);
          //  console.log(arg);
        }
    });
    socket.on("mist", (arg) => {

        if (arg == true) {
            io.emit("mist", arg);
            const url = "http://192.168.1.107/cm?cmnd=Power%20On";
            con.query(` UPDATE status SET mist_status = 'ON' WHERE status.id = 1;`, function (err, result, fields) {
    
                // if (err) throw err;
                //console.log(result[0]['fan_status']);
            });

            request.get(url, (error, response, body) => {
              //  console.log(response)

            });
            // httpGetAsync(url);
          //  console.log(arg); // world
        }
        else {
            io.emit("mist", arg);
            const url = "http://192.168.1.107/cm?cmnd=Power%20Off";
            con.query(` UPDATE status SET mist_status = 'OFF' WHERE status.id = 1;`, function (err, result, fields) {
    
                // if (err) throw err;
                //console.log(result[0]['fan_status']);
            });

            request.get(url, (error, response, body) => {
               // console.log(response)

            });
            // httpGetAsync(url);
         //   console.log(arg);
        }
    });

    socket.on('nav1', function (args) {
        socket.on('timeOn', function (args1) {
          con.query(`UPDATE schedule SET time_on = ? WHERE schedule.id = ?;`, [args1, args], function (err, result, fields) {
          });
          // io.emit('timeOn', args);
          // console.log(args);
        });
    
        socket.on('timeOff', function (args1) {
          con.query(`UPDATE schedule SET time_off = ? WHERE schedule.id = ?;`, [args1, args], function (err, result, fields) {
          });
    
    
          // console.log(args);
        });
    
    
        socket.on('everyday', function (args) {
          con.query(`UPDATE schedule SET monday = ?, tuesday = ?,wednesday = ?,thursday = ?,friday = ?,saturday = ?,sunday = ? WHERE schedule.id = 1;`, [args, args, args, args, args, args, args], function (err, result, fields) {
          });
    
          console.log(args);
        });
    
    
        socket.on('monday', function (args) {
          con.query(`UPDATE schedule SET monday = ? WHERE schedule.id = 1;`, [args], function (err, result, fields) {
          });
          console.log(args);
        });
    
        socket.on('tuesday', function (args) {
          con.query(`UPDATE schedule SET tuesday = ? WHERE schedule.id = 1;`, [args], function (err, result, fields) {
          });
          console.log(args);
        });
    
    
        socket.on('wednesday', function (args) {
          con.query(`UPDATE schedule SET wednesday = ? WHERE schedule.id = 1;`, [args], function (err, result, fields) {
          });
          console.log(args);
        });
    
        socket.on('thursday', function (args) {
          con.query(`UPDATE schedule SET thursday = ? WHERE schedule.id = 1;`, [args], function (err, result, fields) {
          });
          console.log(args);
        });
    
        socket.on('friday', function (args) {
          con.query(`UPDATE schedule SET friday = ? WHERE schedule.id = 1;`, [args], function (err, result, fields) {
          });
          console.log(args);
        });
    
        socket.on('saturday', function (args) {
          con.query(`UPDATE schedule SET saturday = ? WHERE schedule.id = 1;`, [args], function (err, result, fields) {
          });
          console.log(args);
        });
    
        socket.on('sunday', function (args) {
          con.query(`UPDATE schedule SET sunday = ? WHERE schedule.id = 1;`, [args], function (err, result, fields) {
          });
          console.log(args);
        });
    
        socket.on('reset', function (args) {
          con.query(`UPDATE schedule SET time_on ="", time_off = "",monday = "", tuesday = "",wednesday = "",thursday = "",friday = "",saturday = "",sunday = "" WHERE schedule.id = 1;`, function (err, result, fields) {
          });
          console.log(args);
        });
        con.query(`SELECT * FROM schedule WHERE schedule.id=?;`, [args], function (err, result, fields) {
          io.emit('rq1', result);
    
        });
    
      });
    
    
      socket.on('nav2', function (args) {
        socket.on('timeOn1', function (args1) {
          con.query(`UPDATE schedule SET time_on = ? WHERE schedule.id = ?;`, [args1, args], function (err, result, fields) {
          });
          // io.emit('timeOn', args);
          // console.log(args);
        });
    
        socket.on('timeOff1', function (args1) {
          con.query(`UPDATE schedule SET time_off = ? WHERE schedule.id = ?;`, [args1, args], function (err, result, fields) {
          });
    
    
          // console.log(args);
        });
    
    
        socket.on('everyday1', function (args) {
          con.query(`UPDATE schedule SET monday = ?, tuesday = ?,wednesday = ?,thursday = ?,friday = ?,saturday = ?,sunday = ? WHERE schedule.id = 2;`, [args, args, args, args, args, args, args], function (err, result, fields) {
          });
    
          console.log(args);
        });
    
    
        socket.on('monday1', function (args) {
          con.query(`UPDATE schedule SET monday = ? WHERE schedule.id = 2;`, [args], function (err, result, fields) {
          });
          console.log(args);
        });
    
        socket.on('tuesday1', function (args) {
          con.query(`UPDATE schedule SET tuesday = ? WHERE schedule.id = 2;`, [args], function (err, result, fields) {
          });
          console.log(args);
        });
    
    
        socket.on('wednesday1', function (args) {
          con.query(`UPDATE schedule SET wednesday = ? WHERE schedule.id = 2;`, [args], function (err, result, fields) {
          });
          console.log(args);
        });
    
        socket.on('thursday1', function (args) {
          con.query(`UPDATE schedule SET thursday = ? WHERE schedule.id = 2;`, [args], function (err, result, fields) {
          });
          console.log(args);
        });
    
        socket.on('friday1', function (args) {
          con.query(`UPDATE schedule SET friday = ? WHERE schedule.id = 2;`, [args], function (err, result, fields) {
          });
          console.log(args);
        });
    
        socket.on('saturday1', function (args) {
          con.query(`UPDATE schedule SET saturday = ? WHERE schedule.id = 2;`, [args], function (err, result, fields) {
          });
          console.log(args);
        });
    
        socket.on('sunday1', function (args) {
          con.query(`UPDATE schedule SET sunday = ? WHERE schedule.id = 2;`, [args], function (err, result, fields) {
          });
          console.log(args);
        });
    
        socket.on('reset1', function (args) {
          con.query(`UPDATE schedule SET time_on ="", time_off = "",monday = "", tuesday = "",wednesday = "",thursday = "",friday = "",saturday = "",sunday = "" WHERE schedule.id = 2;`, function (err, result, fields) {
          });
          console.log(args);
        });
        con.query(`SELECT * FROM schedule WHERE schedule.id=?;`, [args], function (err, result, fields) {
          io.emit('rq2', result);
    
        });
    
    
      });
    
      socket.on('nav3', function (args) {
        socket.on('timeOn2', function (args1) {
          con.query(`UPDATE schedule SET time_on = ? WHERE schedule.id = ?;`, [args1, args], function (err, result, fields) {
          });
          // io.emit('timeOn', args);
          // console.log(args);
        });
    
        socket.on('timeOff2', function (args1) {
          con.query(`UPDATE schedule SET time_off = ? WHERE schedule.id = ?;`, [args1, args], function (err, result, fields) {
          });
    
    
          // console.log(args);
        });
    
    
        socket.on('everyday2', function (args) {
          con.query(`UPDATE schedule SET monday = ?, tuesday = ?,wednesday = ?,thursday = ?,friday = ?,saturday = ?,sunday = ? WHERE schedule.id = 3;`, [args, args, args, args, args, args, args], function (err, result, fields) {
          });
    
          console.log(args);
        });
    
    
        socket.on('monday2', function (args) {
          con.query(`UPDATE schedule SET monday = ? WHERE schedule.id = 3;`, [args], function (err, result, fields) {
          });
          console.log(args);
        });
    
        socket.on('tuesday2', function (args) {
          con.query(`UPDATE schedule SET tuesday = ? WHERE schedule.id = 3;`, [args], function (err, result, fields) {
          });
          console.log(args);
        });
    
    
        socket.on('wednesday2', function (args) {
          con.query(`UPDATE schedule SET wednesday = ? WHERE schedule.id = 3;`, [args], function (err, result, fields) {
          });
          console.log(args);
        });
    
        socket.on('thursday2', function (args) {
          con.query(`UPDATE schedule SET thursday = ? WHERE schedule.id = 3;`, [args], function (err, result, fields) {
          });
          console.log(args);
        });
    
        socket.on('friday2', function (args) {
          con.query(`UPDATE schedule SET friday = ? WHERE schedule.id = 3;`, [args], function (err, result, fields) {
          });
          console.log(args);
        });
    
        socket.on('saturday2', function (args) {
          con.query(`UPDATE schedule SET saturday = ? WHERE schedule.id = 3;`, [args], function (err, result, fields) {
          });
          console.log(args);
        });
    
        socket.on('sunday2', function (args) {
          con.query(`UPDATE schedule SET sunday = ? WHERE schedule.id = 3;`, [args], function (err, result, fields) {
          });
          console.log(args);
        });
    
        socket.on('reset2', function (args) {
          con.query(`UPDATE schedule SET time_on ="", time_off = "",monday = "", tuesday = "",wednesday = "",thursday = "",friday = "",saturday = "",sunday = "" WHERE schedule.id = 3;`, function (err, result, fields) {
          });
          console.log(args);
        });
        con.query(`SELECT * FROM schedule WHERE schedule.id=?;`, [args], function (err, result, fields) {
          io.emit('rq3', result);
    
        });
    
    
      });
    
    
    
      socket.on('nav4', function (args) {
        socket.on('timeOn3', function (args1) {
          con.query(`UPDATE schedule SET time_on = ? WHERE schedule.id = ?;`, [args1, args], function (err, result, fields) {
          });
          // io.emit('timeOn', args);
          // console.log(args);
        });
    
        socket.on('timeOff3', function (args1) {
          con.query(`UPDATE schedule SET time_off = ? WHERE schedule.id = ?;`, [args1, args], function (err, result, fields) {
          });
    
    
          // console.log(args);
        });
    
    
        socket.on('everyday3', function (args) {
          con.query(`UPDATE schedule SET monday = ?, tuesday = ?,wednesday = ?,thursday = ?,friday = ?,saturday = ?,sunday = ? WHERE schedule.id = 4;`, [args, args, args, args, args, args, args], function (err, result, fields) {
          });
    
          console.log(args);
        });
    
    
        socket.on('monday3', function (args) {
          con.query(`UPDATE schedule SET monday = ? WHERE schedule.id = 4;`, [args], function (err, result, fields) {
          });
          console.log(args);
        });
    
        socket.on('tuesday3', function (args) {
          con.query(`UPDATE schedule SET tuesday = ? WHERE schedule.id = 4;`, [args], function (err, result, fields) {
          });
          console.log(args);
        });
    
    
        socket.on('wednesday3', function (args) {
          con.query(`UPDATE schedule SET wednesday = ? WHERE schedule.id = 4;`, [args], function (err, result, fields) {
          });
          console.log(args);
        });
    
        socket.on('thursday3', function (args) {
          con.query(`UPDATE schedule SET thursday = ? WHERE schedule.id = 4;`, [args], function (err, result, fields) {
          });
          console.log(args);
        });
    
        socket.on('friday3', function (args) {
          con.query(`UPDATE schedule SET friday = ? WHERE schedule.id = 4;`, [args], function (err, result, fields) {
          });
          console.log(args);
        });
    
        socket.on('saturday3', function (args) {
          con.query(`UPDATE schedule SET saturday = ? WHERE schedule.id = 4;`, [args], function (err, result, fields) {
          });
          console.log(args);
        });
    
        socket.on('sunday3', function (args) {
          con.query(`UPDATE schedule SET sunday = ? WHERE schedule.id = 4;`, [args], function (err, result, fields) {
          });
          console.log(args);
        });
    
        socket.on('reset3', function (args) {
          con.query(`UPDATE schedule SET time_on ="", time_off = "",monday = "", tuesday = "",wednesday = "",thursday = "",friday = "",saturday = "",sunday = "" WHERE schedule.id = 4;`, function (err, result, fields) {
          });
          console.log(args);
        });
        con.query(`SELECT * FROM schedule WHERE schedule.id=?;`, [args], function (err, result, fields) {
          io.emit('rq4', result);
    
        });
    
    
      });
    


});


var day = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

// let index = d.getDay();

// var time = hour + ":"+ minutes;

const renderTime = () => {
  const d = new Date();
  let hour = d.getHours();
  let minutes = d.getMinutes();
  if (minutes<10) {
    minutes="0"+minutes;
  }
  //Grow Light
  console.log(hour +':'+ minutes)
  con.query(`SELECT * FROM schedule WHERE schedule.id=1;`, function (err, result, fields) {


    if (result[0][day[d.getDay()]] == 1 && result[0]['time_on'] == hour + ":" + minutes) {
        console.log('functioning...');
      const url = "http://192.168.1.130/cm?cmnd=Power%20On";
      request.get(url, (error, response, body) => { });
    }
    if (result[0][day[d.getDay()]] == 1 && result[0]['time_off'] == hour + ":" + minutes) {
      const url = "http://192.168.1.130/cm?cmnd=Power%20Off";
      request.get(url, (error, response, body) => { });
    }
  });

  //Water pump
  con.query(`SELECT * FROM schedule WHERE schedule.id=2;`, function (err, result, fields) {
    if (result[0][day[d.getDay()]] == 1 && result[0]['time_on'] == hour + ":" + minutes) {
      //   console.log('functioning...');
      const url = "http://192.168.1.188/cm?cmnd=Power%20On";
      request.get(url, (error, response, body) => { });
    }
    if (result[0][day[d.getDay()]] == 1 && result[0]['time_off'] == hour + ":" + minutes) {
      const url = "http://192.168.1.188/cm?cmnd=Power%20Off";
      request.get(url, (error, response, body) => { });
    }
  });

  //Mist 
  con.query(`SELECT * FROM schedule WHERE schedule.id=3;`, function (err, result, fields) {

    if (result[0][day[d.getDay()]] == 1 && result[0]['time_on'] == hour + ":" + minutes) {
      //   console.log('functioning...');
      const url = "http://192.168.1.107/cm?cmnd=Power%20On";
      request.get(url, (error, response, body) => { });
    }
    if (result[0][day[d.getDay()]] == 1 && result[0]['time_off'] == hour + ":" + minutes) {
      const url = "http://192.168.1.107/cm?cmnd=Power%20Off";
      request.get(url, (error, response, body) => { });
    }
  });

  //fan
  con.query(`SELECT * FROM schedule WHERE schedule.id=4;`, function (err, result, fields) {

    if (result[0][day[d.getDay()]] == 1 && result[0]['time_on'] == hour + ":" + minutes) {
      //   console.log('functioning...');
      const url = "http://192.168.1.245/cm?cmnd=Power%20On";
      request.get(url, (error, response, body) => { });
    }
    if (result[0][day[d.getDay()]] == 1 && result[0]['time_off'] == hour + ":" + minutes) {
      const url = "http://192.168.1.245/cm?cmnd=Power%20Off";
      request.get(url, (error, response, body) => { });
    }
  });

}

setInterval(renderTime, 1000);





// client-side
io.sockets.on("connect", (socket) => {
    //  console.log(socket.id);

    // x8WIv7-mJelg7on_ALbx
});

io.sockets.on("disconnect", (socket) => {
    // console.log(socket.id); // undefined
});



httpServer.listen(3001);