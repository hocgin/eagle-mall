<template>
  <div class="container">
    <Toolbar>
      <template #title>退款申请</template>
    </Toolbar>
    <div class="page">
      <Form @submit="onSubmit">
        <CellGroup>
          <Field v-model="refundReason"
                 name="refundReason"
                 label="退款原因"
                 placeholder="请输入退款原因"
                 :rules="[{ required: true, message: '请填写退款原因' }]"/>
          <Field v-model="refundRemark"
                 name="refundRemark"
                 label="退款备注"
                 placeholder="请输入退款备注"
                 :rules="[{ required: true, message: '请填写退款备注' }]"/>
        </CellGroup>
        <div style="margin: 16px;">
          <Button type="info" block>提交申请</Button>
        </div>
      </Form>
    </div>
  </div>
</template>
<script>

  import Toolbar from '@/components/Toolbar'
  import {Button, CellGroup, Field, Form, Toast} from 'vant';
  import {mapActions} from "vuex";
  import * as models from "@/store/models-types";
  import * as actions from "@/store/actions-types";

  export default {
    components: {Toolbar, CellGroup, Field, Button, Form},
    data() {
      return {
        refundReason: null,
        refundRemark: null,
      }
    },
    mounted() {
      let {id} = this.$route.params;
      this.id = id;
    },
    computed: {},
    watch: {},
    methods: {
      ...mapActions(models.ME, {
        createRefundApply: actions.CREATE_REFUND_APPLY,
      }),
      onSubmit({refundRemark, refundReason}) {
        let callback = () => {
          Toast.success('提交成功');
        };
        this.createRefundApply({
          payload: {
            orderItemId: this.id,
            refundReason: refundReason,
            refundRemark: refundRemark,
          },
          callback: callback
        });
      }
    }
  }
</script>
<style scoped lang="less">
  @import "src/global.less";

  .container {
    box-sizing: border-box;
    background-color: @backgroundColor;
    min-height: 100%;
  }

  .page {
    padding-top: 20px;
  }
</style>