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

router.get("/get_employee/:st_id", async (req, res) => {
  const stadium_id = req.params.st_id;
  await db.query("call staff_employee(?)", [stadium_id], (err, result) => {
    if (err) {
      return res.status(400);
    }
    if (result[0].length > 0) {
      return res.send(result[0]);
    } else {
      return res.status(304).send("Not found data!!");
    }
  });
}); // ສະແດງພະນັກງານທັງໝົດຂອງເດີ່ນ ||||||||||||||||||||||||||||||||||||||||||||||||||

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

router.get("/getAllStadiumOwner", async (req, res) => {
  await db.query("call stadiumOwner_getAll()", (err, result) => {
    if (err) {
      return res.status(400);
    }
    if (result[0].length > 0) {
      return res.send(result[0]);
    } else {
      return res.status(304).send("Not found data!!");
    }
  });
}); // ສະແດງພະນັກງານທັງໝົດຂອງເດີ່ນ ||||||||||||||||||||||||||||||||||||||||||||||||||

router.post("/login", async (req, res) => {
  const staff_email = req.body.email;
  const staff_password = req.body.password;

  await db.query("call check_staff_email(?)", [staff_email], (err, result) => {
    if (result[0].length > 0) {
      const database_password = result[0][0].su_password;

      bcrypt.compare(staff_password, database_password).then((match) => {
        if (!match) {
          res.status(400).send("Wrong Username and Password Combination!");
        } else {
          jwt.sign({ data: result[0][0].su_id }, "secret", (er, token) => {
            // res.cookie("access-token", token, {httpOnly:true});
            res.status(200);
            res.json({ token });
          });
        }
      });
    } else {
      res.status(400);
      res.send("Wrong Username and Password Combination!");
    }
  });
}); // ລ໊ອກອິນຂອງຄົນພາຍໃນເດີ່ນ ||||||||||||||||||||||||||||||||||||||||||||||||||

router.get("/login/authen", verifyToken, (req, res) => {
  jwt.verify(req.token, "secret", async (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      const user_id = authData.data;
      await db.query("call staff_auth(?)", [user_id], (er, result) => {
        if (er) {
          console.log(er);
        } else {
          res.send(result[0][0]);
        }
      });
    }
  });
}); // authen ສົ່ງຂໍ້ມູນທີ່ແປງຈາກ token ||||||||||||||||||||||||||||||||||||||||||||||||||

router.post("/add/stadiumOwner", async function (req, res) {
  const staff_name = req.body.firstName;
  const staff_surname = req.body.lastName;
  const staff_age = req.body.age;
  const staff_gender = req.body.gender;
  const staff_email = req.body.email;
  const staff_password = req.body.password;
  const img = "defualt.jpg";

  await db.query("call check_staff_email(?)", [staff_email], (err, result) => {
    if (result[0].length > 0) {
      res.status(400);
      res.send("Email Already used!");
    } else {
      if (!req.files) {
        bcrypt.hash(staff_password, 10).then((hash) => {
          db.query(
            "call staff_add(?,?,?,?,?,?,?,?)",
            [
              staff_name,
              staff_surname,
              staff_age,
              staff_gender,
              staff_email,
              hash,
              img,
              "manager",
            ],
            (err, result) => {
              if (err) {
                console.log(err);
                res.status(400).json({ error: err });
              } else {
                db.query("call stadiumOwner_getAll()", (err, result) => {
                  if (err) {
                    res.status(400);
                  }
                  console.log(result[0]);
                  res.status(200);
                  res.send(result[0]);
                });
              }
            }
          );
        });
      } else {
        let sampleFile = req.files.sampleFile;
        let uploadPath = `${__dirname}/../../Clients/public/assets/images/adminPics/adminProfile/${sampleFile.name}`;
        let uploadPathToAdminFolder = `${__dirname}/../../Admin/public/assets/images/adminPics/adminProfile/${sampleFile.name}`;

        sampleFile.mv(uploadPathToAdminFolder, (err) => {
          if (err) return res.status(500).send(err);
        });

        sampleFile.mv(uploadPath, function (err) {
          if (err) return res.status(500).send(err);

          const im = sampleFile.name;

          bcrypt.hash(staff_password, 10).then((hash) => {
            db.query(
              "call staff_add(?,?,?,?,?,?,?,?)",
              [
                staff_name,
                staff_surname,
                staff_age,
                staff_gender,
                staff_email,
                hash,
                im,
                "manager",
              ],
              (err, result) => {
                if (err) {
                  res.status(400).json({ error: err });
                } else {
                  db.query("call stadiumOwner_getAll()", (err, result) => {
                    if (err) {
                      res.status(400);
                    }
                    res.status(200);
                    res.send(result[0]);
                  });
                }
              }
            );
          });
        });
      }
    }
  });
}); // ເພີ່ມເຈົ້າຂອງເດີ່ນ ||||||||||||||||||||||||||||||||||||||||||||||||||

