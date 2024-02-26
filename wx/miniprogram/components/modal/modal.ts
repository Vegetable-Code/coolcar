import { ModalResult } from "./types"

// components/modal/modal.ts
Component({
  properties: {
    showModal: Boolean,
    showCancel: Boolean,
    title: String,
    content: String
  },

  options: {
    addGlobalClass: true
  },

  data: {
    resolve: undefined as ((r: ModalResult) => void) | undefined
  },

  methods: {
    onCancel() {
      this.hideModal('cancel')
    },

    onOk() {
      this.hideModal('ok')
    },

    hideModal(res: ModalResult) {
      this.setData({
        showModal: false
      })
      this.triggerEvent(res)
      if (this.data.resolve) {
        this.data.resolve(res)
      }
    },

    showModal(): Promise<ModalResult> {
      this.setData({
        showModal: true
      })
      return new Promise((resolve, reject) => {
        this.data.resolve = resolve
      })
    }
  }
})
