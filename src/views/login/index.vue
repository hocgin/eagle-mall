<template>
  <Form @submit="onSubmit">
    <div class="avatar-wrapper">
      <VanImage round width="80" height="80"
                src="https://img.yzcdn.cn/vant/cat.jpeg"></VanImage>
    </div>
    <CellGroup>
      <Field v-model="username"
             name="username"
             label="账号"
             placeholder="请输入账号"
             :rules="[{ required: true, message: '请填写账号' }]"/>
      <Field v-model="password"
             name="password"
             label="密码"
             type="password"
             placeholder="请输入密码"
             :rules="[{ required: true, message: '请填写密码' }]"/>
    </CellGroup>
    <div style="margin: 16px;">
      <Button type="info" block>登录</Button>
    </div>
  </Form>
</template>

<script>
  import {Button, CellGroup, Field, Form, Image as VanImage} from 'vant';
  import {mapActions, mapState} from 'vuex'
  import * as models from '@/store/models-types'
  import * as actions from "@/store/actions-types";

  export default {
    components: {
      Field, CellGroup, Button, Form, VanImage
    },
    data() {
      return {
        username: null,
        password: null,
      }
    },
    computed: {
      ...mapState(models.APPS, {}),
    },
    watch: {},
    methods: {
      ...mapActions(models.APPS, {
        login: actions.LOGIN,
      }),
      onSubmit({password, username}) {
        this.login({
          payload: {
            username: username,
            password: password
          }
        });
      },
    }
  }
</script>

<style scoped>
  .avatar-wrapper {
    display: flex;
    justify-content: center;
    margin-top: 80px;
    margin-bottom: 20px;
  }
</style>