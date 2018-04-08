module.exports = async function wrap (fn) {
  try {
    this.res.ok(await fn())
  } catch (err) {
    logger.error(err)
    this.res.err(err)
  }
}
