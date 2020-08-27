<template lang="pug">
    include ../../../tools/mixins.pug

    +b.main
        +e.container.container
            +e.TABLE-COMPONENT.table(
                :content="content"
            )
</template>

<script>
import Table from "../blanks/Table.vue";
/* todo:
    - field for inputing the url
    - button for fetching data
*/
export default {
    props: {
        content: {
            type: Array,
            required: true
        }
    },
    components: {
        'table-component': Table
    }
}
</script>