const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const profileModel = require("../../functions/shema");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("profile")
        .setDescription("📋│Show your profile")
        .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages),

    async execute(interaction) {
        let profileDate = await profileModel.findOne({ userId: interaction.user.id }).catch();

        if (!profileDate) {
            await profileModel.create({
                userTag: interaction.user.tag,
                userId: interaction.user.id,
                serverId: interaction.guild.id,
            }).catch();

            const newProfileDate = await profileModel.findOne({ userId: interaction.user.id }).catch();
            await interaction.reply({ content: `**Tag│${newProfileDate.userTag}**\n**ID│${newProfileDate.userId}**\n**ServerID│${newProfileDate.serverId}**` }).catch();
        } else {
            await interaction.reply({ content: `**Tag│${profileDate.userTag}**\n**ID│${profileDate.userId}**\n**ServerID│${profileDate.serverId}**` }).catch();
        };
    },
};
