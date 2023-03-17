// const socket = io.connect(window.location.origin)

// var timeOnController = document.getElementById("time-on");
// var timeOffController = document.getElementById("time-off");
// var everydayController = document.getElementById('select-all');
// var mondayController = document.getElementById('Monday');
// var tuesdayController = document.getElementById('Tuesday');
// var wednesdayController = document.getElementById('Wednesday');
// var thursdayController = document.getElementById('Thursday');
// var fridayController = document.getElementById('Friday');
// var saturdayController = document.getElementById('Saturday');
// var sundayController = document.getElementById('Sunday');
// var checkboxes = document.querySelector('input[type="checkbox"]');
// var resetButton = document.querySelector('.reset');


// var timeOnController1 = document.getElementById("time-on1");
// var timeOffController1 = document.getElementById("time-off1");
// var everydayController1 = document.getElementById('select-all1');
// var mondayController1 = document.getElementById('Monday1');
// var tuesdayController1 = document.getElementById('Tuesday1');
// var wednesdayController1 = document.getElementById('Wednesday1');
// var thursdayController1 = document.getElementById('Thursday1');
// var fridayController1 = document.getElementById('Friday1');
// var saturdayController1 = document.getElementById('Saturday1');
// var sundayController1 = document.getElementById('Sunday1');
// var checkboxes1 = document.querySelector('input[type="checkbox"]');
// var resetButton1 = document.querySelector('.reset1');

// var timeOnController2 = document.getElementById("time-on2");
// var timeOffController2 = document.getElementById("time-off2");
// var everydayController2 = document.getElementById('select-all2');
// var mondayController2 = document.getElementById('Monday2');
// var tuesdayController2 = document.getElementById('Tuesday2');
// var wednesdayController2 = document.getElementById('Wednesday2');
// var thursdayController2 = document.getElementById('Thursday2');
// var fridayController2 = document.getElementById('Friday2');
// var saturdayController2 = document.getElementById('Saturday2');
// var sundayController2 = document.getElementById('Sunday2');
// var checkboxes2 = document.querySelector('input[type="checkbox"]');
// var resetButton2 = document.querySelector('.reset2');


// var timeOnController3 = document.getElementById("time-on3");
// var timeOffController3 = document.getElementById("time-off3");
// var everydayController3 = document.getElementById('select-all3');
// var mondayController3 = document.getElementById('Monday3');
// var tuesdayController3 = document.getElementById('Tuesday3');
// var wednesdayController3 = document.getElementById('Wednesday3');
// var thursdayController3 = document.getElementById('Thursday3');
// var fridayController3 = document.getElementById('Friday3');
// var saturdayController3 = document.getElementById('Saturday3');
// var sundayController3 = document.getElementById('Sunday3');
// var checkboxes3 = document.querySelector('input[type="checkbox"]');
// var resetButton3 = document.querySelector('.reset3');



// var growButton = document.querySelector('#grow');
// var waterButton = document.querySelector('#water');
// var mistButton = document.querySelector('#mist');
// var fanButton = document.querySelector('#fan');


// const growLightForm = document.getElementById("grow-light-form");
// const waterPumpForm = document.getElementById("water-pump-form");
// const mistForm = document.getElementById("mist-form");
// const fanForm = document.getElementById("fan-form");



// growLightForm.style.display = "block";
// waterPumpForm.style.display = "none";
// mistForm.style.display = "none";
// fanForm.style.display = "none";

// // growButton.style.backgroundColor = 'red';
// // waterButton.style.backgroundColor = '#04AA6D';
// // mistButton.style.backgroundColor = '#04AA6D';

// //FORM #1 Gwo lights
// timeOnController.addEventListener('change', function () {
//     socket.emit('timeOn', timeOnController.value);
//     console.log('time On: ' + timeOnController.value);


// });

// timeOffController.addEventListener('change', function () {
//     socket.emit('timeOff', timeOffController.value);
//     console.log('time Off: ' + timeOffController.value);
//     // location.reload();
// });

// everydayController.addEventListener('change', function () {
//     var checkboxes = document.querySelectorAll('input[type="checkbox"]');
//     for (var checkbox of checkboxes) {
//         checkbox.checked = this.checked;
//     }
//     socket.emit('everyday', everydayController.checked);
// });

// mondayController.addEventListener('change', function () {
//     socket.emit('monday', mondayController.checked);
//     console.log(mondayController.checked)
// });

