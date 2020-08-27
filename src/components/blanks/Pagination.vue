<template lang="pug">
    include ../../../tools/mixins.pug
    +b.pagination
        +e.BUTTON.button(
            :class="{'disabled': position === 0}"
            v-on:click="setCurrentPage(position-1)"
        ) <
        +e.BUTTON.button--first(
            v-if="amount > 5 && position > 0"
            v-on:click="setCurrentPage(0)"
        ) 1
        +e.BUTTON.button(
            v-for="index in paginationAmount"
            :class="{'active': index === position + 1}"
            v-on:click="setCurrentPage(index - 1)"
        ) {{index}}
        +e.BUTTON.button--last(
            v-if="amount > 5 && position < amount - 3"
            v-on:click="setCurrentPage(amount - 1)"
        ) {{amount}}
        +e.BUTTON.button(
            :class="{'disabled': position + 1 === amount}"
            v-on:click="setCurrentPage(position + 1)"
        ) >
</template>

<script>
export default {
    props: {
        amount: {
            type: Number,
            required: true
        },
        position: {
            type: Number,
            required: true
        }
    },
    methods: {
        setCurrentPage(index) {
            this.$emit('paginationChange', index);
        }
    },
    computed: {
        paginationAmount () {
            if (this.amount < 6) {
                return this.amount;
            }

            let arr = [];

            let pos = this.position + 1;

            let deltaPrev = 2;
            let deltaNext = 2;

            if (pos - 3 <= 0) {
                deltaNext += deltaPrev;
                if (pos - 3 !== 0) {
                    deltaPrev = 0;
                } else {
                    deltaPrev = 1;
                }
            } else if (pos + 3 > this.amount) {
                deltaPrev += deltaNext;
                deltaNext = this.amount - pos;
                deltaPrev -= deltaNext;
            }

            // https://github.com/vuejs/vue/issues/3641
            for (let i = pos - deltaPrev; i <= pos + deltaNext; i++) {
                arr.push(i);
            }

            return arr
        }
    }
}
</script>