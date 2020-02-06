module.exports = async client => {
  // knees weak, laffs are heavy
  // the bogs in the computer are all ready 
  client.logger.log(`Bogs are laffing, bot 2.0 is ready.`, "ready");

  const botActivity = await client.config.botActivity;
  client.user.setActivity(botActivity, { type: "PLAYING" });
};