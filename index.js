const http = require("http");
const ping = require('ping');

//const login = require("fca-unofficial");
const https = require("https");
//const login = require("NEWT-AI");
var login = require('fca-project-orion');
const path = require('path');
const crypto = require('crypto');
//const login = require("./login");
const axios = require("axios");
const request = require("request");
const moment = require("moment-timezone");
const log = require("npmlog");
const fs = require("fs");
const config = require("./config.json");
const { spawn } = require("child_process");
const colors = require("colors");
const logger = console.log;
const express = require('express');
const app = express();

const schedule = require('node-schedule');
const { exec } = require('child_process');
const { DateTime } = require('luxon');
const prefix = config.prefix
var cron = require("node-cron");
const Filter = require('bad-words'), regex = Filter.regex;
let name;
const port = process.env.PORT || 4000;
const approved = require("./approved.json");
const allthread = require("./allthread.json");
const approvedID = approved.approved;
const threadlist = allthread.allthreadID;
const ban = require("./ban.json");

const bodyParser = require('body-parser');

let groupVIPs = ["6159362560838923", "7102650053138560"];
let msgs = {};

function formatFont(text) {
	const fontMapping = {
		a: "𝗮",
		b: "𝗯",
		c: "𝗰",
		d: "𝗱",
		e: "𝗲",
		f: "𝗳",
		g: "𝗴",
		h: "𝗵",
		i: "𝗶",
		j: "𝗷",
		k: "𝗸",
		l: "𝗹",
		m: "𝗺",
		n: "𝗻",
		o: "𝗼",
		p: "𝗽",
		q: "𝗾",
		r: "𝗿",
		s: "𝘀",
		t: "𝘁",
		u: "𝘂",
		v: "𝘃",
		w: "𝘄",
		x: "𝘅",
		y: "𝘆",
		z: "𝘇",
		A: "𝗔",
		B: "𝗕",
		C: "𝗖",
		D: "𝗗",
		E: "𝗘",
		F: "𝗙",
		G: "𝗚",
		H: "𝗛",
		I: "𝗜",
		J: "𝗝",
		K: "𝗞",
		L: "𝗟",
		M: "𝗠",
		N: "𝗡",
		O: "𝗢",
		P: "𝗣",
		Q: "𝗤",
		R: "𝗥",
		S: "𝗦",
		T: "𝗧",
		U: "𝗨",
		V: "𝗩",
		W: "𝗪",
		X: "𝗫",
		Y: "𝗬",
		Z: "𝗭",
	};

	let formattedText = "";
	for (let i = 0; i < text.length; i++) {
		const char = text[i];
		formattedText += fontMapping[char] || char;
	}
	return formattedText;
}
module.exports = { formatFont };


const secretKeyHex = 'ade0d29be076f734932f38e887d7eeae7818f6a9302439ab4cef070c50652e73';
const ivHex = 'e8863304994de91021b007abd79a674c8'; // Make sure it's 16 bytes (128 bits)

// Convert the hex strings to Buffers
const secretKey = Buffer.from(secretKeyHex, 'hex');
const iv = Buffer.from(ivHex, 'hex');

console.log('Secret Key:', secretKey.toString('hex'));
console.log('IV:', iv.toString('hex'));

// Function to encrypt data
function encryptData(data, key, iv) {
	const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
	let encryptedData = cipher.update(data, 'utf8', 'hex');
	encryptedData += cipher.final('hex');
	return encryptedData;
}
try {
	if (fs.existsSync('appstate1.json')) {
		const stats = fs.statSync('appstate1.json');
		if (stats.lenght === 0) {
			console.log('appstate.json is empty.');
			return;
		}
		const jsonData = JSON.parse(fs.readFileSync("appstate1.json", "utf8"));
		const jsonString = JSON.stringify(jsonData);

		// Encrypt the JSON data
		const encryptedData = encryptData(jsonString, secretKey, iv);
		fs.writeFileSync('appstate1.json', " ", 'utf8');

		fs.writeFileSync('appstate.json', encryptedData, 'utf8');

	}
} catch (error) {
	console.log(error);
}
// Function to decrypt data
function decryptData(encryptedData, key, iv) {
	const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
	let decryptedData = decipher.update(encryptedData, 'hex', 'utf8');
	decryptedData += decipher.final('utf8');
	return decryptedData;
}

