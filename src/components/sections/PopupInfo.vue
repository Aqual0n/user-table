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
                +e.text.text
                    p Имя: {{text.fullname}}
                    p Адрес:
                    p Штат: {{text.address.state}}
                    p Улица: {{text.address.streetAddress}}
                    p Город: {{text.address.city}}
                    p Индекс: {{text.address.zip}}

</template>

<script>
import popup from "../../mixins/util/popup";

export default {
    mixins: [
        popup
    ],
    props: {
        text: {
            type: Object,
            required: true
        }
    },
    data() {
        return {}
    }
}
</script>
