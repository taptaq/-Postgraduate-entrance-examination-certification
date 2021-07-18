<template>
  <div id="main">
    <Header></Header>
    <div class="content">
      <div class="tip">请填写下列资料以完成认证申请</div>
      <van-form class="form">
        <div class="label_title">学校*</div>
        <van-field
          v-model="fieldValue"
          clickable
          name="area"
          placeholder="点击选择"
          @click="showArea = true"
        />
        <van-popup v-model="showArea" position="bottom">
          <van-cascader
            :options="areaList"
            @confirm="onConfirmSchool"
            @close="showArea = false"
            @finish="onFinish"
          />
        </van-popup>

        <div class="label_title">专业*</div>
        <van-field v-model="major" name="major" placeholder="输入专业信息，15字以内" />

        <div class="select_time">
          <div class="label_title">在校时间*</div>
          <van-cell :title="date1" @click="show1 = true" class="cell" />
          <van-calendar v-model="show1" @confirm="onConfirmDate1" />
          <span class="join">------</span>
          <van-cell :title="date2" @click="show2 = true" class="cell cell-last" />
          <van-calendar v-model="show2" @confirm="onConfirmDate2" />
        </div>

        <div class="label_title">导师(选填)</div>
        <van-field v-model="tutor" name="tutor" placeholder="请输入导师信息" />

        <div class="label_title">研究方向(选填)</div>
        <van-field
          v-model="Research_direction"
          name="Research_direction"
          placeholder="请输入研究方向信息，15字以内"
        />

        <hr />

        <div>
          <h3>认证方式(二选一)</h3>

          <div class="verify_method">
            <div class="verify email" @click="onShowEmail">
              <div class="email_content">
                <van-icon name="envelop-o" color="#1989fa" size="47" />
                <div class="write">学校邮箱</div>
              </div>
            </div>
            <div class="verify stu_card" @click="onShowCard">
              <div class="card_content">
                <van-icon name="card" color="#1989fa" size="47" />
                <div class="write">校园/学生卡</div>
              </div>
            </div>

            <div class="show_emailVerify" v-show="showEmail">
              <h4>学校邮箱(以edu.cn结尾)</h4>
              <van-field v-model="email" name="email" placeholder="请输入邮箱号" />
              <van-field
                v-model="verify_code"
                name="verify_code"
                placeholder="请输入验证码"
                class="verify_code"
              />
              <van-button
                type="info"
                @click="sendVerify"
                ref="sendVerify"
                v-show="!disable"
                >发送验证码</van-button
              >
              <van-button disabled type="primary" ref="disabledBtn" v-show="disable"
                >发送验证码</van-button
              >
            </div>

            <div class="show_cardVerify" v-show="showCard" @click="showCardReq = true">
              <van-icon name="add" color="#1989fa" size="55" />
              <div class="card_write">上传学生卡/学生证证明</div>
            </div>
            <van-popup v-model="showCardReq" position="bottom" :style="{ height: '14%' }">
              <ul class="verifyList">
                <li>从手机相册上传</li>
                <li @click="showCardReq = false">关闭</li>
              </ul>
            </van-popup>

            <div class="showTip">
              <van-icon name="warning" color="#1989fa" size="17" />
              <span>所有认证材料只用于证明信息，不会展示出来</span>
            </div>
          </div>
        </div>

        <div class="submit-btn">
          <van-button block type="info" native-type="submit" @click="submitMsg"
            >提 交 认 证</van-button
          >
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import Header from "../../components/Header";
import { areaList } from "@vant/area-data"; //引入省级数据

