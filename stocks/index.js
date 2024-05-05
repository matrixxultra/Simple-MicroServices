const express = require("express")
const mongoose = require("mongoose")
const url = "mongodb://127.0.0.1:27017/store"
const Stock = require("./Stock")
const { default: axios } = require("axios")
const app = express()
app.use(express.json())
mongoose.connect(url).then(()=>console.log("Connected")).catch(e=>console.log("Not Connected" , e))
app.listen(5000,()=>console.log("Starts in 5000"))

async function callProduct(){
    try
  {
    const uri = 'http://localhost:3000/produit/ajouter'
  const response =await axios.post(uri)
  return response.data
  console.log(response.data)

}
catch(e){
    console.log(e)
}
}
async function callOrder(){
    try
    {
      const uri = 'http://localhost:4000/order/ajouter'
    const response =await axios.post(uri)
    return response.data
    console.log(response.data)
  
  }
  catch(e){
      console.log(e)
  }
}
app.get("/allproducts",async (req,res)=>{
    const products = await Stock.find()
    res.json(products)
})
app.post("/stock/ajouter",async(req,res)=>{
    const product = req.body
    console.log(product)
    const data =await callProduct() 
    console.log(data)
    res.json(55)
    // const stock = await Stock.create()

    // res.json({message : "Created With Success"})
}) 
app.put("/stock/edit",async(req,res)=>{

})