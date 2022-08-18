const mongoose = require('mongoose');

const flatSchema= new mongoose.Schema({
      name:{
          type:String,
          required:[true,'Please Enter flat name'],
          trim:true
      },
      description:{
          type:String,
          required:[true,'Please Enter flat description']
      },
      price:{
          type:Number,
          required:[true , "Enter Price"],
          maxLength:[8 , "Price can't exceeded"]
      },
      ratings:{
          type:Number,
          default:0
      },
      images:[
        {
          public_id:{
              type:String,
              required:true
          },
          url:{
              type:String,
              required:true
          },

        }
      ],
      
      category:{
          type:String
      },
      numofReviews:{
          type:Number,
          default:0
      },

      reviews:
      [
        {
           user:{
                type:mongoose.Schema.ObjectId,
                ref:"User",
                required:true
           },
            name:{
                type:String,
                required:true,
            },
            rating:{
                type:Number,
                required:true
            
            },
            comment:{
                type:String,
                required:true
            }

        }
      ],

      user:{
           type:mongoose.Schema.ObjectId,
           ref:"User",
           required:true
      },

      createdAt:{
          type:Date,
          default:Date.now,
      }



})


module.exports=mongoose.model('Flat',flatSchema);