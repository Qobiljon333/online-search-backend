const mongoose = require("mongoose");
const Joi = require("joi");

const phoneSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    desc: {
        type: String,
        required: true,
    },
    brand:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    color:{
        type:String,
        required:true
    },
    urls:{
        type:Array,
        required:true
    },
    view: {
        type:Number,
        required: true,
    },
    stars:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    manufactured:{
        type:String,
        required:true
    },
    data:{
        type:String,
        required:true
    },
    owner:{
        type:String,
        required:true
    },

  },

);


const Phones = mongoose.model("phones",phoneSchema);


const phoneValidate = (body) => {
    const schema = Joi.object({
        title: Joi.string().required().min(2).max(35),
        price: Joi.number().required(),
        desc: Joi.string().required().min(5).max(1500),
        brand: Joi.string().required(),
        type: Joi.string().required(),
        color: Joi.string().required(), 
        urls: Joi.required(),
        view: Joi.number().required(),
        stars: Joi.number().required(),
        status: Joi.string().required(),
        manufactured: Joi.string().required(),
        data: Joi.string().required(),
        owner: Joi.string().required()
    });

    return schema.validate(body);
};

exports.Phones = Phones ;
exports.phoneValidate = phoneValidate ;