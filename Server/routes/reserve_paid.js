var express = require("express");
var router = express.Router();

const mysql = require("mysql");
const dbconfig = require("../dbConnect/dbconnect");

const cookieParser = require("cookie-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");


router.use(express.static("public"));
router.use(express.static("upload"));

router.use(express.json());
router.use(cookieParser());
router.use(cors());

const db = mysql.createConnection(dbconfig.db);


function verifyToken(req, res, next) {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== "undefined") {
      const bearerToken = bearerHeader.split(" ")[1];
      req.token = bearerToken;
      next();
    } else {
      res.sendStatus(403); //forbidden
    }
  } //ແປງ Token ເປັນ data


router.get('/allBooking/:stadiumId', async function(req, res, next) {
    const stadium_id = req.params.stadiumId;
    await db.query("call payment_getBookingList(?)", [stadium_id],(err, result) => {
        if (err) {
            console.log(err);
            return res.status(400).send('ເກີດຂໍ້ຜິດພາດ!!');
        }

        if (result[0].length > 0) {
            return res.send(result[0])
        } else {
            return res.status(302).send('ບໍ່ມີຂໍ້ມູນ!!')
        }
    })
}) // ສະແດງລາຍການຈອງລູກຄ້າທີ່ມີບັນຊີ ||||||||||||||||||||||||||||||||||||||||||||||||||


