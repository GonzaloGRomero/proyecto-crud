var args = location.search.substr(1).split('&');
// lee los argumentos pasados a este formulario
var parts = []
for (let i = 0; i < args.length; ++i) {
    parts[i] = args[i].split('=');
}
console.log(args)
document.getElementById("txtId").value = parts[0][1]
document.getElementById("txtName").value = parts[1][1]
document.getElementById("txtLastname").value = parts[2][1]
document.getElementById("txtRace").value = parts[3][1]
document.getElementById("txtGender").value = parts[4][1]
document.getElementById("txtEmail").value = parts[5][1]
document.getElementById("txtPassword").value = parts[6][1]

 
function modificar() {
    let n = document.getElementById("txtName").value
    let ln = parseFloat(document.getElementById("txtLastname").value)
    let r = parseInt(document.getElementById("txtRace").value)
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
    let url = "http://localhost:5000/users/"+id
    var options = {
        body: JSON.stringify(user),
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        redirect: 'follow'
    }
    fetch(url, options)
        .then(function () {
            console.log("modificado")
            alert("Registro modificado")
            window.location.href = "./index.html#registerBtn";
            // Handle response we get from the API
        })
        .catch(err => {
            //this.errored = true
            console.error(err);
            alert("Error al Modificar")
        })      
}
