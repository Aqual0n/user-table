<template lang="pug">
    include ../../tools/mixins.pug
    div
        main-component(
            :content="content"
            :loading="loading"
            @fetchData="fetchData"
        )
</template>

<script>
import Main from "../components/sections/Main.vue";
import data from "../mixins/data";
export default {
    mixins: [
        data
    ],
    components: {
        'main-component': Main
    }
}
</script>