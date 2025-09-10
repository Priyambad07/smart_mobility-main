function login() {
  document.getElementById('login-page').classList.add('hidden');
  document.getElementById('dashboard').classList.remove('hidden');
}

function showPage(pageId) {
  let pages = document.querySelectorAll('.page');
  pages.forEach(page => page.classList.add('hidden'));
  document.getElementById(pageId).classList.remove('hidden');

  if (pageId === 'maps' && !window.mapInitialized) {
    initLeafletMap();
    window.mapInitialized = true;
  }
}

function triggerEmergency() {
  alert('🚨 Emergency Alert Triggered! Authorities will be notified.');
}

// Initialize Leaflet map
function initLeafletMap() {
  const dehradun = [30.3165, 78.0322];
  const map = L.map('map').setView(dehradun, 13);

  // Load OpenStreetMap tiles
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  const busStops = [
    { coords: [30.285, 78.004], title: "ISBT" },
    { coords: [30.324, 78.043], title: "Clock Tower" },
    { coords: [30.383, 78.083], title: "Rajpur Road" }
  ];

  // Add bus stop markers
  busStops.forEach(stop => {
    L.marker(stop.coords).addTo(map).bindPopup(stop.title);
  });

  // Moving bus marker
  let busIndex = 0;
  let busMarker = L.marker(busStops[0].coords, { 
    icon: L.divIcon({ 
      className: 'custom-bus-icon', 
      html: '🔴', 
      iconSize: [20, 20] 
    }) 
  }).addTo(map);

  setInterval(() => {
    busIndex = (busIndex + 1) % busStops.length;
    busMarker.setLatLng(busStops[busIndex].coords);
    map.panTo(busStops[busIndex].coords);
  }, 5000);
}

// Chart.js demo
const ctx = document.getElementById('myChart');
if (ctx) {
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Time Saved', 'Money Saved', 'Daily Users'],
      datasets: [{
        label: 'Impact',
        data: [20, 15, 5000],
        backgroundColor: ['#ff7f50', '#1e90ff', '#32cd32']
      }]
    }
  });
}
