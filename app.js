 const fs=require('fs-extra')
 const express = require('express')
// const cors = require('cors');
const app = express();
 var MongoClient = require('mongodb').MongoClient

 const packageObj = fs.readJsonSync('./books.json')

 
  app.get('/books', (req, res) => {
    let id = req.query.id;
    let name = req.query.name;
  packageObj.forEach(element => {
    if(id===element.id){
      res.send(element.id)
    }
  });
  })
    


app.get('/books', async (req, res) => {
  const id = req.query.id;
  const name = req.query.name;
  const publish_date = req.query.publish_date;
  

packageObj.forEach(element => {
    if(id==element.id){
      console.log(element);
      res.send(element);
    }if(name==element.name){
      console.log(element);
      res.send(element.name);
    }
  });
  
})

// app.post('/books', function(req, res) {
//   const id = req.body.id;
//   const name = req.body.name;
//   const publish_date = req.body.publish_date;

//   res.send({
//     'id': id,
//     'name': name,
//     'publish_date': publish_date
//   });
// });


const url = 'mongodb://localhost'
const dbName = 'the_big_library'
let db

MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
  if (err) return console.log(err)
  db = client.db(dbName)
  // console.log(`Connected MongoDB: ${url}`)
  // console.log(`Database: ${dbName}`)
})
app.get('/', (req, res) => {
  const library = db.collection('books').find()
  console.log(library)
})
app.listen(8080)