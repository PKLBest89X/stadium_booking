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

router.get("/getSubscribeByCustomerId", verifyToken, function (req, res) {
    jwt.verify(req.token, "secret", async (err, authData) => {
      if (err) {
        return res.sendStatus(403);
      };
      const user_id = authData.data;
      await db.query("call get_subscribe_byCustomerId(?)", [user_id], (err, result) => {
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
    })

})

router.get("/getFeedPostBySubscribed", verifyToken, function (req, res) {
  jwt.verify(req.token, "secret", async (err, authData) => {
    if (err) {
      return res.sendStatus(403);
    };
    const user_id = authData.data;
    await db.query("call get_subscribePost_byCustomerId(?)", [user_id], (err, result) => {
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
  })

})

router.get("/getSubscribeByStadiumIdCustomerId/:stadiumId", verifyToken, function (req, res) {
  jwt.verify(req.token, "secret", async (err, authData) => {
    if (err) {
      return res.sendStatus(403);
    }
    const stadiumId = req.params.stadiumId;
    const user_id = authData.data;
    await db.query("call get_subscribe_byStadiumId_customerId(?, ?)", [stadiumId, user_id], (err, result) => {
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
  })
})

router.post("/subscribeStadium/:stadiumId", verifyToken, function (req, res) {
  jwt.verify(req.token, "secret", async (err, authData) => {
    if (err) {
      return res.sendStatus(403);
    }
    const stadiumId = req.params.stadiumId;
    const user_id = authData.data;
    await db.query("call subscribe_stadium(?, ?)", [stadiumId, user_id], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(400).send('ເກີດຂໍ້ຜິດພາດ!!');
        }
        db.query("call count_subscribe(?)", [stadiumId], (err, result) => {
          if (err) {
            console.log(err);
            return res.status(400).send('ເກີດຂໍ້ຜິດພາດ!!');
          }
          const totalCountSub = result[0][0].totalCount;
          db.query("call update_total_of_subscribe(?,?)", [totalCountSub, stadiumId], (err, result) => {
            if (err) {
              console.log(err);
              return res.status(400).send('ເກີດຂໍ້ຜິດພາດ!!');
            }
            return res.status(200).send('ຕິດຕາມສຳເລັດ!!')
          }) 
        })
    })
  })
})

module.exports = router;

router.delete("/unSubscribeStadium/:stadiumId", verifyToken, function (req, res) {
  jwt.verify(req.token, "secret", async (err, authData) => {
    if (err) {
      return res.sendStatus(403);
    }
    const stadiumId = req.params.stadiumId;
    const user_id = authData.data;
    await db.query("call unSubscribe_stadium(?, ?)", [stadiumId, user_id], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(400).send('ເກີດຂໍ້ຜິດພາດ!!');
        }
        db.query("call count_subscribe(?)", [stadiumId], (err, result) => {
          if (err) {
            console.log(err);
            return res.status(400).send('ເກີດຂໍ້ຜິດພາດ!!');
          }
          const totalCountSub = result[0][0].totalCount;
          db.query("call update_total_of_subscribe(?,?)", [totalCountSub, stadiumId], (err, result) => {
            if (err) {
              console.log(err);
              return res.status(400).send('ເກີດຂໍ້ຜິດພາດ!!');
            }
            return res.status(200).send('ຍົກເລີກຕິດຕາມເດີ່ນສຳເລັດ!!')
          }) 
        })
    })
  })
})

module.exports = router;