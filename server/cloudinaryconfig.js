// cloudinaryConfig.js
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Configure Cloudinary
cloudinary.config({
    cloud_name:'pp154360@gmail.com',
    api_key: '657358449387968',
    api_secret:  'Z4DWeEcq6tr9yEZtBWXkdLMIILI',
});

// Set up Cloudinary storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'uploads', // The folder name in your Cloudinary account
        allowed_formats: ['jpeg', 'png', 'jpg'], // Allowed file types
    },
    //     filename:(req,file,cb)=>{
    //    cb(null, Date.now()+path.extname(file.originalname))
    //  }
});

// Configure multer with Cloudinary storage
const upload = multer({ storage });

module.exports = { cloudinary, upload };
