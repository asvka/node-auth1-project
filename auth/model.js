const db = require('../db/dbConfig')

function find() {
    return db("users").select("id", "username");
  }

function findById(id) {
    return db("users")
    .select("id", "username", "password")
      .where({ id })
      .first();
  }

function findBy(filter) {
    return db("users").where(filter);
  }  

async function add(user) {
    const [id] = await db("users").insert(user, "id");
  
    return findById(id);
  }

module.exports = {
    find,
    add, 
    findById,
    findBy
}