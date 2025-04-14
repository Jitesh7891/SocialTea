const router = require("express").Router()
const Post = require('../models/Post')
const User = require('../models/User')

//create a post
router.post("/add", async (req, res) => {
    const newPost = new Post(req.body);
    try {

        const savedPost = await newPost.save();
        return res.status(200).json(savedPost);
    } catch (error) {
        return res.status(500).json({ error });
    }
})

//update a post

router.put('/update/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.updateOne({ $set: req.body })
            return res.status(200).json(post)
        } else {
            return res.status(403).json("You can update only your post")
        }
    } catch (error) {
        return res.status(500).json({ error })
    }
})


//delete a post

router.delete('/delete/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.deleteOne();
            return res.status(200).json("post has been deleted")
        } else {
            return res.status(403).json("You can delete only your post")
        }
    } catch (error) {
        return res.status(500).json({ error })
    }
})

//like/dislike a post

router.put('/like/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(!post)return res.status(200).json({message:"post not found"})
        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({ $push: { likes: req.body.userId } });
            return res.status(200).json("post has been liked")
        } else {
            await post.updateOne({ $pull: { likes: req.body.userId } });
            return res.status(200).json("post has been disliked")
        }
    } catch (error) {
        return res.status(500).json({ message:error.message })
    }
})

//get a post

router.get('/get/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json("Post not found")
        // hide createdAt and updatedAt 
        const { createdAt, updatedAt, ...other } = post._doc;
        return res.status(200).json(other)
    } catch (error) {
        return res.status(500).json({ error })
    }
})

// Get all users' posts
router.get('/all', async (req, res) => {
    try {
        const posts = await Post.find();
        return res.status(200).json(posts);
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

//get timeline post

router.get('/timeline/:userId', async (req, res) => {
    try {
        const currentuser = await User.findById(req.params.userId);
        if(!currentuser)return res.json('User doesnt exist')
        const userPosts = await Post.find({ userId: currentuser._id });
    const friendPosts = await Promise.all(currentuser.following.map((friendId)=>{
        return Post.find({userId:friendId});
    })
        );
        res.status(200).json(userPosts.concat(...friendPosts));
    }
    catch (error) {
        return res.status(500).json({ error })
    }
})


//get all user post

router.get('/profile/:username', async (req, res) => {
    try {
        const user=await User.findOne({username:req.params.username});
        if(!user)res.status(404).json('User not found!');
        const posts=await Post.find({userId:user._id})
        res.status(200).send(posts);
    }
    catch (error) {
        return res.status(500).json({ error })
    }
})

module.exports = router

