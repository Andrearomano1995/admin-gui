var axios=require('axios');
var express = require('express');
var app = express();
var bodyParser=require('body-parser');
var cors=require('cors');
var jwt = require('jsonwebtoken');
//const payload="{\"sub\": \"LID-100\", \"name\": \"John Doe\", \"iat\": \"1516239022\", \"authorities\": [\"USER\"]}";
const secretOrPrivateKey="d7bffd5d-1ef6-4ce0-bd71-a79d503863da";
var token="";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.use(express.static('public'));

 
const HTTP=axios.create({
   baseURL: "http://35.228.89.86:85/"
});

app.get('/', function (req, res) {
   res.sendFile('/index.html', { root : __dirname});
});

app.get('/token', function (req, res) {
   payload="{\"sub\": \"LID-100\", \"name\": \""+req.query.tokenUser+"\", \"iat\": \"1516239022\", \"authorities\": [\"USER\"]}";
   token=jwt.sign(payload, secretOrPrivateKey);
   res.send(token); 
 });

app.get('/private',function(req,res){
   HTTP.get('private',{
      headers:{
         'Authorization': 'Bearer ' + token
       }
    }).then((response)=>{
       res.send(response.data);
    })
    .catch((error)=>{
       console.log(error)
    })
 });

app.get('/public',function(req,res){
      HTTP.get('public').then((response)=>{
      res.send(response.data);
   })
   .catch((error)=>{
      console.log(error)
   })
});

app.get('/getentity',function(req,res){
   HTTP.get('private/entity/'+req.query.pageUser,{
      headers:{
         'Authorization': 'Bearer ' + token
       }
    }).then((response)=>{
       res.send(response.data);
    })
    .catch((error)=>{
       console.log(error)
    })
 });

app.get('/contract',function(req,res){
   HTTP.get('private/document/'+req.query.pageContract,{
      headers:{
         'Authorization': 'Bearer ' + token
       }
    }).then((response)=>{
       res.send(response.data);
    })
    .catch((error)=>{
       console.log(error)
    })
 });

app.get('/health',function(req,res){
   HTTP.get('actuator/health').then((response)=>{
   res.send(response.data);
})
.catch((error)=>{
   console.log(error)
})
});

app.post('/postentity',function(req,res){
   let params = {
      loginId: req.body.loginId,
      tenant: req.body.tenant,
      name: req.body.name
   };

   HTTP.post('private/entity', params,
   {
      headers:{
         'Content-Type': 'application/json',
         'Authorization': 'Bearer ' + token
       }
   }).then((response)=>{
      res.send(response.data);
   }).catch((error)=>{
      console.log(error);
   })
   
})

app.post('/postcontract',function(req,res){
   let params = {
      partALoginId: req.body.partALoginId,
      partBLoginId: req.body.partBLoginId,
      amount: req.body.amount,
      notes: req.body.notes
   };

   HTTP.post('private/document', params,
   {
      headers:{
         'Content-Type': 'application/json',
         'Authorization': 'Bearer ' + token
       }
   }).then((response)=>{
      res.send(response.data);
   }).catch((error)=>{
      console.log(error);
   })
   
})

app.delete('/deleteuser/:id',function(req,res){
   HTTP.delete('private/entity/'+req.params.id,{
      headers:{
         'Content-Type': 'application/json',
         'Authorization': 'Bearer ' + token
      }
   }).then((response)=>{
      res.send('delete user:'+req.params.id);
   });
})

app.delete('/deletedocument/:idDocument',function(req,res){
      HTTP.delete('private/document/'+req.params.idDocument,{
      headers:{
         'Content-Type': 'application/json',
         'Authorization': 'Bearer ' + token
      }
   });
   res.send('delete document:'+req.params.idDocument);
})



app.listen(3000, function () {
   console.log('App listening on port 3000!');
});
