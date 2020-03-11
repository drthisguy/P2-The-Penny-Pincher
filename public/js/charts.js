/* Here is an controller for the on page charts. */


let ctx = document.getElementById('myChart').getContext('2d');
let labels = ['i', 'am', 'awesome'];
let colorHex = ['blue', 'green', 'red']

let myChart = new Chart(ctx, {
  type: 'pie',
  data: {
    datasets: [{
      data: [30,10,40,20],
      backgroundColor: colorHex
    }],
    labels: labels
  },
  options: {
    responsive: true,
    legend: {
      position: 'bottom'
    },
    plugins: {
      datalabels: {
        color: '#fff',
        anchor: 'end',
        align: 'start',
        offset: -10,
        borderWidth: 2,
        borderColor: '#fff',
        borderRadious: 25,
        backgroundColor: (context) => {
          return context.dataset.backgroundColor;
        },
        font: {
          weight: 'bold',
          size: '10'
        },
        formatter: (value) => {
          return value + '%';
        }
      }
    }
  }
})
