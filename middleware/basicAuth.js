const express = require('express');
const app = express();
const basicAuth = require('express-basic-auth');
const fs = require('fs');

// basic-auth
let USERS=JSON.parse(fs.readFileSync(__dirname+'/../data/users.json','utf-8', async(err,data)=>{
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

module.exports = basicAuth;