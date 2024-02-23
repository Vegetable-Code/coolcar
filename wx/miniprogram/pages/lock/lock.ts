import { IAppOption } from "../../appoption"
import { routing } from "../../utils/routing"

const shareLocationKey = 'share_location'

Page({
  data: {
    avatarURL: '',
    shareLocation: true,
  },
  async onLoad(opt: Record<'car_id', string>) {
    const o: routing.LockOpts = opt
    console.log('unlocking car', o.car_id)
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
    wx.getLocation({
      type: 'gcj02',
      success: loc => {
        console.log('starting a trip', {
          location: {
            latitude: loc.latitude,
            longitude: loc.longitude
          },
          avatarURL: this.data.shareLocation ? this.data.avatarURL : ''
        })

        const tripID = 'trip456'

        wx.showLoading({
          title: '开锁中...',
          mask: true
        })
        setTimeout(() => {
          wx.redirectTo({
            // url: '/pages/driving/driving',
            url: routing.drving({
              trip_id: tripID
            }),
            complete: () => {
              wx.hideLoading()
            }
          })
        }, 2000);
      },
      fail: () => {
        wx.showToast({
          icon: 'none',
          title: '请前往设置页授权位置信息'
        })
      }
    })
  },
})