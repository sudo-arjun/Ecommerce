import express from "express";
import connect from './connect.js';
import multer from 'multer';
import cookieParser from 'cookie-parser'
import routes from './routes/routes.js'
// import 'dotenv/config'
const app = express();
const port = process.env.PORT || 3000;
const _dirname = 'D:\\Code\\CQ\\ecom'

app.use('/',(req,res,next)=>{
    if(req.path.startsWith('/api'))
        next();
    else
        multer().none()(req,res,next)
});
app.use(cookieParser())
app.set('view engine', 'ejs');
app.set('views', _dirname+'/client/src');

// connect database
connect().then(()=>{
    console.log("mongodb connected");
})

app.use(routes);

app.use(express.static(_dirname + '/client'))

app.use((req,res)=>{
    res.status(404).send({msg:"Page not found"});
    // res.redirect('/');
})

// app.use((err,req,res)=>{
//     res.status(500).send({'msg':'ohoh! some problem occurred'})
// })
app.listen(port, () => {
    console.log("Server is listening at", port)
})