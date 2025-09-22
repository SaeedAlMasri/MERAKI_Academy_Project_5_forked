const pool = require("../models/db");


const createExchange = async (req, res) => {
    try {
      const { item_offered_id, item_requested_id, from_user_id, to_user_id } = req.body;
  
      const result = await pool.query(
        `INSERT INTO exchanges (item_offered_id, item_requested_id, from_user_id, to_user_id)
         VALUES ($1, $2, $3, $4) RETURNING *`,
        [item_offered_id, item_requested_id, from_user_id, to_user_id]
      );
  
      res.status(201).json({ success: true, exchange: result.rows[0] });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Error creating exchange" });
    }
  };



  const getExchangesByUser = async (req, res) => {
    try {
      const { id } = req.params;
  
      const result = await pool.query(
        `SELECT * FROM exchanges WHERE from_user_id = $1 OR to_user_id = $1`,
        [id]
      );
  
      res.status(200).json({ success: true, exchanges: result.rows });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Error fetching exchanges" });
    }
  };

  const updateExchangeStatus = async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body; 
  
      const result = await pool.query(
        `UPDATE exchanges SET status = $1 WHERE id = $2 RETURNING *`,
        [status, id]
      );
  
      if (result.rowCount === 0) {
        return res.status(404).json({ success: false, message: "Exchange not found" });
      }
  
      res.status(200).json({ success: true, exchange: result.rows[0] });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Error updating exchange status" });
    }
  };


  module.exports = {
    createExchange,
    getExchangesByUser,
    updateExchangeStatus,
  };

