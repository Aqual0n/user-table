<template lang="pug">
    include ../../../tools/mixins.pug

    +b.input(
        :class="[{'focus': focus}]"
    )
        +e.INPUT.value(
            ref="inputValue"
            :value="value"
            v-on:focus="onFocus"
            v-on:blur="onBlur"
            v-on:input="$emit('input', $event.target.value)"
        )
        +e.placeholder {{ placeholder }}

</template>

<script>
export default {
    props: {
        placeholder: {
            required: true,
            type: [String, Number]
        },
        value: {
            required: true,
            type: String
        },
    },
    data () {
        return {
            focus: false
        }
    },
    methods: {
        onFocus () {
            this.focus = true
        },
        onBlur () {
            if (this.value === '') {
                this.focus = false
            }
        }
    },
    mounted() {
        if(this.value !== '') {
            this.focus = true
        }
    },
    watch: {
        value (newVal) {
            if (newVal === '' && this.$refs.inputValue !== document.activeElement) {
                this.focus = false
            }
        }
    }
}
</script>
