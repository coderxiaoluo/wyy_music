<template>
  <div class="Personal">
    <div class="userInfo">
      <div class="left">
        <img
          v-if="userData.profile"
          :src="userData.profile?.avatarUrl"
          alt=""
        />
      </div>
      <div class="right">
        <div class="rightTop">
          <div class="username">
            <p v-if="userData.profile">{{ userData.profile?.nickname }}</p>
            <!-- <p>1</p> -->
          </div>
          <div class="tags">
            <div class="level">Lv{{ userData.level }}</div>
            <!-- gender -->
            <div class="gender">
              <svg
                v-if="userData.profile?.gender == 1"
                class="icon icon-comment"
                aria-hidden="true"
              >
                <use xlink:href="#icon-nan"></use>
              </svg>
              <svg v-else class="icon icon-comment" aria-hidden="true">
                <use xlink:href="#icon-nv"></use>
              </svg>
            </div>
          </div>
          <el-divider class="divider">
            <el-icon><star-filled /></el-icon>
          </el-divider>
        </div>
        <div class="rightBottom">
          <div class="dataNums">
            <div class="numItem">
              <p>{{ userData.profile?.sCount }}</p>
              <p>动态</p>
            </div>
            <div class="numItem">
              <p>{{ userData.profile?.follows }}</p>
              <p>关注</p>
            </div>
            <div class="numItem">
              <p>{{ userData.profile?.followeds }}</p>
              <p>粉丝</p>
            </div>
          </div>
          <div class="otherInfo">
            <div class="otherInfosItem">所在地区: {{ 50001 }}</div>
            <div class="otherInfosItem">
              个人介绍:{{ userData.profile?.signature }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 喜欢的音乐 -->
    <div class="musicList">
      <div class="createMusic">
        <h2>我创建的歌单</h2>
        <ul>
          <template v-for="item in createdList">
            <li
              @click="selectPageClick(item)"
              v-if="item.creator.djStatus == 10"
            >
              <img :src="item.coverImgUrl" alt="" />
              <p>{{ item.name }}</p>
            </li>
          </template>
        </ul>
      </div>
      <div class="collect">
        <h2>我收藏的歌单</h2>
        <ul>
          <template v-for="item in createdList">
            <li
              @click="selectPageClick(item)"
              v-if="item.creator.djStatus == 0"
            >
              <img :src="item.coverImgUrl" alt="" />
              <p>{{ item.name }}</p>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useUserInfo } from "@/stores/user";
import { useUserMusicStore } from "@/stores/usermusic";
import { useRouter } from "vue-router";

const userInfoStore = useUserInfo();
const { userData } = storeToRefs(userInfoStore);

const userMusicStore = useUserMusicStore();
const { createdList } = storeToRefs(userMusicStore);

const router = useRouter();
const selectPageClick = (v) => {
  router.push({
    path: `/musicdetail/${v.id}`,
  });
};
</script>

<style lang="less" scoped>
.userInfo {
  height: 200px;
  // background-color: skyblue;
  display: flex;
  .left {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      transition: transform 0.2s linear 0s;
    }
  }
  .left:hover img {
    transform: scale(1.1);
  }
  .right {
    flex: 1;
    padding-left: 20px;
    box-sizing: content-box;

    .rightTop {
      .username {
        display: flex;
        justify-content: space-between;
        p {
          font-size: 25px;
          font-weight: 900;
        }
      }
      .tags {
        margin: 10px 0;
        display: flex;
        align-items: center;
        .level {
          font-size: 12px;
          width: 30px;
          height: 20px;
          line-height: 20px;
          text-align: center;
          border-radius: 15px;
          background-color: var(--color-tags);
        }
        .gender {
          font-size: 12px;
        }
      }
    }
    .divider {
      margin: 15px 0;
    }
    .rightBottom {
      .dataNums {
        display: flex;
        .numItem {
          display: flex;
          flex-direction: column;
          align-items: left;
          justify-content: space-between;
          width: 50px;
          height: 40px;
          :nth-child(1) {
            font-size: 18px;
          }
          :nth-child(2) {
            font-size: 12px;
          }
        }
      }
      .otherInfo {
        margin: 10px 0;
        font-size: 13px;
        color: var(--color-black-primary);

        .otherInfosItem {
          font-weight: 700;

          margin: 10px 0;
        }
      }
    }
  }
}

.musicList {
  margin-top: 40px;
  display: flex;
  flex-direction: column;

  .createMusic,
  .collect {
    display: flex;
    flex-direction: column;
    h2 {
      font-size: 20px;
      font-weight: 800;
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      li {
        position: relative;
        width: 200px;
        height: 250px;
        margin: 20px 20px;
        border-radius: 10px;
        border: 1px solid transparent;
        overflow: hidden;
        cursor: pointer;
        img {
          width: 100%;
          height: 200px;
          margin-bottom: 10px;
          border-radius: 10px;
        }
        p {
          font-size: 16px;
        }
      }
    }
  }
}
</style>
