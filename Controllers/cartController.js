const carts = require('../Models/cartSchema')

//add to cart
exports.addtocartController = async (req,res)=>{
    const userId = req.payload
    const {id,title,price,description,category,image,rating,quantity}= req.body
    try{
        const existingProduct = await carts.findOne({id,userId})
        if(existingProduct){
            //increment product quantity
            existingProduct.quantity+=1
            //update total price
            existingProduct.totalPrice = existingProduct.price * existingProduct.quantity
            //save change to mongodb
            await existingProduct.save()
            res.status(200).json("Items added to your Cart")
        }else{
            //insert product to cart
            const newProduct = new carts({
                id,title,price,description,category,image,quantity,totalPrice:price,rating,userId
            })
            await newProduct.save()
            res.status(200).json("Item added to your cart")
        }
    }catch(err){
        res.status(401).json(err)
    }
}

//getcart
exports.getUserCartController = async (req,res)=>{
    const userId = req.payload
    try{
        const userCart = await carts.find({userId})
        res.status(200).json(userCart)
    }catch(err){
        res.status(401).json(err)
    }
}

//increment quantity
exports.incrementCartCountController = async (req,res)=>{
    const {id} = req.params
    try{
        const cartItem = await carts.findOne({_id:id})
        if(cartItem){
            cartItem.quantity += 1
            cartItem.totalPrice = cartItem.quantity * cartItem.price
            await cartItem.save()
            res.status(200).json("Item Quantity Incremented!!!")
        }else{
            res.status(404).json("Product not found!!!")
        }
    }catch(err){
        res.status(401).json(err)
    }
}

//decrement quantity
exports.decrementCartCountController = async (req,res)=>{
    const {id} = req.params
    try{
        const cartItem = await carts.findOne({_id:id})
        if(cartItem){
            cartItem.quantity -= 1
            if(cartItem.quantity==0){
                await carts.deleteOne({id})
                res.status(200).json("Cart Count updated")
            }else{
                cartItem.totalPrice = cartItem.quantity * cartItem.price
                await cartItem.save()
                res.status(200).json("Item Quantity Decremented!!!")
            }
        }else{
            res.status(404).json("Product not found!!!")
        }
    }catch(err){
        res.status(401).json(err)
    }
}

//removeitem
exports.removeCartItemController = async (req,res)=>{
    const {id} = req.params
    try{
        await carts.deleteOne({_id:id})
        res.status(200).json("item removed!!!")
    }catch(err){
        res.status(401).json(err)
    }
}

//empty cart
exports.emptyCartController = async (req,res)=>{
    const userId = req.payload
    try{
        await carts.deleteMany({userId})
        res.status(200).json("Your Cart is Empty")
    }catch(err){
        res.status(401).json(err)
    }
}