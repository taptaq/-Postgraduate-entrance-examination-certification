<template>
  <div>
    <Header></Header>
    <ul>
      <li>
        <div class="icon">
          <van-icon name="manager" size="80" color="#1989fa" />
        </div>

        <div class="personMsg">
          <h3>认证成功</h3>
          <p>电子科技大学</p>
          <p>研一</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import Header from "../../components/Header";
export default {
  name: "result",
  components: {
    Header,
  },
};
</script>

<style scoped>
ul {
  margin-top: 0.625rem;
  padding: 0.625rem 0.625rem;
}
li {
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 0 0.3125rem #ccc;
}

.icon {
  width: 100px;
  height: 100px;
  border: 1px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
}

.personMsg {
  position: relative;
  left: -2.5rem;
}
</style>
