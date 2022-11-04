const models = require("../models")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const {hash}= require("bcrypt")
module.exports ={
    
    
// Login API
login: async(req,res)=>{
    const {email,password }= req.body
    console.log(req.body);
        // check If user exists
        const existingUser = await models.User.findOne({where:{email:email}})
        if(!existingUser)
        {
            return res.status(409).json({message:"User not exists",status:409})
        }
        // match credentials
        const match = await bcrypt.compareSync(password, existingUser.password)
        if(!match){
            return res.status(400).json({message:"Incorrect Password"}) }

        else{
            const token = jwt.sign({email:email,id :existingUser.id},process.env.SECRET_KEY)
              
            return res.status(201).json({message:"User logged In Successfully",userId:existingUser.id,name:existingUser.name,email:existingUser.email,role:existingUser.role,position:existingUser.position,token:token})
        }
   
},

findAll: async (req, res) => {
    // if(req.body.email){
    //     const user = await models.User.findOne({where:{email:req.body.email}})
    //     if(user.role!=='ADMIN')
    //     {
    //         return res.status(403).json({"message":"You do not have sufficient permissions to view users"})
    //     }
        const allUsers=await models.User.findAll({attributes:['name','email','role','position']})
        return res.status(200).json(allUsers)
    // }
    // return res.status(400).json({message:"Invalid Request Parameters"}) 
  },

  deleteUser: async(req,res)=>{
    // if(req.params.id){
    //     const user = await models.User.findOne({where:{email:req.body.email}})
    //     if(user.role!=='ADMIN')
    //     {
    //         return res.status(403).json({"message":"You do not have sufficient permissions to delete a user"})
    //     }
        return res.status(200).json(await models.User.destroy({where:{id:req.params.id}}))
    // }
    // return res.status(400).json({message:"Invalid Request Parameters"}) 
  },

  createUser: async(req,res)=>{

    const existingUser = await models.User.findOne({where:{email: req.body.email}})
    console.log({existingUser});
      if(req.body.throwError) throw(500)
    if(existingUser)
    {
        return res.status(409).json({message:"User already exist, Please login"})
    }
    const user=await models.User.create({
        name: req.body.name,
        email:req.body.email,
        password:await hash(req.body.password,10),
        role:req.body.role,
        position:req.body.position
         
      })
      const token = jwt.sign({email:user.email,id :user.id},process.env.SECRET_KEY)
      return res.status(201).json({ message: 'User created',user:user,token:token })
  }


}
