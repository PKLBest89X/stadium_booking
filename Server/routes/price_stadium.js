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

router.get('/getStadiumPrice/:stadiumId', async function(req, res, next) {
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

router.get('/getStadiumDetailsToAddPrice/:st_id', async function(req,res,next){
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



router.post('/addStadiumPrice', async function(req ,res, next) {
    const stadium_id = req.body.stadium_id;
    const data = req.body.data;

    for(let i=0; i < data.length; i++){
        await db.query("call stadium_price_add(?,?,?)", [data[i].stadiums_id,data[i].time_id,data[i].stadiums_price], (err, result) => {
            if(err){
                return res.status(400).send(err);
            }
        })
    }

    db.query("call stadium_price(?)", [stadium_id], (err, result) => {
        if (err) {
          return res.status(400);
        } 
        return res.send(result[0]);
      });
    
}) // ໃສ່ລາຄາເດີ່ນຕາມເວລາ ||||||||||||||||||||||||||||||||||||||||||||||||||

router.put('/', async function(req, res, next) {
    const field_id = req.body.std_id;
    const timing_id = req.body.td_id;
    const field_price = req.body.sp_price;

    await db.query("call stadium_price_edit(?,?,?)", [field_price,field_id,timing_id], (err, result) => {
        if(err){
            res.status(400)
            console.log(err);
        }else{
            res.status(200)
            res.send(result);
        }
    })
}) // ແກ້ໄຂລາຄາເດີ່ນ ||||||||||||||||||||||||||||||||||||||||||||||||||


router.delete('/deleteStadiumPrice', async (req, res) => {
    const field_id = req.body.std_id;
    const timing_id = req.body.timing_id;

    await db.query("call stadium_price_del(?,?)", [field_id,timing_id], (err, result) => {
        if(err){
            res.status(400)
            console.log(err);
            res.send("Something Wrong")
        }else{
            return res.status(200).send("Price DELETE");;

        }
    })
}) // ແກ້ໄຂລາຄາເດີ່ນ ||||||||||||||||||||||||||||||||||||||||||||||||||

module.exports = router;