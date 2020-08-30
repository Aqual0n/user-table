<template lang="pug">
    include ../../../tools/mixins.pug
    +b.table(
        :class="{'loading': loading, 'loaded': this.content.length}"
        :style="{height: tableHeight}"
    )
        +e.wrapper(
            ref="wrapper"
        )
            +e.search(
                v-if="this.content.length"
            )
                +e.INPUT-COMPONENT.search(
                    ref="search"
                    v-model="searchInputValue"
                    :placeholder="'Введите значение для поиска'"
                )
                +e.BUTTON.button.button--default(
                    v-on:click="search"
                ) Найти

            table(
                :class="{'loaded': this.content.length}"
            )
                tr
                    th(
                        v-for="(header, index) in getTableHeaders"
                        v-on:click="sort(header)"
                        :class="{'sort': header === sortKey, 'sort--increase': sortByIncrease}"
                    ) {{header}}
                tr.hover(
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
            v-if="!this.content.length && !error"
        ) Нажмите на кнопку "загрузить" чтобы загрузить данные

        +e.error(
            v-if="error"
        ) Ошибка загрузки данных: {{errorText}}

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
import Input from "./Input.vue";

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
    data: ()=> ({
        position: 0,
        rowsPerView: 10,
        tableHeight: null,
        sortByIncrease: true,
        sortKey: '',
        searchValue: '',
        searchInputValue: ''
    }),
    methods: {
        sort(key) {
            if (this.sortKey === key) {
                this.sortByIncrease = !this.sortByIncrease;
            } else {
                this.sortKey = key
            }
        },
        search() {
            // this could be reactive
            this.searchValue = this.searchInputValue
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
                output.push(this.sortedContent[i]);
            }

            return output
        },
        sortedContent () {
            if (this.sortKey || this.searchValue) {
                let array = [...this.content];


                if (array && this.searchValue) {
                    array = array.filter((item) => {
                        let flag = false;

                        Object.keys(item).some((key) => {
                            if(typeof item[key] === 'string') {
                                flag = item[key].indexOf(this.searchValue) !== -1;
                                return flag
                            } else if (typeof item[key] === 'object'){
                                flag = this.stringifyObject(item[key]).indexOf(this.searchValue) !== -1;
                                return flag
                            } else {
                                flag = item[key].toString().indexOf(this.searchValue) !== -1;
                                return flag
                            }
                        });
                        return flag
                    })
                }

                if (array && this.sortKey) {
                    let type = typeof array[0][this.sortKey];
                    if (this.sortByIncrease) {
                        switch (type) {
                            case 'string':
                                array.sort((a, b) => a[this.sortKey].localeCompare(b[this.sortKey]));
                                break;
                            case 'number':
                                array.sort((a, b) => a[this.sortKey] - b[this.sortKey]);
                                break;
                            case 'object':
                                array.sort((a, b) => this.stringifyObject(a[this.sortKey]).localeCompare(this.stringifyObject(b[this.sortKey])));
                        }
                    } else {
                        switch (type) {
                            case 'string':
                                array.sort((a, b) => b[this.sortKey].localeCompare(a[this.sortKey]));
                                break;
                            case 'number':
                                array.sort((a, b) => b[this.sortKey] - a[this.sortKey]);
                                break;
                            case 'object':
                                array.sort((a, b) => this.stringifyObject(b[this.sortKey]).localeCompare(this.stringifyObject(a[this.sortKey])));
                        }
                    }
                }

                return array;
            }

            return this.content
        },
        paginationPosition() {
            return parseInt(((this.position)/this.rowsPerView).toString().split('.')[0], 10)
        },
        paginationAmount() {
            return Math.ceil(this.sortedContent.length/this.rowsPerView)
        },
    },
    components: {
        'pagination-component': Pagination,
        'input-component': Input
    },
    watch: {
        content(val) {
            if(val.length) {
                this.$nextTick(() => {
                    this.setTableHeight()
                })
            }
        },
        searchValue() {
            this.position = 0;
        }
    }
}
</script>