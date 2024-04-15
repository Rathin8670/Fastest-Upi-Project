const express=require("express");
const z=require("zod")
const mongoose=require("mongoose")
const { authMiddleware } = require("./middleware");
const { Account } = require("../db");

const router=express.Router();

router.get("/balance",authMiddleware,(req,res)=>{
    const account=Account.findOne({
        userId:req.userId
    })
    res.json({
        balance:account.balance
    })
})


router.post("/transfer",authMiddleware,async(req,res)=>{
    const session = await mongoose.startSession();
    session.startTransaction();

    const {to,amount}=req.body;
    const account=await Account.findOne({
        userId:req.userId
    })

    if(account.balance<amount ){
        await session.abortTransaction();
        res.status(400).json({
            message: "Insufficient balance"
        })
    }

    const toaccount=await Account.findOne({
        userId:to
    })

    if(!toaccount){
        await session.abortTransaction();
        res.status(404).json({
            message: "Invalid account"
        })
    }

    await Account.updateOne({
        userId:req.userId
    },{
        $inc: {
            balance: -amount
        }
    })

    await Account.updateOne({
        userId:to
    },{
        $inc: {
            balance: amount
        }
    })
     // Commit the transaction
    await session.commitTransaction();
    res.json({
        message: "Transfer successful"
    })
})
module.exports=router