<template>
    <div>
        <el-page-header content="产品列表" icon="" title="产品管理">
        </el-page-header>
        <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column prop="title" label="产品名称" width="180">
            </el-table-column>
            <el-table-column prop="introduction" label="简要描述" width="180">
            </el-table-column>
            <el-table-column prop="time" label="更新时间">
                <template #default="scope">
                    {{ formatTime.getTime(scope.row.editTime) }}
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
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import formatTime from '../../util/formatTime.js'
import { Edit, Delete } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const tableData = ref([])

onMounted(() => {
    getTableData()
})

const getTableData = async () => {
    const res = await axios.get('/adminapi/product/list')
    //console.log(res.data)
    tableData.value = res.data.data
}

const handleDelete = async (item) => {
    //console.log(item)
    await axios.delete('/adminapi/product/list/' + item._id) //分号的出现好奇怪
    await getTableData()
}

const handleEdit = (item) => {
    router.push('/product-manage/editProduct/' + item._id)
}

</script>

<style lang="scss" scoped>
.el-table {
    margin-top: 50px;
}

::v-deep .htmlcontent {
    img {
        max-width: 100%;
    }
}
</style>