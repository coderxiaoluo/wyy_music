<template>
  <div class="user-info">
    <div class="infos">
      <el-avatar
        v-if="!profile.avatarUrl"
        class="userFilled"
        :icon="UserFilled"
      />
      <img v-else class="avatarUrl" :src="profile.avatarUrl" alt="头像" />
    </div>
    <ul>
      <li v-if="!profile.nickname" @click="handleLoginClick">未登录</li>
      <li v-else class="nickname">
        <el-col :span="20">
          <el-text truncated @click="handleLevelClick" class="textinfos">{{
            profile.nickname
          }}</el-text>
        </el-col>
        <!-- 用户详情 -->
        <div v-if="isShowUserInfos" class="details">
          <!-- 动态 关注 粉丝 签到 -->
          <div class="fans-box-top">
            <div class="fans-box">
              <div class="boxs trend">
                <span class="num">{{ userData.profile?.sCount }}</span>
                <span class="text">动态</span>
              </div>
              <div class="boxs follow">
                <span class="num">{{ userData.profile?.follows }}</span>
                <span class="text">关注</span>
              </div>
              <div class="boxs fans">
                <span class="num">{{ userData.profile?.followeds }}</span>
                <span class="text">粉丝</span>
              </div>
            </div>
            <div class="button">
              <el-button class="btns" plain>签到</el-button>
            </div>
            <el-divider />
          </div>
          <!-- 我的会员 等等... -->
          <div class="member-box-bottom">
            <ol>
              <template v-for="item in descList">
                <li @click="userInfosClick(item)">
                  <div class="descript">
                    <el-icon class="icons">
                      <component :is="item.icon"></component>
                    </el-icon>
                    <span>{{ item.text }}</span>
                  </div>
                  <div class="other">
                    <span v-if="item.id == 2">{{ userData.level }}级</span>
                    <el-icon><ArrowRight /></el-icon>
                  </div>
                </li>
              </template>
            </ol>
          </div>
        </div>
      </li>
      <li>
        <el-icon><Menu /></el-icon>
      </li>
      <li>
        <el-icon><Setting /></el-icon>
      </li>
      <li>
        <el-icon><Message /></el-icon>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { storeToRefs } from "pinia";
import { userLoginStore } from "@/stores/login/index";
import { descList } from "@/assets/data/descriptList";
import { UserFilled } from "@element-plus/icons-vue";
import { useUserInfo } from "@/stores/user";
import local from "@/utils/local";
const loginStores = userLoginStore();
const { unikey, isShow, profile } = storeToRefs(loginStores);

const useInfosStore = useUserInfo();
const { userData } = storeToRefs(useInfosStore);
console.log(userData);
// 扫码登录
const handleLoginClick = () => {
  loginStores.getCreateUserAction(unikey.value);
  loginStores.getQrloginActions();
  isShow.value = true;
};

// 获取用户 动态
const isShowUserInfos = ref(false);
const handleLevelClick = () => {
  isShowUserInfos.value = !isShowUserInfos.value;
};

// 相关点击
const userInfosClick = (v) => {
  console.log(v);
  // 退出登录
  if (v.id == 6) {
    const res = loginStores.logoutDataAction();
    res.then(() => {
      local.clearLocal();
      location.reload();
    });
  }
};
</script>

<style lang="less" scoped>
.user-info {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 400px;
  text-align: right;

  // 头像
  .infos {
    height: 30px;
    width: 30px;
    margin-right: 10px;
    .userFilled {
      width: 100%;
      height: 100%;
    }

    .avatarUrl {
      width: 30px;
      display: inline-block;
      border-radius: 50%;
    }
    .avatarUrl:hover {
      cursor: pointer;
    }
  }
  //登录
  ul {
    display: flex;
    font-size: 12px;
    margin-right: 10px;
    li {
      display: flex;
      align-items: center;
    }
    .nickname {
      position: relative;
      left: 0;
      top: 0;
      margin-left: 5px;
      margin-right: 30px;
    }
    .nickname::after {
      position: absolute;
      bottom: 3px;
      right: -1px;
      content: "";
      width: 0px;
      height: 0px;
      border-top: 5px solid #f8baba;
      border-right: 5px solid transparent;
      border-left: 5px solid transparent;
      border-bottom: 5px solid transparent;
      display: inline-block;
    }
    .el-icon {
      font-size: 20px;
      margin-left: 20px;
    }
  }
}

// 登录成功的style

ul {
  .nickname {
    width: 100px;
    // 用户详情style
    .details {
      position: absolute;
      left: -75px;
      top: 40px;
      width: 250px;
      background-color: #fff;
      box-shadow: 5px 5px 5px 5px #ccc;
      z-index: 99;

      // top style
      .fans-box-top {
        display: flex;
        flex-direction: column;
        height: 75px;
        .fans-box {
          padding: 15px;
          display: flex;

          flex: 1;
          justify-content: space-around;

          .boxs {
            display: flex;
            flex-direction: column;
            align-items: center;

            .num {
              font-size: 20px;
              font-weight: 700;
              color: var(--color-black-primary);
            }

            .text {
              color: #222222;
            }
          }
        }
        .button {
          text-align: center;

          .btns {
            color: var(--color-white-primary);
            --el-fill-color-blank: #e13e3e;
            --el-border: none;
            --el-input-focus-border-color: none;
            --el-border-color: none;
            --el-border-color-hover: none;
            --el-text-color-regular: #fff;
          }
        }
      }

      // bottom style
      .member-box-bottom {
        margin-top: 50px;
        color: var(--color-black-primary);

        ol {
          li {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            height: 35px;
            line-height: 35px;
            cursor: pointer;
            .descript {
              display: flex;
              text-align: center;
              align-items: center;
            }

            .other {
              display: flex;
              text-align: center;
              align-items: center;
            }
          }
          li:hover {
            background-color: #ccc;
          }
        }
      }
    }
  }

  .textinfos {
    color: #ccc;
  }
  .textinfos:hover {
    cursor: pointer;
    color: var(--color-white-primary);
  }
}
</style>
