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


//ຈອງກໍລະນີຜູ້ໃຊ້ທີ່ມີບັນຊີ

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


// router.post('/', async (req,res) => {
//     db.query("select b_id,booking_status,paid_status from tbbooking where c_id=5 ORDER BY b_id DESC LIMIT 0, 1", (err,resu) => {
//         if(resu[0] == null){
//             res.send("f");
//         }
//         else if(resu[0].booking_status == "ຍັງບໍ່ຈອງ" && resu[0].paid_status == "ຍັງບໍ່ຈ່າຍ"){
//             res.send(resu[0].b_id);
//         }else{

//         }
//     })
// }) //Test sue2


// router.post('/tt', async (req,res) => {
//     // const data = [["a","b","c"],[1,2,3]]

//     // res.send(data[0][0]+" "+data[0][1]+" "+data[0][2])

//     const data = req.body.data;

//     for(let i=0; i < data.length; i++){
//             console.log(data[i].fid + data[i].name + data[i].price)
//     }
//     res.send(data[0].fid);
// }) //Test sue2


router.get('/getStadiumDetailsToBooking/:st_id', async function(req,res,next){
    const stadium_id = req.params.st_id;
    await db.query("call field(?)", [stadium_id] , (err,result) => {
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
}) // ສະແດງສະໜາມທັງໝົດທີ່ມີໃນເດີ່ນນັ້ນ ||||||||||||||||||||||||||||||||||||||||||||||||||


router.get('/getPriceToBooking/:stadiumId', async function(req, res, next) {
    const stadium_id = req.params.stadiumId;
    await db.query("call stadium_price(?)", [stadium_id],(err, result) => {
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
}) // ສະແດງລາຍການລາຄາຂອງເດີ່ນນັ້ນ ||||||||||||||||||||||||||||||||||||||||||||||||||

router.get('/getBookingDetailsUnCheckout/:stadiumId', async function(req, res, next) {
    const stadium_id = req.params.stadiumId;
    await db.query("call reserve_getUncheckout(?)", [stadium_id],(err, result) => {
        if (err) {
            console.log(err);
            return res.status(400).send('ເກີດຂໍ້ຜິດພາດ!!');
        }

        if (result.length > 0) {
            return res.send(result[0])
        } else {
            return res.status(302).send('ບໍ່ມີຂໍ້ມູນ!!')
        }
    })
}) // ສະແດງລາຍການຈອງລູກຄ້າທີ່ມີບັນຊີ ||||||||||||||||||||||||||||||||||||||||||||||||||

router.post('/booking', verifyToken, async (req,res) => {
    jwt.verify(req.token, "secret", async (err, authData) => {
        if (err) {
            return res.sendStatus(403);
          }
          const customer_id = authData.data;
          await db.query("select * from tbbooking where c_id=?", [customer_id], (err, result) => {
              if (err) {
                  return res.status(400).send("ເກີດຂໍ້ຜິດພາດ!!");
              }
              if (result.length > 0) {
                db.query("select b_id,booking_status,paid_status from tbbooking where c_id=? ORDER BY b_id DESC LIMIT 0, 1", [customer_id], (err,resu) => {
                    if((resu[0].booking_status === "ຍັງບໍ່ຈອງ" && resu[0].paid_status === "ຍັງບໍ່ຈ່າຍ") || (resu[0].booking_status === "ຈອງແລ້ວ" && resu[0].paid_status === "ຍັງບໍ່ຈ່າຍ")){
                        res.status(200).send(resu);
                    }else{
                        
                        db.query("call reserve_cus(?)", [customer_id], (err, resul) => { 
                            if(err){
                                res.status(400)
                                console.log(err);
                                res.send("Something Wrong")
                            }else{
                                db.query("select b_id,booking_status,paid_status from tbbooking where c_id=? ORDER BY b_id DESC LIMIT 0, 1", [customer_id], (err,bid) => {
                                    if(err) return res.send(err).status(400)
                                    res.status(200).send(bid);
                                })
                            }
                        }) // ເພີ່ມຂໍ້ມູນການຈອງຫຼັກໂດຍຜູ້ໃຊ້ ||||||||||||||||||||||||||||||||||||||||||||||||||
                    }
                })
              } else {
                db.query("call reserve_cus(?)", [customer_id], (err, resul) => { 
                    if(err){
                        res.status(400)
                        console.log(err);
                        res.send("Something Wrong")
                    }else{
                        db.query("select b_id,booking_status,paid_status from tbbooking where c_id=? ORDER BY b_id DESC LIMIT 0, 1", [customer_id], (err,bid) => {
                            if(err) return res.send(err).status(400)
                            res.status(200).send(bid);
                        })
                    }
                }) // ເພີ່ມຂໍ້ມູນການຈອງຫຼັກໂດຍຜູ້ໃຊ້ ||||||||||||||||||||||||||||||||||||||||||||||||||
              }
          })
    })
}) // ເພີ່ມລາຍການຈອງ ||||||||||||||||||||||||||||||||||||||||||||||||||


router.post('/bookingfields', async (req,res) => {
    const data = req.body.data;

    for(let i=0; i < data.length; i++){

        db.query("call check_reserve(?,?,?)", [data[i].std_id,data[i].td_id,data[i].kickoff_date], async (err, result) => { // ກວດສອບວ່າມີການຈອງໃນເວລານັ້ນແລ້ວບໍ່
            if(err){
                res.status(400)
                console.log(err);
            }else{
                if(!result[0][0].rs === 0){
                    return res.status(400).send("Reserve Fail there are already reserve");
                }
            }
            
        })
    }

    for(let i=0; i < data.length; i++){

        db.query("call reserve_cus_field(?,?,?,?)", [data[i].b_id, data[i].std_id, data[i].td_id, data[i].kickoff_date], (err1,result1) => { 
            if(err1){
                return res.status(400).send(err1);
            }
        })
        
    }

     // ເພີ່ມຂໍ້ມູນເດີ່ນທີ່ຈອງ ||||||||||||||||||||||||||||||||||||||||||||||||||
    res.status(200)
    res.send("Reserve Complete");
            
        
}) // ເຮັດການຈອງໃຫ້ລູກຄ້າທີ່ມີບັນຊີ ||||||||||||||||||||||||||||||||||||||||||||||||||


router.put('/acceptBooking/:stadiumId/:bookingId', async (req,res) => {
    const book_id = req.params.bookingId;
    const stadium_id = req.params.stadiumId;

    db.query("select time_cancelbooking from tbstadium where st_id=?", [stadium_id], (err,resu) => {
        const timecancel = resu[0].time_cancelbooking;
        if(timecancel === 0){
            db.query("call reserve_confirm_cus_notime(?,?)", [stadium_id,book_id], (er,result) => {
                if(er){
                    res.status(400)
                    console.log(er);
                }else{
                    res.status(200)
                    res.send(result);
                }
            })
        }else{
            db.query("call reserve_confirm_cus(?,?,?)", [stadium_id,timecancel,book_id], (er,result) => {
                if(er){
                    res.status(400)
                    console.log(er);
                }else{
                    res.status(200)
                    res.send(result);
                }
            })
        }
        
    })
}) // ຢືນຢັນການຈອງ ||||||||||||||||||||||||||||||||||||||||||||||||||


module.exports = router;