const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.json('server up and running')
})

module.exports = router