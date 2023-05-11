<template>
  <div class="comment">
    <!-- 输入评论 -->
    <div class="textarea-box">
      <el-input
        v-model.trim="textarea"
        :rows="3"
        type="textarea"
        placeholder="留下你精彩的评论吧!"
        maxlength="140"
        resize="none"
      />
      <div class="commentBtn">
        <el-button type="danger" @click="handleCommentClick">评论</el-button>
      </div>
    </div>
    <!-- 精彩评论 -->

    <div class="wonderful">
      <h3>精彩评论</h3>
      <template v-for="item in commentsAll.hotComments" :key="item.id">
        <div class="wonderful-list">
          <div class="commentCreatorAvatar">
            <img :src="item.user.avatarUrl" alt="" />
          </div>
          <!-- 评论 -->
          <div class="commentContent">
            <div class="commentMain">
              <!-- 昵称 -->
              <div class="commentUserNickName">{{ item.user.nickname }}:</div>
              <!-- 评论内容 -->
              <div class="content">
                <!-- 自己评论 -->
                <div class="userContent">{{ item.content }}</div>
              </div>
            </div>
            <!-- 回复评论 -->
            <div v-for="t in item?.beReplied" class="repliedItem">
              <div class="repliedUser">@{{ t.user.nickname }}</div>
              <div class="repliedContent">: {{ t.content }}</div>
            </div>
            <div class="commentBottom">
              <div class="CreatedTimeAndAddressLocation">
                <span>{{ formatMonthDay(item.time, "MM月DD日") }}</span>
                <span>.</span>
                <span>{{ item.ipLocation.location }}</span>
              </div>
              <div class="commentButton">
                <svg
                  @click="likeCommentClick(item)"
                  class="icon icon-comment"
                  aria-hidden="true"
                >
                  <use xlink:href="#icon-dianzan"></use>
                </svg>
                <!-- 点赞 -->
                <span class="likedCount">{{ item.likedCount }}</span>
                <svg class="icon icon-comment" aria-hidden="true">
                  <use xlink:href="#icon-fenxiang"></use>
                </svg>
                <svg class="icon icon-comment" aria-hidden="true">
                  <use xlink:href="#icon-huifu"></use>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>

    <!-- 最新评论 -->
    <div class="wonderful latest-comments">
      <h3>最新评论</h3>
      <template v-for="item in commentsAll.comments" :key="item.id">
        <div class="wonderful-list">
          <div class="commentCreatorAvatar">
            <img :src="item.user.avatarUrl" alt="" />
          </div>
          <!-- 评论 -->
          <div class="commentContent">
            <div class="commentMain">
              <!-- 昵称 -->
              <div class="commentUserNickName">{{ item.user.nickname }}:</div>
              <!-- 评论内容 -->
              <div class="content">{{ item.content }}</div>
            </div>
            <!-- 回复评论 -->
            <div v-for="t in item?.beReplied" class="repliedItem">
              <div class="repliedUser">@{{ t.user.nickname }}</div>
              <div class="repliedContent">: {{ t.content }}</div>
            </div>
            <div class="commentBottom">
              <div class="CreatedTimeAndAddressLocation">
                <span>{{ formatMonthDay(item.time, "MM月DD日") }}</span>
                <span>.</span>
                <span>{{ item.ipLocation.location }}</span>
              </div>
              <div class="commentButton">
                <svg
                  @click="likeCommentClick(item)"
                  class="icon icon-comment"
                  aria-hidden="true"
                >
                  <use xlink:href="#icon-dianzan"></use>
                </svg>
                <!-- 点赞 -->
                <span class="likedCount">{{ item.likedCount }}</span>
                <svg class="icon icon-comment" aria-hidden="true">
                  <use xlink:href="#icon-fenxiang"></use>
                </svg>
                <svg class="icon icon-comment" aria-hidden="true">
                  <use xlink:href="#icon-huifu"></use>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
    <!-- 分页 -->
    <el-pagination
      small
      background
      layout="prev, pager, next"
      :total="50"
      class="mt-4"
      @current-change="handelCurrentChangeClick"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { formatMonthDay } from "@/utils/formatplay";
import { useCommentStore } from "@/stores/comment";
import { useMusicDetailStore } from "@/stores/musicdetail";
import { useRoute } from "vue-router";
import local from "../../utils/local";
const route = useRoute();
const routerId = ref(route.params.id);
const commentStore = useCommentStore();
const musicDetailStore = useMusicDetailStore();
const props = defineProps({
  commentsAll: {
    type: Object,
    default: () => {
      return {};
    },
  },
});

const emits = defineEmits(["commentPageClick"]);
// 评论
const textarea = ref("");
// 发送评论
const handleCommentClick = () => {
  if (textarea.value == "") {
    ElMessage.error("写点东西吧，不要错过!");
  } else {
    // 发送评论请求
    commentStore.sendCommentsActions(routerId.value, textarea.value);
    musicDetailStore.getCommentIdAction(routerId);
    window.location.reload();
  }
};

// 评论分页
const handelCurrentChangeClick = (v) => {
  emits("commentPageClick", v);
};

//点赞和取消点赞业务逻辑
const likeCount = ref(1);
const likeCommentClick = (v) => {
  const res = commentStore.likeCommentIsShowAction(
    likeCount.value,
    routerId.value,
    v.commentId
  );
  v.likedCount + 1;
  musicDetailStore.getCommentIdAction(routerId);
  ElMessage({
    message: "点赞成功!",
    type: "success",
  });
};
</script>

<style lang="less" scoped>
.el-button {
  float: right;
  color: var(--color-white-primary);
}

// 精彩评论
.wonderful {
  font-size: 17px;
  h3 {
    margin-top: 30px;
    font-weight: 900;
  }
}

.wonderful-list {
  // background-color: rgb(176, 181, 183);
  display: flex;
  padding: 10px;
  box-sizing: content-box;
  margin-top: 20px;

  // 头像
  .commentCreatorAvatar {
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
  // 评论
  .commentContent {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 10px;
    font-size: 12px;

    .commentMain {
      display: flex;
      align-items: center;
      flex: 1;
      // 昵称
      .commentUserNickName {
        color: var(--color-blue-primary);
        padding: 5px;
      }
      // 评论内容
      .content {
        flex: 1;
        color: var(--color-black-primary);
        margin-left: 5px;
        width: 100%;
        //自己评论
        .userContent {
          padding: 5px;
        }
      }
      // 回复评论
      .repliedItem {
        display: flex;
        background-color: var(--color-replied);
        padding: 10px;
        // 回复昵称
        .repliedUser {
          color: var(--color-blue-primary);
        }
      }
    }
    .commentBottom {
      display: flex;
      justify-content: space-between;
      // 时间 and 地区
      .CreatedTimeAndAddressLocation {
        color: var(--color-tags);
      }
      .icon-comment {
        margin: 0 5px;
        width: 20px;
        color: var(--color-black-primary);
      }
      .likedCount {
        color: var(--color-black-primary);
      }
    }
  }
}

.latest-comments {
  font-size: 17px;
  h3 {
    margin-top: 30px;
    font-weight: 900;
  }
}

// 分页
.el-pagination {
  justify-content: center;
}
</style>
