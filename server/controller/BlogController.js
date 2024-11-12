const path=require("path")
const Post=require("../model/Post")

exports.addPost=async(req,res)=>{
    console.log(req.body)
    try{

const{title,description}=req.body;

const image=req.file?req.file.path:null
 
    
if(!title){
    return res.status(400).json({messsage:"title can not be empty"})
}
if(!description){
    return res.status(400).json({messsage:"description can not be empty"})
}
if(!image){
    return res.status(400).json({messsage:"image can not be empty"})
}

const newPost=new Post({title:title,description:description,imageUrl:image})
console.log(newPost)
await newPost.save()
return res.status(200).json({message:"Post is created"})
    }
    catch(error){
        return res.status(500).json({message:error})
    }
}

exports.getPost=async(req,res)=>{
    try{
        const posts= await Post.find()
        return res.status(200).json(posts)
    }catch(error){
        return res.status(500).json({message:error})
    }

}
exports.getSinglePost=async(req,res)=>{
    try{
    const post=await Post.findById(req.params.id)
    if(!post){
        return res.status(404).json({message:"post not found"})
    }
    return res.status(200).json(post)
} catch(err)   {
    return res.status(500).json({message:err})
}
}


exports.editPost = async (req, res) => {
    try {
        const { title, description } = req.body;
        const imageUrl = req.file ? req.file.path : null;
     console.log(req.body)
     console.log(req.file)
        // Fetch the existing post to get the current values
        const existingPost = await Post.findById(req.body.id);
        console.log(existingPost)
        if (!existingPost) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Use the provided values or fallback to the existing ones
        const updatedTitle = title || existingPost.title;
        const updatedDescription = description || existingPost.description;
        const updatedImageUrl = imageUrl || existingPost.imageUrl;
     console.log("updatetitle is",updatedTitle)
        // Update the post
        const updatedPost = await Post.findByIdAndUpdate(
            req.body.id,
            { title: updatedTitle, description: updatedDescription, imageUrl: updatedImageUrl },
            { new: true }
        );

        res.status(200).json({ message: "Post updated successfully", post: updatedPost });
    } catch (err) {
        res.status(500).json({ message: "Error occurred while updating the post" });
    }
};

exports.deletePost = async (req, res) => {
    try {
      const post = await Post.findByIdAndDelete(req.params.id);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "An error occurred while deleting the post" });
    }
  };