// Read the encrypted data from the file
const encryptedDataFromFile = fs.readFileSync('appstate.json', 'utf8');

const decryptedData = decryptData(encryptedDataFromFile, secretKey, iv);

// Parse the decrypted data back to JSON
const decryptedJsonData = JSON.parse(decryptedData);


function formatFontbold(text) {
	const fontMapping = {

		a: "𝒂",
		b: "𝒃",
		c: "𝒄",
		d: "𝒅",
		e: "𝒆",
		f: "𝒇",
		g: "𝒈",
		h: "𝒉",
		i: "𝒊",
		j: "𝒋",
		k: "𝒌",
		l: "𝒍",
		m: "𝒎",
		n: "𝒏",
		o: "𝒐",
		p: "𝒑",
		q: "𝒒",
		r: "𝒓",
		s: "𝒔",
		t: "𝒕",
		u: "𝒖",
		v: "𝒗",
		w: "𝒘",
		x: "𝒙",
		y: "𝒚",
		z: "𝒛",
		A: "𝗔",
		B: "𝗕",
		C: "𝗖",
		D: "𝗗",
		E: "𝗘",
		F: "𝗙",
		G: "𝗚",
		H: "𝗛",
		I: "𝗜",
		J: "𝗝",
		K: "𝗞",
		L: "𝗟",
		M: "𝗠",
		N: "𝗡",
		O: "𝗢",
		P: "𝗣",
		Q: "𝗤",
		R: "𝗥",
		S: "𝗦",
		T: "𝗧",
		U: "𝗨",
		V: "𝗩",
		W: "𝗪",
		X: "𝗫",
		Y: "𝗬",
		Z: "𝗭"
	};

	let formattedTextbold = "";
	for (let i = 0; i < text.length; i++) {
		const char = text[i];
		formattedTextbold += fontMapping[char] || char;
	}

	return formattedTextbold;
}

const uptimeDataFile = "./database/uptime.json";
function updateUptime() {
	const uptimeData = {
		startTime: moment().toISOString(),
	};
	fs.writeFileSync(uptimeDataFile, JSON.stringify(uptimeData, null, 2), "utf8");
}
function getUptime() {
	try {
		const data = fs.readFileSync(uptimeDataFile, "utf8");
		const uptimeData = JSON.parse(data);
		const startTime = moment(uptimeData.startTime);
		const currentTime = moment();
		const duration = moment.duration(currentTime.diff(startTime));
		const hours = Math.floor(duration.asHours());
		const minutes = duration.minutes();
		const seconds = duration.seconds();
		return `${hours} hours, ${minutes} minutes, ${seconds} seconds`;
	} catch (err) {
		console.error("Error loading uptime data:", err);
		return "N/A";
	}
}
try {
	fs.readFileSync(uptimeDataFile, "utf8");
}
catch (err) {
	console.error("Error loading uptime data:", err);
	updateUptime();
}




async function getGroupMembers(api, threadID) {
	return new Promise((resolve, reject) => {
		api.getThreadInfo(threadID, (err, threadInfo) => {
			if (err) reject(err);
			const members = threadInfo.participantIDs;
			resolve(members);
		});
	});
}
function initializeUnsendMessage() {
	try {
		const data = fs.readFileSync("config.json");
		const jsonData = JSON.parse(data);
		return jsonData.UnsendMessage;
	} catch (error) {
		return true;
	}
}

let UnsendMessage = initializeUnsendMessage();

function saveUnsendMessageToJSON() {
	try {
		const jsonData = { UnsendMessage };
		const data = JSON.stringify(jsonData, null, 2);
		fs.writeFileSync("config.json", data);
	} catch (error) {
		console.error("Error writing JSON file:", error);
	}
}

function saveConfig() {
	fs.writeFileSync("./config.json", JSON.stringify(config, null, 2));
}

