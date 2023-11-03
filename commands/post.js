module.exports = {
  config: {
    name: "post",
    usePrefix: true,
    description: "Post a message on the bot's timeline",
    permission: 1, // Set permission level to admin
  },
  run: function({ api, event, args }) {
    const message = args.join(" "); // Join the arguments to form the message

    // Post the message on the bot's timeline
    api.postFeed(message, (err, postId) => {
      if (err) {
        api.sendMessage("An error occurred while posting.", event.threadID);
        console.error("Error posting:", err);
      } else {
        api.sendMessage("Posted successfully!\nPost ID: " + postId, event.threadID);
      }
    });
  },
};
