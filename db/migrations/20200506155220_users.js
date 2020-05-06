
exports.up = async function(knex) {
  await knex.schema.createTable('users', table => {
      table.increments('id')
      table.string('username', 128).notNullable().unique()
      table.string('password', 128).notNullable()
  })
}

exports.down = async function(knex, Promise) {
  await knex.schema.dropTableIfExists('users')
}