login(
	{ appState: decryptedJsonData },
	async (err, api) => {
		if (err) return console.error(err);

		const platform = process.platform;
		let userAgent;

		if (platform === "win32") {
			userAgent =
				"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36";
		}
		else if (platform === "android") {
			userAgent =
				"Mozilla/5.0 (Linux; Android 11; SM-G991U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.50 Mobile Safari/537.36";
		} else {
			userAgent =
				"Mozilla/5.0 (iPhone; CPU iPhone OS 15_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/95.0.4638.50 Mobile/15E148 Safari/604.1";
		}

		api.setOptions({
			forceLogin: true,
			listenEvents: true,
			logLevel: "silent",
			selfListen: false,
			userAgent: userAgent,
		});


		try {

			const rule = new schedule.RecurrenceRule();
			rule.hour = 12;
			rule.minute = 19;
			rule.tz = 'Asia/Manila';
			const morning = new schedule.RecurrenceRule();
			morning.hour = 06; // 2 PM
			morning.minute = 30;
			morning.tz = 'Asia/Manila';
			const fact = new schedule.RecurrenceRule();
			fact.minute = 10;
			fact.second = 1;
			fact.tz = 'Asia/Manila';
			const evening = new schedule.RecurrenceRule();
			evening.hour = 19; // 2 PM
			evening.minute = 07;
			evening.tz = 'Asia/Manila';
			const eve = schedule.scheduleJob(evening, () => {
				threadlist.forEach(threadID => { // Corrected variable name from "threadIDs" to "threadID"
					api.sendMessage(
						{
							body: `GOOD EVENING HUMANS!\n\nFROM: @1SOY`,
							mentions: [
								{
									tag: '1SOY',
									id: '100058453663658',
									fromIndex: 9,
								},],
						}, threadID);
				});
			});
			//const prog = new schedule.RecurrenceRule();
			//prog.hour = 4;
			//prog.second=30;
			//prog.tz ='Asia/Manila';
			//const pg =schedule.scheduleJob(prog,() =>{
			//	api.sendMessage(`Welcome sa mga bago!
			//Join our official Group \nhttps://www.facebook.com/groups/programmingenthusiasts/?ref=share&mibextid=NSMWBT`,'5974822545952710');
			//	});

			const job = schedule.scheduleJob(rule, () => {
				threadlist.forEach(threadID => { // Corrected variable name from "threadIDs" to "threadID"
					api.sendMessage(
						{
							body: `EY GUYS EAT NA KAYO!\n\nFROM: @1SOY`,
							mentions: [
								{
									tag: '1SOY',
									id: '100058453663658',
									fromIndex: 9,
								},],
						}, threadID);
				});
			});
			const MOR = schedule.scheduleJob(morning, () => {
				threadlist.forEach(threadID => { // Corrected variable name from "threadIDs" to "threadID"
					api.sendMessage(
						{
							body: `Hi FELLAZ GOOD MORNING \n\nFROM: @1SOY\n\n--AUTOMATED MESSAGE`,
							mentions: [
								{
									tag: '1SOY',
									id: '100058453663658',
									fromIndex: 9,
								},],
						}, threadID);
				});
			});
			///	const FACT = schedule.scheduleJob(fact, async () => {

			//     const res = await axios.get('https://sensui-useless-apis.codersensui.repl.co/api/fun/facts');
			///  const data = res.data.fact;

			// Your code to send messages to threads goes here
			///	 threadlist.forEach(threadID => {
			///	api.sendMessage(`Did You know?\n\n${data}\n\n\n Please Follow My DEV: https://web.facebook.com/Buckyy26`, threadID);
			///	});
			///	console.log("Scheduled messages sent!");

			// });
		} catch (error) {
			console.log(error);
		}


		// Load command modules

		const config = require("./config.json");
		const commandModules = {};

		fs.readdirSync("./commands").forEach(file => {
			if (file.endsWith(".js")) {
				const command = require(`./commands/${file}`);
				commandModules[command.config.name] = command;
			}
		});

		const userVIPs = config.userVIPs;
		commandModules.help = require("./commands/help.js");
		commandModules.post = require("./commands/post.js");
		const prefix = config.prefix;
		api.listenMqtt(async (err, event) => {
			if (err) return console.error(err);
			if (event.type === "message" || event.type === "message_reply") {
				//////console.log(`from ${event.threadID} Message:${event.body}`);

				const mes11 = event.body;




				const parts = event.body.trim().split(" ");
				const input = event.body;
				const commandName = parts[0].replace(new RegExp(`^${prefix}`), "");
				const args = parts.slice(1);
				const user = event.senderID;
				const banuser = ban.ban;
				const command = commandModules[commandName];
				if (command) {
					if (!command.config.usePrefix || event.body.startsWith(prefix)) {
						const userPermission = config.userVIPs.includes(event.senderID) ? 1 : 0;
						if (userPermission >= command.config.permission) {
							if (!approved.approved.includes(event.threadID) && !userVIPs.includes(event.senderID)) {
								api.sendMessage('Your Group Need To be Whitelisted To Use This Bot\n\nPlease Contact My Dev: https://www.facebook.com/Buckyy26', event.threadID, event.messageID);
								return false;
							}
							if (banuser.includes(user)) {
								api.sendMessage('You are Not Allow To use The Newt AI ', event.threadID, event.messageID);
								return false;
							}
							if (config.maintenance.enable && !userVIPs.includes(event.senderID)) {
								api.sendMessage("The BOT is Under Maintenance.\nTo Serve You Better\n Sorry for the inconvenience.", event.threadID);
								return false;
							}

							command.run({ api, event, args, commandModules, config, threadlist, prefix, approved, approvedID, formatFont, banuser, ban });
						} else {
							api.sendMessage("You do not have permission to use this command.", event.threadID);
						}
					}
				}
			} else if (event.type === "event") {
				switch (event.logMessageType) {
					case "log:subscribe":


						break;
					case "log:thread-name":
						const newThreadName = event.logMessageData.name;
						const authorInfo = await api.getUserInfoMain(event.author);
						const authorFirstName = authorInfo[event.author].firstName;
						const message = `${authorFirstName} changed the group chat name to "${newThreadName}"`;
						api.sendMessage(
							{
								body: message,
								mentions: [{ tag: `${authorFirstName}`, id: event.author }],
							},
							event.threadID,
						);
						break;
				}

			}
		});
		const figlet = require('figlet');

		function printTextArt(message) {
			figlet(message, function(err, data) {
				if (err) {
					console.log('Error:', err);
					return;
				}
				console.log(data);
			});
		}
		const uptime = `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`;
		console.log(uptime);
		printTextArt('NEWT AI');
		printTextArt('DEVELOP BY ADONIS');
		tm();
	},
);
function tm() {
	const { DateTime } = require('luxon');

	const manilaTimeZone = 'Asia/Manila';

	const manilaNow = DateTime.now().setZone(manilaTimeZone);

	// Format the date and time as a string
	const formattedManilaDateTime = manilaNow.toFormat('yyyy-MM-dd HH:mm:ss');

	console.log(`Current date and time in Manila: ${formattedManilaDateTime}`);

}
async function botinfo() {
	const botuid = api.getCurrentUserID();
	const getinfo = api.getUserInfo(botuid);
	const Accoutname = getinfo[botuid].name;
	const BotName = 'NEWT AI'
}



