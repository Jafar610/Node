// const http = require('http');
// const fs = require('fs');
// const mime = require('mime-types').lookup;


// const server = http.createServer((req, res)=>{
//     let path = req.url;
//     if(path === '/'){
//         path = '/index.html';
//     }

//     let reqPath = '../barber_shop' + path;
//     fs.readFile(reqPath, (err, content)=>{
//         if(err){
//             res.write("There is no such file.")
//             res.end();
//         }
//         else{
//             res.writeHead(200, {'content-type':mime(path)});
//             res.write(content);
//             res.end();
//         }
//     })
// })

// server.listen(3000, (err)=>{
//     if(err){
//         console.log('There is an Error on server');
//     }else{
//         console.log('Server is running');
//     }
// })

const express = require('express');
const server = express();
const mysql = require('mysql2');

server.use(
    express.urlencoded({
        extended:true
    })
)


const DBConnection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'test'
});
DBConnection.connect((err)=>{
    if(err)console.log('Database field', err);
    else{
        console.log('DB connected');
    }
});

server.get('/create-table',(req, res)=>{
    let customer = `CREATE TABLE if not exists customers(
        customer_id int auto_increment,
        customer_name VARCHAR(255) not null,
        PRIMARY KEY (customer_id)
    )`;
    let address = `CREATE TABLE if not exists address(
        address_id int auto_increment,
        address VARCHAR(255) NOT NULL,
        customer_id int(11) not null,
        PRIMARY KEY(address_id),
        FOREIGN KEY(customer_id) REFERENCES customers(customer_id)
    )`;

    let company = `CREATE TABLE if not exists company(
        company_id int auto_increment,
        company_name VARCHAR(255) NOT NULL,
        customer_id int(11) not null,
        PRIMARY KEY(company_id),
        FOREIGN KEY(customer_id) REFERENCES customers(customer_id)
    )`;


    DBConnection.query(customer,(err, results, fields)=>{
        if(err)console.log('Customers table field', err);
        res.end('Customer table Created')
    });
    DBConnection.query(address,(err, results, fields)=>{
        if(err)console.log('Address table field', err);
        res.end('Address table created');
    });
    DBConnection.query(company, (err, results, fields)=>{
        if(err)console.log('Company table field');
        res.end('Company table Created');
    })
});


server.post('/insert-info',(req, res)=>{
    console.table(req.body);
    const {customer_name, address, company_name} = req.body;

    let insertCustomers = 'INSERT INTO customers (customer_name) VALUES (?)';
    let insertAddress = 'INSERT INTO address (customer_id, address) VALUES (?,?)';
    let insertCompany = 'INSERT INTO company (customer_id, company_name) VALUES (?,?)';

    DBConnection.query(insertCustomers, [customer_name],(err, results, fields)=>{
        if(err)console.log('Customer Data field', err);

        const id = results.insertId;

        DBConnection.query(insertAddress, [id, address],(err, results, fields)=>{
            if(err)console.log('Address Data field', err);
        })
        DBConnection.query(insertCompany,[id, company_name],(err, results, fields)=>{
            if(err)console.log('Company Data field', err);
        })
    })

    res.write('Data inserted successfully');
    res.end();
});


// Data Retrive
server.get('/customer-detail', (req, res)=>{
    let selectionQuery = 'SELECT * FROM customers JOIN address JOIN company ON customers.customer_id = address.customer_id AND customers.customer_id = company.customer_id';

    DBConnection.query(selectionQuery, (err, results, fields)=>{
        if(err)console.log('Data Retrive Field', err);
        else{
            // console.log(results);
            res.send(results);
        }
    })
    
})



server.listen(3000, (err)=>{
    if(err) throw err;
    console.log("Server is running");
})

