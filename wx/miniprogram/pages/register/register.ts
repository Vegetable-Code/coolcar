import { routing } from "../../utils/routing"

Page({
  data: {
    name: '',
    licNo: '',
    licImgUrl: '',
    birthDate: '',
    genderIndex: 0,
    redirectURL: '',
    hasLicImg: false,
    state: 'UNSUBMITTED',
    genders: ['未知', '男', '女', '其他'],
  },
  onLoad(opt: Record<'redirect', string>) {
    const o: routing.RegisterOpts = opt
    if (o.redirect) {
      this.data.redirectURL = decodeURIComponent(o.redirect)
    }
  },
  
  // 上传驾照
  onUploadLic() {
    wx.chooseMedia({
      success: (res) => {
        if (res.tempFiles.length > 0) {
          this.setData({
            licImgUrl: res.tempFiles[0].tempFilePath,
            hasLicImg: true
          }),
            setTimeout(() => {
              this.setData({
                name: '张三',
                genderIndex: 1,
                licNo: '15975121689',
                birthDate: '1990-12-01'
              })
            }, 1000)
        }
      },
      fail: console.error
    })
  },

  // 修改性别
  onGenderChange(e: any) {
    this.setData({
      genderIndex: e.detail.value
    })
  },

  // 修改生日
  onBirthDateChange(e: any) {
    this.setData({
      birthDate: e.detail.value
    })
  },

  // 提交审查
  onSubmit() {
    this.setData({
      state: 'PENDING'
    })
    setTimeout(() => {
      this.onLicVerified()
    }, 3000)
  },

  // 重新审查
  onResubmit() {
    this.setData({
      name: '',
      licNo: '',
      birthDate: '',
      genderIndex: 0,
      hasLicImg: false,
      state: 'UNSUBMITTED',
      licImgUrl: undefined,
    })
  },

  // 前往开锁页面
  onLicVerified() {
    this.setData({
      state: 'VERIFIED'
    })

    const car_id = 'car_id456'
    wx.redirectTo({
      url: routing.lock({
        car_id: car_id
      })
    })
  }
})