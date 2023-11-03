const axios = require("axios");
const fs = require('fs');
module.exports = {
	config: {
		name: "imgsearch",
		usePrefix: true,
		credits: "1SOY DEV",
		usage: `imgsearch query`,
		description: "search an image on Google",
		permission: 0, // Set the required permission level (0 for normal users, 1 for admin)
	},
	run: async function({ api, event, args, commandModules }) {
		const query = args.join(" ");
		async function performImageSearch() {
			try {
				if (!query) {
					api.sendMessage(`Please Provide A Query...`, event.threadID, event.messageID);
					return false;
				}
				api.sendMessage(`Searching Image🔍, Please Wait.....`, event.threadID, event.senderID);
				const res = await axios.get(`https://api.heckerman06.repl.co/api/search/google-image?query=${query}&apikey=buynew`);
				const imgUrls = res.data.data;
				const imgCount = imgUrls.length;

				if (imgCount === 0) {
					api.sendMessage(`No image results found for "${query}"`, event.threadID, event.messageID);
					return;
				}

				const randomIndices = getRandomIndices(imgCount, Math.min(10, imgCount));
				const imgUrlsToDisplay = randomIndices.map(index => imgUrls[index]);

				const attachments = [];

				for (const url of imgUrlsToDisplay) {
					try {
						const imageResponse = await axios.get(url, {
							responseType: "arraybuffer",
						});

						// Generate a unique filename for each image
						const uniqueFilename = `/cache/imgsearch-${Date.now()}.png`;

						fs.writeFileSync(uniqueFilename, imageResponse.data);
						attachments.push(fs.createReadStream(uniqueFilename));
					} catch (error) {
						api.sendMessage('Error While Saving Image', event.threadID, event.messageID);
					}
				}

				const mes = {
					body: `Total Image Result: ${imgCount}\n\nHere are 10 random images`,
					attachment: attachments
				};

				api.sendMessage(mes, event.threadID, event.messageID);
			} catch (error) {
				api.sendMessage('Error during image search', event.threadID, event.messageID);
			}
		}

		performImageSearch();
	},
};

function getRandomIndices(max, count) {
	const indices = Array.from({ length: max }, (_, i) => i);
	for (let i = max - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[indices[i], indices[j]] = [indices[j], indices[i]];
	}
	return indices.slice(0, count);
}
