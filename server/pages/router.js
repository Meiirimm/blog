const express = require('express')
const router = express.Router();
const categories = require('../categories/categories')
const Users = require('../auth/User')


router.get('/' , async(req, res) => {
    const allCategories = await categories.find()
    res.render("index" , {category: allCategories, user: req.user ? req.user : {}})
})

router.get('/login' , (req, res) =>{
    res.render("login", {user: req.user ? req.user : {}})
})

router.get('/register' , (req, res) => {
    res.render("register", {user: req.user ? req.user : {}})
})

router.get('/profile/:id' , async(req, res) => {
    const alluser = await Users.find()
    const user = await Users.findById(req.params.id)
    if(user){
        res.render("profile", {alluser, user: user, loginUser: req.user})
    }else{
        res.redirect('/not-found')
    }
})

router.get('/admin/:id' , async(req, res) => {
    const alluser = await Users.find()
    const user = await Users.findById(req.params.id)
    res.render("admin", {alluser, loginUser: req.user ? req.user : {}, user: user})
})


router.get('/new' , async(req, res) => {
    const allCategories = await categories.find()
    res.render("newBlog" , {category: allCategories})
})

router.get('/blog' , (req, res) => {
    res.render("blog")
})

router.get('/view' , (req, res) => {
    res.render("view")
})

router.get('/edit' , async(req, res) => {
    const allCategories = await categories.find()
    res.render("edit" , {category: allCategories})
})

router.get('/editUsers/:id' , async(req, res) => {
    const user = await Users.findById(req.params.id);
    res.render("editUsers", {user})
})

router.get('/not-found' , (req, res) => {
    res.render("notFound")
})

router.post('/editUsers/:id' , async(req, res) => {
    await Users.updateOne(
      {
        _id: req.params.id,
      },
      {
          full_name: req.body.full_name,
          email: req.body.email,
      }
    );
    res.redirect("/profile/:id");
})

router.delete("/delete/:id", async (req, res) => {
    await Users.deleteOne({ _id: req.params.id });
    res.status(200).send("ok");
});


module.exports = router