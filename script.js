const { exec } = require('child_process');

const appFilePath = 'index.js';

const appName = 'index.js';

const pm2Command = `pm2 start ${appFilePath} --name ${appName} && node index.js`;

// Execute the PM2 command
exec(pm2Command, (error, stdout, stderr) => {
	if (error) {
		console.error(`Error starting PM2 process: ${error}`);
		return;
	}

	console.log('PM2 process started successfully:');
	console.log(stdout);
});
