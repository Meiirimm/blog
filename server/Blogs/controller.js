const Blog = require('./Blog')

const createBlog = (req, res) => {
    if(req.file && req.body.titleRus.length > 5 && req.body.description.length > 5 && req.body.category.length > 2){
        new Blog({
            titleRus: req.body.titleRus,
            category: req.body.category,
            description: req.body.description,
            image: `${req.file.destination}/${req.file.filename}`,
            author: req.user._id,
        }).save()
        res.redirect(`/profile/${req.user._id}`)
    }else{
        res.redirect('/new?error=1')
    }
}

module.exports = {
    createBlog
}