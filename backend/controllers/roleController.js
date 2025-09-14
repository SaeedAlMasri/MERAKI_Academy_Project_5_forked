const express = require("express");
const pool = require("../models/db");


const createNewRole = async(req,res)=>{
try{
    const {role} =req.body;
    const result =await pool.query(`INSERT INTO roles (role) VALUES($1)  RETURNING * `,[role])
    if(!result.rowCount>0){
        res.status(500).json({
            success:false,
            message:"Server error"
    })

}
else{
    res.status(201).json({
        success:true,
        message:"Role created successfully",
        role:result.rows
      })
}
}
catch(err){
    res.status(500).json({
        success: false,
        message: "Server error",
        error: err.message
      });

}


}


const createNewPermission =async (req,res)=>{
try{
    const {permission} = req.body;
    const result = await pool.query(`INSERT INTO permissions (permission) VALUES($1)  RETURNING * `,[permission])
    if(!result.rowCount>0){
       res.status(500).json({
           success:false,
           message:"something error"
   })
   
    }
    else{
       res.status(201).json({
           success:true,
           message:"permission created successfully",
           role:result.rows
         })
   
    }

}
catch(err){
    res.status(500).json({
        success: false,
        message: "Server error",
        error: err.message
      });

}
}
const createNewRolePermission =async (req, res) => {
    try{
      const {role_id,permission_id} = req.body;
    const result =await pool.query(`INSERT INTO role_permission (role_id,permission_id) VALUES ($1,$2) RETURNING * `,[role_id,permission_id])
    if(result.rowCount === 0){
      res.status(500).json({
        success:false,
        message:"Server error"
      })
    }
    else{
      res.status(201).json({
        success:true,
        message:"role_permission created successfully",
        role_permission:result.rows
      })
    }
  }
  catch (error) {
  res.status(500).json({
    success: false,
    message: "Server error",
    error: error.message
  });
  }
  };
module.exports = {
    createNewRole,
    createNewPermission,
    createNewRolePermission
}