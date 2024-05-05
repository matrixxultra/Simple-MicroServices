const express = require("express")
const mongoose = require("mongoose")
const url = "mongodb://127.0.0.1:27017/store"
const Order = require("./Order")
const   axios  = require("axios")
const app = express()
app.use(express.json())
mongoose.connect(url).then(()=>console.log("Connected")).catch(e=>console.log("Not Connected" , e))
app.listen(4000,()=>console.log("Starts in 4000"))

// Calculate The Total Price
function prixTotal(products){
    let total = 0
    for (const produit of products) {
        total += parseInt(produit.price)
    }
    return total
}
// Renvoi un requete pour obtenir la resultat se set Requete
async function HttpRequest(ids){
    try{
        const uri = "http://localhost:3000/produit/acheter"
        const response = await axios.post(uri,{ids : ids},{
            headers : {
                'Content-Type':'application/json'
            }
        })
  
    return prixTotal(response.data)
    }
    catch(e){
        console.log(error)
    }
}
// Afficher Tous Les Order
app.get("/order", async(req,res)=>{
    const orders = await Order.find()
    res.json(orders).status(200)
})
// Ajouter Order
app.post("/order/ajouter" , async(req,res)=>{
    const {ids , email_user } = req.body

    const total = await HttpRequest(ids)
    const order = await Order.create({produits : ids , email_user , total_price : total})
    res.json(order)
    // res.json({message : "The Commande Is Added"}) 

}) 
// Delete Order
app.delete("/order/delete/:id",async(req,res)=>{
    const id = req.params.id
    const deletedOrder = await Order.findByIdAndDelete(id)
    if(!deletedOrder) return res.json( {message : "Order Not Found"} )
    res.json({message : "The Order Is Deleted"})
})

// UpdateOrder
app.put("/order/edit/:id" , async(req,res)=>{
    const id = req.params.id
    const {ids , email_user} = req.body
    const UpdatedOrder = await Order.findByIdAndUpdate(id,{email_user : email_user ,produits : ids})
    res.json({message : "The Commande Is Added"}) 

})
