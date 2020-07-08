<template>
  <div class="container">
    <Toolbar :left-arrow="false">
      <template #title>
        商品搜索列表
      </template>
    </Toolbar>
    <List @load="onLoad"
          :finished="finished"
          v-model="loading"
          finished-text="没有更多了">
      <router-link v-for="item in list" v-bind:key="item.id"
                   :to="getProductUrl(item.id)">
        <Card :title="item.title"
              desc="很懒暂未填写"
              :price="formatMoney(item.minPrice)"
              :thumb="item.mainPhotoUrl">
          <template #tags>
            <Tag plain type="danger">{{item.procurement}}</Tag>
          </template>
        </Card>
      </router-link>
    </List>
  </div>
</template>

<script>
  import Toolbar from '@/components/Toolbar'
  import {Card, List, Tag} from 'vant';
  import * as models from '@/store/models-types'
  import {mapActions, mapState} from 'vuex'
  import {Util} from "@/utils/util";
  import {Urls} from "@/utils/constant/global";

  export default {
    components: {Card, List, Tag, Toolbar},
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
      getProductUrl(id) {
        return Urls.getProductPage(id)
      },
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