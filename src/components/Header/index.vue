<template>
  <header id="header">
    <div class="arrow">
      <van-icon name="arrow-left" size="20" color="black" @click="onBack" />
    </div>

    个人认证
  </header>
</template>

<script>
export default {
  name: "Header",
  methods: {
    onBack() {
      history.back();
    },
  },
};
</script>

<style scoped>
#header {
  height: 3.125rem;
  width: 100%;
  font-size: 1.1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.4);
  text-align: center;
  line-height: 3.1875rem;
}

.arrow {
  position: absolute;
  left: 0.8125rem;
  top: 0.3125rem;
}
</style>
