import axios from 'axios'
export default {
    data: () => ({
        loading: false,
        error: false,
        errorText: '',
        content: [],
        url: 'http://www.filltext.com/?rows=1000&id={index}&fullname={firstName}~{lastName}&company={business}&email={email}&uname={username}&address={addressObject}'
        // url: 'https://jsonplaceholder.typicode.com/users'
    }),
    methods: {
        fetchData() {
            this.loading = true;
            axios({
                method: 'get',
                url: this.url
            })
                .then((response) => {
                    this.content = response.data;
                    setTimeout(() => {
                        this.loading = false
                    }, 300)
                }).catch((error) => {
                    this.loading = false
                    this.error = true
                    this.errorText = error.message
                });
        }
    },
}