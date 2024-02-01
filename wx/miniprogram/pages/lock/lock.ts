import { IAppOption } from "../../appoption"

const shareLocationKey = 'share_location'

Page({
  data: {
    avatarURL: '',
    shareLocation: true,
  },
  async onLoad() {
    const userInfo = await getApp<IAppOption>().globalData.userInfo
    this.setData({
      avatarURL: userInfo.avatarUrl,
      shareLocation: wx.getStorageSync(shareLocationKey) || false
    })
  },
  // 获取用户头像
  onGetUserInfo(e: any) {
    console.log(e)
    const userInfo: WechatMiniprogram.UserInfo = e.detail.userInfo
    if (userInfo) {
      getApp<IAppOption>().resolveUserInfo(userInfo)
    }
  },
  // 是否共享头像
  onShareLocation(e: any) {
    const shareLocation: boolean = e.detail.value
    wx.setStorageSync('share_location', shareLocation)
  },
  // 开锁
  onUnlockTap() {
    wx.showLoading({
      title: '开锁中...',
      mask: true
    })
    setTimeout(() => {
      wx.redirectTo({
        url: '/pages/driving/driving',
        complete: () => {
          wx.hideLoading()
        }
      })
    }, 2000);
  },
})