<template>
  <div class="music-list w area">
    <!-- 精品歌单 -->
    <div class="highqualityEntry area">
      <img src="@/assets/img/playlist.jpg" alt="" class="bgcImage" />
      <div class="cover">
        <img src="@/assets/img/playlist.jpg" alt="" />
      </div>
      <div class="EntryInfo">
        <div class="tag">
          <el-icon><MostlyCloudy /></el-icon>
          <span>精品歌单</span>
        </div>
        <div class="text">华语独立乐团 | 将温柔塞满黄昏</div>
      </div>
    </div>

    <!-- 标签列表 -->
    <div class="musicListNavBar">
      <!-- 左边内容 -->
      <div class="left-list">
        <el-button @click="handleChangeClick" class="button" round>
          <span class="button">全部歌单</span>
          <el-icon><ArrowRight /> </el-icon>
        </el-button>
        <!-- 全部歌单 -->
        <div v-show="isDisplay" class="tooltip">
          <div class="allbutton">
            <span class="active">全部歌单</span>
            <el-divider />
          </div>
          <!--  -->
          <div class="singing-list">
            <ol>
              <template v-for="(value, key) in categoriesList.categories">
                <li>
                  <div class="categories">
                    <el-icon><Odometer /></el-icon>
                    <span>{{ value }}</span>
                  </div>
                </li>
              </template>
            </ol>
            <div class="sub">
              <ul>
                <template v-for="item in categoriesList.sub">
                  <li>
                    <span>{{ item.name }}</span>
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
          <template v-for="item in tags" :key="item.id">
            <li class="active">{{ item.name }}</li>
          </template>
        </ul>
      </div>
    </div>

    <!-- listCard -->
    <div class="list-card">
      <ul>
        <template v-for="item in playLists" :key="item.id">
          <li>
            <img :src="item.coverImgUrl" alt="" />
            <div class="icons">
              <el-icon><VideoPlay /></el-icon>
            </div>
            <p class="play">
              <el-icon><Headset /></el-icon>
              {{ formatePayCount(item?.playCount) }}
            </p>
            <el-text class="mx-1">{{ item.name }}</el-text>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useMusicListStore } from "@/stores/musiclist";
import { formatePayCount } from "@/utils/formatplay";
import { storeToRefs } from "pinia";
const musiclistStore = useMusicListStore();
const { tags, categoriesList, playLists } = storeToRefs(musiclistStore);
const isDisplay = ref(false);
console.log(playLists.value);
const handleChangeClick = () => {
  isDisplay.value = !isDisplay.value;
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
      z-index: 999;
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
      height: 800px;
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

        ol {
          li {
            display: flex;
            margin-top: 10px;
            .categories {
              width: 150px;
              margin-top: 10px;

              .el-icon {
                vertical-align: middle;
                font-size: 25px;
                color: var(--color-tags);
              }

              span {
                font-size: 12px;
                margin-left: 5px;
                color: var(--color-tags);
              }
            }
          }
        }

        .sub {
          ul {
            display: flex;
            height: 100%;
            width: 100%;
            margin-top: 10px;

            flex-wrap: wrap;
            li {
              margin-right: 40px;
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

// 列表展示
.list-card {
  ul {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    li {
      position: relative;
      width: 200px;
      height: 250px;
      margin: 20px 0;
      border-radius: 10px;
      border: 1px solid transparent;
      overflow: hidden;
      cursor: pointer;
      img {
        width: 100%;
        height: 200px;
        margin-bottom: 10px;
      }
      .el-text {
        font-size: 14px;
        padding: 5px 0;
        color: var(--color-black-primary);
      }
      .play {
        position: absolute;
        right: 5px;
        top: 5px;
        color: #ffffff;
        font-size: 12px;
      }
      .icons {
        position: absolute;
        opacity: 0;
        right: 7px;
        bottom: 50px;
        font-size: 30px;
        color: var(--background-color);
        transition: opacity 0.3s linear 0s;
      }
      .icons:hover {
        opacity: 1;
      }
      img:hover + .icons {
        opacity: 1;
      }
    }
  }
}
</style>
