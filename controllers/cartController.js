const userModel = require("../models/userModel")
//Add Items to User Cart

const addToCart = async (req, res) => {
    try {
      let userData = await userModel.findById(req.body.userId);
      console.log(req.body, req.body.userId);

      let cartData = await userData.cartData;
      if (!cartData[req.body.itemId]) {
        cartData[req.body.itemId] = 1;
      } 
      else {
        cartData[req.body.itemId] = cartData[req.body.itemId] + 1;
      }
  
      await userModel.findByIdAndUpdate(req.body.userId, {cartData});
      res.json({
        success: true,
        message: "Item Added to Cart Successfully",
      });
    } catch (error) { 
      console.log(error);
      res.json({
        success: false,
        message: "Something went wrong",
      });
    }
  };
  
    


//Remove Items from User Cart

const removeFromCart = async (req, res) => {
    try {
      let userData = await userModel.findById(req.body.userId);
      let cartData = userData.cartData;
  
      if (cartData[req.body.itemId] > 0) {
        cartData[req.body.itemId] -= 1
      }

      await userModel.findByIdAndUpdate(req.body.userId, {cartData});
      res.json({
        success: true,
        message: "Item Removed from Cart Successfully",
      });
    } catch (error) {
      console.error(error);
      res.json({
        success: false,
        message: "Something went wrong",
      });
    }
  };
  

//FetchUser Cart Items

const getCartItems = async (req, res) => {
    try {
      let userData = await userModel.findById(req.body.userId);
      let cartData = await userData.cartData;
      res.json({
        success: true,
        cartData    
      });
      
    } catch (error) {
      console.error(error);
      res.json({
        success: false,
        message: "Something went wrong",
      });
    }
  };
  

module.exports = {addToCart,removeFromCart,getCartItems}