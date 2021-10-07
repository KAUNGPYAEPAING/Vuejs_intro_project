app.component('product-detail',{
  props: {
    details:{
      required: true,
      type: Array
    }
  },

  template:
  `
  <ul>
    <li v-for="detail in details">{{ detail }}</li>
  </ul>
  `
})
