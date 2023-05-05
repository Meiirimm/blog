const express = require('express')
const router = express.Router();
const writeDataCategory = require('./seed')
const {getAllCategories} = require('./controller')

router.get('/api/categ' , getAllCategories)
writeDataCategory()

module.exports = router