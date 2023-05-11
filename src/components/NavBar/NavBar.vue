<template>
  <div class="nav-bar">
    <!-- 标签列表 -->
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
</template>

<script setup></script>

<style lang="less" scoped>
// 标签列表
.nav-bar {
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
</style>
