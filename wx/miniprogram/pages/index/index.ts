
Page({
  isPageShowing: false,
  data: {
    setting: {
      skew: 0,
      rotate: 0,
      showLocation: true,
      showScale: true,
      subKey: '',
      layerStyle: -1,
      enableZoom: true,
      enableScroll: true,
      enableRotate: false,
      showCompass: false,
      enable3D: false,
      enableOverlooking: false,
      enableSatellite: false,
      enableTraffic: false,
    },
    location: {
      latitude: 31,
      longitude: 120,
    },
    scale: 10,
    markers: [
      {
        iconPath: "/resources/car.png",
        id: 0,
        latitude: 23.099994,
        longitude: 113.324520,
        width: 50,
        height: 50
      },
      {
        iconPath: "/resources/car.png",
        id: 0,
        latitude: 23.099994,
        longitude: 114.324520,
        width: 50,
        height: 50
      }
    ],
  },

  onShow() {
    this.isPageShowing = true
  },

  onHide() {
    this.isPageShowing = false
  },

  // 获取当前位置
  onMyLocationTap() {
    wx.getLocation({
      type: 'gcj02',
      success: res => {
        this.setData({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
        })
      },
      fail: () => {
        wx.showToast({
          icon: 'none',
          title: '请前往设置页授权'
        })
      }
    })
  },

  // 获取车辆位置
  moveCars() {
    const map = wx.createMapContext('map')
    const dest = { latitude: 23.099994, longitude: 113.324520 }
    const moveCars = () => {
      dest.latitude += 0.1
      dest.longitude += 0.1
      map.translateMarker({
        destination: {
          latitude: dest.latitude,
          longitude: dest.longitude
        },
        markerId: 0,
        autoRotate: false,
        rotate: 0,
        duration: 5000,
        animationEnd: () => {
          if (this.isPageShowing) moveCars()
        }
      })
    }
    moveCars()
  },

  // 扫码租车
  onScanClicked() {
    wx.scanCode({
      success: () => {
        console.log
        wx.navigateTo({
          url: '/pages/register/register'
        })
      },
      fail: console.error
    })
  }
})
