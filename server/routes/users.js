const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

//Update a user
router.put("/update/:id", async (req, res) => {
  if (req.body.userId == req.params.id || req.body.isAdmin) {

    //if user wants to change password generate it again
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        req.body.password = secPass;
      } catch (error) {
        console.log(error);
        return res.status(500).json({ error });
      }
      try {
        const user=await User.findByIdAndUpdate(req.params.id, { $set: req.body });
        return res.status(200).json({user,msg:"Account has been updated"});
      } catch (error) {
        console.log(error);
        return res.status(500).json({ error });
      }
    }
    else {
      return res.status(403).json("You can update only your account");
    }

  }
})


//Delete a user
router.delete("/delete/:id", async (req, res) => {
  if (req.body.userId == req.params.id || req.body.isAdmin) {

      try {
        const user=await User.findByIdAndDelete(req.params.id);
        return res.status(200).json({user,msg:"Account has been deleted"});
      } catch (error) {
        console.log(error);
        return res.status(500).json({ error });
      }

  }
})

//Get a user
router.get("/getuser", async (req, res) => {

      const userId=req.query.userId;
      const username=req.query.username;

      try {
        const user=userId?
        await User.findById(userId):
        await User.findOne({username:username})
        
        // .select("-password -isAdmin");
        const{password,updatedAt,...other}=user._doc;
        if(!user)return res.status(404).json("user not found");
        return res.status(200).json(other);
      } catch (error) {
        console.log(error);
        return res.status(500).json({ error });
      }

  }
)

//Follow a user
router.put("/follow/:id", async (req, res) => {
  if (req.body.userId !== req.params.id ) {
      try {
        const user=await User.findById(req.params.id);
        const currentuser=await User.findById(req.body.userId);

        if(!user.followers.includes(req.body.userId)){
          await user.updateOne({$push:{followers:req.body.userId}})
          await currentuser.updateOne({$push:{following:req.params.id}})
          return res.status(200).json(`You are now following ${user.username}`)
        }
        else{
          return res.status(400).json("You already follow this user")
        }
      } catch (error) {
        console.log(error);
        return res.status(500).json({ error });
      }
    }
    
    else {
      return res.status(403).json("You can't follow yourself");
    }
  })

//Unfollow a user
router.put("/unfollow/:id", async (req, res) => {
  if (req.body.userId !== req.params.id ) {
      try {
        const user=await User.findById(req.params.id);
        const currentuser=await User.findById(req.body.userId);

        if(user.followers.includes(req.body.userId)){
          await user.updateOne({$pull:{followers:req.body.userId}})
          await currentuser.updateOne({$pull:{following:req.params.id}})
          return res.status(200).json(`You are now unfollowing ${user.username}`)
        }
        else{
          return res.status(400).json("You dont follow this user")
        }
      } catch (error) {
        console.log(error);
        return res.status(500).json({ error:error.message });
      }
    }
    
    else {
      return res.status(403).json("You can't follow/unfollow yourself");
    }
  })

  //get friends(followers)
  router.get("/friends/:userId", async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      const friends = await User.find({
        _id: { $in: user.following },
      });
  
      const friendList = friends.map(({ _id, username, profilePicture }) => ({
        _id,
        username,
        profilePicture,
      }));
  
      res.status(200).json(friendList);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  

module.exports = router