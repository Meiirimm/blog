const express = require('express')
const router = express.Router();
const {saveComment, deleteComment,editComment} = require('./controller')
const {isAuth} = require('../auth/middlewares')


router.post('/api/comment' , saveComment) 
router.delete('/api/comment/:id' , isAuth, deleteComment) 
router.post('/api/comment/edit', isAuth, editComment)


module.exports = router

