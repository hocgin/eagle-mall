import Global from "@/utils/constant/global";
import router from "@/router";

export default class Goto {
  /**
   * 登录页面
   */
  static login() {
    router.push(Global.LOGIN_PAGE);
  }

  /**
   * 首页
   */
  static index() {
    router.push(Global.INDEX_PAGE);
  }

  /**
   * 购物车
   */
  static shoppingCart() {
    router.push(Global.SHOPPING_CART_PAGE);
  }

  /**
   * 确认订单
   */
  static confirmOrder(items = []) {
    router.push({
      path: Global.CONFIRM_ORDER_PAGE,
      query: {
        items: JSON.stringify(items)
      }
    });
  }

  /**
   * 支付订单
   * @param tradeSn
   */
  static payOrder(tradeSn) {
    router.push({
      path: Global.PAYMENT_ORDER_PAGE,
      query: {
        tradeSn: tradeSn
      }
    });
  }
}
