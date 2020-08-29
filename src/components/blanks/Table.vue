<template lang="pug">
    include ../../../tools/mixins.pug
    +b.table(
        :class="{'loading': loading, 'empty': !this.content.length}"
        :style="{height: tableHeight}"
    )
        +e.wrapper(
            ref="wrapper"
        )
            table(
                :class="{'loaded': this.content.length}"
            )
                tr
                    th(
                        v-for="(header, index) in getTableHeaders"
                        v-on:click="sort(header)"
                    ) {{header}}
                tr(
                    v-for="(row, index) in getOutput"
                    v-on:click="$emit('openPopup', row)"
                )
                    td(
                        v-for="data in row"
                    ) {{typeof data === 'object' ? stringifyObject(data) : data}}

            +e.PAGINATION-COMPONENT.pagination(
                v-if="this.content.length"
                :amount="paginationAmount"
                :position="paginationPosition"
                @paginationChange="changeCurrentPage"
            )

        +e.placeholder(
            v-if="!this.content.length"
        ) Нажмите на кнопку "загрузить" чтобы загрузить данные

        +e.preloader(
            :class="{'active': loading}"
        )
            .lds-roller
                div
                div
                div
                div
                div
                div
                div
                div
</template>

<script>
import Pagination from "./Pagination.vue";
import Search from "./Search.vue";
/* todo:
    - field for inputing the amount of items per page
    - sort
    - search
    - add states (error)
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
    data: ()=> ({
        position: 0,
        rowsPerView: 20,
        tableHeight: null,
        sortByIncrease: false,
        sortKey: ''
    }),
    methods: {
        sort(key) {
            if (this.sortKey === key) {
                this.sortByIncrease = !this.sortByIncrease;
            } else {
                this.sortKey = key
            }
        },
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
        },
        setTableHeight() {
            this.tableHeight = `${this.$refs.wrapper.getBoundingClientRect().height}px`
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
        sortedContent () {
            return []
        },
        paginationPosition() {
            return parseInt(((this.position)/this.rowsPerView).toString().split('.')[0], 10)
        },
        paginationAmount() {
            return Math.ceil(this.content.length/this.rowsPerView)
        },
    },
    components: {
        'pagination-component': Pagination,
        'search-component': Search
    },
    watch: {
        content(val) {
            if(val.length) {
                this.$nextTick(() => {
                    this.setTableHeight()
                })
            }
        }
    }
}
</script>