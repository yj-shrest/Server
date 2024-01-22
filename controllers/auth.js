const { db } = require("../db/firebase");
const bcrypt = require("bcryptjs")


const register = async (req, res , next)=>{
    try {
        const { name, email, password } = req.body;
        if(!name|| !email || !password) console.log("Be careful@register")
        let user = await db.collection("users").where("email", "==", email).get();
    
    if(!user.docs[0]){
            console.log("here")
            const salt = await bcrypt.genSalt(7);
            const hashedPassword = await bcrypt.hash(password, salt);
        
            user = await db.collection("users").add({ name, email, password: hashedPassword  });
            res.status(201).json({msg: "New user created"});
        }
        else{
            
            res.json({msg:"User with email exists"});
        }
    } catch (error) {
        res.status(500).json(error)
    }

}
const login = async (req, res )=>{
    try {
        
        const { email, password } = req.body;
        let user = await db.collection("users").where("email", "==", email).get();
        if(!user.docs[0]){
            console.log("here")
            res.status(404).json({msg: "User with given email not found"});
        }
        else{
            console.log("found")
           const salt = await bcrypt.genSalt(7);
           const hashedPassword = await bcrypt.hash(password, salt );
           const match = await bcrypt.compare(hashedPassword, user.docs[0].data().password)
           if(match) res.status(200).json({msg:"login successful"});
           else res.status(400).json({msg:"wrong password"})
        }
    } catch (error) {
        res.status(500).json(error)
    }

}

module.exports = {login, register}