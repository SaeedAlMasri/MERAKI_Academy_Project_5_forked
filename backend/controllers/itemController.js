const express = require("express");
const pool = require("../models/db")

const createItem =async (req,res)=>{
 
 try{
    const {  
        name ,
        description  ,
        user_id ,
        image_url,
        status ,} = req.body;

        const result =await pool.query(`INSERT INTO items (name,description,user_id,image_url,status) VALUES ($1,$2,$3,$4,$5) RETURNING *`,[name,description,user_id,image_url,status]);
        if(result.rowCount === 0){
            res.status(500).json({
                success:false,
                message:"something wrong"
            })
        }
        else{
            res.status(201).json({
                success:true,
                message:"Create Item successfuly"


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


const getAllItem =async (req,res)=>{
try{
    const result =await pool.query(`SELECT * FROM items`)
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
const getItemById = async(req,res)=>{
   try{
    const {id}= req.params
    const result =await pool.query(`SELECT * FROM items WHERE id =($1)`,[id]);
    if(result.rowCount === 0){
     res.status(409).json({
        success:false,
        message:"no data to show",
      

     })

    }

    else{
        res.status(201).json({
            success:true,
            message:"get data successfuly",
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

const updateItemById = async(req,res)=>{
    try{
        const {id} = req.params;
    const {  
        name ,
        description  ,
        user_id ,
        image_url,
        status ,} = req.body;
        const result = await pool.query(
            `UPDATE items 
             SET name=$1, description=$2, user_id=$3, image_url=$4, status=$5 
             WHERE id=$6
             RETURNING *`,
            [name, description, user_id, image_url, status, id]
        );
    if(result.rowCount === 0){
        res.status(409).json({
            success:false,
            message:"no data to Update"
        })
    }
    else{
        res.status(201).json({
            success:true,
            message:"Update data successfuly",
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
const deleteItemById =async (req,res)=>{
    try{
        const {id} =req.params;
        const result = pool.query(`DELETE FROM items WHERE id = $1 RETURNING *`,[id])
        if(result.rowCount === 0){
            res.status(409).json({
                success:false,
                message:"no data to DELETE"
            })
        }
        else{
            res.status(201).json({
                success:true,
                message:"DELETE data successfuly",
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
const deleteItemByIdSoft = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(
            `UPDATE items SET is_deleted = true WHERE id = $1 RETURNING *`,
            [id]
        );

        if (result.rowCount === 0) {
            res.status(409).json({
                success: false,
                message: "No data to delete"
            });
        } else {
            res.status(200).json({
                success: true,
                message: "Item soft-deleted successfully",
                result: result.rows
            });
        }

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};





module.exports = {createItem,
    getAllItem,
    getItemById,
    updateItemById,
    deleteItemById,
    deleteItemByIdSoft

}