// tuesdayController.addEventListener('change', function () {
//     socket.emit('tuesday', tuesdayController.checked);
//     console.log(tuesdayController.checked)
// });
// wednesdayController.addEventListener('change', function () {
//     socket.emit('wednesday', wednesdayController.checked);
//     console.log(wednesdayController.checked)
// });
// thursdayController.addEventListener('change', function () {
//     socket.emit('thursday', thursdayController.checked);
//     console.log(thursdayController.checked)
// });
// fridayController.addEventListener('change', function () {
//     socket.emit('friday', fridayController.checked);
//     console.log(fridayController.checked)
// });
// saturdayController.addEventListener('change', function () {
//     socket.emit('saturday', saturdayController.checked);
//     console.log(saturdayController.checked)
// });
// sundayController.addEventListener('change', function () {
//     socket.emit('sunday', sundayController.checked);
//     console.log(sundayController.checked)
// });

// socket.on('updatedTimeOn', function (args) {
//     timeOnController.value = args;

// });
// socket.on('updatedTimeOff', function (args) {
//     timeOffController.value = args;

// });

// socket.on('updatedMonday', function (args) {
//     if (args == 1) {
//         mondayController.setAttribute('Checked', 'Checked');
//         //mondayController.value = true;   
//     } else {
//         mondayController.removeAttribute('Checked');
//         // mondayController.value = false;
//     }


// });

// socket.on('updatedTuesday', function (args) {
//     if (args == 1) {
//         tuesdayController.setAttribute('Checked', 'Checked');
//         //mondayController.value = true;   
//     } else {
//         tuesdayController.removeAttribute('Checked');
//         // mondayController.value = false;
//     }


// });


// socket.on('updatedWednesday', function (args) {
//     if (args == 1) {
//         wednesdayController.setAttribute('Checked', 'Checked');
//         //mondayController.value = true;   
//     } else {
//         wednesdayController.removeAttribute('Checked');
//         // mondayController.value = false;
//     }

// });

// socket.on('updatedThursday', function (args) {
//     if (args == 1) {
//         thursdayController.setAttribute('Checked', 'Checked');
//         //mondayController.value = true;   
//     } else {
//         thursdayController.removeAttribute('Checked');
//         // mondayController.value = false;
//     }

// });

// socket.on('updatedFriday', function (args) {
//     if (args == 1) {
//         fridayController.setAttribute('Checked', 'Checked');
//         //mondayController.value = true;   
//     } else {
//         fridayController.removeAttribute('Checked');
//         // mondayController.value = false;
//     }
// });

// socket.on('updatedSaturday', function (args) {
//     if (args == 1) {
//         saturdayController.setAttribute('Checked', 'Checked');
//         //mondayController.value = true;   
//     } else {
//         saturdayController.removeAttribute('Checked');
//         // mondayController.value = false;
//     }
// });


// socket.on('updatedSunday', function (args) {
//     if (args == 1) {
//         sundayController.setAttribute('Checked', 'Checked');
//         //mondayController.value = true;   
//     } else {
//         sundayController.removeAttribute('Checked');
//         // mondayController.value = false;
//     }
// });

// socket.on('updatedEveryday', function (args) {
//     if (args == 1) {
//         for (var checkbox of checkboxes) {
//             checkbox.checked = this.checked;
//         }

//         //mondayController.value = true;   
//     } else {
//         selectAll.removeAttribute('Checked');
//         // mondayController.value = false;
//     }
// });




// //FORM #2 water pump
// timeOnController1.addEventListener('change', function () {
//     socket.emit('timeOn1', timeOnController1.value);
//     console.log('time On: ' + timeOnController1.value);


// });

// timeOffController1.addEventListener('change', function () {
//     socket.emit('timeOff1', timeOffController1.value);
//     console.log('time Off: ' + timeOffController1.value);
//     // location.reload();
// });

// everydayController1.addEventListener('change', function () {
//     var checkboxes = document.querySelectorAll('input[type="checkbox"]');
//     for (var checkbox of checkboxes) {
//         checkbox.checked = this.checked;
//     }
//     socket.emit('everyday1', everydayController1.checked);
// });

// mondayController1.addEventListener('change', function () {
//     socket.emit('monday1', mondayController1.checked);
//     console.log(mondayController1.checked)
// });

