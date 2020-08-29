<template lang="pug">
    include ../../../tools/mixins.pug

    +b.main
        +e.container.container
            +e.H1.title Таблица
            transition(
                name="info"
            )
                +e.wrapper(
                    v-if="!content.length"
                    ref="wrapper"
                    :style="{height: textHeight}"
                )
                    +e.BUTTON.button.button--default(
                        v-on:click="$emit('fetchData')"
                    ) Загрузить
            +e.TABLE-COMPONENT.table(
                :loading="loading"
                :content="content"
            )
</template>

<script>
import Table from "../blanks/Table.vue";
/* todo:
    - field for inputing the url
*/
export default {
    props: {
        content: {
            type: Array,
            required: true
        },
        loading: {
            type: Boolean,
            required: false
        }
    },
    data: () => ({
        textHeight: null
    }),
    mounted() {
        this.$nextTick(() => {
            this.setTextHeight()
        })
    },
    methods: {
        setTextHeight() {
            this.textHeight = `${this.$refs.wrapper.getBoundingClientRect().height}px`;
        }
    },
    components: {
        'table-component': Table
    }
}
</script>