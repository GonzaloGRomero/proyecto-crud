if (document.getElementById("racesapp")) {
    const { createApp } = Vue
 
    createApp({ 
        data() {
            return {
                users: [],
                errored: false,
                loading: true,
                url: "http://localhost:5000/users"
                }
        },
        methods: {
            fetchData(url) {
                fetch(url)
                    .then(response => response.json())
                    .then(data => {
                        this.users = data;
                        this.loading = false;
                    })
                    .catch(err => {
                        this.errored = true
                    })
            },
            eliminar(user) {
                const url = 'http://localhost:5000/users/' + user;
                var options = {
                    method: 'DELETE',
                }
                fetch(url, options)
                    .then(res => res.text()) // or res.json()
                    .then(res => {
                        location.reload();
                    })
            }
        },
        created() {
            this.fetchData(this.url)
        }
    }).mount('#racesapp')
}