export default {
  name: "home",
  components: {
    Header,
  },
  data() {
    return {
      showArea: false,
      fieldValue: "",
      areaList: [
        {
          text: "北京省",
          value: "1",
          children: [
            { text: "北京大学", value: "1.1" },
            { text: "清华大学", value: "1.2" },
            { text: "中国人民大学", value: "1.3" },
            { text: "北京航天航空大学", value: "1.4" },
            { text: "北京理工大学", value: "1.5" },
          ],
        },
        {
          text: "天津省",
          children: [
            { text: "南开大学" },
            { text: "天津大学" },
            { text: "河北工业大学" },
            { text: "天津医科大学" },
            { text: "天津科技大学" },
          ],
        },
        {
          text: "广东省",
          children: [
            { text: "中山大学" },
            { text: "华南理工大学" },
            { text: "暨南大学" },
            { text: "华南农业大学" },
            { text: "广州大学" },
          ],
        },
      ],
      major: "",
      show1: false,
      show2: false,
      date1: "开始日期",
      date2: "结束日期",
      Research_direction: "",
      tutor: "",
      email: "",
      verify_code: "",
      showEmail: false,
      showCard: false,
      showCardReq: false,
      disable: false,
      timer: null,
    };
  },
  methods: {
    onConfirmSchool(values) {
      this.school = values
        .filter((item) => !!item)
        .map((item) => item.name)
        .join("/");
      this.showArea = false;
    },

    formatDate(date) {
      return `${date.getFullYear()}/${date.getMonth() + 1}`;
    },
    onConfirmDate1(date) {
      this.show1 = false;
      this.date1 = this.formatDate(date);
    },
    onConfirmDate2(date) {
      this.show2 = false;
      this.date2 = this.formatDate(date);
    },

    onShowEmail() {
      this.showEmail = true;
      this.showCard = false;
    },

    onShowCard() {
      this.showEmail = false;
      this.showCard = true;
    },

    sendVerify() {
      this.disable = true;
      var i = 0;
      this.timer = setInterval(() => {
        i++;
        if (i >= 10) {
          clearInterval(this.timer);
          this.disable = false;
          i = 0;
        }
        this.$refs.disabledBtn.innerText = i + "秒后重新发送";
      }, 1000);
    },

    onFinish({ selectedOptions }) {
      this.showArea = false;
      this.fieldValue = selectedOptions.map((option) => option.text).join("/");
    },

    submitMsg() {
      if (!this.fieldValue) {
        this.$toast.fail("学校不能为空");
        return;
      }
      if (!this.major) {
        this.$toast.fail("专业信息不能为空");
        return;
      }
      if (this.major.length > 15) {
        this.$toast.fail("专业信息要在15字以内");
        return;
      }

      if (this.date1 === "开始日期" || this.date2 === "结束日期") {
        this.$toast.fail("在校时间不能为空");
        return;
      }

      if (this.Research_direction.length > 15) {
        this.$toast.fail("研究方向信息要在15字以内");
        return;
      }

      if (!/^\S+\.edu\.cn$/.test(this.email) && this.showEmail) {
        this.$toast.fail("邮箱号必须以edu.cn结尾");
        return;
      } else {
        this.$router.push("/progress");
      }
    },
  },
};
</script>

<style scoped>
#main {
  width: 100%;
  height: 100%;
}

.content {
  margin-top: 1.625rem;
  padding: 0 1rem;
  overflow: auto;
}

.form {
  margin-top: 1.4375rem;
}

.label_title {
  font-size: 1.2rem;
  font-weight: 800;
  margin-top: 1.0625rem;
}

.van-field {
  margin: 0.7rem 0;
  padding: 0.3125rem 0.625rem;
  border: 1px solid #000;
  border-radius: 0.3125rem;
  width: 21.5rem;
}

.cell {
  display: inline-block;
  width: 8.75rem;
  border: 1px solid #000;
  height: 2.5rem;
  margin: 0.625rem 0.625rem 0 0;
  font-size: 0.9375rem;
  position: relative;
  border-radius: 0.3125rem;
}

.cell-last {
  margin-left: 0.625rem;
}

.cell div {
  position: absolute;
  top: 0.5rem;
  left: 1rem;
}

.join {
  position: relative;
  left: 0;
  top: -0.75rem;
}

hr {
  margin: 25px 0;
}

h3 {
  font-size: 1.5rem;
}

h4 {
  font-size: 1.28rem;
}

.verify_method {
  width: 100%;
}

.verify_method .verify {
  display: inline-block;
  width: 44%;
  margin: 0 0.3rem;
  border: 1px dashed rgb(103, 110, 148);
  background: rgb(220, 225, 235);
}

.verify_method .verify.stu_card {
  width: 48%;
}

.verify_method .verify .email_content {
  display: flex;
  justify-content: center;
  align-items: center;
}

.verify_method .verify .card_content {
  display: flex;
  justify-content: center;
  align-items: center;
}

.verify_method .write {
  font-size: 1.25rem;
  font-weight: 800;
  margin-left: 5px;
}

.verify_code {
  margin: 0.7rem 0;
  padding: 0.3125rem 0.625rem;
  border: 1px solid #000;
  border-radius: 0.3125rem;
  width: 9rem;
}

.show_emailVerify {
  position: relative;
}

.show_emailVerify button {
  position: absolute;
  right: 0;
  top: 6.25rem;
  height: 2.375rem;
  border-radius: 0.3125rem;
  width: 9.5rem;
  font-size: 1rem;
  line-height: 2.375rem;
}

.show_cardVerify {
  border: 1px solid #000;
  width: 21rem;
  height: 9.375rem;
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.show_cardVerify .write_card {
  margin-top: 1.5rem;
}

.showTip {
  margin-top: 1.5rem;
  color: rgb(182, 164, 164);
  font-weight: 600;
  position: relative;
}

.showTip span {
  margin-left: 0.3125rem;
  position: absolute;
  top: -0.1875rem;
}

.submit-btn {
  margin-top: 1rem;
}

.submit-btn button {
  border-radius: 0.625rem;
}

.submit-btn div {
  font-size: 1.25rem;
}

.verifyList {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.verifyList li {
  text-align: center;
  width: 100%;
  height: 2.8125rem;
  border-bottom: 1px solid #ccc;
  line-height: 2.8125rem;
}

.verifyList li:last-child {
  border-bottom: none;
}
</style>