router.post("/employee/add", async function (req, res, next) {
  const stadium_id = req.body.stadiumId;
  const staff_name = req.body.firstName;
  const staff_surname = req.body.lastName;
  const staff_age = req.body.age;
  const staff_gender = req.body.gender;
  const staff_email = req.body.email;
  const staff_password = req.body.password;
  const img = "defualt.jpg";

  await db.query("call check_staff_email(?)", [staff_email], (err, result) => {
    if (result[0].length > 0) {
      res.status(400);
      res.send("Email Already used!");
    } else {
      if (!req.files) {
        bcrypt.hash(staff_password, 10).then((hash) => {
          db.query(
            "call staff_employee_add(?,?,?,?,?,?,?,?,?)",
            [
              stadium_id,
              staff_name,
              staff_surname,
              staff_age,
              staff_gender,
              staff_email,
              hash,
              img,
              "staff",
            ],
            (err, result) => {
              if (err) {
                console.log(err);
                res.status(400).json({ error: err });
              } else {
                db.query(
                  "call staff_employee(?)",
                  [stadium_id],
                  (err, result) => {
                    if (err) {
                      return res.status(400);
                    }
                    return res.send(result[0]);
                  }
                );
              }
            }
          );
        });
      } else {
        let sampleFile = req.files.sampleFile;
        let uploadPath = `${__dirname}/../../Clients/public/assets/images/adminPics/adminProfile/${sampleFile.name}`;
        let uploadPathToAdminFolder = `${__dirname}/../../Admin/public/assets/images/adminPics/adminProfile/${sampleFile.name}`;

        sampleFile.mv(uploadPathToAdminFolder, (err) => {
          if (err) return res.status(500).send(err);
        });

        sampleFile.mv(uploadPath, function (err) {
          if (err) return res.status(500).send(err);

          const im = sampleFile.name;

          bcrypt.hash(staff_password, 10).then((hash) => {
            db.query(
              "call staff_employee_add(?,?,?,?,?,?,?,?,?)",
              [
                stadium_id,
                staff_name,
                staff_surname,
                staff_age,
                staff_gender,
                staff_email,
                hash,
                im,
                "staff",
              ],
              (err, result) => {
                if (err) {
                  res.status(400).json({ error: err });
                } else {
                  db.query(
                    "call staff_employee(?)",
                    [stadium_id],
                    (err, result) => {
                      if (err) {
                        return res.status(400);
                      }
                      return res.send(result[0]);
                    }
                  );
                }
              }
            );
          });
        });
      }
    }
  });
}); // ເພີ່ມພະນັກງານເດີ່ນ ||||||||||||||||||||||||||||||||||||||||||||||||||

router.put("/updateProfile", verifyToken, async function (req, res, next) {
  jwt.verify(req.token, "secret", async (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      const staff_id = authData.data;
      const staff_name = req.body.su_name;
      const staff_surname = req.body.su_surname;
      const staff_age = req.body.su_age;
      const staff_gender = req.body.su_gender;
      const img = req.body.picture;
    
      if (!req.files) {
        db.query(
          "call staff_update(?,?,?,?,?,?)",
          [
            staff_name,
            staff_surname,
            staff_age,
            staff_gender,
            img,
            staff_id,
          ],
          async (err, result) => {
            if (err) {
              res.status(400);
              console.log(err);
            } else {
              await db.query("call staff_auth(?)", [staff_id], (er, result) => {
                if (er) {
                  console.log(er);
                } else {
                  res.send(result[0][0]);
                }
              });
            }
          }
        );
      } else {
        let sampleFile = req.files.sampleFile;
        let uploadPath = `${__dirname}/../../Clients/public/assets/images/adminPics/adminProfile/${sampleFile.name}`;
        let uploadPathToAdminFolder = `${__dirname}/../../Admin/public/assets/images/adminPics/adminProfile/${sampleFile.name}`;
    
        sampleFile.mv(uploadPathToAdminFolder, (err) => {
          if (err) return res.status(500).send(err);
        });
    
        sampleFile.mv(uploadPath, function (err) {
          if (err) return res.status(500).send(err);
    
          const im = sampleFile.name;
    
          db.query(
            "call staff_update(?,?,?,?,?,?)",
            [
              staff_name,
              staff_surname,
              staff_age,
              staff_gender,
              im,
              staff_id,
            ],
            async (err, result) => {
              if (err) {
                res.status(400);
                console.log(err);
              } else {
                await db.query("call staff_auth(?)", [staff_id], (er, result) => {
                  if (er) {
                    console.log(er);
                  } else {
                    res.send(result[0][0]);
                  }
                });
              }
            }
          );
        });
      }
    }
  });
}); // ແກ້ໄຂຂໍ້ມູນຄົນພາຍໃນເດີ່ນ ||||||||||||||||||||||||||||||||||||||||||||||||||

router.put('/updatePassword', verifyToken, async (req, res) => {

  jwt.verify(req.token, "secret", async (err, authData) => {
    if (err) {
      console.log(err);
      res.sendStatus(403);
    } else {
      const user_id = authData.data;
      const password = req.body.old_password;
      const newPassword = req.body.new_password;
          await db.query("call check_admin_password(?)", [user_id], (err,result) => {
              if(result[0].length > 0){
                  const database_pw = result[0][0].su_password;
                  bcrypt.compare(password,database_pw).then((match) => {
                      if(!match){
                          res
                              .status(400)
                              .send("ປ້ອນລະຫັດເກົ່າບໍ່ຖືກຕ້ອງ!");
                      }else{
                        bcrypt.hash(newPassword, 10).then((hash) => {
                          db.query(
                            "call update_admin_password(?,?)",
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

router.delete("/", async function (req, res, next) {
  const staff_id = req.body.su_id;
  await db.query("call staff_delete(?)", [staff_id], (err, result) => {
    if (err) {
      res.status(400);
      console.log(err);
    } else {
      res.status(200);
      res.send(result);
    }
  });
}); // ລົບຂໍ້ມູນຳພະນັກງານ ||||||||||||||||||||||||||||||||||||||||||||||||||

module.exports = router;
