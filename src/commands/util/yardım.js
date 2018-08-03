const { stripIndents, oneLine } = require('common-tags');
const Command = require('../base');
const disambiguation = require('../../util').disambiguation;
const Discord = require('discord.js');

module.exports = class HelpCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'yardım',
			group: 'util',
			memberName: 'yardım',
			aliases: ['commands', 'y', 'komutlar', 'help', 'halp', 'h', 'ko', 'k', 'yardım', 'kom'],
			description: 'Tüm komutları listeler. İsterseniz bir komut hakkında yardım eder.',
			details: oneLine`
					Yardım için herhangi bir komut grubu belirtebilirsiniz.
					Bir grup belirtilmezse, mevcut tüm kullanılabilir gruplar listelenir.
					Grup hakkında yardım almak için ise k!yardım <grup adı> kullanılır.
			`,
			examples: ['yardım komut', 'yardım <grup>'],
			
			args: [
				{
					key: 'command',
					prompt: 'Hangi komut grubu hakkında yardım istiyorsunuz?',
					type: 'string',
					default: ''
				},
				    {
        key: 'icerik',
        prompt: `Hangi komut kategorisi hakkında bilgi almak istiyorsunuz?\n**anakomutlar**\n**genel**\n**ayarlar**\n**moderatör**\n**eğlence**\n**fotoğraf-efektleri**\n**müzik**\n**profil-sistemi**\n**puanlı-komutlar**`,
        type: 'string'
    }
			]
		});
	}
	
	run(msg, args) {
		let group;
		let {client} = this;
		var groups = this.client.registry.groups.map(g => g.id);
		groups.push("genel"); 
		groups.push("anakomutlar"); 
		groups.push("moderatör"); 
		groups.push("geliştirici");
	        groups.push("eğlence"); 
		groups.push("fotoğraf-efektleri"); 
		groups.push("müzik"); 
		groups.push("profil-sistemi"); 
		groups.push("gizli-komutlar"); 
		groups.push("puanlı-komutlar"); 
            if (args.icerik == "genel") group = this.client.registry.groups.get("util");
	    if (args.icerik == "moderatör") group = this.client.registry.groups.get("grup2");
	    if (args.icerik == "anakomutlar") group = this.client.registry.groups.get("grup1");
	    if (args.icerik == "geliştirici") group = this.client.registry.groups.get("admin");
	    if (args.icerik == "eğlence") group = this.client.registry.groups.get("grup3");
	    if (args.icerik == "fotoğraf-efektleri") group = this.client.registry.groups.get("grup4");
            if (args.icerik == "müzik") group = this.client.registry.groups.get("grup5");
            if (args.icerik == "profil-sistemi") group = this.client.registry.groups.get("grup6");
             if (args.icerik == "gizli-komutlar") group = this.client.registry.groups.get("grup7");
            if (args.icerik == "puanlı-komutlar") group = this.client.registry.groups.get("grup8");
	    if (args.icerik == "admin") return;
		const emb = new Discord.RichEmbed()
		.setTitle("Hata")
		.setDescription("Belirtilen komut grubu dışında başka bir grup giremezsiniz")
		.setColor("RANDOM")
		.setFooter("Çay Bot | Davet linki: caybot.ooo", "https://cdn.discordapp.com/avatars/344978114977202177/9005eb3034e3ef597f5e59e1ce9500c3.png?size=2048")
		if (!args.icerik) return msg.embed(emb);

		if (!groups.some(g => args.icerik == g)) return msg.channel.send(`${msg.member.toString()}, lütfen doğru komut grubundan yardım alınız.`, {embed: emb})
		if (this.client.registry.groups.has(args.icerik)) group = this.client.registry.groups.get(args.icerik);
                

		const helpbed = new Discord.RichEmbed()
		.setTitle(group.name)
		.setDescription(`
		${group.commands.map(g => `**${g.name}**: ${g.description}`).join("\n")}
				`)
		.setColor("RANDOM")
		msg.embed(helpbed)
			}
	};
