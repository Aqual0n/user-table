<template lang="pug">
    include ../../../tools/mixins.pug
    +b.popup--over(
        v-if="active"
        :class="{'active': showPopup}"
    )
        +e.background(
            v-on:click="closePopup"
        )
        +e.scroller(
        )
            +e.wrapper(
                data-scroll-lock-scrollable
            )
                +e.BUTTON.close(
                    v-on:click="closePopup"
                )
                +e.text.text(
                    v-html="text"
                )

</template>

<script>
import popup from "../../mixins/util/popup";

export default {
    mixins: [
        popup
    ],
    props: {
        text: {
            type: String,
            required: true
        }
    },
    data() {
        return {}
    }
}
</script>
