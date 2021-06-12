var express = require("express");
var router = express.Router();

const mysql = require("mysql");
const dbconfig = require("../dbConnect/dbconnect");

const bcrypt = require("bcrypt");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

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

router.get('/reserve', async function(req,res,next){
    const stadium_id = req.body.st_id;
    await db.query("call reserve_staff_all(?)", [stadium_id], (err, result) => {
        if(err){
            res.status(400)
            console.log(err);
        }else{
            res.status(200)
            res.send(result);
        }
    })
}) // ສະແດງຕາຕະລາງຈອງເດີ່ນທັງໝົດຂອງເດີ່ນນັ້ນໆ ||||||||||||||||||||||||||||||||||||||||||||||||||


router.get('/show', async function(req,res,next){
    await db.query("call stadium()", (err, result) => {
        if(err){
            res.status(400)
            console.log(err);
        }else{
            res.status(200)
            res.send(result);
        }
    })
}) // ສະແດງຕາຕະລາງເດີ່ນທັງໝົດ ||||||||||||||||||||||||||||||||||||||||||||||||||

router.get('/show/phone', async function(req,res,next){
    const stadium_id = req.body.st_id;
    await db.query("call stadium_phone(?)", [stadium_id], (err, result) => {
        if(err){
            res.status(400)
            console.log(err);
        }else{
            res.status(200)
            res.send(result);
        }
    })
}) // ສະແດງຕາຕະລາງເບີໂທຂອງເດີ່ນ ||||||||||||||||||||||||||||||||||||||||||||||||||


router.get('/test' ,async function(req,res,next){
    var a = 2;
    var b;
    if(a==0){
        b="ok";
    }else{
        b="FAK";
    }
    res.send(b);
})


router.post('/stadium_add', async function(req,res,next){
    
    const stadium_name = req.body.stadium_name;
    const description = req.body.description;
    const configcode = req.body.config_code;
    const village = req.body.village;
    const district = req.body.district;
    const province = req.body.province;
    const time_cancel = req.body.time_cancelbooking;
    
    db.query("select MAX(st_id) as mid from tbstadium", (err,result) => {
        if(result[0] === null){
            const stadium_id = "st1";
            if(!req.files){
                res.status(500)
                res.send("Please choose the image");
            }else{
                if(!req.files.logo){
                    return res.status(500).send("Please choose the logo");
                }
                if(!req.files.sampleFile){
                    return res.status(500).send("Please choose the image");
                }
                
    
                let logo = req.files.logo;
                let uploadlogo = `${__dirname}../../Clients/assets/images/adminPics/stadiumPics/icons/${logo.name}`;
        
                let sampleFile = req.files.sampleFile;
                let uploadPath = `${__dirname}../../Clients/assets/images/adminPics/stadiumPics/themeBackground/${sampleFile.name}`;
        
                logo.mv(uploadlogo,function(err){
                    if(err) return res.status(500).send(err);
                    console.log(err)
                    const lg = logo.name;
        
                    sampleFile.mv(uploadPath, function(err){
                        if(err) return res.status(500).send(err);
                        console.log(err)
                        const img = sampleFile.name;
                        db.query("call stadium_add(?,?,?,?,?,?,?,?,?,?)", [stadium_id,stadium_name,description,configcode,village,district,province,time_cancel,lg,img], (err,result) => {
                            if(err){
                                res.status(400)
                                console.log(err);
                            }else{
                                // jwt.verify(req.token, "secret", async (err, authData) => {
                                //     if (err) {
                                //       res.sendStatus(403);
                                //     } else {
                                //       const admin_id = authData.data;
                                //       await db.query("call staff_auth(?)", [admin_id], (er, result) => {
                                //         if (er) {
                                //           console.log(er);
                                //         } else {
                                //           const staff_id = result[0][0].su_id;
                                //            db.query("call staff_update_stadium_id(?)", [staff_id], (err, result) => {
                                //             if (err) {
                                //                 console.log(err);
                                //             } else {
                                //                 res.send('ເພີ່ມຂໍ້ມູນສຳເລັດ!!')
                                //             }
                                //           })
                                //         }
                                //       });
                                //     }
                                //   });
                                res.status(200);
                            }
                        })
                    })
                })
            }

        }else{
            const stadium_id = "st" + (parseInt(result[0].mid.substring(2),10)+1);
            if(!req.files){
                res.status(500)
                res.send("Please choose the image");
            }else{
                if(!req.files.logo){
                    return res.status(500).send("Please choose the logo");
                }
                if(!req.files.sampleFile){
                    return res.status(500).send("Please choose the image");
                }
                
                let logo = req.files.logo;
                let uploadlogo = `${__dirname}/../../Clients/public/assets/images/adminPics/stadiumPics/icons/${logo.name}`;
    
                let sampleFile = req.files.sampleFile;
                let uploadPath = `${__dirname}/../../Clients/public/assets/images/adminPics/stadiumPics/themeBackground/${sampleFile.name}`;
                console.log({__dirname})
                logo.mv(uploadlogo,function(err){
                    if (err) {
                        console.log(err)
                        return res.status(500).send(err);
                    }
                    const lg = logo.name;
        
                    sampleFile.mv(uploadPath, function(err){
                        if(err) return res.status(500).send(err);
                        console.log(err)
                        const img = sampleFile.name;
                        db.query("call stadium_add(?,?,?,?,?,?,?,?,?,?)", [stadium_id,stadium_name,description,configcode,village,district,province,time_cancel,lg,img], (err,result) => {
                            if(err){
                                res.status(400)
                                console.log(err);
                            }else{
                                // jwt.verify(req.token, "secret", async (err, authData) => {
                                //     if (err) {
                                //       res.sendStatus(403);
                                //     } else {
                                //       const admin_id = authData.data;
                                //       await db.query("call staff_auth(?)", [admin_id], (er, result) => {
                                //         if (er) {
                                //           console.log(er);
                                //         } else {
                                //             const staff_id = result[0][0].su_id;
                                //             db.query("call staff_update_stadium_id(?)", [staff_id], (err, result) => {
                                //              if (err) {
                                //                  console.log(err);
                                //              } else {
                                //                  res.send('ເພີ່ມຂໍ້ມູນສຳເລັດ!!')
                                //              }
                                //            })
                                //         }
                                //       });
                                //     }
                                //   });
                                res.status(200);
                            }
                        })
                    })
                })
            }
        }
    })

}) // ເພີ່ມເດີ່ນເຂົ້າໃນລະບົບ ||||||||||||||||||||||||||||||||||||||||||||||||||



