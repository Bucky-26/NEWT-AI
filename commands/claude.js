const axios = require("axios");

module.exports = {
	config: {
		name: "mistral",
		usePrefix: true,
		description: "Ai powered by Mistral Language model",
		permission: 0, // 0|1|2 - 0 all user - 1 for admin and 3 for dev
		credits: "OPERATOR ISOY",
		description: "",
		commandCategory: "group",
		usages: "",
		cooldowns: 5,
	},
	run: async function ({ api, event, args, commandModules }) {
		const question = args.join(' ');
		if (!question) {
			api.sendMessage('Please Provide A Query', event.threadID, event.messageID);
			return;
		}
		api.sendMessage('Generating Response Please Wait', event.threadID, event.messageID);

		try {
			const response = await axios.get(`https://claude-1.easyapi0.repl.co/api/claude?query=${encodeURIComponent(question)}&api=https://newtai.bgfxd.repl.co`);
			const data = response.data;
			const claude = data.content;
			api.sendMessage(claude, event.threadID);
		} catch (error) {
			console.log(error);
			api.sendMessage('An error occurred while generating the response.', event.threadID);
		}
	},
};
