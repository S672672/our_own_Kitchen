const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const validator = require('validator')

//Login User

const loginUser =async (req,res)=>{
    const {email,password} = req.body;
    try {
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({
                success:false,
                message:"User Not Found"
            })
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.json({
                success:false,
                message:"Invalid Password"
            })
        }
        const token = createToken(user._id);
        res.json({
            success:true,
            message:"Login Successfully",
            token
        })
    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:"Something went Wrong !!"
        })
    }

}

const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)

}

//Register User

const registerUser =async (req,res)=>{
    const {name,email,password} = req.body;
    try {
        //checking user is already exit
        const exist = await userModel.findOne({email});
        if(exist){
            return res.json({
                success:false,
                message:"Email Already Exist"
            })
        }
        //checking email is valid or strong password
        if(!validator.isEmail(email)){
            return res.json({
                success:false,
                message:"Please enter a valid email"
            })
        }
        if(password.length < 8){
            return res.json({
                success:false,
                message:"Password must be at least 8 characters"
            })
            
        }

        //Hasing Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        //Creating New User

        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword
        })

        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({
            success:true,
            token:token,
            message:"User Created Successfully"
        })
        
    } catch (error) {
        console.log(error)
        res.json({
            success:false,
            message:"Something went wrong"
        })
        
    }
    
}

module.exports =  {loginUser, registerUser};