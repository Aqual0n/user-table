<template lang="pug">
    include ../../tools/mixins.pug
    div
        main-component(
            :content="content"
        )
</template>

<script>
import Main from "../components/sections/Main.vue";
import data from "../mixins/data";
export default {
    mixins: [
        data
    ],
    mounted() {
        this.$nextTick(() => {
            this.fetchData()
        })
    },
    components: {
        'main-component': Main
    }
}
</script>