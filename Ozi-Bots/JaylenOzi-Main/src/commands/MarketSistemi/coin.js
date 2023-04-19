const { Discord, MessageEmbed, MessageAttachment, ClientUser } = require("discord.js");
const dolar = require("../../schemas/dolar");
const { altin2, kirmiziok } = require("../../configs/emojis.json");

module.exports = {
    conf: {
      aliases: ["cash","para"],
      name: "para",
      help: "para",
      category: "market",
    },

    run: async (client, message, args,embed) => {
let dolarData = await dolar.findOne({ guildID: message.guild.id, userID: message.author.id });  
if (!dolarData || dolarData && !dolarData.hesap.length) return await message.reply({ content: `Komutu kullanabilmek için Hesap oluşturmanız gerekmektedir. ${kirmiziok} \` !hesapoluştur \``})
if (!dolarData || dolarData && !dolarData.dolar) return await message.reply({ content: `Komutu kullanabilmek için coine ihtiyacınız var. Günlük coininizi almadıysanız ${kirmiziok} \` !daily \``})

  message.channel.send({ content: `[ __${member}__ ] kişisinin bakiyesi ;\n${dolarData ? Math.floor(parseInt(dolarData.dolar)) : 0} Dolar`})
}
    }