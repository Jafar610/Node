// const fs = require('fs');
// const http = require('http');
// var mimeType = require('mime-types').lookup;

// const server = http.createServer((req, res)=>{
//      let path = req.url;
//      console.log("Requested path is >>> ", path);
//      if(path === '/'){
//         path = '/index.html';
//      }

//      let reqFile = '../Apple_Clone' + path;
//      console.log("Requested File >>> ", reqFile);

//      fs.readFile(reqFile,(err,content)=>{
//         if(err){
//             res.write('<h1> Page Not Found</h1>');
//             res.end();
//         }else{
//             res.writeHead(200,{"content-type":mimeType(path)});
//             res.write(content);
//             res.end();
//         }

//      })

// });

// server.listen(5002,(err)=>{
//     if(err){
//         console.error(err);
//     }
//     console.log("Server is running");
// })

// const express = require('express');
// const mysql = require('mysql2');
// const server = express();
// server.listen(3000,(err)=>{
//     if(err)console.error(err);
//     console.log("Server is running");
// });

// //should have to create connection
// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password:'',
//     database:'test'
// });

// connection.connect((err)=>{
//     if(err)console.log(err);
//     else console.log("connected to mysql");
// });

// server.get("/create-table",(req,res)=>{
//     let name = `CREATE TABLE if not exists customers(
//     customer_id int auto_increment,
//     name VARCHAR(255) not null,
//     PRIMARY KEY(customer_id)
//     )`;

//     let address = `CREATE TABLE if not exists address(
//         address_id int auto_increment,
//         customer_id int(11) not null,
//         address VARCHAR(255) not null,
//         PRIMARY KEY (address_id),
//         FOREIGN KEY (customer_id) REFERENCES customers (customer_id)
//     )`;

//     connection.query(name, (err, results, fields)=>{
//         if(err)console.log(`Error Found:${err}`);
//     })
//     connection.query(address, (err, results, fields)=>{
//         if(err)console.log(`Error Found:${err}`);
//     })

//     res.end("Tables Created");
//     console.log("Table Created");
// })

const express = require("express");
const mysql = require("mysql2");
const server = express();
const cors = require("cors");

server.use(
  express.urlencoded({
    extended: true,
  })
);
// middleware for json file
server.use(express.json());
server.use(cors());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "test",
});

connection.connect((err) => {
  if (err) console.log(`Error Found :${err}`);
  else console.log("Connected to DB");
});

server.get("/create-table", (req, res) => {
  let Company = `CREATE TABLE if not exists company(
        company_id int auto_increment,
        customer_id int(11) not null,
        PRIMARY KEY (company_id),
        FOREIGN KEY (customer_id) REFERENCES customers (customer_id)
    )`;

  connection.query(Company, (err, results, fields) => {
    if (err) console.log(`Error Found: ${err}`);
    else console.log("Table created successfully");
  });
  res.end("Table Created Succesfully");
});

// server.post("/insert-customers-info", (req, res) => {
//   console.table(req.body);
//   const { name, address } = req.body;
//   let insertName = "INSERT INTO customers (name) VALUES(?)";
//   let insertAddress = "INSERT INTO address (customer_id, address) VALUES(?, ?)";

//   let insertCompany = "INSERT INTO company(customer_id) VALUES(?)";

//   connection.query(insertName, [name], (err, results, fields) => {
//     if (err) console.log(`Error Found: ${err}`);
//     console.table(results);
//     const id = results.insertId;

//     connection.query(insertAddress, [id, address], (err, results, fields) => {
//       if (err) console.log(`Error Found: ${err}`);

//       connection.query(insertCompany, [id], (err, results, fields) => {
//         if (err) console.log(`Error Found: ${err}`);
//       });
//     });
//     res.end("Data Submitted");
//     console.log("Data submitted successfully");
//   });
// });

server.get("/customers-detail-info", (req, res) => {
	connection.query(
		"SELECT * FROM customers JOIN address JOIN company ON customers.customer_id = address.customer_id AND customers.customer_id = company.customer_id",
		(err, results, fields) => {
			if (err) console.log("Error During selection", err);
			// console.log(results);
			res.send(results);
		}
	);
});

server.listen(3000, (err) => {
  if (err) console.log(`Error Found : ${err}`);
  else console.log("Server is running");
});
