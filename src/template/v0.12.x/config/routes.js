/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /**
   * 前台路由
   */
  'get /': (req, res) => res.ok('ok'),
  'get /health': (req, res) => res.ok('ok'),

  // 比赛相关
  'get /game': 'GameController.findGame',

  // 获取比赛全量数据
  'get /game/populate': 'GameController.findByGameId',

  // 用户下注订单操作
  'get /betOrderByUserId': 'BetOrderController.getBetOrderByUserId',
  'post /betOrder': 'BetOrderController.postBetOrder',

  // 微信支付充值接口
  'post /wxpay': 'WxpayController.createWxpay',
  'post /wxpay/notify': 'WxpayController.notifyCallback',

  /**
   * 管理后台路由
   */
  'get /admin/game': 'GameController.findGame',
  'put /admin/game/:id': 'GameController.update',

  // 获取单个比赛相关数据接口
  'get /admin/gameinfo': 'GameController.findByGameId',

  // 比赛盘口创建接口
  'post /admin/game': 'GameController.create',

  // 创建盘口
  'post /admin/handicap': 'HandicapController.create',

  // 修改盘口数据
  'put /admin/handicap/:id': 'HandicapController.update',

  'get /admin/settlement': 'SettlementController.findSettlementResult',

  // 结算相关
  'post /admin/settlement': 'SettlementController.close',

  // 盘口模板相关
  'get /admin/handicapTemplate': 'HandicapTemplateController.find'
}
