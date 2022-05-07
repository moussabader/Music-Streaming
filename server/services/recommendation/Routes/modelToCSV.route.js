const express = require('express')
const router = express.Router()
const {spawn} = require('child_process');

let PythonShellLibrary = require('python-shell');
let {PythonShell} = PythonShellLibrary;

const Ls = require('../../../models/ListenedSong')


router.get('/recommend/:id', async (req, res) => {
   
   try {
      //let stringifiedData = JSON.stringify(data);
      const source = new PythonShell('./helpers/recommenders.py');
      source.send(JSON.stringify([10]));

      let resultData = ''
      source.on('message', function (message) {
         // received a message sent from the Python script (a simple "print" statement) 
         var string1 = JSON.stringify(message);
            resultData = JSON.parse(string1);
            if (!res.headersSent) res.send(resultData)
         // for (key in jsonParsedArray) {
         //    if (jsonParsedArray.hasOwnProperty(key)) {
         //        console.log("%c "+key + " = " + jsonParsedArray[key],"color:cyan");
         //    }}
           
     });
     
     // end the input stream and allow the process to exit
     source.end(function (err) {
        if(err){
         if (!res.headersSent) res.send(err.message)
        }else{

        }
     })

      console.log('recommendation is coming');

     
   } catch (error) {
      if (!res.headersSent) res.status(500).json({ error: error.message });
   }


});



module.exports = router