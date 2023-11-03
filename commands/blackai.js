const axios = require("axios");
const fs = require('fs')
module.exports = {
	config: {
		name: "blackai",
		credits: "1SOY DEV",
		usePrefix: true,
		description: "use blackbox ai ",
		usage: `blackai question|query`,
		permission: 0, // Set the required permission level (0 for normal users, 1 for admin)
		// Other configuration properties
	},
	run: async function({ api, event, args, commandModules, prefix }) {
		const text = args.join(" ");
		try {
			if (!text) {
				return api.sendMessage(
					`Please Provide A Querry`,
					event.threadID,
					event.messageID,
				);
			}
			const response = await axios.get(
				`https://adonisapi.easyapi0.repl.co/api/blackbox?query=${text}`,
			);
			const respond = response.data.answer;
			api.sendMessage(respond, event.threadID, event.messageID);
		} catch (error) {
			console.error("An error occurred:", error);
			api.sendMessage(
				"Oops! Something went wrong.",
				event.threadID,
				event.messageID,
			);
		}
	},////////////////
};
