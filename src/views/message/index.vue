<template>
    <el-tabs class="message-tabs" v-model="tabIndex" type="card">
        <el-tab-pane v-for="item in tabs" :name="item.type">
            <span :class="{'has-unread-message': numbers[item.type-1]!=0}" slot="label">
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
    computed: {
        numbers() {
            return this.$store.getters.messageNumbers.map(i => i.unReadTotal);
        }
    },
    data() {
        return {
            tabIndex: '1',
            tabs: [{
                label: "Wiki系统",
                type: '1',
            }, {
                label: "图书馆",
                type: '2',
            }, {
                label: "小程序",
                type: '3',
            }]
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