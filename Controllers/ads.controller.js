const Ad = require('../models/Ad')
const Song = require("../models/Song");
const mongoose = require("mongoose");

// Init GridFS bucket
const conn = mongoose.connection;
let bucket;
conn.once('open', () => {
    // Init stream
    bucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: "ads"
    });
});

module.exports = {
    update: async (req, res) => {
        const ad = await Ad.findById(req.params['id']);
        if (!ad) return res.status(404).json({
            message: "Ad not found"
        });
        await ad.set(req.body);
        await ad.save();
        res.status(200).json({
            Message: 'Ad Updated',
            Ad: ad
        })
    },
    delete : async (req,res) => {
        const ad = await Ad.findById({_id: req.params.id});
        if (!ad) {
            return res.status(404).json({
                Message: 'Ad not found'
            })
        }
        const audioId = new mongoose.Types.ObjectId(ad.content);
        const imageId = new mongoose.Types.ObjectId(ad.image);
        await ad.remove();
        bucket.delete(audioId)
        bucket.delete(imageId)
        res.status(200).json({
            Message: 'Ad deleted',
            Ad: ad
        })},
    getAll : async (req,res) => {
        const ads = await Ad.find();
        if (ads.length === 0) {
            return res.status(200).json({
                success: true,
                message: 'No Ads available'
            });
        }
        res.status(200).json({
            success: true,
            AdsFound: ads.length,
            Ads: ads,
        });
    },
    getOne : async (req,res) => {
        const ad = await Ad.findById(req.params.id)
        if (!ad) {
            return res.status(404).json({
                success: false,
                message: 'Ad Not Found'
            });
        }
        res.status(200).json({
            success: true,
            Ad : ad
        });
    },
    getAdAudio : async (req, res) => {
        const ad = await Ad.findById(req.params.id)
        const audioId = new mongoose.Types.ObjectId(ad.content);
        bucket.openDownloadStream(audioId).pipe(res);
    },
    getAdImage : async (req, res) => {
        const ad = await Ad.findById(req.params.id)
        const imageId = new mongoose.Types.ObjectId(ad.image);
        bucket.openDownloadStream(imageId).pipe(res);
    }
}
