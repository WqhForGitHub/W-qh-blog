<template>
  <div class="root-login">
    <el-card class="box-card">
      <template #header>
        <el-avatar :size="50"
          src="https://img1.baidu.com/it/u=110021325,3211326711&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"></el-avatar>
      </template>
      <el-form label-position="right" label-width="60px">
        <el-form-item label="用户名">
          <el-input v-model="loginInfo.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="loginInfo.password"></el-input>
        </el-form-item>
        <el-form-item>
          <div class="button-group">
            <el-button type="primary" @click="login">登录</el-button>
            <el-button type="success" @click="register">注册</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-card>
  </div>

  <el-dialog title="注册" v-model="dialogVisible">
    <el-form label-position="right" label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="registerInfo.userName"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="registerInfo.password"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmRegister">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRouter } from 'vue-router'
import { loginIn, register as registerAPI, getPublicKey } from "../api/login";
import JSEncrypt from 'jsencrypt/bin/jsencrypt'
import useMain from '../store/home'
import { storeToRefs } from 'pinia';

const main = useMain();


const router = useRouter()

let publicKeyStr = ref('')

let dialogVisible = ref(false);
let loginInfo = reactive({
  userName: "",
  password: "",
});

let registerInfo = reactive({
  userName: "",
  password: ""
})



/*
 * function
 *
 */

// 登录
async function login() {
  const res1 = await publicKey();
  const res = await loginIn({ res1: res1 })

  if (res.data.code === 0) {
    router.push({
      path: '/home/listItem'
    })
    window.localStorage.setItem('token', res.data.token)

    let { userInfo } = storeToRefs(main)
    userInfo.value = res.data.data[0]
  }

}

// 注册操作
const register = () => {
  dialogVisible.value = true;
};

// 确认注册
const confirmRegister = async () => {
  const res = await registerAPI({ ...registerInfo })
  if (res.data.code === 0) {
    console.log('添加成功！')
    dialogVisible.value = false
  } else {
    dialogVisible.value = true
  }
}

// 获取公钥
function publicKey() {
  return new Promise((resolve) => {
    getPublicKey().then((res) => {
      if (res.data.code === 0) {
        publicKeyStr = res.data.data;
        const encryptor = new JSEncrypt();
        encryptor.setPublicKey(publicKeyStr);
        resolve(encryptor.encrypt(JSON.stringify({ ...loginInfo })))
      }
    })
  })

}
</script>

<style scoped lang="scss">
.root-login {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;

  .el-card {
    width: 450px;
    height: 300px;
    position: relative;

    .el-avatar {
      width: 80px;
      height: 80px;
      margin: auto;
      display: block;
    }

    .button-group {
      width: 50%;
      margin: 20px auto;
    }
  }
}
</style>
