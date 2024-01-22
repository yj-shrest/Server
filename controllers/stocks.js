const { db } = require("../db/firebase");
const {scrapeInfo} = require("./puppeteer");
const {scrapeData} = require("./allData")

const addFloorsheet = async(req, res)=>{
    try {
        const {code, data }= req.body
        const  stock = await db.collection("floorsheet").where("code", "==", code).get()
        console.log(stock.docs[0])
        if(!stock.docs[0]){
            console.log("here")
              stock = await db.collection("floorsheet").add({code, data});
              res.json({msg:"added"})
            }
            else{
                console.log("enters' this block")
                const id = stock.docs[0].id
                 await db.collection("floorsheet").doc(id).update({code, data })
                res.json({msg:"updated"})
        }

} catch (error) {
        res.json(error)
    }
}

const getFLoorsheet = async(req, res)=>{
    try {
        const {code} = req.params
        const  stock = await db.collection("floorsheet").where("code", "==", code).get()
    if(stock.docs[0]){
        res.status(200).json({msg:"success", data:stock.docs[0].data()})
    }
    else{
        res.json({msg:"failure"})
    }

    } catch (error) {
        
    }
}
const getFuture = async(req, res)=>{
    try {
        const {code} = req.params
        const  stock = await db.collection("future").where("code", "==", code).get()
    if(stock.docs[0]){
        res.status(200).json({msg:"success", data:stock.docs[0].data()})
    }
    else{
        res.json({msg:"failure"})
    }

    } catch (error) {
        
    }
}

const getFundamentals=async(req,res)=>{
    try{
    const {code} = req.params
    let data = await scrapeInfo(code);
    if(data){
        console.log("=======================\n" , data)
        res.status(200).json({msg:"success", fundamentals: data}) ;
    }else{
        res.status(404).json({msg: "not found"})
    }
    }catch(error){
        res.status(500).json(error)
    }
}
const getAllData =async(req,res)=>{
    let data = await scrapeData();
    if(data){
        console.log("=======================\n" , data)
        res.json({msg:"success",data : data}) ;
    }else{
        res.status(404).json({msg: "not found"})
    }
}


const addFundamentals = async (req, res) => {
  try {
    const { code, fundamentals } = req.body;
    const stock = await db
      .collection("fundamentals")
      .where("code", "==", code)
      .get();
    console.log(stock.docs[0]);
    if (!stock.docs[0]) {
      console.log("here");
      stock = await db.collection("fundamentals").add({ code, fundamentals });
      res.json({ msg: "added" });
    } else {
      console.log("enters' this block");
      const id = stock.docs[0].id;
      await db.collection("fundamentals").doc(id).update({ code, fundamentals });
      res.json({ msg: "updated" });
    }
  } catch (error) {
    res.json(error);
  }
};

const getAllFundamentals = async (req, res) => {
  try {
    const stock = await db.collection("fundamentals").get();
    console.log(stock.docs);
    if (!stock.docs[0]) {
      console.log("here");
    
      res.json({ msg: "collection empty" });
    } else {
      console.log("enters' this block");
      const data = stock.docs.map(el=>el.data())
      res.json({ msg: "updated", data });
    }
  } catch (error) {
    res.json(error);
  }
};


const addFuture = async (req, res) => {
  try {
    const { code, data } = req.body;
    const stock = await db.collection("future").where("code", "==", code).get();
    console.log(stock.docs[0]);
    if (!stock.docs[0]) {
      console.log("here");
      stock = await db.collection("future").add({ code, data });
      res.json({ msg: "added" });
    } else {
      console.log("enters' this block");
      const id = stock.docs[0].id;
      await db.collection("future").doc(id).update({ code, data });
      res.json({ msg: "updated" });
    }
  } catch (error) {
    res.json(error);
  }
};

module.exports = {addFloorsheet,getAllData, getFLoorsheet, getFundamentals, addFundamentals, getAllFundamentals, addFuture, getFuture}