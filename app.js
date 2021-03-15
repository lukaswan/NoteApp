//core modules
const express = require('express');
const app = express();
const hb = require('express-handlebars');
//const authModule = require('./middleware/basicAuth.js')
const basicAuth = require('express-basic-auth');
const fs = require('fs');

//parsers
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//static files
app.use(express.static('public'));

//view engine
app.engine('handlebars',hb({defaultLayout:'main'}));
app.set('view engine', 'handlebars')

//app.use(authModule)

//basic-auth
let USERS=JSON.parse(
    fs.readFileSync(__dirname+'/data/users.json','utf-8', async(err,data)=>{
    if(err) console.log(err)
    else return await data
    })
);
app.use(basicAuth({
    challenge:true,
    authorizer:myAuthorizer,
    realm:"My application"
}))

function myAuthorizer(username,password){
    return USERS.users.some((user)=>{
    return user.username===username && user.password===password})
}

//Routes
app.use('/', require('./routes/router.js'))

//listener
app.listen(8080,()=>
    console.log('server is listening to port 8080'))