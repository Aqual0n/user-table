// import axios from 'axios'

export default {
    data: () => ({
        popups: {
            info: {
                active: false,
                data: {}
            }
        }
    }),

    methods: {
        openInfoPopup (data) {
            this.popups.info.data = data;
            this.popups.info.active = true
        },
        closePopup (name) {
            this.popups[name].active = false
        }
    }
}
