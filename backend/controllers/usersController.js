const express = require("express");
const pool = require("../models/db");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");


const Register =async (req,res)=>{
try{
    const {
        userName,
        age,
        Governorate,
        District,
        email,
        password,
        role_id
        
    } =req.body;
    
    const isExist =await pool.query(`SELECT * FROM users WHERE email =$1  `,[email])
    
    if(isExist.rowCount>0){
        res.status(409).json({
            success:false,
            message:"the email is already exist"
          })
    }
    else{
        const passwordHash = await bcrypt.hash(password,8);
        const result = await pool.query(`INSERT INTO users (userName,age,Governorate,District,email,password,role_id) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,[userName,age,Governorate,District,email,passwordHash,role_id]) 
         if(result.rowCount === 0){
        res.status(500).json({
              success:false,
              message:"something wrong"
            })
          }
          else{
            res.status(201).json({
              success:true,
              message:"Account created successfully"
            })
          }
        
    }

}
catch(err){
    res.status(500).json({
        success:false,
        message:err.message
      })
}

}


const LogIn =async (req,res)=>{
try{
    const {email,password}= req.body;
   
const isExist = await pool.query(`SELECT * FROM users WHERE email = $1`,[email]);
if(isExist.rowCount === 0){
    res.status(409).json({
        success:false,
        message:"Email Or Password Is Incorrect"
      })


}
else{
    const verfiy = await bcrypt.compare(password,isExist.rows[0].password)
    if(!verfiy){
        res.status(409).json({
            success:false,
            message:"Email Or Password Is Incorrect"
          })

    }
  else{
    const token = jwt.sign(
        { userId: isExist.rows[0].id, email: isExist.rows[0].email,role_id: isExist.rows[0].role_id  },
        process.env.SECRET,                
        { expiresIn: "5h" } 

    )
    res.status(201).json(
        {
            success:true,
            message:"login successfuly",
            token:token,
            userId: isExist.rows[0].id 
        }
    )


  }
}

}
catch(err){
  console.log(err.message);
  
  
    res.status(500).json({
        success:false,
        message:err.message
      })

}

} 

const updateProfileById = async(req,res)=>{
 try{
  const {
    userName,
    age,
    Governorate,
    District,
    email,
    password,
    role_id
    
  } =req.body;
  const {id} = req.params
  const result =await pool.query(`UPDATE users SET userName = $1,age= $2 ,Governorate = $3 ,District = $4 ,email = $5 ,password = $6 ,role_id = $7     WHERE user_id = $8;
  RETURNING *`,
  [ userName,
    age,
    Governorate,
    District,
    email,
    password,
    role_id,
    id])
    if(result.rowCount ===0){
      res.status(500).json({
        success:false,
        message:"something wrong"
      })
    }
    else{
      res.status(201).json({
        success:true,
        message:"Account Updated successfully"
      })
    }



 }

 catch(err){
  res.status(500).json({
    success:false,
    message:err.message
  })

 }

}


const deleteAccountById = async(req,res)=>{
try{
  const {id} = req.params;
const result = await pool.query(`UPDATE users SET is_deleted = 1 WHERE id = $1 RETURNING * `,[id]);
if(result.rowCount ===0){
  res.status(500).json({
    success:false,
    message:"something wrong"
  })
}
else{
  res.status(201).json({
    success:true,
    message:"Account Updated successfully"
  })
}
}
catch(err){
  res.status(500).json({
    success:false,
    message:err.message
  })

}

}




module.exports = {
    Register,
    LogIn,
    updateProfileById,
    deleteAccountById
}