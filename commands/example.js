const axios = require("axios");
const fs = require('fs')
module.exports = {
  config: {
    name: "Example" ,
    usePrefix: true,
    description: "An example command",
    permission: 0,  //// 0|1|2   -0 all user  - 1 for admin and 3 for dev 
	credits: "OPERATOR ISOY",
	description: "",
	commandCategory: "group",
	usages: "",
	cooldowns: 5,
  },
  run: async function({ api, event, args, commandModules }) {

try{
  
}
catch(error){
  console.log(error);
}

    api.sendMessage('',event.threadID,event.messageID);
  },
};
