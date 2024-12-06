const mysql = require('mysql2')

const db = mysql.createConnection({
  host: "doaso.mysql.database.azure.com",
  user: "AdmDoaso",
  password: "@Doaso123",
  database: "doaso",
  port: 3306
})

db.connect((err) => {
  if (err) {
      console.log("Falha de conexão!" + err.stack);
      return;
  }

  console.log("Conexão estabelecida: " + db.threadId);
});

module.exports = db;