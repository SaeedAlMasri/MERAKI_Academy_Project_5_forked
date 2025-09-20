const pool = require("../models/db"); 

const authorization = (permissionNeeded) => {
  return async (req, res, next) => {
    try {
      const role_id = req.token.role_id; 

     
      const result = await pool.query(
        `SELECT permissions.permission
         FROM permissions
         JOIN role_permission 
            ON permissions.id = role_permission.permission_id
         WHERE role_permission.role_id = $1`,
        [role_id]
      );

     
      const permissions = result.rows.map(row => row.permission);

      if (!permissions.includes(permissionNeeded)) {
        return res.status(403).json({ message: "Forbidden" });
      }

      next();
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  };
};


module.exports = { authorization };
