const Comment = require('./Comment')
const Blog = require('../Blogs/Blog')


const saveComment = async(req,res) => {
    if(req.body.authorId && req.body.blogId && req.body.text){
        await new Comment({
            text: req.body.text,
            authorId: req.body.authorId,
            blogId: req.body.blogId,
            date: Date.now()
        }).save()
    }
    res.status(200).send(true)
}

const editComment = async(req, res) => {
    if(req.body.text.length > 0){
            const comment = await Comment.findById(req.body.id)
            const blog = await Blog.findById(req.body.userId)
            comment.text = req.body.text;
            comment.save()
           res.redirect(`/view/${blog._id}`)
    }else{
        const blog = await Blog.findById(req.body.userId)
        res.redirect(`/view/${blog._id}?error=1`)
    }
}


const deleteComment = async(req, res) => {
    const comment = await Comment.findById(req.params.id)
    if(comment){
        await Comment.deleteOne({_id: req.params.id})
        res.status(200).send('ok')    
    }else{
        res.status(404).send('Not found')
    }
}

module.exports = {
    saveComment,
    deleteComment,
    editComment
}