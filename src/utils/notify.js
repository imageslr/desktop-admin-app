import { Notification } from 'element-ui';
import router from '../router'

export default function notifyMessage(type) {
    var boxName = "";
    var path = "/message/wiki";
    switch (type) {
        case '1':
        case 1:
            boxName = "Wiki系统";
            path = '/message/wiki';
            break;
        case '2':
        case 2:
            boxName = "图书馆";
            path = '/message/library';
            break;
        case '3':
        case 3:
            boxName = "小程序";
            path = '/message/wechat';
            break;
    }
    console.log(1);
    var note = Notification.info({
        title: '提示',
        message: '您在收件箱：' + boxName + ' 中有新的未读消息，点击查看',
        onClick: ()=>{
            router.push({path: path, query: {t: Date.now()}});
            note.close();
        },
        duration: 0
    });
}