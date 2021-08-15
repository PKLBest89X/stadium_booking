var express = require("express");
var router = express.Router();

const mysql = require("mysql");
const dbconfig = require("../dbConnect/dbconnect");

const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const aut = require("../middleware/admin-JWT");

router.use(express.static("public"));
router.use(express.static("upload"));

router.use(express.json());
router.use(cookieParser());
router.use(cors());

const db = mysql.createConnection(dbconfig.db);

router.get("/following_number/:st_id", async (req,res) => {
    const stadium_id = req.params.st_id;
    await db.query("call report_stadium_following(?)", [stadium_id], (err, result) => {
        if (err) {
            res.status(400)
            console.log(err);
        } else {
            res.status(200);
            res.send(result[0][0]);
        }
    })
}) // ລາຍງານຈໍານວນຄົນຕິດຕາມຂອງເດີ່ນນັ້ນ

router.get("/customer_number/:stadiumId", async (req,res) => {
    const stadiumId = req.params.stadiumId
    await db.query("call report_employee_count(?)", [stadiumId], (err, result) => {
        if (err) {
            res.status(400)
            console.log(err);
        } else {
            res.status(200);
            res.send(result[0][0]);
        }
    })
}) // ລາຍງານຈໍານວນຜູ້ໃຊ້

router.get("/reserve_number/:st_id", async (req,res) => {
    const stadium_id = req.params.st_id;
    await db.query("call report_reserve_count(?)", [stadium_id], (err, result) => {
        if (err) {
            res.status(400)
            console.log(err);
        } else {
            res.status(200);
            res.send(result[0][0]);
        }
    })
})  // ລາຍງານຈໍານວການຈອງທັງໝົດຂອງເດີ່ນນັ້ນ

router.get("/today_income/:st_id", async (req,res) => {
    const stadium_id = req.params.st_id;
    await db.query("call report_stadium_date_income(?)", [stadium_id], (err, result) => {
        if (err) {
            res.status(400)
            console.log(err);
        } else {
            res.status(200);
            res.send(result[0][0]);
        }
    })
})  // ລາຍງານລາຍຮັບທັງໝົດຂອງເດີ່ນນັ້ນໃນມື້ນັ້ນ


router.get('/admin/reportBooking/:stadiumId', async function(req,res,next){

    const stadiumId = req.params.stadiumId;
    await db.query("call report_stadium_reserve(?)" , [stadiumId], (err,result) => {
      if(err){
          console.log(err);
          return res.status(400).send('ເກີດຂໍ້ຜິດພາດ!!');
      }
      if (result[0].length > 0) {
          return res.send(result[0])
      } else {
          return res.status(302).send('ບໍ່ມີຂໍ້ມູນ!!')
      }
      })
  
  }) // ສະແດງລາຍກາ່ນຈອງທັງໝົດຂອງເດີ່ນນັ້ນໆ ||||||||||||||||||||||||||||||||||||||||||||||||||
  
//   router.get('/admin/reportBooking_paid/:stadiumId', async function(req,res,next){
  
//     const customerId = authData.data;
//     await db.query("call report_user_reserve_paid(?)" , [customerId], (err,result) => {
//       if(err){
//           console.log(err);
//           return res.status(400).send('ເກີດຂໍ້ຜິດພາດ!!');
//       }
//       if (result[0].length > 0) {
//           return res.send(result[0])
//       } else {
//           return res.status(302).send('ບໍ່ມີຂໍ້ມູນ!!')
//       }
//       })
  
//   }) // ສະແດງລາຍກາ່ນຈອງທີ່ຈ່າຍແລ້ວໃຫ້ ເດີ່ນ ||||||||||||||||||||||||||||||||||||||||||||||||||
  
//   router.get('/admin/reportBooking_unPaid/:stadiumId', async function(req,res,next){
  
//     const customerId = authData.data;
//     await db.query("call report_user_reserve_unPaid(?)" , [customerId], (err,result) => {
//       if(err){
//           console.log(err);
//           return res.status(400).send('ເກີດຂໍ້ຜິດພາດ!!');
//       }
//       if (result[0].length > 0) {
//           return res.send(result[0])
//       } else {
//           return res.status(302).send('ບໍ່ມີຂໍ້ມູນ!!')
//       }
//       })
  
//   }) // ສະແດງລາຍກາ່ນຈອງທີ່ຍັງບໍ່ຈ່າຍໃຫ້ ເດີ່ນ ||||||||||||||||||||||||||||||||||||||||||||||||||

router.get('/admin/reportPayment/:stadiumId', async function(req,res,next){

    const stadiumId = req.params.stadiumId;
    await db.query("call report_stadium_payment(?)" , [stadiumId], (err,result) => {
      if(err){
          console.log(err);
          return res.status(400).send('ເກີດຂໍ້ຜິດພາດ!!');
      }
      if (result[0].length > 0) {
          return res.send(result[0])
      } else {
          return res.status(302).send('ບໍ່ມີຂໍ້ມູນ!!')
      }
      })
  
  }) // ສະແດງລາຍກາ່ນຈອງທັງໝົດຂອງເດີ່ນນັ້ນໆ ||||||||||||||||||||||||||||||||||||||||||||||||||

router.get('/admin/reportStadiumsPayment/:stadiumId', async function(req,res,next){

    const stadiumId = req.params.stadiumId;
    await db.query("call report_stadium_payment_onlyStadiums(?)" , [stadiumId], (err,result) => {
      if(err){
          console.log(err);
          return res.status(400).send('ເກີດຂໍ້ຜິດພາດ!!');
      }
      if (result[0].length > 0) {
          return res.send(result[0])
      } else {
          return res.status(302).send('ບໍ່ມີຂໍ້ມູນ!!')
      }
      })
  
  }) // ສະແດງລາຍກາ່ນຈອງທັງໝົດຂອງເດີ່ນນັ້ນໆ ||||||||||||||||||||||||||||||||||||||||||||||||||

  router.get('/admin/reportWaterPayment/:stadiumId', async function(req,res,next){

    const stadiumId = req.params.stadiumId;
    await db.query("call report_water_payment(?)" , [stadiumId], (err,result) => {
      if(err){
          console.log(err);
          return res.status(400).send('ເກີດຂໍ້ຜິດພາດ!!');
      }
      if (result[0].length > 0) {
          return res.send(result[0])
      } else {
          return res.status(302).send('ບໍ່ມີຂໍ້ມູນ!!')
      }
      })
  
  }) // ສະແດງລາຍກາ່ນຈອງທັງໝົດຂອງເດີ່ນນັ້ນໆ ||||||||||||||||||||||||||||||||||||||||||||||||||

module.exports = router;