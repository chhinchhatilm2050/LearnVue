import { defineStore} from 'pinia'
export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
    isCheckingOut: false
  }),
  getters: {
    itemCount: (state) => {
      return state.items.reduce((total, item) => total + item.quantity, 0)
    },
    totalPrice: (state) => {
      return state.items.reduce((total , item) => {
        return total + (item.price * item.quantity)
      }, 0)
    },
    hasItem: (state) => {
      return (productId) => state.items.some(item => item.id === productId)
    },
    getItemQuantity: (state) => {
      return (productId) => {
        const item = state.items.find(item => item.id === productId)
        return item ? item.quantity : 0
      }
    },
    isEmpty: (state) => state.items.length === 0
  },
  actions: {
    addItem(product) {
      const existingItem = this.items.find(item => item.id === product.id)
      if(existingItem) {
        existingItem.quantity++
      } else {
        this.items.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1
        })
      }
    },
    removeItem(productId) {
      this.items = this.items.filter(item => item.id !== productId);
    },
    updateQuantity(productId, quantity) {
      const item = this.items.find(item => item.id === productId);
      if(item) {
        if (quantity <=0) {
          this.removeItem(productId)
        } else {
          item.quantity = quantity
        }
      }
    },
    incrementQuantity(productId) {
      const item = this.items.find(item => item.id === productId);
      if(item) {
        item.quantity++
      }
    },
    decrementQuantity(productId) {
      const item = this.items.find(item => item.id === productId);
      if (item) {
        if(item.quantity > 1) {
          item.quantity--;
        } else {
          this.removeItem(productId)
        }
      }
    },
    clearCart() {
      this.items = [];
    },
    async checkout() {
      this.isCheckingOut = true;
      await new Promise(resolve => setTimeout(resolve, 2000));
      this.items = [];
      this.isCheckingOut = false
      return{success: true}
    }
  }
})
