
exports.up = async function(knex) {
  await knex.schema.createTable("cars",(table)=>{
    table.increments("id")
    table.text("vin")
    table.text("make")
    table.date("model")
    table.float("milage")
    table.text("title_status")
  })
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists("cars")
};
