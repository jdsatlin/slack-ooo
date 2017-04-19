const Sequelize = require('sequelize')
const dotEnv = require('dotenv').config();

var sequelize = new Sequelize(process.env.DATABASE, process.env.USERNAME, process.env.PASSWORD, {
  host: process.env.HOST,
  dialect: process.env.DIALECT,
  dialectOptions: {
    encrypt: process.env.ENCRYPT
  },
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }});
var User = sequelize.define('slackooo', {
    username: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    status: {
      type: Sequelize.STRING
    },
    message: {
      type: Sequelize.STRING
    },
    ooostart: {
      type: Sequelize.STRING
    },
    oooend: {
      type: Sequelize.STRING
    },},
    {
    freezeTableName: true // Model tableName will be the same as the model name
}
  );

module.exports.createUser = function(currentUser) {
    User.findOrCreate({
      where: {
        username: JSON.stringify(currentUser.username)
      },
      defaults:{
          username: JSON.stringify(currentUser.username),
          status: JSON.stringify(currentUser.status),
          message: JSON.stringify(currentUser.message),
          ooostart: JSON.stringify(currentUser.ooo_start),
          oooend: JSON.stringify(currentUser.ooo_end),


      }
    }
    )

    .then((user, error) => {
      if(error){
        console.log(error);
      }
    });
}

module.exports.updateUserStart = function(thisuser, time){
  User.update(
    {
    ooostart: JSON.stringify(time)
    }
   ,{
    where: {
      username: JSON.stringify(thisuser.username)
    },
    plain:true
  })
  .then((user, error) => {
    if(error){
      console.log(error);
    }
  });
}

module.exports.updateUserEnd = function(thisuser, time){
  User.update(
    {
    oooend: JSON.stringify(time)
   }
  ,{
    where: {
      username: JSON.stringify(thisuser.username)
    },
    plain:true
  })
  .then((user, error) => {
    if(error){
      console.log(error);
    }
  });
}

module.exports.updateMessage = function(thisuser, message){
  User.update(
    {
    message: JSON.stringify(message)
   }
  ,{
    where: {
      username: JSON.stringify(thisuser.username)
    },
    plain:true
  })
  .then((user, error) => {
    if(error){
      console.log(error);
    }
  });
}

module.exports.updateStatus = function(thisuser, userStatus){
  User.update(
    {
    status: JSON.stringify(thisuser.status)
   }
  ,{
    where: {
      username: JSON.stringify(thisuser.username)
    },
    plain:true
  })
  .then((user, error) => {
    if(error){
      console.log(error);
    }
  });
}



module.exports.User = User
