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

router.get('/authSuperAdmin',verifyToken, (req, res) => {
    jwt.verify(req.token, "secret",async (err, authData) => {
        if(err){
            res.sendStatus(403);
        }else{
            const user_id = authData.data;
            await db.query("call admin_user_login(?)", [user_id], (er, result) => {
                if(er){
                    console.log(er);
                }else{
                    res.send(result[0][0]);
                }
            })
        }
    })
}) //ແປງ token ເອົາໄອດີ admin ໄປ select ເອົາຂໍ້ມູນໄປສະແດງຢູ່ front end ||||||||||||||||||||||||||||||||||||||||||||||||||

router.post('/superAdminLogin', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
        await db.query("call check_ad_email(?)", [email], (err,result) => {
            if(result[0].length > 0){
                const database_pw = result[0][0].a_password;
                bcrypt.compare(password,database_pw).then((match) => {
                    if(!match){
                        res
                            .status(400)
                            .send("Wrong Username and Password Combination!");
                    }else{

                        jwt.sign({data:result[0][0].a_id}, "secret", (er, token) => {
                            //res.cookie("access-token", token, { httpOnly: true });
                            if (er) return res.status(404).json({ er });
                            res.status(200)
                            res.json({token});
                            // res.cookie("access-token", token, {
                            //     maxAge: 60 * 60 * 24 * 30 * 1000,
                            //     httpOnly: true,
                            // });
                        })

                    }
                })
                
                // res.send(dpw);
                
            }else{
                res.status(400)
                res.send("Wrong Username and Password Combination!");
            }
        });
    

    
}) // ລ໊ອກອິນເຂົ້າລະບົບຂອງ admin ||||||||||||||||||||||||||||||||||||||||||||||||||

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization']
    if(typeof bearerHeader !== 'undefined'){
        const bearerToken = bearerHeader.split(' ')[1];
        req.token = bearerToken;
        next();
    }else{
        res.sendStatus(403); //forbidden
    }
} // function ແປງ token ເປັນຂໍ້ມູນ ||||||||||||||||||||||||||||||||||||||||||||||||||



module.exports = router;