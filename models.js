const Sequelize = require('sequelize');
const sequelize = new Sequelize('node_api_codlab', 'root', '1234' /* , '3360'*/) //파라미터 마지막은 포트번호

const User = sequelize.define('user', {
  name: Sequelize.STRING
});

module.exports = {
  sequelize: sequelize,
  User: User
}
