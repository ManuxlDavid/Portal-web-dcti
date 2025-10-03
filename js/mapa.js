let map = L.map('mi_map').setView([9.7446818, -63.1722970], 20);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
let marker = L.marker([9.7446818, -63.1722970]).addTo(map);
marker.bindTooltip("Lotería de oriente sede.").openTooltip();

