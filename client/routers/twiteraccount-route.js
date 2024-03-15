const {ResponseData} = require('../../helpers/response-data')
const express = require('express')
const router = express.Router()
const AccountTwiterController = require('../controllers/twiteraccount-controller')



router.post('/add',AccountTwiterController.AddAcount)
router.post('/getallaccountx',AccountTwiterController.getAllAccountX)
router.post('/getaccountx',AccountTwiterController.getAccountX)
router.post('/updateaccountx',AccountTwiterController.UpdateAccount)
router.post('/removeaccountx',AccountTwiterController.RemoveAccount)
router.post('/getaccounttt',AccountTwiterController.getAccountXTT)
router.post('/addpoint',AccountTwiterController.addPoint)
router.post('/removepoint',AccountTwiterController.removePoint)







router.use('/', (req, res) => {
  return res.status(404).json(new ResponseData(false, "Not found").toJson())
})

module.exports = router