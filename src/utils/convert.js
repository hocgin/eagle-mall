export class Convert {

  /**
   * 优惠券
   * @param item
   * @return {{condition: string, unitDesc: string, valueDesc: string, name: *, description: string, id: *, endAt: number, value: *, startAt: number}}
   */
  static convertCoupon(item) {
    return {
      id: item.id,
      valueDesc: `${item.credit.toFixed(1)}`,
      unitDesc: item.couponType === 0 ? '元' : '折',
      value: item.credit * 100,
      startAt: item.createdAt / 1000,
      endAt: item.endAt / 1000,
      condition: `${item.useTypeName}\n${item.platformName}平台\n满¥${item.minPoint}可用`,
      description: `${item.instructions || ''}`,
      name: item.title
    };
  }
}