router.post('/add/phone', async function(req,res,next){
    const stadium_id = req.body.st_id;
    const stadium_ph = req.body.st_phone;
    await db.query("call stadium_phone_add(?,?)", [stadium_id,stadium_ph], (err,result) => {
        if(err){
            res.status(400)
            console.log(err);
        }else{
            res.status(200)
            res.send(result);
        }
    })
}) // ເພີ່ມເບີໂທໃຫ້ເດີ່ນ ||||||||||||||||||||||||||||||||||||||||||||||||||

router.delete('/delete/phone', async function(req,res,next){
    const stadium_id = req.body.st_id;
    const stadium_ph = req.body.st_phone;
    await db.query("call stadium_phone_delete(?,?)", [stadium_id,stadium_ph], (err,result) => {
        if(err){
            res.status(400)
            console.log(err);
        }else{
            res.status(200)
            res.send(result);
        }
    })
}) // ລົບເບີໂທເດີ່ນ ||||||||||||||||||||||||||||||||||||||||||||||||||


router.put('/edit', async function(req,res,next){
    const stadium_id = req.body.st_id;
    const stadium_name = req.body.st_name;
    const description = req.body.description;
    const village = req.body.village;
    const district = req.body.district;
    const province = req.body.province;
    const time_cancel = req.body.time_cancelbooking;
    const logo_old = req.body.logo_pic;
    const img_old = req.body.picture;
    const stadium_status = req.body.status;

    if(!req.files){
        db.query("call stadium_update(?,?,?,?,?,?,?,?,?,?)", [stadium_name,description,village,district,province,time_cancel,logo_old,img_old,stadium_status,stadium_id], (err,result) => {
            if(err){
                res.status(400)
                console.log(err);
            }else{
                res.status(200)
                res.send(result);
            }
        })
    }else{

        if(!req.files.logo){
            let sampleFile = req.files.sampleFile;
            let uploadPath = "./upload/stadium/"+sampleFile.name;
            sampleFile.mv(uploadPath, function(err){
                if(err) return res.status(500).send(err);
                
                const im = sampleFile.name;
                db.query("call stadium_update(?,?,?,?,?,?,?,?,?,?)", [stadium_name,description,village,district,province,time_cancel,logo_old,im,stadium_status,stadium_id], (err,result) => {
                    if(err){
                        res.status(400)
                        console.log(err);
                    }else{
                        res.status(200)
                        res.send(result);
                    }
                })
            })

        }else if(!req.files.sampleFile) {
            let logo = req.files.logo;
            let uploadlogo = "./upload/stadium/" + logo.name;

            logo.mv(uploadlogo,function(err){
                if(err) return res.status(500).send(err);

                const lg = logo.name;
                
                db.query("call stadium_update(?,?,?,?,?,?,?,?,?,?)", [stadium_name,description,village,district,province,time_cancel,lg,img_old,stadium_status,stadium_id], (err,result) => {
                    if(err){
                        res.status(400)
                        console.log(err);
                    }else{
                        res.status(200)
                        res.send(result);
                    }
                })
            })

        } else {
            let logo = req.files.logo;
            let uploadlogo = "./upload/stadium/" + logo.name;
            
            let sampleFile = req.files.sampleFile;
            let uploadPath = "./upload/stadium/"+sampleFile.name;

            logo.mv(uploadlogo,function(err){
                if(err) return res.status(500).send(err);

                const lg = logo.name;

                sampleFile.mv(uploadPath, function(err){
                    if(err) return res.status(500).send(err);
                    
                    const im = sampleFile.name;
                    db.query("call stadium_update(?,?,?,?,?,?,?,?,?,?)", [stadium_name,description,village,district,province,time_cancel,lg,im,stadium_status,stadium_id], (err,result) => {
                        if(err){
                            res.status(400)
                            console.log(err);
                        }else{
                            res.status(200)
                            res.send(result);
                        }
                    })
                })
            })
        }

    }
    
}) // ແກ້ໄຂຂໍ້ມູນເດີ່ນ ||||||||||||||||||||||||||||||||||||||||||||||||||


router.delete('/:st_id', async function(req,res,next){
    const stadium_id = req.params.st_id;
    await db.query("call stadium_delete(?)", [stadium_id], (err,result) => {
        if(err){
            res.status(400)
            console.log(err);
        }else{
            res.status(200)
            res.send(result);
        }
    })
}) // ລົບເດີ່ນ ||||||||||||||||||||||||||||||||||||||||||||||||||


module.exports = router;