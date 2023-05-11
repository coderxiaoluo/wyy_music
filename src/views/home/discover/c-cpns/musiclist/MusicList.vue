<template>
  <div class="music-list w area">
    <!-- 精品歌单 -->
    <div
      @click="handlePageBoutiqueClick"
      v-if="currentName != '综艺'"
      class="highqualityEntry area"
    >
      <img :src="FirstBoutiqueDataList?.coverImgUrl" alt="" class="bgcImage" />
      <div class="cover">
        <img :src="FirstBoutiqueDataList?.coverImgUrl" alt="" />
      </div>
      <div class="EntryInfo">
        <div class="tag">
          <el-icon><MostlyCloudy /></el-icon>
          <span>精品歌单</span>
        </div>
        <div class="text">{{ FirstBoutiqueDataList?.name }}</div>
      </div>
    </div>
    <!-- 标签列表 -->
    <div class="musicListNavBar">
      <!-- 左边内容 -->
      <div class="left-list">
        <el-button @click="handleChangeClick" class="button" round>
          <span class="button">{{ currentName }}</span>
          <el-icon><ArrowRight /> </el-icon>
        </el-button>
        <!-- 全部歌单 -->
        <div v-show="isDisplay" class="tooltip">
          <div class="allbutton">
            <span
              @click="onChangeCategoriesListAllClick"
              :class="{ active: currentName === '全部歌单' }"
            >
              全部歌单
            </span>
            <el-divider />
          </div>
          <!-- singing-list -->
          <div class="singing-list">
            <div class="sub">
              <ul>
                <template v-for="(item, index) in categoriesList.sub">
                  <li>
                    <span
                      :class="{ active: currentName === item.name }"
                      @click="onChangeCategoriesListClick(item)"
                      >{{ item.name }}</span
                    >
                  </li>
                </template>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <!-- 右边内容 -->
      <div class="right-list">
        <ul>
          <template v-for="(item, index) in tags" :key="item.id">
            <li
              :class="{ active: currentName === item.name }"
              @click="onChangeDataListClick(item)"
            >
              {{ item.name }}
            </li>
          </template>
        </ul>
      </div>
    </div>
    <!-- listCard -->
    <ListCard :cardList="playLists" />
    <!-- 分页 -->
    <el-pagination
      small
      background
      layout="prev, pager, next"
      :total="100"
      class="mt-4"
      @prev-click="prevChangeDataListClick"
      @next-click="nextChangeDataListClick"
      @current-change="sizeChangeDataListClick"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useMusicListStore } from "@/stores/musiclist";
import ListCard from "@/components/ListCard/ListCard.vue";
import { storeToRefs } from "pinia";
const musiclistStore = useMusicListStore();
let currentName = ref("全部歌单");

// 发送网络请求
musiclistStore.getTopPLayListOrderAction(currentName.value);
musiclistStore.getBoutiqueDataListAction();

const { tags, categoriesList, playLists, FirstBoutiqueDataList } =
  storeToRefs(musiclistStore);

// 点击展开与隐藏
const isDisplay = ref(false);
const handleChangeClick = () => {
  isDisplay.value = !isDisplay.value;
};

// 点击发送不同的歌单请求
const onChangeCategoriesListClick = (v) => {
  currentName.value = v.name;
  // 当等于综艺时进行隐藏
  musiclistStore.getTopPLayListOrderAction(v.name);
  musiclistStore.getBoutiqueDataListAction(v.name);
};
const onChangeDataListClick = (v) => {
  currentName.value = v.name;
  // 当等于综艺时进行隐藏
  musiclistStore.getTopPLayListOrderAction(v.name);
  musiclistStore.getBoutiqueDataListAction(v.name);
};
const onChangeCategoriesListAllClick = () => {
  currentName.value = "全部歌单";
  musiclistStore.getTopPLayListOrderAction(currentName.value);
  musiclistStore.getBoutiqueDataListAction();
};
// 分页的请求

