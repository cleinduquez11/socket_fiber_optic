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
  con.query(`INSERT INTO sensorreadings1 ( id, Water_Temperature, Ph_Value,Ec_Value) VALUES (?,?, ?, ?);`, [null, req.query.water_temp, req.query.ph_val, req.query.ec_val], function (err, result, fields) {

    // if (err) throw err;

    //console.log(result[0]['fan_status']);
  });
  con.query(`INSERT INTO sensorreadings2 (id, Humidity, Room_Temp) VALUES (?, ? ,?);`, [null, req.query.humid, req.query.room_temp], function (err, result, fields) {
    if (req.query.room_temp != null) {
      con.query("SELECT * FROM `status`", function (err, result, fields) {

        if (req.query.room_temp >= 26 && (result[0]['fan_status'] == "ON")) {

          const url = "http://192.168.1.245/cm?cmnd=Power%20On";
          request.get(url, (error, response, body) => { });
        } else {
          const url = "http://192.168.1.245/cm?cmnd=Power%20Off";
          request.get(url, (error, response, body) => { });

        }
      });

    }
    if (req.query.humid != null) {
      con.query("SELECT * FROM `status`", function (err, result, fields) {

        if (req.query.humid <= 80 && result[0]['mist_status'] == "ON") {
          const url = "http://192.168.1.107/cm?cmnd=Power%20On";
          request.get(url, (error, response, body) => { });
        } else {
          const url = "http://192.168.1.107/cm?cmnd=Power%20Off";
          request.get(url, (error, response, body) => { });
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
      io.emit("fan_status", result[0]['fan_status']);
      io.emit("light_status", result[0]['light_status']);
      io.emit("pump_status", result[0]['pump_status']);
      io.emit("mist_status", result[0]['mist_status']);
      io.emit("aero_status", result[0]['aerator']);

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

  socket.on("aerator", (arg) => {

    if (arg == true) {
      io.emit("aerator", arg);
      const url = "http://192.168.1.107/cm?cmnd=Power%20On";
      con.query(` UPDATE status SET aerator = 'ON' WHERE status.id = 1;`, function (err, result, fields) {

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
      io.emit("aerator", arg);
      const url = "http://192.168.1.107/cm?cmnd=Power%20Off";
      con.query(` UPDATE status SET aerator = 'OFF' WHERE status.id = 1;`, function (err, result, fields) {

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

  socket.on('nav5', function (args) {
    socket.on('timeOn4', function (args1) {
      con.query(`UPDATE schedule SET time_on = ? WHERE schedule.id = ?;`, [args1, args], function (err, result, fields) {
      });
      // io.emit('timeOn', args);
      // console.log(args);
    });

    socket.on('timeOff4', function (args1) {
      con.query(`UPDATE schedule SET time_off = ? WHERE schedule.id = ?;`, [args1, args], function (err, result, fields) {
      });


      // console.log(args);
    });


    socket.on('everyday4', function (args) {
      con.query(`UPDATE schedule SET monday = ?, tuesday = ?,wednesday = ?,thursday = ?,friday = ?,saturday = ?,sunday = ? WHERE schedule.id = 5;`, [args, args, args, args, args, args, args], function (err, result, fields) {
      });

      console.log(args);
    });


    socket.on('monday4', function (args) {
      con.query(`UPDATE schedule SET monday = ? WHERE schedule.id = 5;`, [args], function (err, result, fields) {
      });
      console.log(args);
    });

    socket.on('tuesday4', function (args) {
      con.query(`UPDATE schedule SET tuesday = ? WHERE schedule.id = 5;`, [args], function (err, result, fields) {
      });
      console.log(args);
    });


    socket.on('wednesday4', function (args) {
      con.query(`UPDATE schedule SET wednesday = ? WHERE schedule.id = 5;`, [args], function (err, result, fields) {
      });
      console.log(args);
    });

    socket.on('thursday4', function (args) {
      con.query(`UPDATE schedule SET thursday = ? WHERE schedule.id = 5;`, [args], function (err, result, fields) {
      });
      console.log(args);
    });

    socket.on('friday4', function (args) {
      con.query(`UPDATE schedule SET friday = ? WHERE schedule.id = 5;`, [args], function (err, result, fields) {
      });
      console.log(args);
    });

    socket.on('saturday4', function (args) {
      con.query(`UPDATE schedule SET saturday = ? WHERE schedule.id = 5;`, [args], function (err, result, fields) {
      });
      console.log(args);
    });

    socket.on('sunday4', function (args) {
      con.query(`UPDATE schedule SET sunday = ? WHERE schedule.id = 5;`, [args], function (err, result, fields) {
      });
      console.log(args);
    });

    socket.on('reset4', function (args) {
      con.query(`UPDATE schedule SET time_on ="", time_off = "",monday = "", tuesday = "",wednesday = "",thursday = "",friday = "",saturday = "",sunday = "" WHERE schedule.id = 5;`, function (err, result, fields) {
      });
      console.log(args);
    });
    con.query(`SELECT * FROM schedule WHERE schedule.id=?;`, [args], function (err, result, fields) {
      io.emit('rq5', result);
      console.log(result);

    });


  });


  socket.on('res', function (args) {


    let ph = [];

    let water_temp = [];
    let ec = [];
    let chart1 = [];
      // console.log(result);
      // console.log(result1);
    let temp1 = [];
    let temp2 = [];
    let temp3 = [];
    let temp4 = [];
    let temp5 = [];
    let temp6 = [];
    let temp7 = [];

   let temp11= [];
   let temp12= [];
   let temp13= [];
   let temp14= [];
   let temp15= [];
   let temp16= [];
   let temp17= [];

   let temp21= [];
   let temp22= [];
   let temp23= [];
   let temp24= [];
   let temp25= [];
   let temp26= [];
   let temp27= [];


    let storage = [
      temp1,
      temp2,
      temp3,
      temp4,
      temp5,
      temp6,
      temp7

    ];

    let storage1 = [
      temp11,
      temp12,
      temp13,
      temp14,
      temp15,
      temp16,
      temp17

    ];

    let storage2 = [
      temp21,
      temp22,
      temp23,
      temp24,
      temp25,
      temp26,
      temp27

    ];


    console.log(args);

    function calculateAverage(temp) {
      var total = 0;
      var avg = 0
      for (var i = 0; i < temp.length; i++) {
        total += temp[i];
      }
       avg = total / temp.length;
        avg = parseFloat(avg).toFixed(2);
      return avg;
    }

    //console.log(calculateAverage([12,21,12,32,12,45,65,12,11]));

    con.query(`SELECT * FROM analytics1`, function (err, result, fields) {
    

      // for (let index = 0; index < result.length; index++) {
      //   let date = result[index]['DATE'].toLocaleDateString();

      //   for (let j = 0; j < args.length; j++) {
      //     if(date == args[0])
      //     {
      //       temp.push(result[index]['PH']);
      //      // console.log(result)
      //     }

      //   }


      // }




      for (let j = 0; j < result.length; j++) {
        let date = result[j]['DATE'].toLocaleDateString();
        let ph = result[j]['PH'];
        if (args[0] == date && date != null) {
          storage[0].push(result[j]['WATER_TEMP']);
          storage1[0].push(result[j]['PH']);
          storage2[0].push(result[j]['EC']);
        }
        else if (args[1] == date && date != null) {
          storage[1].push(result[j]['WATER_TEMP']);
          storage1[1].push(result[j]['PH']);
          storage2[1].push(result[j]['EC']);
        }
        else if (args[2] == date && date != null) {
          storage[2].push(result[j]['WATER_TEMP']);
          storage1[2].push(result[j]['PH']);
          storage2[2].push(result[j]['EC']);
        }
        else if (args[3] == date && date != null) {
          storage[3].push(result[j]['WATER_TEMP']);
          storage1[3].push(result[j]['PH']);
          storage2[3].push(result[j]['EC']);
        }
        else if (args[4] == date && date != null) {
          storage[4].push(result[j]['WATER_TEMP']);
          storage1[4].push(result[j]['PH']);
          storage2[4].push(result[j]['EC']);
        }
        else if (args[5] == date && date != null) {
          storage[5].push(result[j]['WATER_TEMP']);
          storage1[5].push(result[j]['PH']);
          storage2[5].push(result[j]['EC']);
        }
        else if (args[6] == date && date != null) {
          storage[6].push(result[j]['WATER_TEMP']);
          storage1[6].push(result[j]['PH']);
          storage2[6].push(result[j]['EC']);
        }
        else {
          storage[j] = [];
        }

      }

     
      for (let i = 0; i < 7; i++) {

        water_temp.push(calculateAverage(storage[i]));
        ph.push(calculateAverage(storage1[i]));
        ec.push(calculateAverage(storage2[i]));
        
       /// console.log(calculateAverage(storage[i]));
       // console.log(storage[i])

      }
  chart1.push(water_temp,ph,ec);
      console.log(water_temp);
      // console.log(temp);
      io.emit('chart1', chart1);
      //io.emit('ph', ph);

     
      })
     
       
   

  });

  socket.on('res2', function (args) {

    var dates = [];
    var datedData = [];

    let ph = [];
    let room_temp = [];
    let humidity = [];
    let chart2 = [];
      // console.log(result);
      // console.log(result1);
    let temp1 = [];
    let temp2 = [];
    let temp3 = [];
    let temp4 = [];
    let temp5 = [];
    let temp6 = [];
    let temp7 = [];

   let temp11= [];
   let temp12= [];
   let temp13= [];
   let temp14= [];
   let temp15= [];
   let temp16= [];
   let temp17= [];

    let storage = [
      temp1,
      temp2,
      temp3,
      temp4,
      temp5,
      temp6,
      temp7

    ];

    let storage1 = [
      temp11,
      temp12,
      temp13,
      temp14,
      temp15,
      temp16,
      temp17

    ];


    console.log(args);

    function calculateAverage(temp) {
      var total = 0;
      var avg = 0
      for (var i = 0; i < temp.length; i++) {
        total += temp[i];
      }
       avg = total / temp.length;
        avg = parseFloat(avg).toFixed(2);
      return avg;
    }

    //console.log(calculateAverage([12,21,12,32,12,45,65,12,11]));

    con.query(`SELECT * FROM analytics`, function (err, result, fields) {
    

      // for (let index = 0; index < result.length; index++) {
      //   let date = result[index]['DATE'].toLocaleDateString();

      //   for (let j = 0; j < args.length; j++) {
      //     if(date == args[0])
      //     {
      //       temp.push(result[index]['PH']);
      //      // console.log(result)
      //     }

      //   }


      // }




      for (let j = 0; j < result.length; j++) {
        let date = result[j]['DATE'].toLocaleDateString();
        let ph = result[j]['PH'];
        if (args[0] == date && date != null) {
          storage[0].push(result[j]['ROOM_TEMP']);
          storage1[0].push(result[j]['HUMIDITY']);
         
        }
        else if (args[1] == date && date != null) {
          storage[1].push(result[j]['ROOM_TEMP']);
          storage1[1].push(result[j]['HUMIDITY']);
         
        }
        else if (args[2] == date && date != null) {
          storage[2].push(result[j]['ROOM_TEMP']);
          storage1[2].push(result[j]['HUMIDITY']);
         
        }
        else if (args[3] == date && date != null) {
          storage[3].push(result[j]['ROOM_TEMP']);
          storage1[3].push(result[j]['HUMIDITY']);
        
        }
        else if (args[4] == date && date != null) {
          storage[4].push(result[j]['ROOM_TEMP']);
          storage1[4].push(result[j]['HUMIDITY']);
       
        }
        else if (args[5] == date && date != null) {
          storage[5].push(result[j]['ROOM_TEMP']);
          storage1[5].push(result[j]['HUMIDITY']);
        
        }
        else if (args[6] == date && date != null) {
          storage[6].push(result[j]['ROOM_TEMP']);
          storage1[6].push(result[j]['HUMIDITY']);
         
        }
        else {
          storage[j] = [];
        }

      }

     
      for (let i = 0; i < 7; i++) {

        room_temp.push(calculateAverage(storage[i]));
        humidity.push(calculateAverage(storage1[i]));
        // ph.push(calculateAverage(storage1[i]))
       /// console.log(calculateAverage(storage[i]));
       // console.log(storage[i])

      }
  chart2.push(room_temp,humidity);
    //  console.log(water_temp);
      // console.log(temp);
      io.emit('chart2', chart2);
      //io.emit('ph', ph);

     
      })
     
       
   

  });


  function dateFormatter(dateString) {
  //  const dateString = 'Mon Mar 27 2023 00:00:00 GMT+0800 (Philippine Standard Time)';
const date = new Date(dateString);

const year = date.getFullYear();
const month = (date.getMonth() + 1).toString().padStart(2, '0');
const day = date.getDate().toString().padStart(2, '0');
const hours = date.getHours().toString().padStart(2, '0');
const minutes = date.getMinutes().toString().padStart(2, '0');
const seconds = date.getSeconds().toString().padStart(2, '0');

const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
console.log(formattedDate);
return formattedDate;
 // Output: 2023-03-27 00:00:00

  }
socket.on('fetch-dates', function (args) {
let startDate = args[0];
let endDate = args[1];

// console.log();
// console.log(dateFormatter(endDate.toString()));

var formattedStartDate = dateFormatter(startDate.toString());
var formattedEndDate = dateFormatter(endDate.toString());
  con.query(`SELECT * FROM analytics1 WHERE DATE >= ? AND DATE <= ? ORDER BY DATE DESC;`,[formattedStartDate,formattedEndDate], function (err, result, fields) {
   console.log(result);
   con.query(`SELECT * FROM analytics WHERE DATE >= ? AND DATE <= ? ORDER BY DATE DESC;`,[formattedStartDate,formattedEndDate], function (err, result1, fields) {
    console.log(result1);
    
     io.emit('return-data', result,result1 );
   });
    
  });
})


socket.on('fetch-dates1', function (args) {
  let startDate = args[0];
  let endDate = args[1];
  
  // console.log();
  // console.log(dateFormatter(endDate.toString()));
  
  var formattedStartDate = dateFormatter(startDate.toString());
  var formattedEndDate = dateFormatter(endDate.toString());
 
     con.query(`SELECT * FROM analytics WHERE DATE >= ? AND DATE <= ? ORDER BY DATE DESC;`,[formattedStartDate,formattedEndDate], function (err, result1, fields) {
      console.log(result1);
      
       io.emit('return-data1',result1 );
     });
      
   
  })
    





});


var day = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

// let index = d.getDay();

// var time = hour + ":"+ minutes;

const renderTime = () => {
  const d = new Date();
  let hour = d.getHours();
  let minutes = d.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  //Grow Light
  //console.log(hour +':'+ minutes)
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

  //aerator

  con.query(`SELECT * FROM schedule WHERE schedule.id=5;`, function (err, result, fields) {

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