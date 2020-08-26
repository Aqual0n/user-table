<template lang="pug">
    include ../../../tools/mixins.pug
    +b.table
        table
            tr
                th(
                    v-for="(header, index) in getTableHeaders"
                ) {{header}}
            tr(
                v-for="(row, index) in getOutput"
            )
                td(
                    v-for="data in row"
                ) {{typeof data === 'object' ? stringifyObject(data) : data}}

        +e.PAGINATION-COMPONENT.pagination(
            :amount="content.length/20"
        )
</template>

<script>
import Pagination from "./Pagination.vue";

export default {
    props: {
        content: {
            type: Array,
            required: true
        }
    },
    data: ()=> ({
        position: 0
    }),
    methods: {
        stringifyObject(object) {
            let objectString = '';

            for(let key in object) {
                if(Object.prototype.hasOwnProperty.call(object, key)) {
                    objectString += object[key] + ', ';
                }
            }

            return objectString.substring(0, objectString.length - 2);
        }
    },
    computed: {
        getTableHeaders() {
            if (this.content[0]) {
                return Object.keys(this.content[0]);
            }
            return []
        },
        getOutput () {
            let output = [];

            for(let i = this.position; i < this.position + 20; i++) {
                output.push(this.content[i]);
            }

            return output
        }
    },
    components: {
        'pagination-component': Pagination
    }
}
</script>

<style lang="scss" scoped>
    table {
        border-collapse: collapse;
        width: 100%;
    }

    th, td {
        padding: 8px;
        text-align: left;
        border-bottom: 1px solid #ddd;
    }

    tr:hover {background-color:#f5f5f5;}
</style>