const express=require("express")
const {addPost, getPost, getSinglePost, editPost, deletePost}=require("../controller/BlogController")
const router=express.Router()
 
const path=require("path")
const {upload}=require('../utils/multer')
 



// const storage= multer.diskStorage({
//     destination:(req,file,cb)=>
//     {
//         cb(null,"uploads/")
//     },
//     filename:(req,file,cb)=>{
//         cb(null, Date.now()+path.extname(file.originalname))
//     }
// })

// const upload=multer({storage})

router.post("/addPost",upload.single('image'),addPost)
router.get("/getPosts",getPost)
router.get("/getPost/:id",getSinglePost)
router.put("/updatePost",upload.single('image'),editPost)
router.delete("/deletePost/:id",deletePost)
module.exports=router