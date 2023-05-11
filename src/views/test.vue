<template>
  <div class="test">
    <div class="common-layout">
      <el-container>
        <el-header>Heade11111r</el-header>
        <el-container>
          <el-aside width="200px">
            <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              :collapse="isCollapse"
              @open="handleOpen"
              @close="handleClose"
            >
              <el-menu-item index="1">
                <el-icon><setting /></el-icon>
                <template #title>Navigator Four</template>
              </el-menu-item>
              <el-sub-menu index="2">
                <template #title>
                  <el-icon><location /></el-icon>
                  <span>创建的歌单</span>
                </template>
                <el-menu-item-group>
                  <!-- <template #title><span>Group One</span></template> -->
                  <el-menu-item index="2-1">item one</el-menu-item>
                  <el-menu-item index="2-2">item two</el-menu-item>
                </el-menu-item-group>
              </el-sub-menu>
              <el-sub-menu index="3">
                <template #title>
                  <el-icon><location /></el-icon>
                  <span>创建的歌单2</span>
                </template>
                <el-menu-item-group>
                  <!-- <template #title><span>Group One</span></template> -->
                  <el-menu-item index="3-1">item one</el-menu-item>
                  <el-menu-item index="3-2">item two</el-menu-item>
                </el-menu-item-group>
              </el-sub-menu>
            </el-menu>
          </el-aside>
          <el-container>
            <el-main>Main</el-main>
            <el-footer>Footer</el-footer>
          </el-container>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script setup></script>

<style lang="less" scoped>
.test {
  width: 100vw;
  height: 100vh;

  .common-layout {
    width: 100%;
    height: 100%;
  }
}
</style>
