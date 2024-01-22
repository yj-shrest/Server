const stockRouter = require("express").Router()
const {addFloorsheet, getFLoorsheet, getFundamentals, addFundamentals, getAllFundamentals, getFuture, addFuture, getAllData} = require("../controllers/stocks")



stockRouter.route("/floorsheet/add").post(addFloorsheet)
stockRouter.route("/floorsheet/:code").get(getFLoorsheet)
stockRouter.route("/fundamentals/:code").get(getFundamentals).post(addFundamentals)
stockRouter.route("/fundamentals").get(getAllFundamentals)
stockRouter.route("/data").get(getAllData)
stockRouter.route("/future/:code").get(getFuture).post(addFuture)



module.exports = {stockRouter}