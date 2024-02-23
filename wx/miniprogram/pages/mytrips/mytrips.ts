import { IAppOption } from "../../appoption"
import { routing } from "../../utils/routing"

interface Trip {
  id: string
  start: string
  end: string
  duration: string
  distance: string
  fee: string
  status: string
}

interface MainItem {
  id: string
  navId: string
  navScrollId: string
  data: Trip
}

interface NavItem {
  id: string
  mainId: string
  label: string
}

interface MainItemQueryResult {
  id: string,
  top: number,
  dataset: {
    navId: string,
    navScrollId: string
  }
}

Page({
  scrollStates: {
    mainItems: [] as MainItemQueryResult[]
  },

  data: {
    promotionItems: [
      {
        img: 'https://img1.sycdn.imooc.com/65d402020001243317920764.jpg',
        promotionID: 1,
      },
      {
        img: 'https://img1.sycdn.imooc.com/65d414790001915616000682.jpg',
        promotionID: 2,
      },
      {
        img: 'https://img1.sycdn.imooc.com/65d4031f00013b6617920764.jpg',
        promotionID: 3,
      },
      {
        img: 'https://img1.sycdn.imooc.com/65d4037200011b8d16000682.jpg',
        promotionID: 4,
      },
    ],
    avatarURL: '',
    mainScroll: '',
    tripsHeight: 0,
    navCount: 0,
    navSel: '',
    mainItems: [] as MainItem[],
    navItems: [] as NavItem[],
    navScroll: ''
  },

  async onLoad() {
    this.populateTrips()
    const userInfo = await getApp<IAppOption>().globalData.userInfo
    this.setData({
      avatarURL: userInfo.avatarUrl
    })
  },

  onReady() {
    wx.createSelectorQuery().select('#heading')
      .boundingClientRect(rect => {
        const height = wx.getSystemInfoSync().windowHeight - rect.height
        this.setData({
          tripsHeight: height,
          navCount: Math.round(height / 50)
        })
      }).exec()
  },

  // 跳转注册页面
  onRegisterTap() {
    wx.navigateTo({
      url: routing.register(),
    })
  },

  // 获取用户头像
  onGetUserInfo(e: any) {
    const userInfo: WechatMiniprogram.UserInfo = e.detail.userInfo
    if (userInfo) {
      getApp<IAppOption>().resolveUserInfo(userInfo)
      this.setData({
        avatarURL: userInfo.avatarUrl,
      })
    }
  },

  // 展示行程
  populateTrips() {
    const mainItems: MainItem[] = []
    const navItems: NavItem[] = []
    let navSel = ''
    let prevNav = ''
    for (let i = 0; i < 100; i++) {
      const mainId = 'main-' + i
      const navId = 'nav-' + i
      const tripId = (10001 + i).toString()
      if (!prevNav) {
        prevNav = navId
      }
      mainItems.push({
        id: mainId,
        navId: navId,
        navScrollId: prevNav,
        data: {
          id: tripId,
          start: '东方明珠',
          end: '迪士尼',
          distance: '27.0公里',
          duration: '0时44分',
          fee: '128.00元',
          status: '已完成'
        }
      })
      navItems.push({
        id: navId,
        mainId: mainId,
        label: tripId,
      })
      if (i === 0) {
        navSel = navId
      }
      prevNav = navId
    }
    this.setData({
      mainItems,
      navItems,
      navSel
    }, () => {
      this.prepareScrollStates()
    })
  },

  // 获取每个卡片的 top 数据
  prepareScrollStates() {
    wx.createSelectorQuery().selectAll('.trip')
      .fields({
        id: true,
        dataset: true,
        rect: true,
      }).exec(res => {
        this.scrollStates.mainItems = res[0]
      })
  },

  // 切换左边分页控制右边内容
  onNavItemTap(e: any) {
    const mainId: string = e.currentTarget.dataset?.mainId
    const navId: string = e.currentTarget?.id
    if (mainId && navId) {
      this.setData({
        mainScroll: mainId,
        navSel: navId
      })
    }
  },

  // 右边内容滚动控制左边分页切换
  onMainScroll(e: any) {
    const top: number = e.currentTarget?.offsetTop + e.detail?.scrollTop
    if (top === undefined) {
      return
    }
    const selItem = this.scrollStates.mainItems.find(v => v.top >= top)
    if (!selItem) {
      return
    }
    this.setData({
      navSel: selItem.dataset.navId,
      navScroll: selItem.dataset.navScrollId
    })
  }
})