const { Model, DataTypes } = require("sequelize");
const bcryptjs = require('bcryptjs');


class Users extends Model {
  //init, inicia o model com os campos editáveis
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
      },
      {
        sequelize,
      }
    );
  }
  passwordIsValid(password) {
    // console.log(this.password);
    // console.log(password);
    return bcryptjs.compare(password, this.password);
  }
}

module.exports = Users;
