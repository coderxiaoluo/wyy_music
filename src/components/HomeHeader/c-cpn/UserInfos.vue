<template>
  <div class="user-info">
    <div class="infos">
      <el-avatar
        v-if="!profile?.avatarUrl"
        class="userFilled"
        :icon="UserFilled"
      />
      <img
        @click="onToUserInfoClick"
        v-else
        class="avatarUrl"
        :src="profile?.avatarUrl"
        alt="头像"
      />
    </div>
    <ul>
      <li v-if="!profile?.nickname" @click="handleLoginClick">未登录</li>
      <li v-else class="nickname">
        <el-dropdown class="dropdown">
          <span class="el-dropdown-link">
            {{ profile?.nickname }}
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <template v-for="t in descList">
                <el-dropdown-item
                  @click="userInfosClick(t)"
                  :divided="t.id == 4"
                >
                  <el-icon class="icons">
                    <component :is="t.icon"></component>
                  </el-icon>
                  <p>{{ t.text }}</p>
                </el-dropdown-item>
              </template>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
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
import { useRouter } from "vue-router";

const router = useRouter();
const loginStores = userLoginStore();
const { unikey, isShow, profile } = storeToRefs(loginStores);

const useInfosStore = useUserInfo();
const { userData } = storeToRefs(useInfosStore);
// 扫码登录
const handleLoginClick = () => {
  loginStores.getCreateUserAction(unikey.value);
  loginStores.getQrloginActions();
  isShow.value = true;
};

// // 获取用户 动态
// const isShowUserInfos = ref(false);

// const handleLevelClick = () => {
//   isShowUserInfos.value = !isShowUserInfos.value;
// };

// 相关点击
const userInfosClick = (v) => {
  // 个人主页
  if (v.id == 2) {
    onToUserInfoClick();
  }
  // 作者主页
  if (v.id == 3) {
    router.push("/author");
  }
  // 退出登录
  if (v.id == 4) {
    const res = loginStores.logoutDataAction();
    res.then(() => {
      local.clearLocal();
      location.reload();
    });
  }
  //
};

// 去到用户详情
function onToUserInfoClick() {
  console.log(profile);
  if (!profile) return;
  router.push({
    path: `/personal/${profile.value?.userId}`,
  });
}
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
      width: 125px;

      .dropdown {
        border: none;
      }
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
