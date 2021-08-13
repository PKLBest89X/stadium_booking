var express = require("express");
var router = express.Router();

const mysql = require("mysql");
const dbconfig = require("../dbConnect/dbconnect");

const bcrypt = require("bcrypt");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const aut = require("../middleware/admin-JWT")


router.use(express.json());
router.use(cors());
router.use(cookieParser());

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
} // function ແປງ token ເປັນຂໍ້ມູນ



router.get("/",aut, async function (req, res, next) {
  await db.query("call admin()", (err, result) => {
    if (err) {
      res.status(400)
      console.log(err);
    } else {
      res.status(200);
      res.send(result[0]);
    }
  });
}); //ສະແດງເຈົ້າຂອງລະບົບ ||||||||||||||||||||||||||||||||||||||||||||||||||




router.post("/", aut, async (req, res) => {


  const email = req.body.a_email;
  const password = req.body.a_password;
  const name = req.body.a_name;
  const img = 'default.jpg';


  await db.query("call check_ad_email(?)", [email], (err,result) => {
    if(result[0].length > 0){
      res.status(400)
      res.send("Email Already used!");
        
    }else{
      if(!req.files){
        bcrypt.hash(password, 10).then((hash) => {
          db.query("call admin_add(?,?,?,?)",[email, hash, name, img],(err, result) => {
              if (err) {
                res.status(400).json({ error: err });
              } else {
                res.status(200)
                res.send("REGIS COMPLETE");
              }
            }
          );
        });
      }else{
        let sampleFile = req.files.sampleFile;
        let uploadPath = "./upload/admin/" + sampleFile.name;

        sampleFile.mv(uploadPath, function(err){
          if(err) return res.status(500).send(err);

            const im = sampleFile.name;

            bcrypt.hash(password, 10).then((hash) => {
              db.query("call admin_add(?,?,?,?)",[email, hash, name, im],(err, result) => {
                  if (err) {
                    res.status(400).json({ error: err });
                  } else {
                    res.status(200)
                    res.send("REGIS COMPLETE");
                  }
                }
              );
            });
        })
      }
      
    }
  });

}); //ເພີ່ມເຈົ້າຂອງລະບົບ ||||||||||||||||||||||||||||||||||||||||||||||||||

router.put("/updateProfile", verifyToken, async (req, res) => {

  jwt.verify(req.token, "secret", async (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      const user_id = authData.data;
      const name = req.body.a_name;
      const surname = req.body.a_surname;
      const profile = req.body.a_img;
      if(!req.files)
      await db.query("call admin_update(?,?,?,?)",[name, surname, profile, user_id],async (err, result) => {
          if (err) {
            res.status(400)
            console.log(err);
          } else {
            await db.query("call admin_user_login(?)", [user_id], (er, result) => {
              if(er){
                  console.log(er);
              }else{
                  res.send(result[0][0]);
              }
          })
          }
        }
      );
      else{
        let sampleFile = req.files.sampleFile;
        let uploadPath = `${__dirname}/../../Admin/public/assets/images/admin_img/${sampleFile.name}`;
    
        sampleFile.mv(uploadPath, function(err){
          if(err) return res.status(500).send(err);
    
          const im = sampleFile.name;
    
          db.query("call admin_update(?,?,?,?)",[name, surname, im, user_id],async (err, result) => {
            if (err) {
              res.status(400)
              console.log(err);
            } else {
              await db.query("call admin_user_login(?)", [user_id], (er, result) => {
                if(er){
                    console.log(er);
                }else{
                    res.send(result[0][0]);
                }
            })
            }
          }
        );
        })
      }
    }
  });

}); //ແກ້ໄຂເຈົ້າຂອງລະບົບ ||||||||||||||||||||||||||||||||||||||||||||||||||


router.put('/updatePassword', verifyToken, async (req, res) => {

  jwt.verify(req.token, "secret", async (err, authData) => {
    if (err) {
      console.log(err);
      res.sendStatus(403);
    } else {
      const user_id = authData.data;
      const password = req.body.old_password;
      const newPassword = req.body.new_password;
          await db.query("call check_superAdmin_password(?)", [user_id], (err,result) => {
              if(result[0].length > 0){
                  const database_pw = result[0][0].a_password;
                  bcrypt.compare(password,database_pw).then((match) => {
                      if(!match){
                          res
                              .status(400)
                              .send("ທ່ານປ້ອນລະຫັດເກົ່າບໍ່ຖືກຕ້ອງ!");
                      }else{
                        bcrypt.hash(newPassword, 10).then((hash) => {
                          db.query(
                            "call update_superAdmin_password(?,?)",
                            [hash, user_id],
                            (err, result) => {
                              if (err) {
                                res.status(400).send("error!!");
                              } else {
                                res.status(200);
                                res.send("User Complete");
                              }
                            }
                          );
                        });
                      }
                  })
              }else{
                  res.status(400)
                  res.send("Wrong Username and Password Combination!");
              }
          });
    }
  });

}) // update ລະຫັດຜ່ານ ||||||||||||||||||||||||||||||||||||||||||||||||||


router.delete("/",aut, async function (req, res, next) {
  const admin_id = req.body.a_id;
  await db.query("call admin_delete(?)", [admin_id], (err, result) => {
    if (err) {
      res.status(400)
      console.log(err);
    } else {
      res.status(200)
      res.send(result);
    }
  });
}); //ລົບເຈົ້າຂອງລະບົບ ||||||||||||||||||||||||||||||||||||||||||||||||||



module.exports = router;
