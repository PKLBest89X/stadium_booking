const fs = require('fs')
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


  router.get('/detail/:st_id', (req,res) => {
    const stadium_id = req.params.st_id;
    db.query("call stadium_detail(?)", [stadium_id], (err, result) => {
        if(err){
            res.status(400)
            console.log(err)
        }else{          
            res.status(200).send(result[0])
        }
    })
}) // ສະແດງລາຍລະອຽດຂອງເດີ່ນນັ້ນໆ ||||||||||||||||||||||||||||||||||||||||||||||||||


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

router.get('/show/byStadiumId/:stadiumId', async function(req, res){
    const stadium_id = req.params.stadiumId
    await db.query("call stadium_byStadiumId(?)", [stadium_id], (err, result) => {
        if(err){
            res.status(400)
            console.log(err);
        }else{
            res.status(200)
            res.send(result[0]);
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


router.post('/stadium_add', verifyToken, async function(req,res,next){
    
    const stadium_name = req.body.stadium_name;
    const description = req.body.description;
    const configcode = req.body.config_code;
    const village = req.body.village;
    const district = req.body.district;
    const province = req.body.province;
    const time_cancel = req.body.time_cancelbooking;
    const phone = req.body.phone
    
    db.query("select MAX(st_id) as mid from tbstadium", (err,result) => {
        if(result[0] === null){
            const stadium_id = "st00000001";
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
                let uploadlogoToAdminFolder = `${__dirname}/../../Admin/public/assets/images/adminPics/stadiumPics/icons/${logo.name}`;
        
                let sampleFile = req.files.sampleFile;
                let uploadPath = `${__dirname}/../../Clients/public/assets/images/adminPics/stadiumPics/themeBackground/${sampleFile.name}`;
                let uploadPathToAdminFolder = `${__dirname}/../../Admin/public/assets/images/adminPics/stadiumPics/themeBackground/${sampleFile.name}`;

                logo.mv(uploadlogoToAdminFolder, (err) => {if (err) return res.status(500).send(err);});
                sampleFile.mv(uploadPathToAdminFolder, (err) => {if (err) return res.status(500).send(err)});
        
                logo.mv(uploadlogo,function(err){
                    if(err) return res.status(500).send(err);
                    console.log(err)
                    const lg = logo.name;
        
                    sampleFile.mv(uploadPath, function(err){
                        if(err) return res.status(500).send(err);
                        console.log(err)
                        const img = sampleFile.name;
                        db.query("call check_config_code(?)", [configcode], (err, result) => {
                            if (result[0].length > 0) return res.status(400).send("ລະຫັດນີ້ຖືກໃຊ້ແລ້ວ!!")})
                        db.query("call stadium_add(?,?,?,?,?,?,?,?,?,?,?)", [stadium_id,stadium_name,description,configcode,village,district,province,time_cancel,lg,img, phone], (err,result) => {
                            if(err){
                                res.status(400)
                                console.log(err);
                            }else{
                                jwt.verify(req.token, "secret", async (err, authData) => {
                                    if (err) {
                                      res.sendStatus(403);
                                    } else {
                                      const admin_id = authData.data;
                                      await db.query("call staff_auth(?)", [admin_id], (er, result) => {
                                        if (er) {
                                          console.log(er);
                                        } else {
                                          const stadium_id = result[0][0].st_id;
                                           db.query("call staff_update_stadium_id(?, ?)", [stadium_id, admin_id], (err, result) => {
                                            if (err) {
                                                console.log(err);
                                            } else {
                                                res.status(200).send('Insert completed!!');
                                            }
                                          })
                                        }
                                      });
                                    }
                                  });
                            }
                        })
                    })
                })
            }

        }else{
            const number_id = parseInt(result[0].mid.substring(2),10)+1;
            const str_id = number_id.toString();
            var nid = "";
            const txt = str_id.length;
            for(let i = parseInt(txt); i < 8; i++){
                nid=nid+"0";
            }
            const stadium_id = "st" + nid+""+str_id;
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
                let uploadlogoToAdminFolder = `${__dirname}/../../Admin/public/assets/images/adminPics/stadiumPics/icons/${logo.name}`;
    
                let sampleFile = req.files.sampleFile;
                let uploadPath = `${__dirname}/../../Clients/public/assets/images/adminPics/stadiumPics/themeBackground/${sampleFile.name}`;
                let uploadPathToAdminFolder = `${__dirname}/../../Admin/public/assets/images/adminPics/stadiumPics/themeBackground/${sampleFile.name}`;

                logo.mv(uploadlogoToAdminFolder, (err) => {if (err) return res.status(500).send(err);});
                sampleFile.mv(uploadPathToAdminFolder, (err) => {if (err) return res.status(500).send(err)});

                logo.mv(uploadlogo,function(err){
                    if (err) {
                        console.log(err)
                        return res.status(500).send(err);
                    }
                    const lg = logo.name;
        
                    sampleFile.mv(uploadPath, function(err){
                        if(err) return res.status(500).send(err);
                        const img = sampleFile.name;
                        db.query("call check_config_code(?)", [configcode], (err, result) => {
                            if (result[0].length > 0) return res.status(400).send("ລະຫັດນີ້ຖືກໃຊ້ແລ້ວ!!")})
                        db.query("call stadium_add(?,?,?,?,?,?,?,?,?,?,?)", [stadium_id,stadium_name,description,configcode,village,district,province,time_cancel,lg,img,phone], (err,result) => {
                            if(err){
                                res.status(400)
                                console.log(err);
                            }else{
                                jwt.verify(req.token, "secret", async (err, authData) => {
                                    if (err) {
                                      res.sendStatus(403);
                                    } else {
                                      const admin_id = authData.data;
                                      await db.query("select st_id as useId from tbstadium order by st_id desc limit 0,1", (er, result) => {
                                        if (er) {
                                          console.log(er);
                                        } else {
                                          const stadium_id = result[0].useId;
                                          console.log(stadium_id);
                                           db.query("call staff_update_stadium_id(?, ?)", [stadium_id, admin_id], (err, result) => {
                                            if (err) {
                                                console.log(err);
                                            } else {
                                                res.status(200).send('Insert completed!!');
                                            }
                                          })
                                        }
                                      });
                                    }
                                  });
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
    const phone = req.body.phone

    if(!req.files){
        db.query("call stadium_update(?,?,?,?,?,?,?,?,?,?,?)", [stadium_name,description,village,district,province,time_cancel,logo_old,img_old,stadium_status,phone,stadium_id], (err,result) => {
            if(err){
                res.status(400)
                console.log(err);
            }else{
                res.status(200)
                res.send('ແກ້ໄຂສຳເລັດ!!');
            }
        })
    }else{

        if(!req.files.logo){
            let sampleFile = req.files.sampleFile;
            let uploadPath = `${__dirname}/../../Clients/public/assets/images/adminPics/stadiumPics/themeBackground/${sampleFile.name}`;
            let uploadPathToAdminFolder = `${__dirname}/../../Admin/public/assets/images/adminPics/stadiumPics/themeBackground/${sampleFile.name}`;
            sampleFile.mv(uploadPathToAdminFolder, (err) => {if (err) return res.status(500).send(err)});
            sampleFile.mv(uploadPath, function(err){
                if(err) return res.status(500).send(err);
                
                const im = sampleFile.name;
                db.query("call stadium_update(?,?,?,?,?,?,?,?,?,?,?)", [stadium_name,description,village,district,province,time_cancel,logo_old,im,stadium_status,phone,stadium_id], (err,result) => {
                    if(err){
                        res.status(400)
                        console.log(err);
                    }else{
                        let removePath = `${__dirname}/../../Clients/public/assets/images/adminPics/stadiumPics/themeBackground/${img_old}`;
                        let removePathFromAdminFolder = `${__dirname}/../../Admin/public/assets/images/adminPics/stadiumPics/themeBackground/${img_old}`;
                        fs.unlink(removePath, (err) => { if (err) return res.status(500).send('ລຶບຜິດພາດ!!') })
                        fs.unlink(removePathFromAdminFolder, (err) => { if (err) return res.status(500).send('ລຶບຜິດພາດ!!') })
                        res.status(200)
                        res.send('ແກ້ໄຂສຳເລັດ!!');
                    }
                })
            })

        }else if(!req.files.sampleFile) {
            let logo = req.files.logo;
            let uploadlogo = `${__dirname}/../../Clients/public/assets/images/adminPics/stadiumPics/icons/${logo.name}`;
            let uploadlogoToAdminFolder = `${__dirname}/../../Admin/public/assets/images/adminPics/stadiumPics/icons/${logo.name}`;

            logo.mv(uploadlogoToAdminFolder, (err) => {if (err) return res.status(500).send('ເກີດຂໍ້ຜິດພາດ!!!')})

            logo.mv(uploadlogo,function(err){
                if(err) return res.status(500).send(err);

                const lg = logo.name;
                
                db.query("call stadium_update(?,?,?,?,?,?,?,?,?,?,?)", [stadium_name,description,village,district,province,time_cancel,lg,img_old,stadium_status,phone,stadium_id], (err,result) => {
                    if(err){
                        res.status(400)
                        console.log(err);
                    }else{
                        let removeLogo = `${__dirname}/../../Clients/public/assets/images/adminPics/stadiumPics/icons/${logo_old}`;
                        let removeLogoFromAdminFolder = `${__dirname}/../../Admin/public/assets/images/adminPics/stadiumPics/icons/${logo_old}`;
                        fs.unlink(removeLogo, (err) => { if (err) return res.status(500).send('ລຶບຜິດພາດ!!') })
                        fs.unlink(removeLogoFromAdminFolder, (err) => { if (err) return res.status(500).send('ລຶບຜິດພາດ!!') })
                        res.status(200)
                        res.send('ແກ້ໄຂສຳເລັດ!!');
                    }
                })
            })

        } else {
            let logo = req.files.logo;
            let uploadlogo = `${__dirname}/../../Clients/public/assets/images/adminPics/stadiumPics/icons/${logo.name}`;
            let uploadlogoToAdminFolder = `${__dirname}/../../Admin/public/assets/images/adminPics/stadiumPics/icons/${logo.name}`;

            let sampleFile = req.files.sampleFile;
            let uploadPath = `${__dirname}/../../Clients/public/assets/images/adminPics/stadiumPics/themeBackground/${sampleFile.name}`;
            let uploadPathToAdminFolder = `${__dirname}/../../Admin/public/assets/images/adminPics/stadiumPics/themeBackground/${sampleFile.name}`;

            logo.mv(uploadlogoToAdminFolder, (err) => {if (err) return res.status(500).send(err);});
            sampleFile.mv(uploadPathToAdminFolder, (err) => {if (err) return res.status(500).send(err)});

            logo.mv(uploadlogo,function(err){
                if(err) return res.status(500).send(err);

                const lg = logo.name;

                sampleFile.mv(uploadPath, function(err){
                    if(err) return res.status(500).send(err);
                    
                    const im = sampleFile.name;
                    db.query("call stadium_update(?,?,?,?,?,?,?,?,?,?,?)", [stadium_name,description,village,district,province,time_cancel,lg,im,stadium_status,phone,stadium_id], (err,result) => {
                        if(err){
                            res.status(400)
                            console.log(err);
                        }else{
                            let removeLogo = `${__dirname}/../../Clients/public/assets/images/adminPics/stadiumPics/icons/${logo_old}`;
                            let removeLogoFromAdminFolder = `${__dirname}/../../Admin/public/assets/images/adminPics/stadiumPics/icons/${logo_old}`;

                            let removePath = `${__dirname}/../../Clients/public/assets/images/adminPics/stadiumPics/themeBackground/${img_old}`;
                            let removePathFromAdminFolder = `${__dirname}/../../Admin/public/assets/images/adminPics/stadiumPics/themeBackground/${img_old}`;
                            fs.unlink(removeLogo, (err) => { if (err) return res.status(500).send('ລຶບຜິດພາດ!!') })
                            fs.unlink(removeLogoFromAdminFolder, (err) => { if (err) return res.status(500).send('ລຶບຜິດພາດ!!') })

                            fs.unlink(removePath, (err) => { if (err) return res.status(500).send('ລຶບຜິດພາດ!!') })
                            fs.unlink(removePathFromAdminFolder, (err) => { if (err) return res.status(500).send('ລຶບຜິດພາດ!!') })
                            res.status(200)
                            res.send('ແກ້ໄຂສຳເລັດ!!');
                        }
                    })
                })
            })
        }

    }
    
}) // ແກ້ໄຂຂໍ້ມູນເດີ່ນ ||||||||||||||||||||||||||||||||||||||||||||||||||


router.delete('/:st_id', async function(req,res,next){
    const stadium_id = req.params.st_id;
    // fs.unlink(`public/images/${image}`, (err) => {
    //     if (err) {
    //         return res.status(500).send(err);
    //     }
    //     db.query(deleteUserQuery, (err, result) => {
    //         if (err) {
    //             res.status(500).send(err);
    //         }
    //         res.redirect('/player');
    //     });
    // });
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