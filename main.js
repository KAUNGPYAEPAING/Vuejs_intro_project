const app = Vue.createApp({
  data() {
    return {
      cart: 0,
      premium: false
    }
  },
  methods: {
      updateCart() {
        this.cart +=1
      },
      reduceItem() {
        if (this.cart > 0) {
          this.cart -= 1
        } else {
          alert("Error Occur");
        }
      }
  }
})
