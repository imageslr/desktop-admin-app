<template>
    <el-dialog title="打开小程序" :visible.sync="dialogVisible">
        <div style="text-align: center">
            <p>请用微信扫描下面的二维码，使用该小程序进行更多操作</p>
            <img width="250px" src="../assets/qr.jpg">
        </div>
    </el-dialog>
</template>
<script>
export default {
    data() {
        return {
            dialogVisible: false,
        }
    },
    methods: {
        show() {
            this.dialogVisible = true;
        },
    }
}
</script>