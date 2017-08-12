export const requiredValidator = (msg) => {
    return {
        required: true,
        message: msg ? msg : '请填写此字段',
        trigger: 'change'
    }
}

export const integerValidator = (rule, value, callback) => {
    if (isNaN(value)) {
        callback(new Error('请输入一个整数'));
    } else {
        callback();
    }
}

export const phoneValidator = (rule, value, callback) => {
    if (!(/^1[34578]\d{9}$/.test(value))) {
        callback(new Error('请输入正确的手机号'));
    } else {
        callback();
    }
}

export const emailValidator = (rule, value, callback) => {
    if (!/^[a-z0-9](?:[-_.+]?[a-z0-9]+)*@[a-z0-9]+\.com$/i.test(value)) {
        callback(new Error('请输入正确的合法邮箱'));
    } else {
        callback();
    }
};

export const passwordValidator = (rule, value, callback) => {
    if (!value || value.length < 6) {
        callback(new Error('密码不能小于6位'));
    } else {
        callback();
    }
};

export const emailTest = (value) => {
    return /^[a-z0-9](?:[-_.+]?[a-z0-9]+)*@[a-z0-9]+\.com$/i.test(value);
}

export const phoneTest = (value) => {
    return /^1[34578]\d{9}$/.test(value);
}