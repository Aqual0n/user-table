import { disablePageScroll, enablePageScroll } from 'scroll-lock'
import handlerOnEsc from './handlerOnEsc'

export default {
    mixins: [
        handlerOnEsc
    ],

    props: {
        active: {
            type: Boolean
        }
    },

    data: () => ({
        showPopup: false
    }),

    methods: {
        onKeyDown (e) {
            this.handlerOnEsc(this.closePopup, e)
        },
        closePopup () {
            this.showPopup = false
            setTimeout(() => {
                this.$emit('close')
            }, 300)
        }
    },

    watch: {
        active (newValue) {
            if (newValue) {
                setTimeout(() => {
                    this.showPopup = true
                    disablePageScroll(this.$refs.popup)
                })
                document.addEventListener('keydown', this.onKeyDown)
            } else {
                document.removeEventListener('keydown', this.onKeyDown)
                enablePageScroll()
            }
        }
    }
}
