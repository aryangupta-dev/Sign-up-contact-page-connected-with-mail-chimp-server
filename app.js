const express = require("express");
const app = express();
const https=require("https");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("Public"));
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});
app.post("/", function(req, res) {
  const firstname = req.body.firstname;
  const lastname = req.body.lastName;
  const city=req.body.city;
  const number=req.body.contact;
  const email = req.body.email;
  var data={
    members:[{
      email_address:email,
      status:"subscribed",
      merge_fields:{
        FNAME:firstname,
        LNAME:lastname,
        ADDRESS:city,
        PHONE:number
      }
    }]
  };
  const jsondata=JSON.stringify(data);
  const url="https://us1.api.mailchimp.com/3.0/lists/f741c7d3cf";
  const options={
    method:"POST",
    auth:"aryan:7ab969c044df95881fda680c855aa7ee-us1"
  }
  const request=https.request(url,options,function(response){
    if(response.statusCode===200){
      res.sendFile(__dirname+"/success.html");
    }else{
      res.sendFile(__dirname+"/failure.html")
    }
    response.on("data",function(data){
      console.log(JSON.parse(data));
    })
  })
  request.write(jsondata);
  request.end();

});


app.listen(process.env.PORT ||3000, function() {
  console.log("Server is running on port 3000");
})
app.post("/failure",function(req,res){
  res.redirect("/");
});
app.post("/home",function(req,res){
  res.redirect("/");
});

//unique id
//f741c7d3cf
//api key
//ee87d988572b12e603085027bee3311-us1
