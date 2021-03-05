module.exports = {
  dialect: "mysql",
  host: "localhost",
  username: "root",
  password: "root",
  database: process.env.NODE_ENV === "tester" ? "auth_test" : "auth_bd",
  logging: false,
  define: {
    timestamp: true,
    underscored: true,
    underscoredAll: true,
  },
};