// tuesdayController1.addEventListener('change', function () {
//     socket.emit('tuesday1', tuesdayController1.checked);
//     console.log(tuesdayController1.checked)
// });
// wednesdayController1.addEventListener('change', function () {
//     socket.emit('wednesday1', wednesdayController1.checked);
//     console.log(wednesdayController1.checked)
// });
// thursdayController1.addEventListener('change', function () {
//     socket.emit('thursday1', thursdayController1.checked);
//     console.log(thursdayController1.checked)
// });
// fridayController1.addEventListener('change', function () {
//     socket.emit('friday1', fridayController1.checked);
//     console.log(fridayController1.checked)
// });
// saturdayController1.addEventListener('change', function () {
//     socket.emit('saturday1', saturdayController1.checked);
//     console.log(saturdayController1.checked)
// });
// sundayController1.addEventListener('change', function () {
//     socket.emit('sunday1', sundayController1.checked);
//     console.log(sundayController1.checked)
// });

// socket.on('updatedTimeOn1', function (args) {
//     timeOnController1.value = args;

// });
// socket.on('updatedTimeOff1', function (args) {
//     timeOffController1.value = args;

// });

// socket.on('updatedMonday1', function (args) {
//     if (args == 1) {
//         mondayController1.setAttribute('Checked', 'Checked');
//         //mondayController1.value = true;   
//     } else {
//         mondayController1.removeAttribute('Checked');
//         // mondayController1.value = false;
//     }


// });

// socket.on('updatedTuesday1', function (args) {
//     if (args == 1) {
//         tuesdayController1.setAttribute('Checked', 'Checked');
//         //mondayController1.value = true;   
//     } else {
//         tuesdayController1.removeAttribute('Checked');
//         // mondayController1.value = false;
//     }


// });


// socket.on('updatedWednesday1', function (args) {
//     if (args == 1) {
//         wednesdayController1.setAttribute('Checked', 'Checked');
//         //mondayController1.value = true;   
//     } else {
//         wednesdayController1.removeAttribute('Checked');
//         // mondayController1.value = false;
//     }

// });

// socket.on('updatedThursday1', function (args) {
//     if (args == 1) {
//         thursdayController1.setAttribute('Checked', 'Checked');
//         //mondayController1.value = true;   
//     } else {
//         thursdayController1.removeAttribute('Checked');
//         // mondayController1.value = false;
//     }

// });

// socket.on('updatedFriday1', function (args) {
//     if (args == 1) {
//         fridayController1.setAttribute('Checked', 'Checked');
//         //mondayController1.value = true;   
//     } else {
//         fridayController1.removeAttribute('Checked');
//         // mondayController1.value = false;
//     }
// });

// socket.on('updatedSaturday1', function (args) {
//     if (args == 1) {
//         saturdayController1.setAttribute('Checked', 'Checked');
//         //mondayController1.value = true;   
//     } else {
//         saturdayController1.removeAttribute('Checked');
//         // mondayController1.value = false;
//     }
// });


// socket.on('updatedSunday1', function (args) {
//     if (args == 1) {
//         sundayController1.setAttribute('Checked', 'Checked');
//         //mondayController1.value = true;   
//     } else {
//         sundayController1.removeAttribute('Checked');
//         // mondayController1.value = false;
//     }
// });

// socket.on('updatedEveryday1', function (args) {
//     if (args == 1) {
//         for (var checkbox of checkboxes) {
//             checkbox.checked = this.checked;
//         }

//         //mondayController1.value = true;   
//     } else {
//         selectAll.removeAttribute('Checked');
//         // mondayController1.value = false;
//     }
// });

// //FORM #3 mist
// timeOnController2.addEventListener('change', function () {
//     socket.emit('timeOn2', timeOnController2.value);
//     console.log('time On: ' + timeOnController2.value);


// });

// timeOffController2.addEventListener('change', function () {
//     socket.emit('timeOff2', timeOffController2.value);
//     console.log('time Off: ' + timeOffController2.value);
//     // location.reload();
// });

// everydayController2.addEventListener('change', function () {
//     var checkboxes = document.querySelectorAll('input[type="checkbox"]');
//     for (var checkbox of checkboxes) {
//         checkbox.checked = this.checked;
//     }
//     socket.emit('everyday2', everydayController2.checked);
// });

