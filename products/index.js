const express = require("express")
const mongoose = require("mongoose")
const url = "mongodb://127.0.0.1:27017/store"
const Product = require("./Product")
const app = express()
app.use(express.json())
mongoose.connect(url).then(()=>console.log("Connected")).catch(e=>console.log("Not Connected" , e))
app.listen(3000,()=>console.log("Starts in 3000"))

// Gérer les Produits

//Tous Les Produits
app.get("/produits",async (req,res)=>{

     const products = await Product.find()
     res.json(products)

    })

// Afficher Produit Specific

app.get("/produit/:id",async(req,res)=>{
    const id = req.params.id
    const produit = await Product.findById(id)
    if (!produit) {
        res.json({message : "This Product Doesnt Exist"})
    }
    res.json(produit).status(200)
})
//ajouter Produit
app.post("/produit/ajouter",async(req,res)=>{
    const produit = req.body
    const newProduct = await Product.create(produit)
    res.json(newProduct).status(201)
})
//Update Product
app.put("/produit/edit/:id",async(req,res)=>{
    const id = req.params.id
    const produit = req.body
    const UpdatedProduct = await Product.findByIdAndUpdate(id,produit)
    if(!UpdatedProduct) return res.json({message : "Product Not Found"})
    res.json({message : "The Product Is Updated"})

})
// delete Produit
app.delete("/produit/:id",async(req,res)=>{
    const id = req.params.id
    const DeletedProduct = await Product.findByIdAndDelete(id) 
    if (!DeletedProduct) return res.json({message : "Product Not Found"})
    
    return res.json({message : "The Product Is Deleted"})
})

// Ajouter Au Panier

app.post("/produit/acheter",async(req,res)=>{
    const {ids} = req.body
    Product.find({_id : {$in : ids}}).then(produits => res.status(201).json(produits))
    .catch(error => res.status(400).json({ error }));
})