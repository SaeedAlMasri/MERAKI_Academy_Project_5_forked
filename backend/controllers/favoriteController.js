const pool = require("../models/db")





const addToFav =async (req,res)=>{

try{
    const {user,item} = req.body;

const result =await pool.query(`INSERT INTO favorites (user,item) VALUES ($1,$2) RETURNING *`,[user,item]);


if(result.rowCount === 0){
    res.status(500).json({
        success:false,
        message:"something wrong"
    })
}
else{
    res.status(201).json({
        success:true,
        message:"add to fav successfuly"


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

const getAllFav =async (req,res)=>{
try{
    const result =await pool.query(`SELECT * FROM favorites`)
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
const removeFromFav =async (req,res)=>{
    try{
        const {id} =req.params;
        const result =await pool.query(`DELETE FROM favorites WHERE id = $1 RETURNING *`,[id])
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

module.exports = {
    addToFav,
    getAllFav,
    removeFromFav

}