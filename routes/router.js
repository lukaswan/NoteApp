//core modules
const express = require('express');
const router = express.Router();
const fs= require('fs');

//parsers
router.use(express.urlencoded({extended:false}));
router.use(express.json());

//Filter users and notes using variables
let currentUser;

function currentNotes(){
    return notebook.notes.filter((note)=>note.user === currentUser)
    };

//Importing JSON to a variable
let notebook = JSON.parse(
    fs.readFileSync(__dirname+'/../data/notes.json', 'utf-8',async(err, data)=>{
    if(err) console.log(err)
    else return await data
    })
);

//home page + notelist
router.get('/', (req,res)=>{
    currentUser=req.auth.user;
    res.render('index', {
        notes:currentNotes,
        name:currentUser
    })
})

//new note route
router.post('/',(req,res)=>{
    currentUser=req.auth.user;
    const noteId= notebook.notes[notebook.notes.length-1].id+1;
    const newNote ={
        "user":currentUser,
        "id":noteId,
        "note":req.body.note
    }
    notebook.notes.push(newNote);
    fs.writeFile(__dirname+'/../data/notes.json',JSON.stringify(notebook),(err)=>{
        if(err) console.log(err)
    })
    res.redirect('/')
});

//delete route
router.get('/:id', (req,res)=>{
    currentUser=req.auth.user;
    for(i in notebook.notes){
        if(notebook.notes[i].id == req.params.id){
            notebook.notes.splice(i,1)
        }}
    fs.writeFile(__dirname+'/../data/notes.json',JSON.stringify(notebook),(err)=>{
        if(err) console.log(err)
    })
    res.redirect('/')

});

//update note route
router.post('/:id',(req,res)=>{
    currentUser=req.auth.user;
    for(i in notebook.notes){
        if(notebook.notes[i].id == req.params.id){
            notebook.notes[i].note = req.body.noted}
        }
    fs.writeFile(__dirname+'/../data/notes.json',JSON.stringify(notebook),(err)=>{
        if(err) console.log(err)
    })
    res.redirect('/')
})


module.exports=router;