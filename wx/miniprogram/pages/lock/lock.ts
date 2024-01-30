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
  onGetUserInfo(e: any) {
    console.log(e)
    const userInfo: WechatMiniprogram.UserInfo = e.detail.userInfo
    if (userInfo) {
      getApp<IAppOption>().resolveUserInfo(userInfo)
    }
  },
  onShareLocation(e: any) {
    const shareLocation: boolean = e.detail.value
    wx.setStorageSync('share_location', shareLocation)
  },
  onUnlockTap() { },
})