module.exports = {
  config: {
    name: "help",
    usePrefix: true,
    description: "Display a list of available commands or get detailed information about a specific command",
    permission: 0,
  },
  run: function({ api, event, args, commandModules,prefix }) {
    const commands = Object.values(commandModules);
    const pageSize = 10;
    const pageOrCommand = args[0];

    let page = 1;

    if (!isNaN(pageOrCommand)) {
      page = parseInt(pageOrCommand);
    } else if (pageOrCommand && pageOrCommand !== "pageno") {
      const requestedCommand = pageOrCommand.toLowerCase();
      const command = commands.find(cmd => cmd.config.name === requestedCommand);

      if (command) {
        const permissionText = command.config.permission === 1 ? "Admin" : "Normal User";
				const message = `--COMMAND INFO--\n\nName:${command.config.name} \nUsage:${prefix}${command.config.usage || "No Information"} \nPermission:${permissionText}\n\nThis Command Are Coded By Team Bug Fixed(ISOY DEV)`;
        //const message = `**Command:** ${prefix}${command.config.name}\n**Description:** ${command.config.description}\n**Usage:** ${command.config.usage || "No usage information"}\n**Permission:** ${permissionText}`;
        api.sendMessage(message, event.threadID);
        return;
      } else {
        api.sendMessage("Invalid command name or page number.", event.threadID);
        return;
      }
    }

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const visibleCommands = commands.slice(startIndex, endIndex);
    const commandList = visibleCommands.map(cmd => `${prefix}${cmd.config.name} ${cmd.config.description}`).join("\n\n");

    const totalPages = Math.ceil(commands.length / pageSize);
    const response = `-- 𝙰𝚟𝚊𝚒𝚕𝚊𝚋𝚕𝚎 𝙲𝚘𝚖𝚖𝚊𝚗𝚍𝚜 -- \n  (Page ${page}/${totalPages})  \n\n${commandList}\n\n Use \`${prefix}help [page number]\` to see more pages or \`${prefix}help [command name]\` to get details about a specific command.`;

    api.sendMessage(response, event.threadID);
  },
};