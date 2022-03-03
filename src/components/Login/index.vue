<template>
  <div class="login">
    <div class="close" @click="close">
      <i class="iconfont icon-24gl-shrink2"></i>
    </div>
    <div class="userinfo" v-if="userInfo.nickname">
      <div class="left">
        <div class="avatar">
          <img :src="userInfo.avatarUrl" alt="" />
        </div>
      </div>
      <div class="right">
        {{ userInfo.nickname }}
        <el-button @click="logout" class="logout" type="danger">退出登录</el-button>
      </div>
    </div>
    <el-card class="card" v-else>
      <div slot="header">登录</div>
      <el-form label-width="70px" :rules="rules" :model="account">
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="account.phone"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="account.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login">登录</el-button>
          <el-button @click="close">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Login',
  data() {
    return {
      account: {
        phone: '',
        password: '',
      },
      rules: {
        phone: [
          {
            required: true,
            message: '请输入手机号',
            trigger: 'blur',
          },
          {
            pattern: /^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/,
            message: '用户名必须是5-10个以上数字或字母',
          },
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur',
          },
          {
            pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/,
            message: '密码必须是3个以上的数字或字母',
          },
        ],
      },
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
  },
  methods: {
    close() {
      this.$emit('closeLogin')
    },
    login() {
      this.$store.dispatch('Login/userloginByCellphone', this.account)
    },
    logout() {
      this.$store.dispatch('Login/userLogout')
    },
  },
  watch: {
    '$store.state.Login.userInfo': {
      handler: function (val) {
        if (val) {
          this.$emit('closeLogin')
        }
      },
      deep: true,
      immediate: true,
    },
  },
}
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  .close {
    position: absolute;
    top: 10%;
    right: 10%;
    width: 50px;
    height: 50px;
    .iconfont {
      font-size: 50px;
      transition: all 0.3s;
      &:hover {
        color: #8e44ad;
      }
    }
  }
  .userinfo {
    display: flex;
    justify-content: center;
    .left {
      margin: 0 20px;
    }
    .right {
      display: flex;
      flex-direction: column;
      color: white;
      align-items: flex-end;
    }
    .logout {
      margin-top: 30px;
    }
    .avatar {
      width: 300px;
      height: 300px;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .card {
    width: 400px;
    height: 300px;
  }
}
</style>
