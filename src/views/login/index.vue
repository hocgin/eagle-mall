<template>
  <Form @submit="onSubmit">
    <div class="avatar-wrapper">
      <VanImage round width="80" height="80"
                src="https://img.yzcdn.cn/vant/cat.jpeg"></VanImage>
    </div>
    <CellGroup>
      <Field v-model="username"
             label="账号"
             placeholder="请输入账号"
             :rules="[{ required: true, message: '请填写账号' }]"/>
      <Field v-model="password"
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
  import {createNamespacedHelpers} from 'vuex'

  const {mapActions, mapState} = createNamespacedHelpers('apps')
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
      ...mapState(['data']),
    },
    watch: {},
    methods: {
      onSubmit(values) {
        console.log('登录', values);
      },
      ...mapActions(['requestUrl']),
      async onClick() {
        console.log('点击', mapActions(['requestUrl']))
        let a = await this.requestUrl({sd: "sd"});
        console.log('sd', a, this.$store.state['apps'].data)
      }
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