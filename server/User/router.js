const express = require('express')
const router = express.Router();
const {editUser, deleteUser, saveToRead, banUser, unbanUser} = require('./controller')
const {isAuth} = require('../auth/middlewares')
const {upload} = require('./multer')


router.delete('/api/user/:id' , isAuth, deleteUser)
router.post('/api/user/edit', isAuth, upload.single('image'), editUser)
router.post('/api/saveToRead' , isAuth, saveToRead)
router.post('/banUser/:userId' , banUser)
router.post('/unbanUser/:userId' , unbanUser)


module.exports = router