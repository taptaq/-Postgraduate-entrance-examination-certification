<template>
  <div>
    <Header></Header>
    <div class="verify">
      <van-icon name="thumb-circle" size="95" color="#1989fa" />
      <div class="personMsg">
        <h3>学校认证</h3>
        <p>邮箱或校园卡</p>
      </div>
      <van-button type="info" @click="toVerify">去认证</van-button>
    </div>

    <router-link class="showVerify" to="/result">
      <van-button type="info">查看认证</van-button>
    </router-link>
  </div>
</template>

<script>
import Header from "../../components/Header";
export default {
  name: "noVerify",
  components: {
    Header,
  },
  methods: {
    toVerify() {
      this.$router.push("/home");
    },
  },
};
</script>

<style scoped>
.verify {
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-bottom: 1px solid #ccc;
  height: 7.5rem;
}

.verify h3 {
  font-size: 1.25rem;
  font-weight: 1000;
}

.verify .personMsg {
  left: -3.5rem;
}

.verify button {
  border-radius: 0.3125rem;
  height: 2.375rem;
}

.showVerify {
  position: relative;
  left: calc(50% - 4.5rem);
  top: 1.5rem;
}

.showVerify button {
  width: 9rem;
  height: 3.75rem;
  font-size: 1.125rem;
  border-radius: 0.625rem;
}
</style>
