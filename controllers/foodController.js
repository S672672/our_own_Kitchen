const foodModel = require("../models/foodModel");
const fs = require('fs');

//Add food Items

const addFood = async (req,res)=>{

    let image_filename = `${req.file.filename}`

    const food = new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename


    

    })
    try {
        await food.save()
        res.json({
            success:true,
            message:"Food Added Successfully !!"
        })
        
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Something Error"})

        
    }

}

//All food list

const listFood = async (req,res)=>{
    try {
        const foods = await foodModel.find({});
        res.json({success:true,data:foods})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }

}

//Remove Food Item

const removeFood =async(req,res)=>{
    try {
        const food = await foodModel.findById(req.body.id)
        fs.unlink(`uplodes/${food.image}`,()=>{})
        await foodModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"Food Remove Successfully !!!"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }

}

module.exports = {addFood,listFood,removeFood}