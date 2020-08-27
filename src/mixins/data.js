import axios from 'axios'
export default {
    data: () => ({
        content: [],
        // url: 'http://www.filltext.com/?rows=1000&id={index}&fullname={firstName}~{lastName}&company={business}&email={email}&uname={username}&address={addressObject}'
        url: 'https://jsonplaceholder.typicode.com/comments'
    }),
    methods: {
        fetchData() {
            axios({
                method: 'get',
                url: this.url
            })
                .then((response) => {
                    this.content = response.data;
                }).catch(function (error) {
                throw error
            });
        }
    },
}