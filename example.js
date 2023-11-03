if (input.startsWith(`help`)) {
    const userVIPs = config.userVIPs;
    const senderID = event.senderID;
    const axios = require('axios');
    const input = event.body.split(/\s+/); // Split input into words
    input.shift(); // Remove the first word (prefix + 'bard')
    const data = input.join(" ");
    if (config.maintenance.enable && !userVIPs.includes(senderID)) {
        api.sendMessage(`The Bot is Currently Under Maintenance`, event.threadID, event.messageID);
        return false;
    }
    
  ///////////////////////put your code here  
  
}