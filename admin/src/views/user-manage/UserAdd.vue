<template>
    <div>
        <el-page-header content="添加用户" icon="" title="用户管理">
        </el-page-header>

        <el-form ref="userFormRef" style="max-width: 600px" :model="userForm" :rules="userRules" label-width="80px"
            class="demo-ruleForm" status-icon>
            <el-form-item label="用户名" prop="username">
                <el-input v-model="userForm.username" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="userForm.password" />
            </el-form-item>
            <el-form-item label="角色" prop="role">
                <el-select v-model="userForm.role" placeholder="Select" size="large" style="width: 100%;">
                    <el-option v-for="item in options" :value="item.value" :label="item.label" />
                </el-select>
            </el-form-item>
            <el-form-item label="个人简介" prop="introduction">
                <el-input v-model="userForm.introduction" type="textarea" />
            </el-form-item>
            <el-form-item label="头像" prop="avatar">
                <Upload :avatar="userForm.avatar" @avatarChange="handleChange"></Upload>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm()">添加用户</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import { reactive,ref } from 'vue';
import Upload from '@/components/upload/Upload.vue'
import upload from '@/util/upload'
import { useRouter } from 'vue-router';

const router = useRouter()
const userFormRef = ref()
const userForm = reactive({
    username: '',
    password: '',
    role: 2, //1是管理员，2是编辑
    introduction: '',
    avatar: '',
    file: null,
    gender: 0
})
const userRules = reactive({
    username: [
        { required: true, message: '请输入名字', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
    ],
    role: [
        { required: true, message: '请选择权限', trigger: 'blur' },
    ],
    introduction: [
        { required: true, message: '请输入介绍', trigger: 'blur' },
    ],
    avatar: [
        { required: true, message: '请上传头像', trigger: 'blur' },
    ]
})

const options = [
    {
        label: "管理员",
        value: 1
    },
    {
        label: "编辑",
        value: 2
    }
]

const handleChange = (file) => {
    //console.log(file)
    userForm.avatar = URL.createObjectURL(file)
    userForm.file = file
}

const submitForm = () => {
    //console.log(userForm)
    userFormRef.value.validate( async (valid) => {
        if (valid) {
            //console.log(userForm)
            let res = await upload("/adminapi/user/add", userForm)
            //console.log(res)
            router.push("/user-manage/userlist")
        } else {
            console.log(userForm)
        }
    })
}

</script>

<style lang="scss" scope>
.demo-ruleForm {
    margin-top: 50px;
}
</style>