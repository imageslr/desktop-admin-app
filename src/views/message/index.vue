<template>
    <el-tabs class="message-tabs" :value="currentName" type="card" @tab-click="click">
        <el-tab-pane v-for="item in tabs" :key="item.type" :name="item.name">
            <span slot="label" :class="{'has-unread-message': numbers[item.type-1]!=0}">
                {{item.label + (numbers[item.type-1]==0 ? '' : ' ('+numbers[item.type-1]+')')}}
                </span>
            <message-box :sender-type="item.type"></message-box>
        </el-tab-pane>
    </el-tabs>
</template>
<script>
import MessageBox from './MessageBox.vue';
export default {
    components: {
        MessageBox
    },
    data() {
        return {
            tabs: [{
                label: "Wiki系统",
                type: '1',
                name: 'wiki'
            }, {
                label: "图书馆",
                type: '2',
                name: 'library'
            }, {
                label: "小程序",
                type: '3',
                name: 'wechat'
            }]
        }
    },
    computed: {
        numbers() {
            return this.$store.getters.messageNumbers.map(i => i.unReadTotal);
        },
        currentName() {
            return this.$route.params.name;
        }
    },
    methods: {
        click(e) {
            // hack方法，如果直接push会报错：offsetWidth undefined   
            this.$nextTick().then(() => {
                this.$router.push({ name: '收件箱', params: { name: e.name } });
            })
        }
    }
}
</script>
<style>
.has-unread-message {
    font-weight: bold;
    color: #353535;
}

.message-tabs .is-active .has-unread-message {
    font-weight: normal;
    color: #20a0ff;
}

.el-notification {
    z-index: 10001 !important;
}
</style>