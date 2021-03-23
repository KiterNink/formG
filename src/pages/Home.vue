<template>
  <div class="home-container">
    <div class="header common-space">
      <div class="left">
        <el-badge value="v1.0" type="primary">
          <img src="../assets/img/cingta-logo.svg" alt="" class="logo">
        </el-badge>
      </div>
      <div class="right">
        <el-dropdown trigger="click">
          <span class="user-name">
            {{ userName }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <div class="page-body">
      <h2>模板配置</h2>
      <ul class="module-list">
        <li class="module-item add-item" @click="addModule">添加模板</li>
        <li class="module-item" v-for="(mod, index) of moduleList" :key="index">
          <ul class="module-center icon-group">
            <li class="bt-icon-item" @click="editModule(mod.id)"><i class="el-icon-edit"></i></li>
            <li class="bt-icon-item" @click="previewModule(mod.id)"><i class="el-icon-view"></i></li>
            <li class="bt-icon-item" @click="deleteModule(mod.id)"><i class="el-icon-delete"></i></li>
          </ul>
          <div class="module-bottom">{{ mod.name }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'home',
    data() {
      return {
        userName: '123',
        moduleList: []
      }
    },
    methods: {
      addModule () {
        this.$router.push({ path: '/config' });
      },
      previewModule (id) {

      },
      editModule (id) {

      },
      deleteModule (id) {

      }
    }
  }
</script>

<style lang="less" scoped>
  .home-container {
    width: 100%;
    padding: 0 80px;

    &>.header {
      height: 80px;
      border-bottom: 1px solid #dcdfe6;
      .logo {
        width: 146px;
        height: 38px;
      }
      .user-name {
        user-select: none;
        cursor: pointer;
      }
    }
    .page-body {
      .module-list {
        display: flex;
        flex-wrap: wrap;
        .module-item {
          width: 230px;
          height: 140px;
          cursor: pointer;
          border-radius: 4px;
          &:hover {
            box-shadow: 0 3px 6px #e4e4e4;
            opacity: .9;
            transform: translateY(-10px);
          }
          &.add-item {
            border: 1px dashed #dcdfe6;
            background: #f5f7fa;
            line-height: 140px;
            text-align: center;
          }
          .module-center {
            background: #3e74ff;
            height: calc(100% - 42px);
            .icon-group {
              display: flex;
              align-items: center;
              justify-content: center;
              .bt-icon-item {
                width: 35px;
                height: 35px;
                border: 1px solid #fff;
                border-radius: 35px;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-right: 10px;
                font-size: 24px;
                color: #fff;
                &:last-child {
                  margin-right: 0;
                }
              }
            }
          }
          .module-bottom {
            text-align: center;
            height: 42px;
            line-height: 42px;
          }
        }
      }
    }
  }
</style>