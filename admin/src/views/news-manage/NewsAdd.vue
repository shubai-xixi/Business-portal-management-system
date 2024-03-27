<template>
    <div>
        <el-page-header content="创建新闻" icon="" title="新闻管理">
        </el-page-header>
        <el-form ref="newsFormRef" style="max-width: 600px" :model="newsForm" :rules="newsRules" label-width="80px"
            class="demo-ruleForm" status-icon>
            <el-form-item label="标题" prop="title">
                <el-input v-model="newsForm.title" />
            </el-form-item>
            <el-form-item label="内容" prop="content">
                <editor @event="handleChange"></editor>
            </el-form-item>
            <el-form-item label="类别" prop="category">
                <el-select v-model="newsForm.category" placeholder="Select" size="large" style="width: 100%;">
                    <el-option v-for="item in options" :value="item.value" :label="item.label" />
                </el-select>
            </el-form-item>
            <el-form-item label="封面" prop="cover">
                <Upload :avatar="newsForm.cover" @avatarChange="coverChange"></Upload>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm()">添加新闻</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import editor from '../../components/mainbox/editor/Editor.vue';
import Upload from '../../components/upload/Upload.vue'
import upload from '../../util/upload.js'
import { useRouter } from 'vue-router'

const router = useRouter()
const newsFormRef = ref()

const newsForm = reactive({
    title: '',
    content: '', //等组建传HTML过来
    category: 1, // 1最新动态，2典型案例，3通知公告
    cover: '', //壁纸信息
    file: null,
    isPublish: 0, // 0未发布，1已发布
})
const newsRules = reactive({
    title: [
        {required: true, message: "请输入标题", trigger: "blur"}
    ],
    content: [
        { required: true, message: "请输入内容", trigger: "blur" }
    ],
    category: [
        { required: true, message: "请选择分类", trigger: "blur" }
    ],
    cover: [
        { required: true, message: "请上传图片", trigger: "blur" }
    ]

})

//编辑器内容改变的回调
const handleChange = ( data ) => {
    //console.log(data)
    newsForm.content = data
    //console.log(newsForm.content)
}

const options = [
    {
        label: "最新动态",
        value: 1
    },
    {
        label: "典型案例",
        value: 2
    },
    {
        label: "通知公告",
        value: 3
    }
]

const coverChange = (file) => {
    //console.log(file)
    newsForm.cover = URL.createObjectURL(file)
    newsForm.file = file
}

const submitForm = () => {
    //console.log(userForm)
    newsFormRef.value.validate(async (valid) => {
        if (valid) {
            //console.log(newsForm)
            let res = await upload("/adminapi/news/add", newsForm)
            //console.log(res)
            router.push("/news-manage/newslist")
        } else {
            console.log(userForm)
        }
    })
}
</script>

<style lang="scss" scoped>
.el-form{
    margin-top: 50px;
}
</style>