// mondayController2.addEventListener('change', function () {
//     socket.emit('monday2', mondayController2.checked);
//     console.log(mondayController2.checked)
// });

// tuesdayController2.addEventListener('change', function () {
//     socket.emit('tuesday2', tuesdayController2.checked);
//     console.log(tuesdayController2.checked)
// });
// wednesdayController2.addEventListener('change', function () {
//     socket.emit('wednesday2', wednesdayController2.checked);
//     console.log(wednesdayController2.checked)
// });
// thursdayController2.addEventListener('change', function () {
//     socket.emit('thursday2', thursdayController2.checked);
//     console.log(thursdayController2.checked)
// });
// fridayController2.addEventListener('change', function () {
//     socket.emit('friday2', fridayController2.checked);
//     console.log(fridayController2.checked)
// });
// saturdayController2.addEventListener('change', function () {
//     socket.emit('saturday2', saturdayController2.checked);
//     console.log(saturdayController2.checked)
// });
// sundayController2.addEventListener('change', function () {
//     socket.emit('sunday2', sundayController2.checked);
//     console.log(sundayController2.checked)
// });

// socket.on('updatedTimeOn2', function (args) {
//     timeOnController2.value = args;

// });
// socket.on('updatedTimeOff2', function (args) {
//     timeOffController2.value = args;

// });

// socket.on('updatedMonday2', function (args) {
//     if (args == 1) {
//         mondayController2.setAttribute('Checked', 'Checked');
//         //mondayController2.value = true;   
//     } else {
//         mondayController2.removeAttribute('Checked');
//         // mondayController2.value = false;
//     }


// });

// socket.on('updatedTuesday2', function (args) {
//     if (args == 1) {
//         tuesdayController2.setAttribute('Checked', 'Checked');
//         //mondayController2.value = true;   
//     } else {
//         tuesdayController2.removeAttribute('Checked');
//         // mondayController2.value = false;
//     }


// });


// socket.on('updatedWednesday2', function (args) {
//     if (args == 1) {
//         wednesdayController2.setAttribute('Checked', 'Checked');
//         //mondayController2.value = true;   
//     } else {
//         wednesdayController2.removeAttribute('Checked');
//         // mondayController2.value = false;
//     }

// });

// socket.on('updatedThursday2', function (args) {
//     if (args == 1) {
//         thursdayController2.setAttribute('Checked', 'Checked');
//         //mondayController2.value = true;   
//     } else {
//         thursdayController2.removeAttribute('Checked');
//         // mondayController2.value = false;
//     }

// });

// socket.on('updatedFriday2', function (args) {
//     if (args == 1) {
//         fridayController2.setAttribute('Checked', 'Checked');
//         //mondayController2.value = true;   
//     } else {
//         fridayController2.removeAttribute('Checked');
//         // mondayController2.value = false;
//     }
// });

// socket.on('updatedSaturday2', function (args) {
//     if (args == 1) {
//         saturdayController2.setAttribute('Checked', 'Checked');
//         //mondayController2.value = true;   
//     } else {
//         saturdayController2.removeAttribute('Checked');
//         // mondayController2.value = false;
//     }
// });


// socket.on('updatedSunday2', function (args) {
//     if (args == 1) {
//         sundayController2.setAttribute('Checked', 'Checked');
//         //mondayController2.value = true;   
//     } else {
//         sundayController2.removeAttribute('Checked');
//         // mondayController2.value = false;
//     }
// });

// socket.on('updatedEveryday2', function (args) {
//     if (args == 1) {
//         for (var checkbox of checkboxes) {
//             checkbox.checked = this.checked;
//         }

//         //mondayController2.value = true;   
//     } else {
//         selectAll.removeAttribute('Checked');
//         // mondayController2.value = false;
//     }
// });


// //Form4 FAN
// timeOnController3.addEventListener('change', function () {
//     socket.emit('timeOn3', timeOnController3.value);
//     console.log('time On: ' + timeOnController3.value);


// });

// timeOffController3.addEventListener('change', function () {
//     socket.emit('timeOff3', timeOffController3.value);
//     console.log('time Off: ' + timeOffController3.value);
//     // location.reload();
// });

// everydayController3.addEventListener('change', function () {
//     var checkboxes = document.querySelectorAll('input[type="checkbox"]');
//     for (var checkbox of checkboxes) {
//         checkbox.checked = this.checked;
//     }
//     socket.emit('everyday3', everydayController3.checked);
// });

