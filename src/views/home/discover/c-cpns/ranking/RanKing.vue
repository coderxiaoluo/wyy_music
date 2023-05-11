<template>
  <div class="ranking w">
    <!-- 官方榜 -->
    <div class="offical area">
      <h3>官方榜</h3>
      <template v-for="item in mapItem">
        <div class="officalItem">
          <div class="listCover">
            <img :src="item.coverImgUrl" alt="" />
          </div>
          <div class="listContainer">
            <el-table
              :data="item.tracks"
              stripe
              :show-header="false"
              style="width: 100%"
              @cell-dblclick="onplaydbClick(item)"
            >
              <el-table-column type="index" width="50" />
              <el-table-column prop="first" label="" width="600" />
              <el-table-column prop="second" label="" width="300" />
            </el-table>
            <div class="checkAll">查看全部</div>
          </div>
        </div>
      </template>
    </div>
    <!-- 全球榜 -->
    <div class="global area">
      <h3>全球榜</h3>
      <div class="list-card">
        <ListCard :cardList="mapEndItem" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useTopListStore } from "@/stores/toplist";
// import { formatePayCount } from "@/utils/formatplay";
import ListCard from "@/components/ListCard/ListCard.vue";
import { storeToRefs } from "pinia";
import { computed } from "vue";
const topListStore = useTopListStore();
const { toplist } = storeToRefs(topListStore);

// 前四条数据
const mapItem = computed(() => toplist.value.map((item) => item).splice(0, 4));
// 后面数据
const mapEndItem = computed(() =>
  toplist.value.map((item) => item).splice(4, toplist.value.length - 1)
);
const onplaydbClick = (v) => {
  console.log(v);
};
</script>

<style lang="less" scoped>
// 官方榜
.offical {
  h3 {
    font-size: 20px;
    font-weight: 900;
    margin: 20px 0;
  }

  //
  .officalItem {
    display: flex;
    width: 100%;
    margin-top: 20px;
    // background-color: skyblue;

    .listCover {
      width: 200px;
      height: 100%;
      // background-color: pink;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .listContainer {
      flex: 1;
      margin-left: 20px;
      .checkAll {
        font-size: 12px;
        margin-top: 10px;
        padding-left: 10px;
      }
    }
  }
}

// 全球榜
.global {
  h3 {
    font-size: 20px;
    font-weight: 900;
    margin: 20px 0;
  }
  // 列表展示
  // .list-card {
  //   ul {
  //     display: flex;
  //     justify-content: space-between;
  //     flex-wrap: wrap;

  //     li {
  //       position: relative;
  //       width: 200px;
  //       height: 250px;
  //       margin: 20px 0;
  //       border-radius: 10px;
  //       border: 1px solid transparent;
  //       overflow: hidden;
  //       cursor: pointer;
  //       img {
  //         width: 100%;
  //         height: 200px;
  //         margin-bottom: 10px;
  //         border-radius: 10px;
  //       }
  //       .el-text {
  //         font-size: 14px;
  //         padding: 5px 0;
  //         color: var(--color-black-primary);
  //       }
  //       .play {
  //         position: absolute;
  //         right: 5px;
  //         top: 5px;
  //         color: #ffffff;
  //         font-size: 12px;
  //       }
  //       .icons {
  //         position: absolute;
  //         opacity: 0;
  //         right: 7px;
  //         bottom: 50px;
  //         font-size: 30px;
  //         color: var(--background-color);
  //         transition: opacity 0.3s linear 0s;
  //       }
  //       .icons:hover {
  //         opacity: 1;
  //       }
  //       img:hover + .icons {
  //         opacity: 1;
  //       }
  //     }
  //   }
  // }
}
</style>
