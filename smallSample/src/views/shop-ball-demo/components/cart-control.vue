<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease" v-show="food.count > 0" @click.stop="decrease">
        <span class="inner iconfont icon-jian" />
      </div>
    </transition>
    <div class="cart-count" v-show="food.count > 0">{{ food.count }}</div>
    <div class="cart-add iconfont icon-jia" @click.stop="add" />
  </div>
</template>

<script>
export default {
  name: 'cart-control',
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    add(event) {
      if (!this.food.count) {
        // eslint-disable-next-line vue/no-mutating-props
        this.food.count = 1
      } else {
        // eslint-disable-next-line vue/no-mutating-props
        this.food.count++
      }
      this.$emit('add', event.target)
    },
    decrease() {
      if (this.food.count) {
        // eslint-disable-next-line vue/no-mutating-props
        this.food.count--
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.cartcontrol {
  display: flex;
  align-items: center;
  font-size: 16px;

  .cart-decrease {
    display: inline-block;
    padding: 6px;
    opacity: 1;
    cursor: pointer;

    .inner {
      display: inline-block;
      line-height: 24px;
      font-size: 24px;
      color: #00a0dc;
      transform: rotate(0);
    }

    &.move-enter-active,
    &.move-leave-active {
      transition: all 0.4s linear;

      .inner {
        transition: all 0.4s linear;
      }

    }

    &.move-enter-from,
    &.move-leave-to {
      opacity: 0;
      transform: translate3d(24px, 0, 0);

      .inner {
        transform: rotate(180deg);
      }
    }

  }

  .cart-count {
    width: 24px;
    line-height: 24px;
    text-align: center;
    font-size: 14px;
    color: #999;
  }

  .cart-add {
    display: inline-block;
    padding: 6px;
    line-height: 24px;
    font-size: 24px;
    color: #00a0dc;
    cursor: pointer;
    background: lighten($color: #00a0dc, $amount: 20%);
  }

  .iconfont {
    font-size: 24px;
  }
}
</style>
