const db = require('../db/dbConfig')


function findById(id) {
    return db("users")
    .select("id", "username", "password")
      .where({ id })
      .first();
  }

async function add(user) {
    const [id] = await db("users").insert(user, "id");
  
    return findById(id);
  }

module.exports = {
    add, 
    findById
}