// mondayController3.addEventListener('change', function () {
//     socket.emit('monday3', mondayController3.checked);
//     console.log(mondayController3.checked)
// });

// tuesdayController3.addEventListener('change', function () {
//     socket.emit('tuesday3', tuesdayController3.checked);
//     console.log(tuesdayController3.checked)
// });
// wednesdayController3.addEventListener('change', function () {
//     socket.emit('wednesday3', wednesdayController3.checked);
//     console.log(wednesdayController3.checked)
// });
// thursdayController3.addEventListener('change', function () {
//     socket.emit('thursday3', thursdayController3.checked);
//     console.log(thursdayController3.checked)
// });
// fridayController3.addEventListener('change', function () {
//     socket.emit('friday3', fridayController3.checked);
//     console.log(fridayController3.checked)
// });
// saturdayController3.addEventListener('change', function () {
//     socket.emit('saturday3', saturdayController3.checked);
//     console.log(saturdayController3.checked)
// });
// sundayController3.addEventListener('change', function () {
//     socket.emit('sunday3', sundayController3.checked);
//     console.log(sundayController3.checked)
// });

// socket.on('updatedTimeOn3', function (args) {
//     timeOnController3.value = args;

// });
// socket.on('updatedTimeOff3', function (args) {
//     timeOffController3.value = args;

// });

// socket.on('updatedMonday3', function (args) {
//     if (args == 1) {
//         mondayController3.setAttribute('Checked', 'Checked');
//         //mondayController3.value = true;   
//     } else {
//         mondayController3.removeAttribute('Checked');
//         // mondayController3.value = false;
//     }


// });

// socket.on('updatedTuesday3', function (args) {
//     if (args == 1) {
//         tuesdayController3.setAttribute('Checked', 'Checked');
//         //mondayController3.value = true;   
//     } else {
//         tuesdayController3.removeAttribute('Checked');
//         // mondayController3.value = false;
//     }


// });


// socket.on('updatedWednesday3', function (args) {
//     if (args == 1) {
//         wednesdayController3.setAttribute('Checked', 'Checked');
//         //mondayController3.value = true;   
//     } else {
//         wednesdayController3.removeAttribute('Checked');
//         // mondayController3.value = false;
//     }

// });

// socket.on('updatedThursday3', function (args) {
//     if (args == 1) {
//         thursdayController3.setAttribute('Checked', 'Checked');
//         //mondayController3.value = true;   
//     } else {
//         thursdayController3.removeAttribute('Checked');
//         // mondayController3.value = false;
//     }

// });

// socket.on('updatedFriday3', function (args) {
//     if (args == 1) {
//         fridayController3.setAttribute('Checked', 'Checked');
//         //mondayController3.value = true;   
//     } else {
//         fridayController3.removeAttribute('Checked');
//         // mondayController3.value = false;
//     }
// });

// socket.on('updatedSaturday3', function (args) {
//     if (args == 1) {
//         saturdayController3.setAttribute('Checked', 'Checked');
//         //mondayController3.value = true;   
//     } else {
//         saturdayController3.removeAttribute('Checked');
//         // mondayController3.value = false;
//     }
// });


// socket.on('updatedSunday3', function (args) {
//     if (args == 1) {
//         sundayController3.setAttribute('Checked', 'Checked');
//         //mondayController3.value = true;   
//     } else {
//         sundayController3.removeAttribute('Checked');
//         // mondayController3.value = false;
//     }
// });

// socket.on('updatedEveryday3', function (args) {
//     if (args == 1) {
//         for (var checkbox of checkboxes) {
//             checkbox.checked = this.checked;
//         }

//         //mondayController3.value = true;   
//     } else {
//         selectAll.removeAttribute('Checked');
//         // mondayController3.value = false;
//     }
// });


// growButton.addEventListener('click',function () {
//     socket.emit('nav1',1)
// });

// waterButton.addEventListener('click',function () {
//     socket.emit('nav2',2)
// });


// mistButton.addEventListener('click',function () {
//     socket.emit('nav3',3)
// });


// fanButton.addEventListener('click',function () {
//     socket.emit('nav4',4)
// });

// resetButton.addEventListener('click',function () {
//     socket.emit('reset',true)
// });
// resetButton1.addEventListener('click',function () {
//     socket.emit('reset1',true)
// });

