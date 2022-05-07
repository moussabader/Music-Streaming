require('dotenv').config({ path: '../../../env' })
const {GridFsStorage} = require("multer-gridfs-storage");
const multer = require("multer");

const storage = new GridFsStorage({
    url: process.env.MONGODB_URL,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            let fileInfo;
            if (file.originalname.split('.')[1].length === 3 ){
                 fileInfo = {
                    filename: file.originalname.slice(0, -4),
                    bucketName: 'songsFiles',
                };
            }else if (file.originalname.split('.')[1].length === 4){
                 fileInfo = {
                    filename: file.originalname.slice(0, -5),
                    bucketName: 'songsFiles',
                };
            }
            resolve(fileInfo);
        });
    }
});
const upload = multer({storage});
module.exports = upload;
