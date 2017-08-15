<template>
    <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
            <router-link v-if='item.redirect==="noredirect"||index==levelList.length-1' to="" class="no-redirect">{{item.name}}</router-link>
            <router-link v-else :to="item.path">{{item.name}}</router-link>
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>
<script>
export default {
    created() {
        this.getBreadcrumb()
    },
    data() {
        return {
            levelList: null
        }
    },
    methods: {
        getBreadcrumb() {
            let matched = this.$route.matched.filter(item => item.name);
            const first = matched[0];
            this.levelList = matched;
        }
    },
    watch: {
        $route() {
            this.getBreadcrumb();
        }
    }
}
</script>
<style scoped>
.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    margin: 10px 0 20px;
    margin-left: 10px;
}

.el-breadcrumb .no-redirect {
    color: #97a8be;
    cursor: text;
}
</style>