app.use('/vid', express.static(path.join('./cache')));
app.use('/img', express.static(path.join(__dirname, 'cache')));
app.use('/cmd', express.static(path.join(__dirname, 'commands')));

app.listen(port, () => {
	logger('[ ISOY DEV ]'.red, `= >`, 'DEVELOP BY ADONIS JR S');
	
	app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));
});
setInterval(() => {
	console.log('Project is still running');
}, 1000 * 60 * 1); 

setInterval(() => {
	const http = require('https');
	http.get('https://newtai-1.easyapi0.repl.co', (res) => {
		console.log('Self-ping successful');
	});
}, 1000 * 60 * 1);// Schedule a self-ping every 1 minute adjust mo nalang pre




const targetUrl = 'https://newtai-1.easyapi0.repl.co'; // Replace with your Replit project's URL
const pingInterval = 1 * 60 * 1000; // 5 minutes (adjust as needed)

function pingProject() {
	https.get(targetUrl, (res) => {
		if (res.statusCode === 200) {
			console.log(`Project is awake at ${new Date()}`);
		} else {
			console.log(`Project may be sleeping (HTTP status code: ${res.statusCode}) at ${new Date()}`);
		}
	}).on('error', (error) => {
		console.error(`Error during HTTP request: ${error}`);
	});
}

pingProject();

setInterval(pingProject, pingInterval);