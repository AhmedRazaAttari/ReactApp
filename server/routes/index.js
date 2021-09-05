const express = require('express');
const router = express.Router();
var cors = require('cors')
router.use(cors())

router.use('/user', require('./user'));
router.use('/channel', require('./channel'));

module.exports = router;