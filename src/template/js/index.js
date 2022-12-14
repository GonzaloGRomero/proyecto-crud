// nav functions
function openNav() {
	document.getElementById("mySidenav").style.width = "250px";
}
function closeNav() {
	document.getElementById("mySidenav").style.width = "0";
}

function openMyracesNav() {
	document.getElementById("myRacesnav").style.width = "550px";
}

function closeMyracesNav() {
	document.getElementById("myRacesnav").style.width = "0";
}

// nav functions

//activar esto cuando termine con la parte de APIS

// let vid = document.getElementById("myVideo");
// vid.playbackRate = 0.75;
let flag = false;

function openForm() {
	let form = document.getElementById("form");
	if (flag === false) {
		form.style.height = "500px";
		flag = true;
	} else if (flag === true) {
		form.style.height = "0";
		flag = false;
	}
}

document.addEventListener("DOMContentLoaded", function () {
	document.getElementById("form").addEventListener("submit", validarFormulario);
});

function validarFormulario(evento) {
	evento.preventDefault();
	var Name = document.getElementById("txtName").value;
	if (Name.length == 0) {
		alert("You forgot your name");
		return;
	}
	var Lastname = document.getElementById("txtLastname").value;
	if (Lastname.length == 0) {
		alert("You forgot your last name");
		return;
	}
	const email = document.getElementById("txtEmail");

	email.addEventListener("input", function (event) {
		if (email.validity.typeMismatch) {
			email.setCustomValidity("Please wirte a valid email account!");
		} else {
			email.setCustomValidity("");
		}
	});
	var psw = document.getElementById("txtPassword").value;
	if (psw.length == 0) {
		alert("La clave no es válida");
		return;
	}
	this.submit();
}

//api functions

function apiCall(difficulty) {
	//const apiKey = "yx3jbPTs9/VpvjlI+qvb5w==tkZsqvGlhJaACr6g";

	if (difficulty === "beginner") {
		$.ajax({
			method: "GET",
			url:
				"https://api.api-ninjas.com/v1/exercises?type=cardio" +
				"&difficulty=" +
				difficulty,
			headers: { "X-Api-Key": apiKey },
			contentType: "application/json",
			success: async function (result) {
				console.log(result);
				let beginnerRes = result[Math.floor(Math.random() * 9)]; //asdasd

				let markup = `
  				<div class="routine-card" id="routineCard">
				  <div class="card-routine1">
				  <h1>Some excercises for this race! </h1>
						
				  <li>
					  Name: ${beginnerRes.name}
				  </li>
				  <li>
					  Muscle: ${beginnerRes.muscle}
				  </li>
				  <li>
					  Equipment: ${beginnerRes.equipment}
				  </li>
			  		<br><h3>Description:</h3><br>
			   		<p>${beginnerRes.instructions}</p>
			   		</div>
  					
 				</div>`;
				return (document.getElementById("routineCard").innerHTML = markup);
			},
			error: function ajaxError(jqXHR) {
				console.error("Error: ", jqXHR.responseText);
			},
		});
	} else if (difficulty === "intermediate") {
		$.ajax({
			method: "GET",
			url:
				"https://api.api-ninjas.com/v1/exercises?type=cardio" +
				"&difficulty=" +
				difficulty,
			headers: { "X-Api-Key": apiKey },
			contentType: "application/json",
			success: function (result) {
				console.log(result);
				let intermediateRes = result[Math.floor(Math.random() * 10)]; //asdasd

				let markup = `
				<div class="routine-card" id="routineCard">
				  <div class="card-routine1">
				  <h1>Some excercises for this race! </h1>
						
				  <li>
					  Name: ${intermediateRes.name}
				  </li>
				  <li>
					  Muscle: ${intermediateRes.muscle}
				  </li>
				  <li>
					  Equipment: ${intermediateRes.equipment}
				  </li>
			  		<br><h3>Description:</h3><br>
			   		<p>${intermediateRes.instructions}</p>
			   		</div>
  					
 				</div>`;

				return (document.getElementById("routineCard").innerHTML = markup);
			},
			error: function ajaxError(jqXHR) {
				console.error("Error: ", jqXHR.responseText);
			},
			error: function ajaxError(jqXHR) {
				console.error("Error: ", jqXHR.responseText);
			},
		});
	}
}

apiCall("beginner");
apiCall("intermediate");

function routine(e) {
	if (e === "SHORT") {
		console.log(beginnerRes);
	} else {
		console.log(intermediateRes);
	}
}
