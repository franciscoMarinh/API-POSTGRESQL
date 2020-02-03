require('dotenv').config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
})

module.exports = {
  url: process.env.DATABASE_URL,
  storage: "database.sqlite",
  dialectOptions: { 
    ssl: true 
  },
  logging: false,
  define: {
    freezeTableName: true,
  }
}
