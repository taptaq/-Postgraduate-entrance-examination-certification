<template>
  <div id="main">
    <Header></Header>
    <div class="content">
      <div class="tip">请填写下列资料以完成认证申请</div>
      <van-form class="form" method="post">
        <div class="label_title">学校*</div>
        <van-field
          readonly
          clickable
          name="school"
          :value="school"
          placeholder="请选择 - 请选择"
          @click="showSchoolList = true"
        />
        <van-popup v-model="showSchoolList" position="bottom">
          <van-area
            :area-list="areaList"
            @confirm="onConfirmSchool"
            @cancel="showSchoolList = false"
            :columns-num="2"
          />
        </van-popup>

        <div class="label_title">专业*</div>
        <van-field v-model="major" name="major" placeholder="输入专业信息，15字以内" />

        <div class="select_time">
          <div class="label_title">在校时间*</div>
          <!-- <van-cell :title="startDate" @click="showStartDate = true" class="cell" />
          <van-calendar v-model="showStartDate" @confirm="onConfirmStartDate" />
          <span class="join">------</span>
          <van-cell :title="endDate" @click="showEndDate = true" class="cell cell-last" />
          <van-calendar v-model="showEndDate" @confirm="onConfirmEndDate" /> -->

          <van-field
            clickable
            name="startDate"
            :value="startDate"
            placeholder="开始日期"
            @click="showStartDate = true"
            class="cell"
          />
          <van-calendar v-model="showStartDate" @confirm="onConfirmStartDate" />
          <span class="join">------</span>
          <van-field
            clickable
            name="endDate"
            :value="endDate"
            placeholder="结束日期"
            @click="showEndDate = true"
            class="cell cell-last"
          />
          <van-calendar v-model="showEndDate" @confirm="onConfirmEndDate" />
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
            <div
              class="verify email"
              :style="{ background: showActive === 1 ? '#ccc' : '' }"
              @click="onShowEmail(1)"
            >
              <div class="email_content">
                <van-icon name="envelop-o" color="#1989fa" size="45" />
                <div class="write">学校邮箱</div>
              </div>
            </div>
            <div
              class="verify stu_card"
              @click="onShowCard(2)"
              data-id="2"
              :style="{ background: showActive === 2 ? '#ccc' : '' }"
            >
              <div class="card_content">
                <van-icon name="card" color="#1989fa" size="45" />
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

            <div v-show="showCard">
              <div class="show_cardVerify" @click="showCardReq = true">
                <div v-show="showCardImg" class="showAdd">
                  <van-icon name="add" color="#1989fa" size="55" />
                  <div class="card_write">上传学生卡/学生证证明</div>
                </div>

                <div v-show="!showCardImg" class="img">
                  <img :src="srcUrl" alt="" ref="cardImg" />
                </div>
              </div>
              <p class="showExample" @click="showExample">查看样例</p>
            </div>

            <!--查看学生样例-->
            <van-popup v-model="showEG" :style="{ height: '20%' }" class="example_wrap">
              <div class="example">
                <h3>学生卡，学生证拍摄要求</h3>
                <p>请确保姓名，专业，学校清晰可见，无遮挡</p>
                <div class="img">
                  <img src="/img/1.jpg" alt="样例照片" />
                </div>
              </div>
            </van-popup>

            <!--上传学生证明-->
            <van-popup v-model="showCardReq" position="bottom" :style="{ height: '14%' }">
              <ul class="verifyList">
                <li>
                  <div>
                    <input
                      type="file"
                      style="opacity: 0; position: absolute"
                      @change="uploadImg"
                    />
                    从手机相册上传
                  </div>
                </li>
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