// resetButton2.addEventListener('click',function () {
//     socket.emit('reset2',true)
// });

// resetButton3.addEventListener('click',function () {
//     socket.emit('reset3',true)
// });



// socket.on('rq1', function (args) {
//     console.log(args);
 
//     timeOnController.value = args[0]['time_on'];
//     timeOffController.value = args[0]['time_off'];
//     mondayController.checked = args[0]['monday'];
//     tuesdayController.checked = args[0]['tuesday'];
//     wednesdayController.checked = args[0]['wednesday'];
//     thursdayController.checked = args[0]['thursday'];
//     fridayController.checked = args[0]['friday'];
//     saturdayController.checked = args[0]['saturday'];
//     sundayController.checked = args[0]['sunday'];
//     everydayController.checked = args[0]['everyday'];
//     growButton.style.backgroundColor = 'red';
//     waterButton.style.backgroundColor = '#04AA6D';
//     mistButton.style.backgroundColor = '#04AA6D';
//     fanButton.style.backgroundColor = '#04AA6D';
//     growLightForm.style.display = "block";
//     waterPumpForm.style.display = "none";
//     mistForm.style.display = "none";
//     fanForm.style.display = "none";


// });


// socket.on('rq2', function (args) {
  
   
//     timeOnController1.value = args[0]['time_on'];
//     timeOffController1.value = args[0]['time_off'];
//     mondayController1.checked = args[0]['monday'];
//     tuesdayController1.checked = args[0]['tuesday'];
//     wednesdayController1.checked = args[0]['wednesday'];
//     thursdayController1.checked = args[0]['thursday'];
//     fridayController1.checked = args[0]['friday'];
//     saturdayController1.checked = args[0]['saturday'];
//     sundayController1.checked = args[0]['sunday'];
//     everydayController1.checked = args[0]['everyday'];
//     growButton.style.backgroundColor = '#04AA6D';
//     waterButton.style.backgroundColor = 'red';
//     mistButton.style.backgroundColor = '#04AA6D';
//     fanButton.style.backgroundColor = '#04AA6D';
//     growLightForm.style.display = "none";
//     waterPumpForm.style.display = "block";
//     mistForm.style.display = "none";
//     fanForm.style.display = "none";


// });

// socket.on('rq3', function (args) {
   
//     timeOnController2.value = "";
//     timeOnController2.value = args[0]['time_on'];
//     timeOffController2.value = args[0]['time_off'];
//     mondayController2.checked = args[0]['monday'];
//     tuesdayController2.checked = args[0]['tuesday'];
//     wednesdayController2.checked = args[0]['wednesday'];
//     thursdayController2.checked = args[0]['thursday'];
//     fridayController2.checked = args[0]['friday'];
//     saturdayController2.checked = args[0]['saturday'];
//     sundayController2.checked = args[0]['sunday'];
//     everydayController2.checked = args[0]['everyday'];
//     growButton.style.backgroundColor = '#04AA6D';
//     waterButton.style.backgroundColor = '#04AA6D';
//     mistButton.style.backgroundColor = 'red';
//     fanButton.style.backgroundColor = '#04AA6D';
//     growLightForm.style.display = "none";
//     waterPumpForm.style.display = "none";
//     mistForm.style.display = "block";
//     fanForm.style.display = "none";


// });


// socket.on('rq4', function (args) {
   
//     timeOnController3.value = args[0]['time_on'];
//     timeOffController3.value = args[0]['time_off'];
//     mondayController3.checked = args[0]['monday'];
//     tuesdayController3.checked = args[0]['tuesday'];
//     wednesdayController3.checked = args[0]['wednesday'];
//     thursdayController3.checked = args[0]['thursday'];
//     fridayController3.checked = args[0]['friday'];
//     saturdayController3.checked = args[0]['saturday'];
//     sundayController3.checked = args[0]['sunday'];
//     everydayController3.checked = args[0]['everyday'];
//     growButton.style.backgroundColor = '#04AA6D';
//     waterButton.style.backgroundColor = '#04AA6D';
//     mistButton.style.backgroundColor = '#04AA6D';
//     fanButton.style.backgroundColor = 'red'
//     growLightForm.style.display = "none";
//     waterPumpForm.style.display = "none";
//     mistForm.style.display = "none";
//     fanForm.style.display = "block";


// });
