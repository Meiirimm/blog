const express = require('express')
const router = express.Router();
const categories = require('../categories/categories')
const Users = require('../auth/User')
const Blog = require('../Blogs/Blog')
const Comment = require('../Comment/Comment')



router.get('/' , async(req, res) => {
    const options = {}
    const categ = await categories.findOne({key : req.query.categ})
    if(categ){
        options.category = categ._id
        res.locals.categ = req.query.categ
    }
    let page = 0
    const limit = 3
    if(req.query.page && req.query.page > 0){
        page = req.query.page
    }
    if(req.query.search && req.query.search.length > 0){
        options.$or = [
            {
                titleRus: new RegExp(req.query.search, 'i')
            }
        ]
        res.locals.search = req.query.search
    }
    const totalBlogs = await Blog.count(options)
    // console.log(totalBlogs);
    const blogCounts = await Comment.aggregate([
        { $group: { _id: '$blogId', commentCount: { $sum: 1 } } }
    ]);

    const blogCommentCounts = {};
    blogCounts.forEach(count => {
        blogCommentCounts[count._id] = count.commentCount;
    });        


        
    const bookmarkCounts = await Users.aggregate([
        { $unwind: '$toRead' }, // Развернуть массив закладок
        { $group: { _id: '$toRead', bookmarkCount: { $sum: 1 } } }, // Группировка и подсчет числа закладок
    ]);
      
    const blogBookmarkCounts = {};
    bookmarkCounts.forEach(count => {
        blogBookmarkCounts[count._id] = count.bookmarkCount;
    });


    const allCategories = await categories.find()
    const blogs = await Blog.find(options).limit(limit).skip(page * limit).populate('category' , 'name').populate("author")
    const user = req.user ? await Users.findById(req.user._id) : {}
    res.render("index" , {category: allCategories, user, loginUser: req.user, blogs , pages : Math.ceil(totalBlogs / limit) , blogCommentCounts, blogBookmarkCounts})
})

router.get('/login' , (req, res) =>{
    res.render("login", {user: req.user ? req.user : {} , loginUser: req.user, })
})

router.get('/register' , (req, res) => {
    res.render("register", {user: req.user ? req.user : {}})
})

router.get('/profile/:id' , async(req, res) => {
    const user = await Users.findById(req.params.id).populate('toRead')
    .populate({path: 'toRead' , populate: {path: 'category'}})
    .populate({path: 'toRead' , populate: {path: 'author'}})
    const blogs = await Blog.find().populate('category' , 'name').populate("author")
    
    const blogCounts = await Comment.aggregate([
        { $group: { _id: '$blogId', commentCount: { $sum: 1 } } }
    ]);

    const blogCommentCounts = {};
    blogCounts.forEach(count => {
        blogCommentCounts[count._id] = count.commentCount;
    });        

    const bookmarkCounts = await Users.aggregate([
        { $unwind: '$toRead' }, // Развернуть массив закладок
        { $group: { _id: '$toRead', bookmarkCount: { $sum: 1 } } }, // Группировка и подсчет числа закладок
    ]);
      
    const blogBookmarkCounts = {};
    bookmarkCounts.forEach(count => {
        blogBookmarkCounts[count._id] = count.bookmarkCount;
    });

    const totalBlogs = await Blog.count()
    if(user){
        res.render("profile", {user: user, loginUser: req.user, blogs, totalBlogs , blogCommentCounts, blogBookmarkCounts})
    }else{
        res.redirect('/not-found')
    }
})

router.get('/admin/:id' , async(req, res) => {
    const alluser = await Users.find()
    const user = await Users.findById(req.params.id)
    const blogs = await Blog.find().populate('category' , 'name').populate("author")
    res.render("admin", {alluser, loginUser: req.user ? req.user : {}, user: user, blogs})
})


router.get('/new' , async(req, res) => {
    const allCategories = await categories.find()
    res.render("newBlog" , {category: allCategories, user: req.user ? req.user : {} , loginUser: req.user})
})

router.get('/blog/:id' , async(req, res) => {
    const user = await Users.findById(req.params.id).populate('toRead')
    .populate({path: 'toRead' , populate: {path: 'category'}})
    .populate({path: 'toRead' , populate: {path: 'author'}})
    const blogs = await Blog.find().populate('category' , 'name').populate("author")

    var blogCount = 0;
    blogs.forEach(item => {
        if (item.author.id == user._id) {
            blogCount++;
        }
    })

    const blogCounts = await Comment.aggregate([
        { $group: { _id: '$blogId', commentCount: { $sum: 1 } } }
    ]);

    const blogCommentCounts = {};
    blogCounts.forEach(count => {
        blogCommentCounts[count._id] = count.commentCount;
    });        


    const bookmarkCounts = await Users.aggregate([
        { $unwind: '$toRead' }, // Развернуть массив закладок
        { $group: { _id: '$toRead', bookmarkCount: { $sum: 1 } } }, // Группировка и подсчет числа закладок
    ]);
      
    const blogBookmarkCounts = {};
    bookmarkCounts.forEach(count => {
        blogBookmarkCounts[count._id] = count.bookmarkCount;
    });


    if(user){
        res.render("blog", {user: user, loginUser: req.user, blogs, blogCount, blogBookmarkCounts, blogCommentCounts})
    }else{
        res.redirect('/not-found')
    }
})

router.get('/view/:id' , async(req, res) => {
    const commentCount = await Comment.countDocuments({ blogId: req.params.id });
    const comment = await Comment.find({blogId: req.params.id}).populate('authorId')
    const allCategories = await categories.find()
    const blog = await Blog.findById(req.params.id).populate('category').populate("author")
    res.render("view", {category: allCategories, user: req.user ? req.user : {}, blog, comment: comment, commentCount, loginUser: req.user})
})

router.get('/edit/:id' , async(req, res) => {
    const allCategories = await categories.find()
    const blog = await Blog.findById(req.params.id)
    res.render("edit" , {user: req.user ? req.user : {}, category: allCategories, blog, loginUser: req.user})
})

router.get('/editProff/:id' , async(req, res) => {
    const user = await Users.findById(req.params.id)
    res.render("editProf" , {user: req.user ? req.user : {}, user, loginUser: req.user})
})

router.get('/not-found' , (req, res) => {
    res.render("notFound")
})

module.exports = router