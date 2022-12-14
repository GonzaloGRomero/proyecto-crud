var races = [
	{
		id: 1,
		race: "UTHC 125",
		presenter: "The North Face",
		start: "Friday 13:00",
		Distance: "122 km",
		Elevation: "+4220m / -4580m",
		"Cut-off time": "29 hs",
		Stations: "10",
		Course: "Linear",
		"Qualifying-races": "Western States 100, ITRA 5",
	},
	{
		id: 2,
		race: "UTHC 80",
		presenter: "The North Face",
		start: "Saturday 7:00 AM",
		Distance: "78 km",
		Elevation: "+2146m / -1976m",
		"Cut-off time": "15hs30",
		Stations: "7",
		Course: "Linear",
		"Qualifying-races": "ITRA 3",
	},
	{
		id: 3,
		race: "UTHC 65",
		presenter: "Guru",
		start: "Saturday 8:30 AM",
		Distance: "63 km",
		Elevation: "+1870m / -1550m",
		"Cut-off time": "12hs15",
		Stations: "5",
		Course: "Linear",
		"Qualifying-races": "ITRA 3",
	},
	{
		id: 4,
		race: "UTHC 42",
		presenter: "Guru",
		start: "Saturday 7:00 AM",
		Distance: "42,7 km",
		Elevation: "+1300m / -1290m",
		"Cut-off time": "8hs30",
		Stations: "4",
		Course: "Linear",
		"Qualifying-races": "ITRA 2",
	},
	{
		id: 5,
		race: "Trail 28 km",
		presenter: "La Boutique du Lac",
		start: "Saturday 9:00 hs",
		Distance: "28 km",
		Elevation: "1000m D+",
		"Cut-off time": "5hs30",
		Stations: "2",
		Course: "Loop",
		"Qualifying-races": "ITRA 1",
	},
];

// races.forEach((e) => {
// 	let distNum = parseInt(e.Distance);
// 	if (distNum > 63) {
// 		return e.id;
// 	} else if (distNum < 63 && distNum > 43) {
// 		return e.id;
// 	}
// });

function raceSelec(i) {
	let markup = `
	
	<div class="grid-container">
	  <div class="item1">${races[i].race}</div>
	  <div class="item2"><br><h3>${races[i].Distance}</h3> <br> <p> Distance</p></div>
	  <div class="item3"><br><h3>${races[i].Elevation}</h3> <br> <p> Elevation</p></div>  
	  <div class="item4"><br><h3>${races[i].Course}</h3> <br> <p> Course </p> </div>
	  <div class="item5"><br><h3>${races[i].Stations}</h3> <br> <p> Stations</p></div>
	  <div class="item6"><br><h3>${races[i].start}</h3> <br> <p> Date</p></div>
	  <div class="item7"><br><h3>${races[i].presenter}</h3> <br> <p> Presenter</p></div>
	
	
	</div>`;

	return (document.getElementById("race-description").innerHTML = markup);
}

raceSelec(0);
