const socket = io.connect(window.location.origin)

const fanController = document.querySelector("#switch");
const lightController = document.querySelector("#switch1");
const pumpController = document.querySelector("#switch2");
const mistController = document.querySelector("#switch3");

const water_tempValue = document.querySelector("#WaterTemp");

const ph_Value = document.querySelector("#phVal");

const ec_Value = document.querySelector("#EcVal");

const humid_Value = document.querySelector("#Humid");

const room_tempValue = document.querySelector("#RoomTemp");


fanController.addEventListener('change', function (e) {
    // console.log(this.checked);
    if (this.checked == true) {

        socket.emit("fan", true);

        // console.log(true);
    } else {
        socket.emit("fan", false);
        //console.log(false);
    }
});

lightController.addEventListener('change', function (e) {
    // console.log(this.checked);
    if (this.checked == true) {

        socket.emit("light", true);

        // console.log(true);
    } else {
        socket.emit("light", false);
        //console.log(false);
    }
});
pumpController.addEventListener('change', function (e) {
    // console.log(this.checked);
    if (this.checked == true) {

        socket.emit("pump", true);

        // console.log(true);
    } else {
        socket.emit("pump", false);
        //console.log(false);
    }
});
mistController.addEventListener('change', function (e) {
    // console.log(this.checked);
    if (this.checked == true) {

        socket.emit("mist", true);

        // console.log(true);
    } else {
        socket.emit("mist", false);
        //console.log(false);
    }
});
socket.on('fan', (arg) => {
    if (arg == true) {
        fanController.setAttribute('Checked', 'Checked');
    } else {
        fanController.removeAttribute('Checked');
    }

});


socket.on('light', (arg) => {
    if (arg == true) {
        lightController.setAttribute('Checked', 'Checked');
    } else {
        lightController.removeAttribute('Checked');
    }

});

socket.on('pump', (arg) => {
    if (arg == true) {
        pumpController.setAttribute('Checked', 'Checked');
    } else {
        pumpController.removeAttribute('Checked');
    }

});
socket.on('mist', (arg) => {
    if (arg == true) {
        mistController.setAttribute('Checked', 'Checked');
    } else {
        mistController.removeAttribute('Checked');
    }

});

socket.on('water_temp', (arg) => {
    water_tempValue.innerHTML = arg + '&#8451';
   // console.log(arg)
});

socket.on('ph_value', (arg) => {
    ph_Value.innerHTML = arg;
   // console.log(arg)
});


socket.on('ec_value', (arg) => {
    ec_Value.innerHTML = arg;
  //  console.log(arg)
});

socket.on('humid', (arg) => {
    humid_Value.innerHTML = arg + '%';
   // console.log(arg)
});


socket.on('room_temp', (arg) => {
    room_tempValue.innerHTML = arg + '&#8451';
  //  console.log(arg)
});



