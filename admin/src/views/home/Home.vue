<template>
    <div>
        <el-page-header content="首页" icon="" title="企业门户管理系统">
        </el-page-header>
        <el-card class="box-card">
            <el-row>
                <el-col :span="4"><el-avatar :size="100" :src="avatarUrl" /></el-col>
                <el-col :span="20">
                    <h3 style="line-height:100px;">欢迎{{ store.userInfo.username }} 回来,{{ welcomeText }}</h3>
                </el-col>
            </el-row>
        </el-card>
        <el-card class="box-card">
            <span>公司产品</span>
            <el-carousel v-if="loopList.length" :interval="4000" type="card" height="200px">
                <el-carousel-item v-for="item in loopList" :key="item._id">
                    <div :style="{
                    backgroundImage: `url('http://localhost:3000/${item.cover}')`, backgroundSize: 'cover'
                }">
                        <h3 text="2xl" justify="center">{{ item._id }}</h3>
                    </div>
                </el-carousel-item>
            </el-carousel>
        </el-card>
    </div>
</template>

<script setup>
import axios from 'axios'
import { useStore } from '../../stores';
import { computed, onMounted,ref } from 'vue';

const store = useStore()
const avatarUrl = computed(() => {
    return store.userInfo.avatar ? 'http://localhost:3000'+store.userInfo.avatar : 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
})

const welcomeText = computed(() => {
   return new Date().getHours<12 ? '要开心每一天' : '喝杯咖啡提提神吧'
})

const loopList = ref([])

const getData = async () => {
    const res = await axios.get('/adminapi/product/list')
    loopList.value = res.data.data;
    // console.log(loopList.value)
    // console.log(res.data.data)

}

onMounted(() => {
    getData()
})

//let background = { backgroundImg: url(('http://loccalhost:3000' + item.cover)) }
//console.log(background)
</script>

<style lang="scss" scope>
.box-card {
    margin-top: 50px;
}

.el-carousel__item h3 {
    color: white;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
    text-align: center;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}
</style>