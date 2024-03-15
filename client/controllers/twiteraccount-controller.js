const { ResponseData } = require('../../helpers/response-data')
const twiterAccountService = require('../services/twiteracount-service.js')

class twiterAccountController {
  async AddAcount(req, res) {
    try {
      const response = await twiterAccountService.addAcount(req)
      if (response)      
        return res.json(new ResponseData(true, 'Add thanh cong').toJson())
      return res.json(new ResponseData(false, 'Add ky that bai').toJson())
    } catch (err) {
      console.log(Date.now())
      console.log(err)
      res.json(new ResponseData(false, err.message).toJson())
    }
  }
  async UpdateAccount(req, res) {
    try {
      const response = await twiterAccountService.updateAccount(req)
      if (response)      
        return res.json(new ResponseData(true, 'update thanh cong').toJson())
      return res.json(new ResponseData(false, 'update  that bai').toJson())
    } catch (err) {
      console.log(Date.now())
      console.log(err)
      res.json(new ResponseData(false, err.message).toJson())
    }
  }
  async RemoveAccount(req, res) {
    try {
      const response = await twiterAccountService.removeAccount(req)
      if (response)      
        return res.json(new ResponseData(true, 'xoa thanh cong').toJson())
      return res.json(new ResponseData(false, 'xoa  that bai').toJson())
    } catch (err) {
      console.log(Date.now())
      console.log(err)
      res.json(new ResponseData(false, err.message).toJson())
    }
  }
  async getAllAccountX(req, res) {
    try {
      const response = await twiterAccountService.getAllAcountX(req)
      if (response)      
        return res.json(new ResponseData(true, 'Get  thanh cong', response).toJson())
      return res.json(new ResponseData(false, 'Get  that bai').toJson())
    } catch (err) {
      console.log(Date.now())
      console.log(err)
      res.json(new ResponseData(false, err.message).toJson())
    }
  }
  async getAccountX(req, res) {
    try {
      const response = await twiterAccountService.GetAcountX(req)
      if (response)      
        return res.json(new ResponseData(true, 'Get  thanh cong', response).toJson())
      return res.json(new ResponseData(false, 'Get  that bai').toJson())
    } catch (err) {
      console.log(Date.now())
      console.log(err)
      res.json(new ResponseData(false, err.message).toJson())
    }
  }
  async getAccountXTT(req, res) {
    try {
      const response = await twiterAccountService.GetAcountXTT(req)
      if (response)      
        return res.json(new ResponseData(true, 'Get  thanh cong', response).toJson())
      return res.json(new ResponseData(false, 'Get  that bai').toJson())
    } catch (err) {
      console.log(Date.now())
      console.log(err)
      res.json(new ResponseData(false, err.message).toJson())
    }
  }
  async addPoint(req, res) {
    try {
      const response = await twiterAccountService.AddPoint(req)
      if (response)      
        return res.json(new ResponseData(true, 'Add  thanh cong').toJson())
      return res.json(new ResponseData(false, 'Add  that bai').toJson())
    } catch (err) {
      console.log(Date.now())
      console.log(err)
      res.json(new ResponseData(false, err.message).toJson())
    }
  }
  async removePoint(req, res) {
    try {
      const response = await twiterAccountService.RemovePoint(req)
      if (response)      
        return res.json(new ResponseData(true, 'remove  thanh cong').toJson())
      return res.json(new ResponseData(false, 'remove  that bai').toJson())
    } catch (err) {
      console.log(Date.now())
      console.log(err)
      res.json(new ResponseData(false, err.message).toJson())
    }
  }
}

module.exports = new twiterAccountController