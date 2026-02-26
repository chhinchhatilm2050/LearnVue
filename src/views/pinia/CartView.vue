<template>
  <div class="max-w-4xl mx-auto p-8">
    <h1 class="text-4xl font-bold text-gray-800 mb-8">Shopping Cart</h1>

    <!-- Empty Cart -->
    <div v-if="cart.isEmpty" class="text-center py-16">
      <div class="text-8xl mb-6">🛒</div>
      <h2 class="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
      <p class="text-gray-600 mb-8">Add some products to get started!</p>
      <router-link
        to="/viewshop"
        class="inline-block px-8 py-3 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-600 transition"
      >
        Continue Shopping
      </router-link>
    </div>

    <!-- Cart Items -->
    <div v-else>
      <div class="space-y-4 mb-8">
        <div
          v-for="item in cart.items"
          :key="item.id"
          class="flex items-center gap-6 bg-white p-6 rounded-lg shadow"
        >
          <!-- Product Image -->
          <div class="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center text-4xl">
            {{ item.image }}
          </div>

          <!-- Product Info -->
          <div class="flex-1">
            <h3 class="text-xl font-bold text-gray-800">{{ item.name }}</h3>
            <p class="text-2xl text-emerald-600 font-bold">${{ item.price }}</p>
          </div>

          <!-- Quantity Controls -->
          <div class="flex items-center gap-3">
            <button
              @click="cart.decrementQuantity(item.id)"
              class="w-10 h-10 bg-gray-200 rounded-lg hover:bg-gray-300 transition font-bold"
            >
              -
            </button>
            <span class="text-xl font-bold w-12 text-center">{{ item.quantity }}</span>
            <button
              @click="cart.incrementQuantity(item.id)"
              class="w-10 h-10 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition font-bold"
            >
              +
            </button>
          </div>
          <!-- Item Total -->
          <div class="text-right">
            <p class="text-sm text-gray-600">Total</p>
            <p class="text-2xl font-bold text-gray-800">${{ item.price * item.quantity }}</p>
          </div>
          <!-- Remove Button -->
          <button
            @click="cart.removeItem(item.id)"
            class="text-red-600 hover:text-red-700 text-2xl"
          >
            🗑️
          </button>
        </div>
      </div>
      <!-- Cart Summary -->
      <div class="bg-white p-6 rounded-lg shadow">
        <div class="flex justify-between items-center mb-4">
          <span class="text-gray-600">Total Items:</span>
          <span class="text-xl font-bold">{{ cart.itemCount }}</span>
        </div>
        <div class="flex justify-between items-center mb-6 pb-6 border-b">
          <span class="text-gray-600">Total Price:</span>
          <span class="text-3xl font-bold text-emerald-600">${{ cart.totalPrice.toFixed(2) }}</span>
        </div>
        <div class="flex gap-4">
          <button
            @click="handleCheckout"
            :disabled="cart.isCheckingOut"
            class="flex-1 px-8 py-4 bg-emerald-500 text-white font-bold rounded-lg hover:bg-emerald-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ cart.isCheckingOut ? 'Processing...' : 'Checkout' }}
          </button>
          <button
            @click="cart.clearCart()"
            class="px-8 py-4 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cart'
import { useRouter } from 'vue-router'
const router = useRouter();
const cart = useCartStore();

 const handleCheckout = async () => {
  const result = await cart.checkout();
  if(result.success) {
    alert('Order placed successfully!');
    router.push('/viewshop')
  }
}
</script>
