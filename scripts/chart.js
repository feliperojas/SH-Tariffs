import sheets from './data.js';

const select = document.getElementById('sheet-select');
const ctx = document.getElementById('bar-chart').getContext('2d');
let barChart;

// Poblar selector
Object.keys(sheets).forEach(name => {
  const option = document.createElement('option');
  option.value = name;
  option.textContent = name;
  select.appendChild(option);
});

// Función para renderizar el gráfico
function renderChart(sheetName) {
  const data = sheets[sheetName];
  const labels = data.map(d => d.label);
  const values = data.map(d => d.value);

  if (barChart) barChart.destroy();
  
  barChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: sheetName,
        data: values
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });
}

// Evento al cambiar de hoja
select.addEventListener('change', e => {
  renderChart(e.target.value);
});

// Render inicial
renderChart(select.value);
