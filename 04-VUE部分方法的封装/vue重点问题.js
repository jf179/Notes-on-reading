 // vuex可以绑定v-model吗，怎么做处理 具体怎么写😂

// 可以直接绑定vuex中的状态  使用和解决办法 ：
// 使用computed计算属性，通过mutations去改变data数据
// computed其实可以接受两个参数：get 获取值时触发， set修改值时触发
< input v-model = "getVal" / >
    computed: {
        getVal: {
            get() {
                // 这里也是用了Vuex里的 modules 大家可以当成普通的变量来看
                return this.$store.state.Root.value
            }
            set(newVal) {
                this.$store.commit('handleVal', newVal)
            }
        }
    }
}

 // store 文件
mutations: {
    handleVal(state, payload) {
        state.value = payload
    }
}

// ----------------