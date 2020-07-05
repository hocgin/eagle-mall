<template>
  <div>
    <List @load="onLoad"
          :finished="finished"
          v-model="loading"
          finished-text="没有更多了">
      <Card v-for="item in list" v-bind:key="item.id"
            :title="item.title"
            desc="很懒暂未填写"
            :price="formatMoney(item.minPrice)"
            :thumb="item.mainPhotoUrl">
        <template #tags>
          <Tag plain type="danger">{{item.procurement}}</Tag>
        </template>
      </Card>
    </List>
  </div>
</template>

<script>
  import {Card, List, Tag} from 'vant';
  import * as models from '@/store/models-types'
  import {mapActions, mapState} from 'vuex'
  import {Util} from "@/utils/util";

  export default {
    components: {Card, List, Tag},
    data() {
      return {
        loading: false,
        finished: false,
        page: 1,
        list: [],
      }
    },
    created() {
    },
    computed: {
      ...mapState(models.PRODUCT, {
        // list: (state) => state.paging
      }),
    },
    watch: {},
    methods: {
      ...mapActions(models.PRODUCT, {
        paging: 'paging',
      }),
      formatMoney: Util.money,
      onLoad() {
        this.loading = true;
        this.paging({
          payload: {
            page: this.page++,
          },
          callback: ({data: {records}}) => {
            this.loading = false;
            if (records.length === 0) {
              this.finished = true;
              return;
            }
            this.list = [...this.list, ...records];
          }
        });
      },
    }
  }
</script>
<style scoped>
</style>