<template lang="pug">
    include ../../../tools/mixins.pug
    +b.pagination
        +e.left
            +e.BUTTON.button <<
            +e.BUTTON.button <
            +e.BUTTON.button(
                v-for="index in paginationAmount"
            ) {{index}}
        +e.right(
            v-if="amount > 6"
        )
            +e.BUTTON.button >
            +e.BUTTON.button >>
            +e.BUTTON.button(
                v-for="index in paginationEnding"
            ) {{index}}
</template>

<script>
export default {
    props: {
        amount: {
            type: Number,
            required: true
        },
        active: {
            type: Number,
            required: true
        }
    },
    computed: {
        paginationAmount () {
            if (this.amount < 3) {
                return this.amount;
            }
            return 3
        },
        // https://github.com/vuejs/vue/issues/3641
        paginationEnding () {
            let arr = [];

            for (let i = this.amount - 2; i <= this.amount; i++) {
                arr.push(i);
            }

            return arr
        }
    }
}
</script>