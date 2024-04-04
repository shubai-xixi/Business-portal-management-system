<template>
  <div>
    <el-page-header content="编辑产品" @back="handleBack()" title="产品管理">
    </el-page-header>

    <el-form ref="productFormRef" style="max-width: 600px" :model="productForm" :rules="productRules" label-width="80px"
      class="demo-ruleForm" status-icon>
      <el-form-item label="产品名称" prop="title">
        <el-input v-model="productForm.title" />
      </el-form-item>
      <el-form-item label="产品简要描述" prop="introduction">
        <el-input v-model="productForm.introduction" />
      </el-form-item>
      <el-form-item label="产品详细描述" prop="detail">
        <el-input v-model="productForm.detail" type="textarea" />
      </el-form-item>
      <el-form-item label="产品图像" prop="cover">
        <Upload :avatar="productForm.cover" @avatarChange="handleChange"></Upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">更新产品</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import Upload from '@/components/upload/Upload.vue'
import upload from '@/util/upload'
import { useRouter,useRoute } from 'vue-router';
import axios from 'axios';

const router = useRouter()
const route = useRoute()
const productFormRef = ref()
const productForm = reactive({
  title: '',
  introduction: '',
  detail: '',
  cover: '',
  file: null
})
const productRules = reactive({
  title: [
    { required: true, message: '请输入名字', trigger: 'blur' },
  ],
  introduction: [
    { required: true, message: '请输入简要描述', trigger: 'blur' },
  ],
  detail: [
    { required: true, message: '请输入详细描述', trigger: 'blur' },
  ],
  cover: [
    { required: true, message: '请上传产品图像', trigger: 'blur' },
  ]
})

const getData = async () => {
  const res = await axios.get("/adminapi/product/list/" + route.params.id)
  Object.assign(productForm, res.data.data[0])
  console.log(productForm)
}
onMounted(() => {
  getData()
})
const handleChange = (file) => {
  //console.log(file)
  productForm.cover = URL.createObjectURL(file)
  productForm.file = file
}

const submitForm = () => {
  //console.log(userForm)
  productFormRef.value.validate(async (valid) => {
    if (valid) {
      //console.log(productForm)
      let res = await upload("/adminapi/product/list", productForm)
      router.push("/product-manage/productlist")
    } else {
      console.log(productForm)
    }
  })
}

</script>

<style lang="scss" scope>
.demo-ruleForm {
  margin-top: 50px;
}
</style>