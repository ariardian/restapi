var express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const routes = require('./src/routes/crmRoutes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/test', {
    useNewUrlParser : true,
    useUnifiedTopology : true
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}))

const BlogSchema = require('./src/models/crmModels');
const blogModel = mongoose.model('model', BlogSchema);

app.use(express.static('public'));

app.get('/', (req, res) =>{
    res.send('Selamat Datang di Halaman Latihan')
});

app.post('/newBlog', (req, res) => {
    let blog = new blogModel(req.body);
    blog.save((err, blogModel) =>{
        if(err){
            res.send(err)
        }
        res.json(blog)
    })
})
let getAllBlogs = (req, res) => {
    blogModel.find({}, (err, blogs) => {
        if (err)
            res.send(err)
        else
            res.json(blogs)
    })
}
app.get('/getBlog', getAllBlogs);

let getBlogById = (req, res) => {
    blogModel.findById((req.params.blogId), (err, blog) =>{
        if(err)
            res.send(err)
        else   
            res.json(blog);
    })
}
app.get('/blog/:blogId', getBlogById)

//endPoint
let UpdateBlog = (req, res) => {
    blogModel.findOneAndUpdate({_id: req.params.blogId}, req.body, {new: true}, (err, doUpdate) =>{
        if(err){
            res.send(err)
        }
        res.json(doUpdate);
    })
}
app.put('/blog/:blogId', UpdateBlog)

let deleteBlog = (req, res) => {
    blogModel.deleteOne({_id: req.params.blogId}, (err) =>{
        if(err){
            res.send(err)
        }
        res.json({message: 'Delete Successfully'});
    })
}
app.delete('/blog/:blogId', deleteBlog)


app.listen(PORT, () => {
    console.log(`Server running on PORT : ${PORT}`)
})