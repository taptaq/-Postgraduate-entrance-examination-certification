<template>
  <div>
    <Header></Header>
    <div class="progress">
      <div class="icon_wrap" v-show="success">
        <van-icon
          name="more"
          size="50"
          color="#1989fa"
          class="icon"
          @click="history.back()"
        />
        <p>审核中</p>
      </div>
      <div class="progress_content" v-show="success">
        <p>审核大概需要1-3个工作日</p>
        <van-button type="info" @click="toVerify">修改认证</van-button>
        <van-button type="info" @click="toNoVerify">放弃认证</van-button>
      </div>

      <div class="icon_wrap" v-show="!success">
        <van-icon name="clear" size="50" color="red" class="icon" />
        <p>审核失败</p>
      </div>
      <div class="progress_content" v-show="!success">
        <p>邮箱信息不正确</p>
        <van-button type="info">修改认证</van-button>
      </div>
    </div>

    <router-link tag="div" class="verify" to="/">
      <van-icon name="thumb-circle" size="80" color="#1989fa" />
      <div class="personMsg">
        <h3>学校认证</h3>
        <p>邮箱或校园卡</p>
      </div>
    </router-link>
  </div>
</template>

<script>
import Header from "../../components/Header";
export default {
  name: "rprogress",
  components: {
    Header,
  },
  data() {
    return {
      success: true,
    };
  },
  methods: {
    toVerify() {
      this.$router.push("/verify");
    },
    toNoVerify() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.progress {
  width: 100%;
  height: 120px;
  border-bottom: 1px solid rgba(124, 118, 118, 0.4);
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.icon_wrap {
  margin-left: 0.7rem;
}

.icon_wrap .icon {
  margin-top: 1.875rem;
}

.icon_wrap p {
  margin-top: 0.125rem;
}

.progress_content {
  font-size: 1rem;
  margin-right: 0.7rem;
}

.progress_content button {
  height: 2.2rem;
  width: 5.625rem;
  margin-right: 1rem;
  border-radius: 0.3125rem;
}

.verify {
  margin-top: 1.875rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 0 0.2rem #ccc;
  height: 7.5rem;
}

.verify h3 {
  font-size: 1.25rem;
  font-weight: 1000;
}

.verify .personMsg {
  position: relative;
  left: -3.5rem;
}
</style>
