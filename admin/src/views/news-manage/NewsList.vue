<template>
    <div>
        <el-page-header content="新闻列表" icon="" title="新闻管理">
        </el-page-header>
        <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column prop="title" label="标题" width="180">
            </el-table-column>
            <el-table-column prop="category" label="分类">
                <template #default="scope">
                    {{ categoryFormat(scope.row.category) }}
                </template>
            </el-table-column>
            <el-table-column prop="time" label="更新时间">
                <template #default="scope">
                    {{ formatTime.getTime(scope.row.editTime) }}
                </template>
            </el-table-column>
            <el-table-column prop="isPublish" label="是否发布" width="180">
                <template #default="scope">
                    <el-switch v-model="scope.row.isPublish" :active-value="1" :inactive-value="0"
                        @change="handleSwitchChange(scope.row)" />
                    <!--el-switch v-model="value2" class="ml-2"
                        style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949" /-->
                </template>
            </el-table-column>
            <el-table-column prop="time" label="更新时间">
                <template #default="scope">
                    {{ formatTime.getTime(scope.row.editTime) }}
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template #default="scope">
                    <div class="dialog-footer">
                        <el-button circle icon="Star" type="success" size="small"
                            @click="handlePreview(scope.row)"></el-button>
                        <el-button circle icon="Edit" type="default" size="small"
                            @click="handleEdit(scope.row)"></el-button>
                        <el-popconfirm title="是否确定删除？" confirmButtonText="确定" cancelButtonText="取消"
                            @confirm="handleDelete(scope.row)">
                            <template #reference>
                                <!--el-button size="small" type="danger">
                                    删除
                                </el-button-->
                                <el-button circle icon="Delete" type="danger" size="small">
                                </el-button>
                            </template>
                        </el-popconfirm>
                        <!--el-button type="primary" @click="handleEditConfirm()">
                        </el-button-->
                    </div>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog v-model="dialogVisible" title="预览新闻" width="60%">
            <h2>{{ previewData.title }}</h2>
            <div style="font-size: 12px; color: gray;">{{ formatTime.getTime(previewData.editTime) }}</div>
            <el-divider>
                <el-icon><star-filled /></el-icon>
            </el-divider>
            <div v-html="previewData.content" class="htmlcontent"></div>
        </el-dialog>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import formatTime from '../../util/formatTime.js'
import { Star,Edit,Delete } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const tableData = ref([])
const previewData = ref({}) //对话框
const dialogVisible = ref(false) //对话框可见性

onMounted(() => {
    getTableData()
})

const getTableData = async () => {
    const res = await axios.get('/adminapi/news/list')
    // console.log(res.data)
    tableData.value = res.data.data
}

const categoryFormat = (category) => {
    const arr = ["最新动态", "典型案例", "通知公告"]
    return arr[category-1]
}

const handleSwitchChange = async (item) => {
    //console.log(item)
    const res = await axios.put('/adminapi/news/publish', {
        _id: item._id,
        isPublish: item.isPublish,
    })
    //刷新数据
    await getTableData()
}

const handlePreview = (data) => {
    //console.log(data)
    previewData.value = data
    dialogVisible.value = true
}

const handleDelete = async (item) => {
    //console.log(item)
    await axios.delete('/adminapi/news/list' + item._id)
    await getTableData()
}

const handleEdit = (item) => {
    router.push('/news-manage/editnews/'+item._id)
}
</script>

<style lang="scss" scoped>

.el-table{
    margin-top: 50px;
}

::v-deep .htmlcontent{
    img{
        max-width: 100%;
    }
}
</style>