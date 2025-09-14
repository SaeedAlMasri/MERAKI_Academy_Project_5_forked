const {Pool} = require("pg");


const pool = new Pool({
    connectionString: process.env.CONNECTION_DB
})


pool.connect((err,pool)=>{
    if(err){
        console.error("pool err", err.message, err.stack);
        return ;
        
    }
    console.error("pool connect" , pool.user);
    
})


module.exports = pool