export default {
  name: "verify",
  components: {
    Header,
  },
  data() {
    return {
      showSchoolList: false, //控制展示选择学校的区域
      school: "", //学校的值
      areaList: {
        // 通过后端传过来的接口，渲染对应的学校数据
        // 现在看的是固定数据
        province_list: {
          110000: "北京",
          120000: "天津",
          130000: "河北省",
          140000: "山西省",
          150000: "内蒙古自治区",
          210000: "辽宁省",
          220000: "吉林省",
          230000: "黑龙江省",
          310000: "上海",
          320000: "江苏省",
          330000: "浙江省",
          340000: "安徽省",
          350000: "福建省",
          360000: "江西省",
          370000: "山东省",
          410000: "河南省",
          420000: "湖北省",
          430000: "湖南省",
          440000: "广东省",
          450000: "广西壮族自治区",
          460000: "海南省",
          500000: "重庆",
          510000: "四川省",
          520000: "贵州省",
          530000: "云南省",
          540000: "西藏自治区",
          610000: "陕西省",
          620000: "甘肃省",
          630000: "青海省",
          640000: "宁夏回族自治区",
          650000: "新疆维吾尔自治区",
          710000: "台湾省",
          810000: "香港特别行政区",
          820000: "澳门特别行政区",
          990000: "海外",
        },
        city_list: {
          // 北京
          110100: "北京大学",
          110200: "清华大学",
          110300: "中国人民大学",
          110400: "北京航天航空大学",
          110500: "中国科学院大学",
          110600: "北京师范大学",
          110700: "北京理工大学",
          110800: "中国农业大学",
          110900: "北京科技大学",
          111000: "北京交通大学",
          // 天津
          120100: "天津大学",
          120200: "南开大学",
          120300: "天津医科大学",
          120400: "天津师范大学",
          120500: "天津工业大学",
          120600: "天津科技大学",
          120700: "天津中医药大学",
          120800: "天津理工大学",
          120900: "天津财经大学",
          121000: "中国民航大学",
          // 河北
          130100: "燕山大学",
          130200: "河北大学",
          130300: "河北工业大学",
          130400: "河北师范大学",
          130500: "河北医科大学",
          130600: "河北农业大学",
          130700: "河北联合大学",
          130800: "河北科技大学",
          130900: "石家庄铁道大学",
          131000: "河北工程大学",

          // 上海
          310100: "复旦大学",
          310200: "上海交通大学",
          310300: "同济大学",
          310400: "华东师范大学",
          310500: "华东理工大学",
          310600: "上海大学",
          310700: "东华大学",
          310800: "上海财经大学",
          310900: "上海师范大学",
          311000: "上海理工大学",

          // 广东
          440100: "中山大学",
          440200: "华南理工大学",
          440300: "暨南大学",
          440400: "华南师范大学",
          440500: "华南农业大学",
          440600: "南方医科大学",
          440700: "深圳大学",
          440800: "广东工业大学",
          440900: "汕头大学",
          441000: "广州中医药大学",

          // 四川
          510100: "四川大学",
          510200: "电子科技大学",
          510300: "西南交通大学",
          510400: "西南财经大学",
          510500: "四川农业大学",
          510600: "成都理工大学",
          510700: "西南石油大学",
          510800: "四川师范大学",
          510900: "西南科技大学",
          511000: "成都中医药大学",
        },
      },
      major: "", //专业的值
      showStartDate: false, //控制显示开始日期的选择区域
      showEndDate: false, //控制显示结束时间的选择区域
      startDate: "开始日期",
      endDate: "结束日期",
      Research_direction: "", //研究方向的值
      tutor: "", //导师的值
      email: "", //邮箱的值
      verify_code: "", //验证码的值
      showEmail: false,
      showCard: false,
      showCardReq: false,
      disable: false,
      timer: null,
      showEG: false,
      showActive: 0,
      showCardImg: true,
      srcUrl: "", //学生证图片的base64路径
      formData: {
        //提交的数据
        school: "",
        major: "",
        startDate: "",
        showEndDate: "",
        Research_direction: "",
        tutor: "",
        email: "",
        srcUrl: "",
      },
    };
  },
  methods: {
    // 选择学校
    onConfirmSchool(values) {
      this.school = values
        .filter((item) => !!item)
        .map((item) => item.name)
        .join("/");
      this.showSchoolList = false;
    },

    // 选择日期
    formatDate(date) {
      //格式化日期样式（年/月）
      return `${date.getFullYear()}/${date.getMonth() + 1}`;
    },
    onConfirmStartDate(date) {
      this.showStartDate = false;
      this.startDate = this.formatDate(date);
    },
    onConfirmEndDate(date) {
      this.showEndDate = false;
      this.endDate = this.formatDate(date);
    },

    // 显示邮箱的区域
    onShowEmail(val) {
      this.showEmail = true;
      this.showCard = false;
      this.showActive = val;
    },

    // 显示学生证的区域
    onShowCard(val) {
      this.showEmail = false;
      this.showCard = true;
      this.showActive = val;
    },

    // 显示学生证上传的样例
    showExample() {
      this.showEG = true;
    },

    // 上传学生证图片
    uploadImg(e) {
      let file = e.target.files[0];
      let fr = new FileReader();
      fr.readAsDataURL(file); //对图片进行base64转码
      fr.onload = (e) => {
        this.srcUrl = e.target.result;
        this.showCardImg = false;
        this.showCardReq = false;
      };
    },

    // 发送验证码
    sendVerify() {
      this.disable = true;
      var i = 0;
      this.timer = setInterval(() => {
        i++;
        if (i >= 60) {
          clearInterval(this.timer);
          this.disable = false;
          i = 0;
          this.$refs.sendVerify.innerText = "重新发送";
        }
        this.$refs.disabledBtn.innerText = i + " S";
      }, 1000);
    },

    // 校验并提交表单的信息
    submitMsg() {
      if (!this.school) {
        this.$toast.fail("学校不能为空");
        return;
      } else if (!this.major) {
        this.$toast.fail("专业信息不能为空");
        return;
      } else if (this.major.length > 15) {
        this.$toast.fail("专业信息要在15字以内");
        return;
      } else if (this.startDate === "开始日期" || this.endDate === "结束日期") {
        this.$toast.fail("在校时间不能为空");
        return;
      } else if (new Date(this.startDate) > new Date(this.endDate)) {
        this.$toast.fail("在校的开始时间不能大于结束时间");
        return;
      } else if (this.Research_direction.length > 15) {
        this.$toast.fail("研究方向信息要在15字以内");
        return;
      } else if (!this.email && this.showEmail) {
        this.$toast.fail("邮箱号不能为空");
        return;
      } else if (!/^\S+\.edu\.cn$/.test(this.email) && this.showEmail) {
        this.$toast.fail("邮箱号必须以edu.cn结尾");
        return;
      } else if (!this.srcUrl && this.showCard) {
        this.$toast.fail("学生证图片上传不能为空");
        return;
      } else {
        // 校验全部正确的话，就把正确的信息都赋值到要提交数据的对象集合中
        this.formatDate.school = this.school;
        this.formatDate.major = this.major;
        this.formatDate.startDate = this.startDate;
        this.formatDate.endDate = this.endDate;
        this.formatDate.Research_direction = this.Research_direction;
        this.formatDate.tutor = this.tutor;
        this.formatDate.email = this.email;
        this.formatDate.srcUrl = this.srcUrl;
        this.$router.push("/progress"); //随后跳转到进度页面
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
  height: 2.2rem;
  margin: 0.625rem 0.625rem 0 0;
  font-size: 0.9375rem;
  position: relative;
  border-radius: 0.3125rem;
}

.cell-last {
  margin-left: 0.625rem;
}

.join {
  position: relative;
  left: 0;
  top: -0.75rem;
}

hr {
  margin: 1.875rem 0;
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
  height: 3.75rem;
  line-height: 3.75rem;
  margin: 0 0.3rem;
  border: 1px dashed rgb(103, 110, 148);
  background: rgb(238, 240, 243);
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
  font-size: 1.1rem;
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
  height: 12.5rem;
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.show_cardVerify .showAdd {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.show_cardVerify .write_card {
  margin-top: 1.5rem;
}

.show_cardVerify .img {
  width: 80%;
  height: 85%;
}

.show_cardVerify .img img {
  width: 100%;
  height: 100%;
}

.showExample {
  color: red;
  font-size: 1.1rem;
  margin: 0.5rem 0;
  margin-left: 8rem;
}

.showTip {
  margin-top: 1.6rem;
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

.example_wrap {
  background: rgba(0, 0, 0, 0);
  width: 21rem;
  color: #fff;
  overflow: visible;
}

.example {
  justify-content: center;
  position: relative;
  overflow: visible;
}

.example h3 {
  position: absolute;
  top: -10rem;
  left: 2rem;
}

.example p {
  position: absolute;
  top: -6.5rem;
  left: 1rem;
}

.example .img {
  width: 17.1875rem;
  height: 12.8125rem;
  position: absolute;
  top: -2rem;
  left: 2rem;
  background: #fff;
  border-radius: 0.3125rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.example .img img {
  width: 85%;
  height: 80%;
}
</style>
