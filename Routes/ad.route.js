const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const upload = require('../Controllers/AdStorage')
const Ad = require('../models/Ad')
const AdController = require('../Controllers/ads.controller')

// POST Ad
router.post('/post',upload.fields([{name: 'audio'}, {name:'image'}]),async (req, res) => {
    // the can have an image file, an audio file or both
    const audioId = req.files['audio'] !== undefined ? new mongoose.Types.ObjectId(req.files['audio'][0].id) : null ;
    const imageId = req.files['image'] !== undefined ? new mongoose.Types.ObjectId(req.files['image'][0].id): null ;
    let ad = new Ad({
        name: req.body.name,
        content: audioId ,
        image: imageId ,
    });
    await ad.save();
    res.status(200).json({
        message: "New ad file Uploaded",
        Ad: ad,
        Files: req.files
    });
});
router.put('/update/:id',AdController.update);
router.delete('/delete/:id',AdController.delete);
router.get('/get-all',AdController.getAll);
router.get('/get-ad/:id',AdController.getOne);
router.get('/get-audio/:id',AdController.getAdAudio);
router.get('/get-image/:id',AdController.getAdImage);

module.exports = router;
