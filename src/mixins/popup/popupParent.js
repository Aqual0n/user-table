// import axios from 'axios'

export default {
    data: () => ({
        popups: {
            info: {
                active: false,
                data: ''
            }
        }
    }),

    methods: {
        openInfoPopup (data) {
            if (data.address && data.fullname) {
                this.popups.info.data = `
                <p>Имя: ${data.fullname}</p>
                <p>Адрес: </p>
                <p>Штат: ${data.address.state}</p>
                <p>Улица: ${data.address.streetAddress}</p>
                <p>Город: ${data.address.city}</p>
                <p>Индекс: ${data.address.zip}</p>`;
            } else {
                this.popups.info.data = `<pre>${JSON.stringify(data, null, 4)}</pre>`;
            }
            this.popups.info.active = true
        },
        closePopup (name) {
            this.popups[name].active = false
        }
    }
}
