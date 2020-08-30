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
                    h3 Введите запрос в поле ниже:
                    +e.INPUT-COMPONENT.input(
                        v-model="url"
                        :placeholder="'Введите url запроса'"
                    )
                    +e.BUTTON.button.button--default(
                        v-on:click="$emit('fetchData', url)"
                    ) Загрузить
            +e.TABLE-COMPONENT.table(
                :content="content"
                :loading="loading"
                :error="error"
                :errorText="errorText"
                @openPopup="$emit('openPopup', $event)"
            )
</template>

<script>
import Table from "../blanks/Table.vue";
import Input from "../blanks/Input.vue";
export default {
    props: {
        content: {
            type: Array,
            required: true
        },
        loading: {
            type: Boolean,
            required: false
        },
        error: {
            type: Boolean,
            required: false
        },
        errorText: {
            type: String,
            required: false
        }
    },
    data: () => ({
        textHeight: null,
        url: 'http://www.filltext.com/?rows=1000&id={index}&fullname={firstName}~{lastName}&company={business}&email={email}&uname={username}&address={addressObject}'
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
        'table-component': Table,
        'input-component': Input
    }
}
</script>