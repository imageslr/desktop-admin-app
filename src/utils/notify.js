import { Notification } from 'element-ui';

export default function notifyMessage(type) {
    var boxName = "";
    switch (type) {
        case '1':
        case 1:
            boxName = "Wiki系统";
            break;
        case '2':
        case 2:
            boxName = "图书馆";
            break;
        case '3':
        case 3:
            boxName = "小程序";
            break;
    }
    Notification.info({
        title: '提示',
        message: '您在收件箱：' + boxName + ' 中有新的未读消息，请刷新该收件箱查看',
        duration: 0
    });
}