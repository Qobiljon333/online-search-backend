const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
require("dotenv/config")
const helmet = require("helmet");
const morgan = require("morgan");


const app = express()

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cors())

mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,   })
    .then(()=> console.log("Mongodb is connected"))
    .catch(()=> console.log("Mongodb is connected"))

    
app.get('/', async(req,res)=> {
        res.send('App is running perfectly!')
})


app.use("/products", require("./router/products/phones"))



const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`server running on port: ${PORT}`));