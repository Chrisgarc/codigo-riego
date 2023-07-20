function handleFile(e) {
    var file = e.target.files[0];
    var reader = new FileReader();

    reader.onload = function(e) {
      var contents = e.target.result;
      processData(contents);
    };

    reader.readAsText(file);
  }

  function processData(csv) {
    var lines = csv.split("\n");
    var table = document.createElement("table");
    var data = [];
    var labels = [];
    var previousData = null;

    for (var i = 0; i < lines.length; i++) {
      var row = document.createElement("tr");
      var values = lines[i].split(",");

      for (var j = 0; j < values.length; j++) {
        var cell = document.createElement(i === 0 ? "th" : "td");
        cell.textContent = values[j];
        row.appendChild(cell);

        if (i > 0) {
          labels.push(i);
          data.push(parseFloat(values[j]));
        }
      }

      table.appendChild(row);
    }

    document.getElementById("table").appendChild(table);
    drawChart(data, labels);
  }

  function drawChart(data, labels) {
    var ctx = document.getElementById("chart").getContext("2d");
    var chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [{
          label: "Datos",
          data: data,
          fill: false,
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 2,
          pointRadius: 0, // No muestra los puntos
          borderDash: [5, 5] // Patrón de línea discontinua
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: "Datos"
            }
          },
          y: {
            display: true,
            title: {
              display: true,
              text: "Valores"
            }
          }
        }
      }
    });
  }