// 重写自定义上传方法，检测服务器返回 { code:500 } 的错误
export default function(option) {
    var getError = function(action, option, xhr) {
        let msg;
        if (xhr.response) {
            msg = `${xhr.status} ${xhr.response.error || xhr.response}`;
        } else if (xhr.responseText) {
            msg = `${xhr.status} ${xhr.responseText}`;
        } else {
            msg = `fail to post ${action} ${xhr.status}`;
        }

        const err = new Error(msg);
        err.status = xhr.status;
        err.method = 'post';
        err.url = action;
        return err;
    }

    var getBody = function(xhr) {
        const text = xhr.responseText || xhr.response;
        if (!text) {
            return text;
        }

        try {
            return JSON.parse(text);
        } catch (e) {
            return text;
        }
    }

    if (typeof XMLHttpRequest === 'undefined') {
        return;
    }

    const xhr = new XMLHttpRequest();
    const action = option.action;

    if (xhr.upload) {
        xhr.upload.onprogress = function progress(e) {
            if (e.total > 0) {
                e.percent = e.loaded / e.total * 100;
            }
            option.onProgress(e);
        };
    }

    const formData = new FormData();

    if (option.data) {
        Object.keys(option.data).map(key => {
            formData.append(key, option.data[key]);
        });
    }

    formData.append(option.filename, option.file);

    xhr.onerror = function error(e) {
        option.onError(e);
    };

    xhr.onload = function onload() {
        // 这里作了修改
        if (xhr.status < 200 || xhr.status >= 300 || getBody(xhr).code != 200) {
            return option.onError(getError(action, option, xhr));
        }

        option.onSuccess(getBody(xhr));
    };

    xhr.open('post', action, true);

    if (option.withCredentials && 'withCredentials' in xhr) {
        xhr.withCredentials = true;
    }

    const headers = option.headers || {};

    for (let item in headers) {
        if (headers.hasOwnProperty(item) && headers[item] !== null) {
            xhr.setRequestHeader(item, headers[item]);
        }
    }
    xhr.send(formData);
    return xhr;
}