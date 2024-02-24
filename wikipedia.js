const discord = require("discord.js")
const bot = new discord.Client({intents: Object.keys(discord.GatewayIntentBits).map((a) => {return discord.GatewayIntentBits[a]})})
const wiki = require('wikipedia');
const prefix = "uwu"

bot.on('ready', () => {
	console.log(bot.user.username + " has logged in!")
})

bot.on('messageCreate', async (msg) => {
    if (msg.author.bot == true) {return}
	if (!msg.content.startsWith(prefix)) {return}
	const args = msg.content.slice(prefix.length).trim().split(' ');
    const cmd = args.shift().toLowerCase();
	try {
		if (cmd == "help" || cmd == "cmds" || cmd == "cmd" || cmd == "h") {
			const exampleEmbed = new discord.EmbedBuilder()
				.setColor(0x54DB82)
				.setTitle('Command list')
				.setTimestamp()
				.setThumbnail(bot.user.avatarURL())
				.setAuthor({ name: msg.author.username, iconURL: msg.author.avatarURL() })
				.setDescription('Hello this is a wikipedia bot')
				.addFields(
					{ name: 'help', value: '```Aliases: ["help", "cmds", "cmd"]\nCommand Info: "Shows this message!"```', inline: true },
					{ name: 'page', value: '```Aliases: ["page", "p"]\nCommand Info: "Get page!"```', inline: true },
				)
			
				await msg.reply({embeds: [exampleEmbed]})
		} else if (cmd == "page" || cmd == "p") {
			const page = await wiki.page(args.slice(0).join(' '));
			const summary = await page.summary()
			console.log(summary)
			const exampleEmbed = new discord.EmbedBuilder()
				.setColor(0x54DB82)
				.setTitle(page.title)
				.setTimestamp()
				.setImage(summary.originalimage.source)
				.setAuthor({ name: msg.author.username, iconURL: msg.author.avatarURL() })
				.setDescription('Hello this is a wikipedia bot')
				.addFields(
					{ name: 'pagelanguage', value: `\`\`\`${page.pagelanguage} \`\`\``, inline: true },
					{ name: 'fullurl', value: `\`\`\`${page.fullurl} \`\`\``, inline: true },
					{ name: 'summary', value: `\`\`\`${summary.extract} \`\`\``, inline: false },
				)
			
			await msg.reply({embeds: [exampleEmbed]})
		}} catch (e) {
			const exampleEmbed = new discord.EmbedBuilder()
			  .setColor(0xf56c42)
			  .setTitle("Error")
			  .setTimestamp()
			  .setAuthor({ name: msg.author.username, iconURL: msg.author.avatarURL() })
			  .setDescription(`Oh no, error has occured.\n\`\`\`${e}\`\`\``)
	  
		  	await msg.channel.send({embeds: [exampleEmbed]})
		} 
});

bot.login("Your token here!")