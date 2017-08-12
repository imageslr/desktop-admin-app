<template>
    <div class="login-wrap">
        <div id="particles-js"></div>
        <div class="login">
            <div class="title">超级管理员后台系统</div>
            <el-form :model="loginForm" :rules="loginRules" ref="loginForm" label-width="0px">
                <el-form-item prop="email">
                    <el-input v-model="loginForm.email" placeholder="邮箱"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="密码" v-model="loginForm.password" @keyup.enter.native="login()"></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" :loading="loginLoading" @click="login()">登录</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>
<script>
import { emailValidator, passwordValidator } from '../../utils/validate.js';
import 'particles.js/particles';
const particlesJS = window.particlesJS;

export default {
    data: function() {
        return {
            // login
            loginForm: {
                email: '',
                password: ''
            },
            loginRules: {
                email: { required: true, trigger: 'blur', validator: emailValidator },
                password: { required: true, trigger: 'blur', validator: passwordValidator }
            },
            loginLoading: false,

            // particles
            particlesCfg: {
                "particles": {
                    "number": {
                        "value": 88,
                        "density": {
                            "enable": true,
                            "value_area": 700
                        }
                    },
                    "color": {
                        "value": ["#aa73ff", "#f8c210", "#83d238", "#33b1f8"]
                    },
                    "shape": {
                        "type": "circle",
                        "stroke": {
                            "width": 0,
                            "color": "#000000"
                        },
                        "polygon": {
                            "nb_sides": 15
                        }
                    },
                    "opacity": {
                        "value": 0.5,
                        "random": false,
                        "anim": {
                            "enable": false,
                            "speed": 1.5,
                            "opacity_min": 0.15,
                            "sync": false
                        }
                    },
                    "size": {
                        "value": 2.5,
                        "random": false,
                        "anim": {
                            "enable": true,
                            "speed": 2,
                            "size_min": 0.15,
                            "sync": false
                        }
                    },
                    "line_linked": {
                        "enable": true,
                        "distance": 110,
                        "color": "#33b1f8",
                        "opacity": 0.25,
                        "width": 1
                    },
                    "move": {
                        "enable": true,
                        "speed": 1.6,
                        "direction": "none",
                        "random": false,
                        "straight": false,
                        "out_mode": "out",
                        "bounce": false,
                        "attract": {
                            "enable": false,
                            "rotateX": 600,
                            "rotateY": 1200
                        }
                    }
                },
                "interactivity": {
                    "detect_on": "canvas",
                    "events": {
                        "onhover": {
                            "enable": false,
                            "mode": "grab"
                        },
                        "onclick": {
                            "enable": false,
                            "mode": "push"
                        },
                        "resize": true
                    },
                    "modes": {
                        "grab": {
                            "distance": 100,
                            "line_linked": {
                                "opacity": 0.8
                            }
                        },
                        "bubble": {
                            "distance": 400,
                            "size": 40,
                            "duration": 2,
                            "opacity": 8,
                            "speed": 3
                        },
                        "repulse": {
                            "distance": 200,
                            "duration": 0.4
                        },
                        "push": {
                            "particles_nb": 4
                        },
                        "remove": {
                            "particles_nb": 2
                        }
                    }
                },
                "retina_detect": true
            }
        }
    },
    mounted() {
        particlesJS("particles-js", this.particlesCfg);
    },
    methods: {
        login() {
            this.$refs.loginForm.validate((valid) => {
                if (!valid) return;
                this.loginLoading = true;
                this.$store.dispatch('LOGIN', this.loginForm).then(() => {
                    this.$message.success('登录成功');
                    this.$router.replace({ path: '/dashboard' });
                }).finally(() => {
                    this.loginLoading = false;
                });
            });
        },
    }
}
</script>
<style scoped>
.login-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 100%;
    height: 100%;
}

canvas {
    display: block;
    vertical-align: bottom;
}

#particles-js {
    z-index: -1;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: #323840;
}

.login {
    position: relative;
    width: 300px;
    padding: 30px 30px 20px;
    border-radius: 5px;
    background: #fff;
}

.title {
    position: absolute;
    top: -70px;
    left: 0;
    width: 100%;
    font-size: 30px;
    color: #fff;
    text-align: center;
}

.login-btn {
    text-align: center;
}

.login-btn button {
    width: 100%;
    height: 36px;
}
</style>