// 上一页按钮请求
const pageIndex = ref(1);
const prevChangeDataListClick = () => {
  musiclistStore.getTopPLayListOrderAction(
    currentName.value,
    pageIndex.value--
  );
};
// 下一页按钮请求
const nextChangeDataListClick = () => {
  musiclistStore.getTopPLayListOrderAction(
    currentName.value,
    pageIndex.value++
  );
};
// 点击数字发送请求
const sizeChangeDataListClick = (v) => {
  musiclistStore.getTopPLayListOrderAction(currentName.value, v);
};

const handlePageBoutiqueClick = () => {
  musiclistStore.getBoutiqueDataListAction();
};
</script>

<style lang="less" scoped>
.active {
  background-color: var(--color-tags);
  color: var(--el-color-primary);
}
.el-tabs__content {
  width: 100%;
  height: 100%;
}
// 精品歌单
.highqualityEntry {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 180px;
  border-radius: 15px;
  overflow: hidden;
  padding: 20px;
  cursor: pointer;
  box-sizing: border-box;

  .bgcImage {
    position: absolute;
    width: 100%;
    z-index: -1;
    filter: blur(40px) brightness(50%);
  }
  .cover {
    img {
      width: 150px;
      height: 150px;
      border-radius: 15px;
      z-index: 99;
    }
  }
  .EntryInfo {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 100%;
    margin-left: 10px;
    .tag {
      width: 100px;
      height: 30px;
      border-radius: 30px;
      border: 1px solid #d59e54;
      color: #d59e54;
      text-align: center;
      font-size: 14px;
      line-height: 30px;
      box-sizing: border-box;
      .el-icon {
        margin-right: 5px;
        font-size: 18px;
        vertical-align: middle;
      }
    }
    .text {
      color: #ffffff;
    }
  }
}

// 标签列表
.musicListNavBar {
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  width: 100%;
  // 左边部分
  .left-list {
    position: relative;
    // tooltip
    .tooltip {
      position: absolute;
      left: 0;
      top: 30px;
      margin-top: 10px;
      width: 700px;
      // height: 800px;
      background-color: var(--color-white-primary);
      overflow: hidden;
      z-index: 999;
      box-shadow: 2px 2px 2px 2px #ccc;
      .allbutton {
        width: 100%;
        height: 40px;
        line-height: 40px;
        // padding-left: 30px;
        font-size: 14px;
        span {
          cursor: default;
          padding: 5px 10px;
          border-radius: 15px;
          margin-left: 30px;
        }
        .el-divider--horizontal {
          margin: 10px 0;
        }
      }
      //
      .singing-list {
        margin-top: 20px;
        padding: 20px;
        display: flex;

        // ol {
        //   li {
        //     display: flex;
        //     margin-top: 10px;
        //     .categories {
        //       width: 150px;
        //       margin-top: 10px;

        //       .el-icon {
        //         vertical-align: middle;
        //         font-size: 25px;
        //         color: var(--color-tags);
        //       }

        //       span {
        //         font-size: 12px;
        //         margin-left: 5px;
        //         color: var(--color-tags);
        //       }
        //     }
        //   }
        // }

        .sub {
          ul {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            height: 100%;
            width: 100%;
            flex-wrap: wrap;
            li {
              margin: 10px;
              width: 50px;
              color: var(--color-black-primary);
              font-size: 12px;
              cursor: pointer;
            }
            li:hover {
              color: var(--background-color);
            }
          }
        }
      }
    }
  }
  // 右边部分
  .right-list {
    ul {
      display: flex;
      font-size: 12px;
      li {
        margin: 0 10px;
        text-align: center;
        padding: 4px;
        border-radius: 5px;
        cursor: default;
      }
    }
  }
}

// 分页
.el-pagination {
  width: 100%;
  justify-content: center;
  margin: 20px 0 50px 0;
  --el-color-primary: var(--background-color);
}
</style>
