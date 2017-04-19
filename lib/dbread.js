const User = require('./dbwrite.js').User
const OOOUser = require('./ooouser.js')

module.exports.loadUsers = function(){
  return User.findAll()
  .then((users, error) => {
    if(error){
      console.log(error);
    } else {
      var userMap = new Map()
     for(var i = 0; i < users.length; i++){
        userMap.set(JSON.parse(users[i].dataValues.username), new OOOUser(JSON.parse(users[i].dataValues.username), users[i].dataValues));
     }
     console.log(userMap)
      return userMap;


    }
  }
 )

}
