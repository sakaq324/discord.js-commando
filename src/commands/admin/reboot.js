const Commando = require("discord.js-commando");
const moment = require('moment');

module.exports = class RebootCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'reboot',
			group: 'admin',
			memberName: 'reboot',
			description: 'Botu yeniden başlatır.',
			details: 'reboot',
			guildOnly: true,
		});
	}

	hasPermission(msg) {
		return this.client.isOwner(msg.author);
	}

	run(msg, args) {
      try {
      require("child_process").exec("pm2 restart 0");
      msg.reply("Bot yeniden başlatılıyor.");
      } catch(e) {
      msg.reply("Hata oluştu. " + e.stack);
}
	}
};
