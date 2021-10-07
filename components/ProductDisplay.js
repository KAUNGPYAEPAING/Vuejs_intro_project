app.component('product-display', {
      props: {
        premium: {
          type: Boolean,
          required: true
        }
      },

        template:
        `<div class="product-display">
          <div class="product-container">
            <div class="product-image">
              <img :class="{ 'out-of-stock-img': !inStock }" v-bind:src="image">
            </div>
            <div class="product-info">
              <h1>{{ title }}</h1>
              <!-- In stock -->
              <p v-if="inStock">In Stock</p>
              <p v-else>Out of Stock</p>
              <p>Shipping: {{ shipping }}</p>

              <!-- Product Detail -->
              <product-detail :details="details"></product-detail>

              <!-- Image and quantty -->
              <div v-for="(variant, index) in variants" :key="variant.id" @mouseover="updateVariant(index)" class="color-circle" :style="{ backgroundColor: variant.color }">
              </div>

              <!-- On Sale -->
              <!-- <p>{{ saleMessage }}</p> -->

              <button class="button" :class="{ disabledButton: !inStock }" :disabled="!inStock" v-on:click="addToCart">Add to Cart</button>
              <button class="button" v-on:click="reduceItem">Reduce Item</button>
            </div>
          </div>
          <review-list :reviews="reviews"></review-list>
          <review-form @review-submitted = "addReview"></review-form>
        </div>`,

        data() {
          return {
            cart: 0,
            product: 'Socks',
            brand: 'Vue Mastery',
            selectedVariant: 0,
            details: ['50% cotton', '30% wool', '20% polyester'],
            variants: [{
                id: 2234,
                color: 'green',
                image: './assets/images/socks_green.jpg',
                quantity: 50
              },
              {
                id: 2235,
                color: 'blue',
                image: './assets/images/socks_blue.jpg',
                quantity: 0
              },
            ],
            onSale: true,
            reviews: []
          }
        },
        methods: {
          addToCart() {
                this.$emit('add-to-cart', this.variants[this.selectedVariant].id)
          },
          reduceItem() {
            this.$emit("reduce-the-cart")
          },
          updateVariant(index) {
            this.selectedVariant = index
          },
          addReview(review) {
            this.reviews.push(review)
          }
        },
        computed: {
          title() {
            return this.brand + ' ' + this.product
          },
          image() {
            return this.variants[this.selectedVariant].image
          },
          inStock() {
            return this.variants[this.selectedVariant].quantity
          },
          saleMessage() {
            if (this.onSale) {
              return this.brand + ' ' + this.product + ' is on sale.'
            }
            return ''
          },
          shipping() {
            if (this.premium) {
              return 'Free'
            }else{
              return '$ 2.99'
            }
          }
        }

})
