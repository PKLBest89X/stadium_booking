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

router.get('/:c_id', async function(req,res,next){
    const customer_id = req.params.c_id;
    await db.query("call reserve_cus_static(?)", [customer_id], (err, result) => {
        if(err){
            res.status(400)
            console.log(err);
            res.send("Something Wrong")
        }else{
            res.status(200);
            res.send(result);
        }
    })
}) // ສະແດງລາຍການຈອງຂອງຜູ້ໃຊ້ ||||||||||||||||||||||||||||||||||||||||||||||||||


router.delete('/field/:b_id', async (req,res) => {
    const book_id = req.params.b_id;

    await db.query("call cancel_reserve(?)", [book_id], async (err, result) => { //ກວດສອບລາຍການຈອງດັ່ງກ່າວ ວ່າສາມາດຍົກເລີກໄດ້ບໍ່ 
                                                                            //if = 0 man yok lerk br dai // if = 1 man yok lerk dai
        if(err){
            res.status(400)
            console.log(err);
            res.send("Something Wrong")
        }else{
            if(result[0][0].c===1){
                
                await db.query("call reserve_cancel(?)", [book_id], (err1, result) => {   //ຍົກເລີກໃນຂໍ້ມູນການຈອງຂອງເດີ່ນໃນສະໜາມ
                    if(err1){
                        res.status(400)
                        console.log(err1);
                        res.send("Something Wrong")
                    }else{
                        res.sendStatus(200)
                    }
                })
                
            }else{
                res.status(400);
                res.send("ບໍ່ສາມາດຍົກເລີກໄດ້");
            }
        }
    })

    
}) // ຍົກເລີກການຈອງ ||||||||||||||||||||||||||||||||||||||||||||||||||


router.delete('/field_forUser/:b_id', async (req,res) => {
    const book_id = req.params.b_id;

    await db.query("call cancel_reserve_user(?)", [book_id], async (err, result) => { //ກວດສອບລາຍການຈອງດັ່ງກ່າວ ວ່າສາມາດຍົກເລີກໄດ້ບໍ່ 
                                                                            //if = 0 man yok lerk br dai // if = 1 man yok lerk dai
        if(err){
            res.status(400)
            console.log(err);
            res.send("Something Wrong")
        }else{
            if(result[0][0].c===1){
                
                await db.query("call reserve_cancel_user(?)", [book_id], (err1, result) => {   //ຍົກເລີກໃນຂໍ້ມູນການຈອງຂອງເດີ່ນໃນສະໜາມ
                    if(err1){
                        res.status(400)
                        console.log(err1);
                        res.send("Something Wrong")
                    }else{
                        res.sendStatus(200)
                    }
                })
                
            }else{
                res.status(400);
                res.send("ບໍ່ສາມາດຍົກເລີກໄດ້");
            }
        }
    })

    
}) // ຍົກເລີກການຈອງ ||||||||||||||||||||||||||||||||||||||||||||||||||


router.get('/reserve/cancel/:stadiumId', async (req,res) => {
    const stadiumId = req.params.stadiumId;
    await db.query("call reserve_show_cancel(?)", [stadiumId], (err, result) => {
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
}) // ສະແດງລາຍການທີ່ສາມາດຍົກເລີກການໄດ້ ||||||||||||||||||||||||||||||||||||||||||||||||||

router.get('/reserve/cancelForUser', verifyToken, async (req,res) => {
    jwt.verify(req.token, "secret", async (err, authData) => {
        if (err) {
          console.log(err);
          res.sendStatus(403);
        } else {
            const user_id = authData.data;
            await db.query("call reserve_show_cancel_user(?)", [user_id], (err, result) => {
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
        }
    })

}) // ສະແດງລາຍການທີ່ສາມາດຍົກເລີກການໄດ້ສຳລັບຜູ້ໃຊ້ມີບັນຊີ ||||||||||||||||||||||||||||||||||||||||||||||||||


router.get('/reserve/nocancel', async (req,res) => {
    await db.query("call reserve_show_no_cancel()", (err, result) => {
        if(err){
            res.status(400)
        }else{
            res.status(200);
            res.send(result);
        }
    })
}) // ສະແດງລາຍການທີ່ສາມາດບໍ່ຍົກເລີກການໄດ້ ||||||||||||||||||||||||||||||||||||||||||||||||||


module.exports = router;