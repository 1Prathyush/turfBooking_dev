const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { static } = require("express");
const app = express();
dotenv.config({ path: "./config/config.env" });

const admin = require("firebase-admin");

/* const serviceAccount = require("./config/slot-booking-7095c-firebase-adminsdk-ch2r5-78a14d3052.json");
const turf = require("./database/turf");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
}); */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((result) => {
    console.log("the mongodb is connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.static("src"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/h", (req, res) => {
  res.sendFile(__dirname + "/public/dashboard.html");
});
app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/public/login.html");
});
app.get("/owner", (req, res) => {
  res.sendFile(__dirname + "/public/owner.html");
});
app.get("/sorry", (req, res) => {
  res.sendFile(__dirname + "/public/sorry.html");
});
app.get("/turfdata", (req, res) => {
  res.sendFile(__dirname + "/public/turfdata.html");
});
app.get("/turf/:id", (req, res) => {
  res.sendFile(__dirname + "/public/tbook.html");
});
//-------------------token verification----------------------------
function verifyToken(req, res, next) {
  admin
    .auth()
    .verifyIdToken(req.headers.id)
    .then((decodedToken) => {
      res.useruid = decodedToken.uid;
      next();
    })
    .catch((error) => {
      console.log(error);
    });
}
//----------------apis handling---------------------//

//------------adding a nr=ew user----------------------//
app.post("/api/adduser", (req, res) => {
  console.log(req.body.owner);
  console.log(req.body.owner_mail);
  console.log(req.body.password);
  admin
    .auth()
    .createUser({
      email: req.body.owner_mail,
      password: req.body.password,
      displayName: req.body.owner,
    })
    .then((userRecord) => {
      let newTurf = new turf({
        owner: req.body.owner,
        ownerMail: req.body.owner_mail,
        firebaseUID: userRecord.uid,
      })
        .save()
        .then((result) => {
          console.log(`"user added"${result}`);
          res.sendFile(__dirname + "/public/login.html");
        })
        .catch((err) => {
          console.log(err);
        });
    });
});
app.get("/api/ownerdetails", verifyToken, (req, res) => {
  console.log(res.useruid);
  turf.findOne({ firebaseUID: res.useruid }).then((data) => {
    console.log(data);
    res.send(data);
  });
});
//----------------------add turf details--------------//
app.post("/api/addturfdata", verifyToken, (req, res) => {
  console.log(res.useruid);
  console.log(req.body.pin);
  turf
    .findOneAndUpdate(
      {
        firebaseUID: res.useruid,
      },
      {
        turfName: req.body.trname,
        turfPlace: req.body.tplace,
        landmark: req.body.landMark,
        PhoneNumber: req.body.phonenumber,
        district: req.body.tdistrict,
        pincode: req.body.pin,
      }
    )
    .then((result) => {
      console.log(result);
      res.send(console.log("all set"));
    })
    .catch((err) => {
      console.log(err);
    });
});

//--------------- available turf------------------//
app.get("/api/available", (req, res) => {
  console.log(req.headers.dict);
  let dist = req.headers.dict
  let arr=[];
  turf.exists({district:dist}).then(result=>{
    console.log(result)
    if(result){
      turf.find({district:dist}).then((data)=>{
        console.log(data)
        res.send(data);
      }).catch((err)=>{
        console.log(err);
      })
    }
    else
      console.log("not set");
  })
    
});
//----------- bookeddetails-------------------//
app.get("/api/bookeddetails",(req,res)=>{
  let turfid = req.headers.turf;
  console.log(turfid);
  turf.exists({_id:turfid}).then((result)=>{
    if(result){
      turf.findById({_id:turfid}).then((data)=>{
        console.log(data);
        res.send(data);
      })
    }
    else{
      console.log("no data is found");
    }
  })
})
//----------------------booking-----------------------//

app.post("/api/book",(req,res)=>{
  console.log(req.body.btime);
  console.log(req.headers.tid);
  console.log(req.body.bmail);
  console.log(req.body.bdate);
  turf.exists({_id:req.headers.tid}).then((result)=>{
    if(result){
      turf.findOneAndUpdate()
    }
  })
})

//-----------port listening--------------------//

const port = process.env.PORT || 3500;
app.listen(
  port,
  console.log(`server running in ${process.env.NODE_ENV} mode on port ${port}`)
);
