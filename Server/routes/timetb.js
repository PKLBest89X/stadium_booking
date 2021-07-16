var express = require("express");
var router = express.Router();
const fs = require('fs')

const mysql = require("mysql");
const dbconfig = require("../dbConnect/dbconnect");

const cors = require("cors");
const cookieParser = require("cookie-parser");

router.use(express.json());
router.use(cors());
router.use(cookieParser());

const db = mysql.createConnection(dbconfig.db);

router.get('/getTime', async function(req, res, next) {
    await db.query("call time_table()", (err, result) => {
        if(err){
            res.status(400)
            console.log(err);
        }else{
            res.status(200)
            res.send(result[0]);
        }
    })
}) //ສະແດງລາຍການເວລາຈອງທີ່ເຮົາກໍານົດ ||||||||||||||||||||||||||||||||||||||||||||||||||

module.exports = router;