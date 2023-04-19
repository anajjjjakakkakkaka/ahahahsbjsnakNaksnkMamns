const { MessageEmbed } = require("discord.js");
const client = global.bot;
const bannedTag = require("../schemas/bannedTag");
const conf = require("../configs/sunucuayar.json");
const allah = require("../../../../config.json");
const regstats = require("../schemas/registerStats");
const { star, green, red } = require("../configs/emojis.json")

module.exports = async (oldUser, newUser) => {
    if (oldUser.bot || newUser.bot || (oldUser.username === newUser.username)) return;
    const guild = client.guilds.cache.get(allah.GuildID);
    if (!guild) return;
    const member = guild.members.cache.get(oldUser.id);
    if (!member) return;

    const res = await bannedTag.findOne({ guildID: allah.GuildID });
    if (!res) return
    res.taglar.forEach(async x => {
      
    if (!oldUser.tag.includes(x) && newUser.tag.includes(x)) {
        !member.roles.cache.has(conf.boosterRolu) 
        await member.roles.set(conf.jailRole).catch();
        await member.setNickname('Yasaklı Tag');
       member.send({ content:`${guild.name} adlı sunucumuza olan erişiminiz engellendi! Sunucumuzda yasaklı olan bir simgeyi (${x}) isminizde taşımanızdan dolayıdır. Sunucuya erişim sağlamak için simgeyi (${x}) isminizden çıkartmanız gerekmektedir.\n\nSimgeyi (${x}) isminizden kaldırmanıza rağmen üstünüzde halen Yasaklı Tag rolü varsa sunucudan gir çık yapabilirsiniz veya sağ tarafta bulunan yetkililer ile iletişim kurabilirsiniz. **-Yönetim**`})
      } else
      if (oldUser.tag.includes(x) && !newUser.tag.includes(x)) { 
        !member.roles.cache.has(conf.boosterRolu) 
        await member.roles.set(conf.unregRoles).catch();
        await member.setNickname(`İsim ' Yaş`);
      member.send({ content:`${guild.name} adlı sunucumuza olan erişim engeliniz kalktı. İsminizden (${x}) sembolünü kaldırarak sunucumuza erişim hakkı kazandınız. Keyifli Sohbetler**-Yönetim**`})
      }
    })

};

module.exports.conf = {
  name: "userUpdate",
};
