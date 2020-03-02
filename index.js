const server =require("./server")


const port=3000;


server.get("/",(req,res)=>{
    res.send("<h1>Welcome to the Dealer<h1/>")
})


server.listen(port,()=>{
    console.log(`Server listening on port ${port}`)
})