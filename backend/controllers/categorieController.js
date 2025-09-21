const pool = require("../models/db");





const createCat =async (req,res)=>{
try{
    const {name} = req.body;
const result =await pool.query(`INSERT INTO categories (name) VALUES ($1) RETURNING *`,[name])
if(result.rowCount===0){
    res.status(500).json({
          success:false,
          message:"something wrong"
        })
      }
      else{
        res.status(201).json({
          success:true,
          message:"categorie created successfully",
          result:result.rows
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


const getAllCat =async (req,res)=>{
    try{
        const result =await pool.query(`SELECT * FROM categories`)
        if(result.rowCount === 0){
            res.status(409).json({
                success:false,
                message:"no data to show"
            })
        }
        else{
            res.status(201).json({
                success:true,
                message:"get data done",
                result:result.rows
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
const removeCat =async (req,res)=>{
    try{
        const {id} =req.params;
        const result =await pool.query(`DELETE FROM categories WHERE id = $1 RETURNING *`,[id])
        if(result.rowCount === 0){
            res.status(409).json({
                success:false,
                message:"no data to DELETE"
            })
        }
        else{
            res.status(201).json({
                success:true,
                message:"DELETE categorie successfuly",
                result:result.rows
            })}
        
        }
        catch(err){
            res.status(500).json({
                success:false,
                message:err.message
        
            })
        }
}





module.exports = {createCat,getAllCat,removeCat}