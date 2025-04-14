const router = require("express").Router()
const Conversation = require('../models/Conversation')


//Create new converstaion
router.post("/",async(req,res)=>{
    const sortedMemberIds = [req.body.senderId, req.body.receiverId].sort();
    
    // Search for conversation with sorted member IDs
    const conversation = await Conversation.find({
        members: { $all: sortedMemberIds }
    })
    if(conversation.length>0)return res.status(403).json({message:"You Already have a conversation ",conversation})
    const newConversation=new Conversation({
        members:[req.body.senderId,req.body.receiverId],
    })
    try{
        const savedConversation=await newConversation.save();
        res.status(200).json(savedConversation);
    }catch(error){
        res.status(500).json({error:error.message})
    }
});

//get conversation of a user
router.get("/:userId",async(req,res)=>{
    try{
        const conversations=await Conversation.find({
            members:{$in:[req.params.userId]}
        });
        res.status(200).json(conversations);
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
});

//get conversation betweeen two users
router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
    try {
      const conversation = await Conversation.findOne({
        members: { $all: [req.params.firstUserId, req.params.secondUserId] },
      });
      res.status(200).json(conversation)
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports=router