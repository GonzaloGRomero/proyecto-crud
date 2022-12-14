function guardar() {
 
    let n = document.getElementById("txtName").value
    let ln = document.getElementById("txtLastname").value
    let r = document.getElementById("txtRace").value
    let g = document.getElementById("txtGender").value
    let e = document.getElementById("txtEmail").value
    let p = document.getElementById("txtPassword").value
 
    let user = {
        name: n,
        lastname: ln,
        race: r,
        gender: g,
        email: e,
        password: p
    }
    let url = "http://localhost:5000/users"
    var options = {
        body: JSON.stringify(user),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
       // redirect: 'follow'
    }
    fetch(url, options)
        .then(function () {
            console.log("creado")
            alert("Grabado")
            window.location.href = "./index.html#registerBtn";
            // Handle response we get from the API
        })
        .catch(err => {
            //this.errored = true
            alert("Error al registra" )
            console.error(err);
        })
        
    }
