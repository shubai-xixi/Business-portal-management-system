<template>
    <div>
        <el-card>
            <el-page-header content="用户列表" icon="" title="用户管理">
            </el-page-header>
            <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column prop="username" label="用户名" width="180">
                </el-table-column>
                <el-table-column label="头像" width="180">
                    <template #default="scope">
                        <div v-if="scope.row.avatar">
                            <el-avatar :size="50" :src="'http://localhost:3000' + scope.row.avatar"></el-avatar>
                        </div>
                        <div v-else>
                            <el-avatar :size="50"
                                :src="'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"></el-avatar>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="角色">
                    <template #default="scope">
                        <el-tag v-if="scope.row.role===2" type="success">编辑</el-tag>
                        <el-tag v-else type="danger">管理员</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template #default="scope">
                        <el-button size="small" @click="handleEdit(scope.row)">
                            编辑
                        </el-button>
                        <el-popconfirm title="是否确定删除？" confirmButtonText="确定" cancelButtonText="取消"
                            @confirm="handleDelete(scope.row)">
                            <template #reference>
                                <el-button size="small" type="danger">
                                    删除
                                    <!--el-popconfirm title="是否确定删除？" confirmButtonText="确定" cancelButtonText="取消"
                                        @confirm="handleDelete(scope.row)">
                                        <template #reference>
                                            <el-button size="small" type="danger">
                                                删除
                                            </el-button>
                                        </template>
                                    </el-popconfirm-->
                                </el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>

        <el-dialog v-model="dialogVisible" title="编辑用户" width="50%">
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
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="handleEditConfirm()">
                        确认
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import { ref,onMounted,reactive } from 'vue';
import axios from 'axios';

const dialogVisible = ref(false)
const userFormRef = ref()
// const userForm = ref({
//     username: '',
//     password: '',
//     role: 2, //1是管理员，2是编辑
//     introduction: ''
// })
const userForm = reactive({
    username: '',
    password: '',
    role: 2, //1是管理员，2是编辑
    introduction: ''
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
const tableData = ref([])

onMounted(() => {
    getTableData()
})

const getTableData = async () => {
    const res = await axios.get("/adminapi/user/list")
    //console.log(res.data)
   tableData.value = res.data.data
}

const handleEdit = async (data) => {
    //userForm
    const res = await axios.get('/adminapi/user/list/' + data._id)
    //userForm.value = res.data.data[0]
    Object.assign(userForm,res.data.data[0])
    //console.log(res.data)
    //console.log(userForm.value)
    dialogVisible.value = true
}

const handleEditConfirm = () => {
    userFormRef.value.validate(async (valid) => {
        if (valid) {
            await axios.put('/adminapi/user/list/' + userForm._id, userForm)
            dialogVisible.value = false
            getTableData()
        }
    })
}

const handleDelete = async (data) => {
    //console.log(data)
    await axios.delete('/adminapi/user/list/' + data._id)
    getTableData()
}
</script>

<scope lang="scss" scoped>
    .el-table{
        margin-top: 50px;
    }
</scope>