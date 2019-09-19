const mysql = require('mysql');
var app = require('express')();
var route = require('./route');
var http = require('http').createServer(route.handleRequest);
var io= require('socket.io')(http);


app.get('/', function(req, res){
  res.sendFile('/Users/Tanvi/Desktop/New folder/mysql-test/app.html');
});

http.listen(8081, function(){
  console.log('listening on *:8081');
});



const connection = mysql.createConnection({
  connectionLimit : 100, //important
  host: 'localhost',
  user:"root",
  password:"toor",
  database:"customer"
});

io.on('connection', function (socket) {

  console.log('a client connected');

  connection.query('SELECT * FROM contact_info  ',function(err,rows){
    if(err) throw err;
    console.log('Data received from Db:\n');
    console.log(rows);
    socket.emit('showrows', rows);
  });

  
});






io.on('connection', function (socket) {
  console.log("io here"); 
  socket.on('ehlo', function (data) 
  {
        
    var ty = [];
    ty.push(data.name);
    ty.push(data.company);
    ty.push(data.phone);
    ty.push(data.mail);
    console.log(">>>>"+ty);
    console.log(typeof(ty[0]));
    console.log(typeof(ty[1]));
    console.log(typeof(ty[2]));
    console.log(typeof(ty[3]));
        var name = data.name;
        var company = data.company;
        var phone = data.phone; 
        var mail = data.mail;
        console.log(name);
        console.log(company);
        console.log(phone);
        console.log(mail);
        var cleararr = [[]];
    
      console.log("Connected!");
      var sql = "INSERT INTO contact_info (Name, Comapny, phone_no, email_id) VALUES ?";
    var arr=[ty] ; //array insisde am array 
    
      connection.query(sql, [arr], function (err, result) {
          if (err) throw err;
          console.log("1 record inserted");
          console.log(arr);
          arr = cleararr;
          console.log(arr);
     });

});

});
























// connection.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
//   var sql = "INSERT INTO contact_info (Name, phone_no) VALUES ?", name, phone, function(err, result) {
//     if (err) { 
//       connection.rollback(function() {
//         throw err;
//       });
//     };
// //   connection.query(sql, function (err, result) {
// //     if (err) throw err;
// //     console.log("1 record inserted");
// //   });
// // });










// C:\Users\Tanvi\Desktop\New folder\mysql-test\
