const db = require('../config/db');

class User {
  static create(data, callback) {
    const query = `INSERT INTO client (companyName, siretNumber, companyAddress, addressComplement, email, phoneNumber, password)
                   VALUES (?, ?, ?, ?, ?, ?, ?)`;
    db.execute(query, [data.companyName, data.siretNumber, data.companyAddress, data.addressComplement, data.email, data.phoneNumber, data.password], callback);
  }
}

module.exports = User;
