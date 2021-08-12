var express = require("express");
var router = express.Router();

const mysql = require("mysql");
const dbconfig = require("../dbConnect/dbconnect");

const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

router.use(express.json());
router.use(cors());
router.use(cookieParser());

const db = mysql.createConnection(dbconfig.db);

router.get('/checkValidData/:stadiumId_Admin', async function(req,res){
    const stadium_id = req.params.stadiumId_Admin
    
    await db.query("call check_valid_stadium(?)", [stadium_id], (err, result) => {
        if(err){
            console.log(err);
            return res.status(500).send(err);
        }
        if (result[0].length > 0) {
            return res.status(200).send('200')
        } else {
            return res.status(404).send('404')
        }
    })
}) // check ວ່າມີ stadium ໃນຖານຂໍ້ມູນແທ້ ຫຼື ບໍ່? ||||||||||||||||||||||||||||||||||||||||||||||||||

router.get('/validBookingData/:bookingId', async function(req,res){
    const bookingId = req.params.bookingId
    
    await db.query("call check_valid_booking(?)", [bookingId], (err, result) => {
        if(err){
            console.log(err);
            return res.status(500).send(err);
        }
        if (result[0].length > 0) {
            return res.status(200).send('200')
        } else {
            return res.status(404).send('404')
        }
    })
}) // check ວ່າມີ ການຈອງນີ້ ໃນຖານຂໍ້ມູນແທ້ ຫຼື ບໍ່? ||||||||||||||||||||||||||||||||||||||||||||||||||

router.get('/validPaymentData/:paymentId', async function(req,res){
    const paymentId = req.params.paymentId
    
    await db.query("call check_valid_payment(?)", [paymentId], (err, result) => {
        if(err){
            console.log(err);
            return res.status(500).send(err);
        }
        if (result[0].length > 0) {
            return res.status(200).send('200')
        } else {
            return res.status(404).send('404')
        }
    })
}) // check ວ່າມີ ການຊຳລະນີ້ ໃນຖານຂໍ້ມູນແທ້ ຫຼື ບໍ່? ||||||||||||||||||||||||||||||||||||||||||||||||||


router.get('/validPostData/:postId', async function(req,res,next){
    const postId = req.params.postId;
    await db.query("call check_valid_post(?)", [postId], (err, result) => {
        if(err){
            console.log(err);
            return res.status(500).send(err);
        }
        if (result[0].length > 0) {
            return res.status(200).send('200')
        } else {
            return res.status(404).send('404')
        }
    })
}) // check ວ່າມີ Post ນີ້ ໃນຖານຂໍ້ມູນແທ້ ຫຼື ບໍ່? ||||||||||||||||||||||||||||||||||||||||||||||||||



module.exports = router;