router.get('/allBookingDetails/:stadiumId', async function(req,res,next){
    const sid = req.params.stadiumId;

    await db.query("call reserve_staff_all(?)" , [sid], (err,result) => {
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





router.post('/openPayment/:stadiumId', verifyToken, async (req,res) => {
    jwt.verify(req.token, "secret", async (err, authData) => {
        if (err) {
            return res.sendStatus(403);
        }
        const staff_id = authData.data;
        const stadiumId = req.params.stadiumId;
        await db.query("select * from tbbooking_payment where su_id=?", [staff_id], async (err, result) => {
            if (err) {
                return res.status(400).send("ເກີດຂໍ້ຜິດພາດ!!");
            }
            if (result.length > 0) {
              await db.query("select bp_id,payment_status from tbbooking_payment where su_id=? ORDER BY bp_id DESC LIMIT 0, 1", [staff_id], async (err,resu) => {
                  if((resu[0].payment_status === "ຍັງບໍ່ຈ່າຍ")){
                      res.status(200).send(resu);
                  }else{
                    await db.query("select Max(bp_id) as mid from tbbooking_payment where st_id=?", [stadiumId], async (err, resu) => {
                        const wid = resu[0].mid.substring(6);
                        const cd = resu[0].mid.substring(0,6);
                        const nb = parseInt(wid,10)+1;
                        const str_id = nb.toString();
                        var nid = "";
                        const txt = str_id.length;
                        for(let i = parseInt(txt); i < 8; i++){
                            nid=nid+"0";
                        }
                        const payment_id = cd+nid+nb;
                        await db.query("call open_bill(?,?,?)", [payment_id, stadiumId, staff_id], (err, resul) => { 
                            if(err){
                                res.status(400)
                                console.log(err);
                                res.send("Something Wrong")
                            }else{
                                db.query("select bp_id,payment_status from tbbooking_payment where su_id=? ORDER BY b_id DESC LIMIT 0, 1", [staff_id], (err,bid) => {
                                    if(err) return res.send(err).status(400)
                                    res.status(200).send(bid);
                                })
                            }
                        }) // ເພີ່ມຂໍ້ມູນການຊຳລະຫຼັກໂດຍຜູ້ໃຊ້ ||||||||||||||||||||||||||||||||||||||||||||||||||
                    })
                  }
              })
            } else {
                await db.query("select config_code from tbstadium where st_id=?", [stadiumId], async (err, result) => {
                    const wid = result[0].config_code
                    const payment_id = wid+"-bp-00000001";
                    await db.query("call open_bill(?,?,?)", [payment_id, stadiumId, staff_id], (err, result) => { 
                        if(err){
                            res.status(400)
                            console.log(err);
                            res.send("Something Wrong")
                        }else{
                            db.query("select bp_id,payment_status from tbbooking_payment where su_id=? ORDER BY b_id DESC LIMIT 0, 1", [staff_id], (err,bid) => {
                                if(err) return res.send(err).status(400)
                                res.status(200).send(bid);
                            })
                        }
                    }) // ເພີ່ມຂໍ້ມູນການຊຳລະຫຼັກໂດຍຜູ້ໃຊ້ ||||||||||||||||||||||||||||||||||||||||||||||||||
                })

            }
        })
    })
}) // ເປີດໃບບິນ ||||||||||||||||||||||||||||||||||||||||||||||||||


router.post('/paymentfield', async (req,res) => {
    
    const data = req.body.data;

    // for(let i=0; i<data.length; i++){
    //     db.query("call check_reserve(?,?,?)", [data[i].std_id,data[i].td_id,data[i].kickoff_date], async (err, result) => { // ກວດສອບວ່າມີການຈອງໃນເວລານັ້ນແລ້ວບໍ່
    //         if(err){
    //             res.status(400)
    //             console.log(err);
    //         }else{
    //             if(!result[0][0].rs === 0){
    //                 return res.status(400).send("Reserve Fail there are already reserve");
    //             }
    //         }
    //     })
    // }

    for(let i=0; i<data.length; i++){
        db.query("call payment_field(?,?,?,?)", [data[i].bp_id,data[i].std_id,data[i].td_id,data[i].price], (err2,result1) => {
            if(err2){
                return res.status(400).send(err2);
            }
        }) // ເພີ່ມຂໍ້ມູນເດີ່ນທີ່ຈອງໂດຍພະນັກງານ
    }
    
    res.status(200)
    res.send("Reserve Complete");

        
}) // ເພີ່ມລາຍລະອຽດຊຳລະຄ່າເດີ່ນ ||||||||||||||||||||||||||||||||||||||||||||||||||


router.post('/paymentwater', async (req,res) => {
    
    const data = req.body.data;

    // for(let i=0; i<data.length; i++){
    //     db.query("call check_reserve(?,?,?)", [data[i].std_id,data[i].td_id,data[i].kickoff_date], async (err, result) => { // ກວດສອບວ່າມີການຈອງໃນເວລານັ້ນແລ້ວບໍ່
    //         if(err){
    //             res.status(400)
    //             console.log(err);
    //         }else{
    //             if(!result[0][0].rs === 0){
    //                 return res.status(400).send("Reserve Fail there are already reserve");
    //             }
    //         }
    //     })
    // }

    for(let i=0; i<data.length; i++){
        const data = req.body.data;
        db.query("call payment_water(?,?,?,?)", [data[i].bp_id,data[i].stw_id,data[i].qty,data[i].price], (err2,result1) => {
            if(err2){
                return res.status(400).send(err2);
            }
        }) // ເພີ່ມຂໍ້ມູນເດີ່ນທີ່ຈອງໂດຍພະນັກງານ
    }
    
    res.status(200)
    res.send("Reserve Complete");

        
}) // ເພີ່ມລາຍລະອຽດຊຳລະຄ່ານ້ຳ ||||||||||||||||||||||||||||||||||||||||||||||||||


router.put('/updateBookingSubStatus', async (req, res) => {
    for(let i=0; i<data.length; i++){
        db.query("call update_bookingSubStatus(?,?,?,?)", [data[i].b_id,data[i].std_id,data[i].td_id,data[i].kickoff_date], (err2,result1) => {
            if(err2){
                return res.status(400).send(err2);
            }
        }) // ເພີ່ມຂໍ້ມູນເດີ່ນທີ່ຈອງໂດຍພະນັກງານ
    }
    res.status(200)
    res.send("Reserve Complete");
})//ການປັບ status ຂອງບິນຈອງທີ່ຍັງຈ່າຍບໍ່ໝົດ ຫຼືໝົດແລ້ວ

router.put('/updateBookingStatus', async function(req,res,next){
    const pid = req.body.b_id;
    
    await db.query("call update_bookingStatus(?)" ,[pid], (err, result) => {
        if(err){
            res.status(400)
            console.log(err);
        }else{
            res.status(200)
            res.send("Reserve Complete");
        }
    })
}) // ປັບ status ຂອງການຈອງທີ່ຈ່າຍຕາມການຈອງໝົດແລ້ວ ||||||||||||||||||||||||||||||||||||||||||||||||||

router.put('/closeBill/:stadiumId/:paymentId', async function(req,res,next){
    const stadiumId = req.params.stadiumId;
    const pid = req.params.paymentId;
    const wt = req.body.total_drinkingprice;
    const st = req.body.total_stadiumprice;
    
    await db.query("call close_bill(?,?,?,?)" ,[stadiumId,wt,st,pid], (err, result) => {
        if(err){
            res.status(400)
            console.log(err);
        }else{
            res.status(200)
            res.send("Payment Completed!");
        }
    })
}) // ສໍາເລັດການຊໍາລະເງີນ ||||||||||||||||||||||||||||||||||||||||||||||||||


module.exports = router;