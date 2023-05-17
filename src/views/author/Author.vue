<template>
  <div class="author">
    <div class="userInfo">
      <div class="left">
        <img :src="userData.profile?.avatarUrl" alt="" />
      </div>
      <div class="right">
        <div class="rightTop">
          <!-- 开发 5/13 -->
          <div class="username">
            <p>xiaoluo</p>
            <!-- <p>1</p> -->
          </div>
          <div class="tags">
            <div class="level">Lv8</div>
            <!-- gender -->
            <div class="gender">
              <svg class="icon icon-comment" aria-hidden="true">
                <use xlink:href="#icon-nan"></use>
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
              <p>100</p>
              <p>动态</p>
            </div>
            <div class="numItem">
              <p>1</p>
              <p>关注</p>
            </div>
            <div class="numItem">
              <p>9999+</p>
              <p>粉丝</p>
            </div>
          </div>
          <div class="otherInfo">
            <div class="otherInfosItem">所在地区: 重庆</div>
            <div class="otherInfosItem">个人介绍:热爱生活，终身学习</div>
          </div>
        </div>
      </div>
    </div>
    <div class="swiper"></div>

    <!-- 个人介绍 -->
    <div class="introduce">
      <h2>个人介绍</h2>
    </div>
  </div>
</template>

<script setup>
import { useUserInfo } from "@/stores/user";
import { storeToRefs } from "pinia";

const userInfoStore = useUserInfo();

const { userData } = storeToRefs(userInfoStore);

console.log(userData);
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

.swiper {
  width: 100%;
  height: 200px;
  margin-top: 30px;
  background: url(../../assets/img/author/swiper2.png) no-repeat center center /
    100%;
}

// 个人介绍
.introduce {
  margin-top: 30px;
  h2 {
    font-size: 30px;
    font-weight: 900;
  }
}
</style>
