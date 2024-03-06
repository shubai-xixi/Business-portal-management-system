<template>
    <div>
        <el-page-header content="个人中心" icon="" title="企业门户管理系统">
        </el-page-header>

        <el-row :gutter="20" class="el-row">
            <el-col :span="8">
                <el-card class="el-card">
                    <el-avatar :size="100" :src="avatarUrl"></el-avatar>
                    <h3>{{ store.userInfo.username }}</h3>
                    <h3>{{ store.userInfo.role === 1 ? '管理员' : '编辑' }}</h3>

                </el-card>
            </el-col>
            <el-col :span="16">
                <el-card>
                    <span>个人信息</span>
                    <el-form ref="userFormRef" style="max-width: 600px" :model="userForm" :rules="userRules"
                        label-width="auto" class="demo-ruleForm" status-icon>
                        <el-form-item label="用户名" prop="username">
                            <el-input v-model="userForm.username" />
                        </el-form-item>
                        <el-form-item label="性别" prop="gender">
                            <el-select v-model="userForm.gender" placeholder="Select" size="large" style="width: 100%;">
                                <el-option v-for="item in options" :value="item.value" :label="item.label" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="个人介绍" prop="introduction">
                            <el-input v-model="userForm.introduction" type="textarea" />
                        </el-form-item>
                        <el-form-item label="头像" prop="avatar">
                            <Upload :avatar="userForm.avatar" @avatarChange = "handleChange"></Upload>
                            <!--el-upload class="avatar-uploader"
                                action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                                :show-file-list="false" :on-change="handleChange" :auto-upload="false">
                                <img v-if="userForm.avatar" :src="uploadAvatar" class="avatar" />
                                <el-icon v-else class="avatar-uploader-icon">
                                    <Plus />
                                </el-icon>
                            </el-upload-->
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm()">更新</el-button>
                        </el-form-item>
                    </el-form>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>


<script setup>
import { useStore } from '../../stores';
import { computed, ref, reactive } from 'vue';
import { ElMessage } from 'element-plus'
import upload from '@/util/upload'
import Upload from '@/components/upload/Upload.vue'
const store = useStore()
//console.log(store.userInfo)

const { username, gender, introduction, avatar } = store.userInfo

const avatarUrl = computed(() => {
    return store.userInfo.avatar ? 'http://localhost:3000' + store.userInfo.avatar : 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
})

// const uploadAvatar = computed(() => {
//     return userForm.avatar.match("blob") ? userForm.avatar : "http://localhost:3000" + userForm.avatar
// })

const userFormRef = ref()

const userForm = reactive({
    username,
    gender,
    introduction,
    avatar,
    file: null,
})

const userRules = reactive({
    username: [
        { required: true, message: '请输入名字', trigger: 'blur' },
    ],
    gender: [
        { required: true, message: '请选择性别', trigger: 'blur' },
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
        label: "保密",
        value: 0
    },
    {
        label: "男",
        value: 1
    },
    {
        label: "女",
        value: 2
    }
]

//选择完图片的回调
const handleChange = (file) => {
    console.log(file)
    userForm.avatar = URL.createObjectURL(file)
    userForm.file = file
}

const submitForm = () => {
    userFormRef.value.validate(async (valid) => {
        if (valid) {
            const res = await upload('/adminapi/user/upload', userForm)
            if (res.ActionType === "ok") {
                store.changeUserInfo(res.data)
                ElMessage.success('更新成功')
            }
        }
    })
}

</script>

<style lang="scss" scope>
.el-row {
    margin-top: 20px;

    .el-card {
        text-align: center;
    }
}

// .avatar-uploader .avatar {
//     width: 178px;
//     height: 178px;
//     display: block;
// }

// .avatar-uploader .el-upload {
//     border: 1px dashed var(--el-border-color);
//     border-radius: 6px;
//     cursor: pointer;
//     position: relative;
//     overflow: hidden;
//     transition: var(--el-transition-duration-fast);
// }

// .avatar-uploader .el-upload:hover {
//     border-color: var(--el-color-primary);
// }

// .el-icon.avatar-uploader-icon {
//     font-size: 28px;
//     color: #8c939d;
//     width: 178px;
//     height: 178px;
//     text-align: center;
// }
</style>