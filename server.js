const express=require("express")
const server=express()
const carRouter=require('./router/carRouter')


server.use(express.json())
server.use("/cars",carRouter)


server.use((err,req,res,next)=>{
    res.status(500).json({message:"Server Error"})
})

module.exports=server;


