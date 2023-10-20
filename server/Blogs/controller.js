const Blog = require('./Blog')
const User = require('../auth/User')

const fs = require('fs')
const path = require('path')

const createBlog = async(req, res) => {
    if(req.file && req.body.titleRus.length > 5 && req.body.description.length > 5 && req.body.category.length > 2){
        await new Blog({
            titleRus: req.body.titleRus,
            category: req.body.category,
            description: req.body.description,
            image: `/images/blogs/${req.file.filename}`,
            author: req.user._id,
        }).save()
        if(req.user.isAdmin){
            res.redirect(`/admin/${req.user._id}`)
        }else{
            res.redirect(`/profile/${req.user._id}`)
        }
    }else{
        res.redirect('/new?error=1')
    }
}

const editBlog = async(req, res) => {
    if(req.file && req.body.titleRus.length > 5 && req.body.description.length > 5 && req.body.category.length){
            const blog = await Blog.findById(req.body.id)
            fs.unlinkSync(path.join(__dirname + '../../../public' + blog.image))
            blog.titleRus = req.body.titleRus;
            blog.category = req.body.category;
            blog.description = req.body.description;
            blog.image = `/images/blogs/${req.file.filename}`;
            // blog.author = req.user._id;
            blog.save()
            if(req.user.isAdmin){
                res.redirect('/admin/' + req.user._id)
            }else{
                res.redirect('/profile/' + req.user._id)
            }
    }else{
        res.redirect(`/edit/${req.body.id}?error=1`)
    }
}

const deleteBlog = async(req, res) => {
    const blog = await Blog.findById(req.params.id)
    if(blog){
        fs.unlinkSync(path.join(__dirname + '../../../public' + blog.image))
        await blog.deleteOne({_id: req.params.id})
        res.status(200).send('Вы хотите удалить блог?')
    }else{
        res.status(404).send('Not-found')
    }
}

const saveBlog = async(req, res) => {
    if(req.user && req.body.id){
        const user = await User.findById(req.user.id)
        const findBlog = user.toRead.filter(item => item._id == req.body.id)
        if (findBlog.length == 0){
            user.toRead.push(req.body.id)
            user.save()
            res.send('Блог успешно сохранен')
        }else{
            res.send('Блог уже сохранен')
        }
    }
    
}

const deleteFromToRead = async(req, res) => {
    if(req.user && req.params.id){
        const user = await User.findById(req.user.id)
        for(let i = 0; i < user.toRead.length; i++){
            if(user.toRead[i] == req.params.id){
                user.toRead.splice(i, 1)
                user.save()
                res.send('Успешно удалено')
            }
        }
    }
}


module.exports = {
    createBlog,
    editBlog,
    deleteBlog,
    saveBlog,
    deleteFromToRead
}