const {GridFsStorage} = require("multer-gridfs-storage");
const configDB = require("../mongodb/data/mongodb.json");
const multer = require("multer");

const storage = new GridFsStorage({
    url: configDB.mongo.uri,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            let fileInfo;
            if (file.mimetype === "audio/mpeg"){
                 fileInfo = {
                    filename: file.originalname.slice(0, -4),
                    bucketName: 'uploads',
                };
            }else if (file.mimetype === "image/jpeg"){
                 fileInfo = {
                    filename: file.originalname.slice(0, -5),
                    bucketName: 'uploads',
                };
            }
            resolve(fileInfo);
        });
    }
});
const upload = multer({storage});
module.exports = upload;
