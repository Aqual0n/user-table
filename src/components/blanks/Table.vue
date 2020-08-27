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
            :amount="paginationAmount"
            :position="paginationPosition"
            @paginationChange="changeCurrentPage"
        )
</template>

<script>
import Pagination from "./Pagination.vue";

/* todo:
    - field for inputing the amount of items per page
    - sort
    - search
    - popup
    - add states (error, load)
*/

export default {
    props: {
        content: {
            type: Array,
            required: true
        }
    },
    data: ()=> ({
        position: 0,
        rowsPerView: 25
    }),
    methods: {
        stringifyObject (object) {
            let objectString = '';

            for(let key in object) {
                if(Object.prototype.hasOwnProperty.call(object, key)) {
                    objectString += object[key] + ', ';
                }
            }

            return objectString.substring(0, objectString.length - 2);
        },
        changeCurrentPage (index) {
            this.position = index * this.rowsPerView;
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

            for(let i = this.position; i < this.position + this.rowsPerView; i++) {
                output.push(this.content[i]);
            }

            return output
        },
        paginationPosition() {
            return parseInt(((this.position)/this.rowsPerView).toString().split('.')[0], 10)
        },
        paginationAmount() {
            return Math.ceil(this.content.length/this.rowsPerView)
        },
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