<template>
  <el-upload class="avatar-uploader" action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
    :show-file-list="false" :on-change="handleChange" :auto-upload="false">
    <img v-if="props.avatar" :src="uploadAvatar" class="avatar" />
    <el-icon v-else class="avatar-uploader-icon">
      <Plus />
    </el-icon>
  </el-upload>
</template>

<script setup>
//import { defineEmits, defineProps } from 'vue';
import { Plus } from '@element-plus/icons-vue'
import { computed } from 'vue';
const props = defineProps({
  avatar: String
})

const emit = defineEmits()
//选择完图片的回调
const handleChange = (file) => {
  //父子通信
  emit("avatarChange", file.raw)
}

// const avatarUrl = computed(() => {
//   return store.userInfo.avatar ? 'http://localhost:3000' + store.userInfo.avatar : 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
// })

const uploadAvatar = computed(() => {
  return props.avatar.match("blob") ? props.avatar : "http://localhost:3000" + props.avatar
})

</script>

<style lang="scss" scope>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>