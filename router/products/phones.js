const express = require("express");
const router = express.Router();
const {Phones,phoneValidate} = require("../../models/products/phoneSchema");
const auth = require("../../middleware/auth")
const fs = require("fs") 
const cloudinary = require("../../cloudinary")
const uploads = require("../../multer")
const {log} = require("console")

// Method: Get
// Desc: Get all Product

router.get("/phones",async(req,res) => {
    try{

        const phones = await Phones.find().sort({__id:-1});

        // checking
        if(!phones.length){
            return res.status(404).json({
                state:false,
                msg:"not found",
                data:phones
            });
        }

        res.status(200).json({
            state:true,
            msg:"successfully found",
            data:phones
        })
    }
    catch(err){
        res.json(`something went wrong ${err}`)
    }
})



// Method: Post
// Desc: Create new product
router.post("/phones", uploads.array("image"),async(req,res) => {
    try{
        const uploader = async (path) => await cloudinary.uploads(path,"photos");
        let urls = [];
        
        if(req.files){
            const files = req.files;
            for (const file of files ) {
               const { path } = file ;
               const newPath = await uploader(path);
               urls.push(newPath);
               fs.unlinkSync(path)
            }
        }

        const { body } = req;
        const { error } = phoneValidate(body);

        // checking
        if(error) {
            return res.status(400).json({
                state: false,
                msg: error.details[0].message,
                data: [],
            })
        }

        let {
            title,
            price,
            desc,
            brand,
            type,
            color,
            view,
            stars,
            status,
            manufactured,
            data,
            owner,
        } = body

        const newPhone = await Phones.create({
            title,
            price,
            desc,
            brand,
            type,
            color,
            urls,
            view,
            stars,
            status,
            manufactured,
            data,
            owner,
        })

        // checking
        if (!newPhone){
            return res.status(400).json({
                state: false,
                msg: "can not create",
                data: newPhone,
            });
        }

        const savedPhone = await newPhone.save();
        // checking
        if (!savedPhone) {
            return res.status(400).json({
                state: false,
                msg: "can not saved",
                data: savedProduct,
            });
        }

        res.status(201).json({
            state: true,
            msg: "successfully created",
            data: savedProduct,
        })
    }
    catch(err){
        res.json(`smt went wrongg ${err}`)
    }
} )




module.exports = router;