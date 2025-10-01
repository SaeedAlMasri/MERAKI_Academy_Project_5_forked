const pool = require("../models/db")





const addToFav =async (req,res)=>{

try{
    
    const { user_id, item_id } = req.body;

    const result = await pool.query(
      `INSERT INTO favorites (user_id, item_id) VALUES ($1, $2) RETURNING *`,
      [user_id, item_id]
    );


if(result.rowCount === 0){
    res.status(500).json({
        success:false,
        message:"something wrong"
    })
}
else{
    res.status(201).json({
        success:true,
        message:"add to fav successfuly",
        data:result.rows


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

const getAllFav = async (req, res) => {
    try {
      const { user_id } = req.params;
  
      const result = await pool.query(
        `SELECT f.id, f.created_at, i.*
         FROM favorites f
         JOIN items i ON f.item_id = i.id
         WHERE f.user_id = $1`,
        [user_id]
      );
  
      if (result.rowCount === 0) {
        return res.status(200).json({
          success: true,
          message: "No favorites found for this user",
          data: [],
        });
      }
  
      res.status(200).json({
        success: true,
        message: "Favorites retrieved successfully",
        data: result.rows,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  };
  
  const removeFromFav = async (req, res) => {
    try {
      const { user_id, item_id } = req.body;
  
      const result = await pool.query(
        `DELETE FROM favorites WHERE user_id = $1 AND item_id = $2 RETURNING *`,
        [user_id, item_id]
      );
  
      if (result.rowCount === 0) {
        return res.status(404).json({
          success: false,
          message: "Favorite not found",
        });
      }
  
      res.status(200).json({
        success: true,
        message: "Removed from favorites successfully",
        data: result.rows[0],
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  };
  

module.exports = {
    addToFav,
    getAllFav,
    removeFromFav

}