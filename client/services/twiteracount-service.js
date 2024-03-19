const { Users } = require('../../model/Users')
const { AccountTwiter } = require('../../model/AccountTwiter')
const ROLE = require('../../model/enum/role')
const jwt = require('jsonwebtoken')
// const bcrypt = require("bcrypt")
const config = require('../../config/config')
const e = require('cors')
// const http = require('../../http/http-client')

let twiterAccountService = {
  addAcount: async function (req) {
    return new Promise(async function (resolve, reject) {
      try {
        const check = await validateBody(req)
        if (check) {
          return reject(new Error(check))
        }

        const keyPc = req.body.keyPc
        const idProfile = req.body.idProfile
        const userNameX = req.body.userNameX
        const passWord = req.body.passWord
        const twoFa = req.body.twoFa
        const cookie = req.body.cookie
        let typeProxy = req.body.typeProxy
        const proxy = req.body.proxy
        const keyGpt = req.body.keyGpt
        const status = "unknow"
        const action = req.body.action
        const filter = { 'keyPc': keyPc }
        const user = await Users.findOne(filter, { createdAt: 0, updatedAt: 0, __v: 0 })
        if (user._id == null) {
          reject(false)
        }
        const acctwitter = await AccountTwiter.findOne({userNameX:userNameX})
        if(acctwitter){
          reject(false)
        }
        const  accounts = await AccountTwiter.countDocuments({idUser:user._id})
        if(accounts>=10){
          reject(false)
        }
        if(typeProxy==null){
          typeProxy=0
        }
        await AccountTwiter({
          idUser: user._id,
          userNameX: userNameX,
          idProfile: idProfile,
          passWord: passWord,
          twoFa: twoFa,
          cookie: cookie,
          typeProxy: typeProxy,
          proxy: proxy,
          keyGpt:keyGpt,
          status:status,
          action:action
        }).save()
        return resolve(true)
      } catch (e) {
        console.log(e)
        reject(new Error("Loi khi them tai khoan X"))
      }
    })
  },
  updateAccount: async function (req) {
    return new Promise(async function (resolve, reject) {
      try {
        const keyPc = req.body.keyPc
        const userNameXed = req.body.userNameXed
        const userNameX = req.body.userNameX
        const passWord = req.body.passWord
        const twoFa = req.body.twoFa
        const cookie = req.body.cookie
        const status = req.body.status
        const typeProxy = req.body.typeProxy
        const proxy = req.body.proxy
        const keyGpt = req.body.keyGpt
        const action = req.body.action

        const user = await Users.findOne({ keyPc: keyPc })
    
        if (!user) {
          return reject(new Error("tài khoản không đúng!"))
        }
        if (!user.active) {
          return reject(new Error("tài khoản chưa active!"))
        }


        const account = await AccountTwiter.findOne({ idUser: user._id ,userNameX: userNameXed })
        if (!account) {
          return reject(new Error("account X không đúng!"))
        }
        let update = {}
        if (userNameX) update.userNameX = userNameX
        if (cookie) update.cookie = cookie
        if (passWord) update.passWord = passWord
        if (twoFa) update.twoFa = twoFa
        if (status) update.status = status
        if (typeProxy!="") update.typeProxy = typeProxy
        if (proxy) update.proxy = proxy
        if (keyGpt) update.keyGpt = keyGpt
        if (action) update.action = action

        const response = await AccountTwiter.findOneAndUpdate({ _id: account._id }, update, { new: true })
        resolve(response)
      } catch (e) {
        console.log(e)
        console.log(logger(e))
        return reject(e)
      }
    })
  },
  removeAccount: async function (req) {
    return new Promise(async function (resolve, reject) {
      try {
        const keyPc = req.body.keyPc
        const userNameX = req.body.userNameX
        const user = await Users.findOne({ keyPc: keyPc })
        if (!user) {
          return reject(new Error("tài khoản không đúng!"))
        }
        if (!user.active) {
          return reject(new Error("tài khoản chưa active!"))
        }
        const account = await AccountTwiter.findOne({ idUser: user._id ,  userNameX: userNameX })
        if (!account) {
          return reject(new Error("account X không đúng!"))
        }
        const response = await AccountTwiter.findOneAndDelete({ _id: account._id })
        resolve(response)
      } catch (e) {
        console.log(e)
        console.log(logger(e))
        return reject(e)
      }
    })
  },
  async getAllAcountX(req) {
    try {
      return new Promise(async (resolve, reject) => {
        await Users.findOne({ keyPc: req.body.keyPc }, (err, data) => {
          if (err) {
            return reject(err)
          } else {
            let response = AccountTwiter.find({ idUser: data._id })

            return resolve(response)
          }

        })
      },)
    } catch (e) {
      console.log(e)
      throw e
    }
  },
  async GetAcountX(req) {
    try {
      return new Promise(async (resolve, reject) => {
 
        const userNameX = req.body.userNameX
        await Users.findOne({ keyPc: req.body.keyPc }, (err, data) => {
          if (err) {
            return reject(err)
          } else {
            if (data.active) {

              const response = AccountTwiter.findOne({ idUser: data._id,userNameX: userNameX  })

              return resolve(response)
            } else {
              return reject(false)
            }
          }
        })
      },)
    } catch (e) {
      console.log(e)
      throw e
    }
  },
  async GetAcountXTT(req) {
    try {
      return new Promise(async (resolve, reject) => {
        const keyPc = req.body.keyPc
        const user = await Users.findOne({ keyPc: keyPc }, async (err, data) => {
          if (err) {
            return reject(err)
          } else {
            if (data.active) {

              let response = await AccountTwiter.find({action: "false" })
              let resData = [];
              
            
              for (const element of response) {
                if(element.idUser!=user._id){
                await Users.findOne({ _id: element.idUser}, async (err, data) => {
                  if (err) {
                    return reject(err)
                  } else {
                    if (data.active&&data.point>10) {
                      resData.push(element.userNameX)
                    }
                  }
              })}
              }

              return resolve(resData);
            } else {
              return reject(false)
            }
          }
        })
      },)
    } catch (e) {
      console.log(e)
      throw e
    }
  },
  async AddPoint(req) {
    try {
      return new Promise(async (resolve, reject) => {
        const keyPc = req.body.keyPc
        const point = req.body.point

        const user = await Users.findOne({ keyPc: keyPc }, async (err, data) => {
          if (err) {
            return reject(err)
          } else {
            if (data.active) {
            const totalPoint = point+data.point
            const resData = await Users.findOneAndUpdate({_id:data._id},{point:totalPoint},{ new: true})

              return resolve(resData);
            } else {
              return reject(false)
            }
          }
        })
      },)
    } catch (e) {
      console.log(e)
      throw e
    }
  },
  async RemovePoint(req) {
    try {
      return new Promise(async (resolve, reject) => {
        const userNameX = req.body.userNameX
        const point = req.body.point
        const userId = await AccountTwiter.findOne({ userNameX: userNameX })

        const user = await Users.findOne({ _id: userId.idUser }, async (err, data) => {
          if (err) {
            return reject(err)
          } else {
            if (data.active) {
            const totalPoint = data.point-point
            const resData = await Users.findOneAndUpdate({_id:data._id},{point:totalPoint},{ new: true})

              return resolve(true);
            } else {
              return reject(false)
            }
          }
        })
      },)
    } catch (e) {
      console.log(e)
      throw e
    }
  },
}

async function validateBody(req) {
  if (!req.body.keyPc) return 'Nhap thieu key'
  return null
}
async function getUser(keyPc) {
  try {
    return new Promise((resolve, reject) => {
      Users.findOne({ keyPc: keyPc }, (err, data) => {
        if (err) return reject(err)
        return resolve(data)
      })
    })
  } catch (e) {
    console.log(e)
    throw e
  }
}

module.exports = twiterAccountService