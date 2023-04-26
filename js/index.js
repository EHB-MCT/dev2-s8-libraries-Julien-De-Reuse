"use strict";

const app = {
	map: null, // gebruik dit om de map gemakkelijk aan te spreken doorheen de applicatie
	init() {
		// initialise de kaart
		// console.log(L);
		this.map = L.map("map").setView([50.84666709385041, 4.3525689170386626], 11);
		// voeg een tile layer toe, met URL https://a.tile.openstreetmap.org/{z}/{x}/{y}.png
		L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
			maxZoom: 19,
			attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
		}).addTo(this.map);
		// vergeet openstreetmap attributie niet

		// gebruik de functie "loadMarkers" om de markers toe te voegen
		this.loadMarkers();
	},
	loadMarkers() {
		// fetch de data van opendata.brussels.be
		// var marker = L.marker([50.84642231895051, 4.354385091829173]).addTo(this.map);
		fetch("https://opendata.brussels.be/api/records/1.0/search/?dataset=toiletten&q=&rows=100&geofilter.distance=50.846475%2C+4.352793%2C+5000")
			.then((response) => response.json())
			.then((data) => {
				console.log(data); // Array
				for (let i = 0; i < 80; i++) {
					let lat = data.records[i].fields.wgs84_lat;
					let long = data.records[i].fields.wgs84_long;
					console.log(long);
					console.log(lat);
					this.marker = L.marker([lat, long]).addTo(this.map);
				}
			});
		// als er coordinaten beschikbaar zijn, kan je de addMarker functie gebruiken om een marker toe te voegen op de kaart
	},
	addMarker(lat, long) {
		// voeg een marker toe op lat, lon
	},
};

app.init();
