const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const multer = require('multer');
const path=require ("path")
var cors=require('cors')

dotenv.config()

const app = express();
const port = 8800;

app.listen(port, () => {
    console.log('Backend started on port ', port)
})

//middleware
app.use(express.json())
app.use(morgan("common"))

//serve static files
app.use("/images",express.static(path.join(__dirname,"public/images")));

const corsOptions = {
    origin: ['https://social-tea.vercel.app','https://socialtea.onrender.com'],
    methods: 'GET,PUT,PATCH,POST,DELETE', // Specify allowed HTTP methods
    optionsSuccessStatus: 200,
  };

  app.use(cors(corsOptions));


async function connectToMongoose() {
    await mongoose.connect(`${process.env.MONGO_URL}`, { useNewUrlParser: true });
    console.log('connected to mongoose')
}
connectToMongoose();

//Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/users', require('./routes/users'))
app.use('/api/posts', require('./routes/posts'))

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images")
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name)
    }
})

const upload = multer({storage});
app.post("/api/upload", upload.single("file"), (req, res) => {
    try {
        return res.status(200).json("file uploaded Successfully")
    } catch (err) {
        console.log(err);
    }
})
