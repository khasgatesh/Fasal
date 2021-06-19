AWS.config.update({
    "region": "us-east-2",
    "endpoint": "https://dynamodb.us-east-2.amazonaws.com",
    "accessKeyId": "AKIAZ7JJJKGEBF52EU66",
    "secretAccessKey": "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"
  });
  var docClient = new AWS.DynamoDB.DocumentClient();



  function scanall() {
    var params = {
      TableName: "nodemcu2db"
    };
    docClient.scan(params, (err, data) => {
      if (err) {
        console.log("Unreached" + JSON.stringify(err, undefined, 2))
      } else {
      

        var x = []
        var y = []
        var z = []
        var time = []
        for (var i = 0; i < data.Items.length; i++) {
          // console.log(parseInt(data.Items[i].Tmpr.Humidity))
          //console.log(parseInt(data.Items[i].Tmpr.Moisture))
          time.push(data.Items[i].Time)
          x.push(parseInt(data.Items[i].Tmpr.Humidity))
          y.push(parseInt(data.Items[i].Tmpr.Moisture))
          z.push(parseInt(data.Items[i].Tmpr.Temperature))

        
        }
        var last_10_humidity = x.slice(-10)
        var last_10_moisture = y.slice(-10)
        var last_10_Temp = z.slice(-10)

        var last_10_time = time.slice(-10)
        var sum = x => x.reduce((a, b) => a + b, 0); // summation function

        var Humidity = sum(x)
        var Average = Humidity / x.length
        document.getElementById('Humidity').innerHTML = Average.toFixed(1)

        var Moisture = sum(y)
        var Average_Moist = Moisture / y.length
        document.getElementById('Moisture').innerHTML = Average_Moist.toFixed(1)

        var Temperature = sum(z)
        // console.log(Temperature)
        var Average_Temp = Temperature / z.length

        document.getElementById('Temperature').innerHTML = Average_Temp.toFixed(2)

        var High_temperature = Math.max(...z)
        var High_humidity = Math.max(...x)
        var high_moist = Math.max(...y)


        var H_guage = document.getElementById('hum').getContext('2d')
        var M_guage = document.getElementById('moist').getContext('2d')
        var T_guage = document.getElementById('temp').getContext('2d')


        let hum_guage = new Chart(H_guage, {
          type: 'doughnut',
          data: {
            labels: ['Average', 'Max'],
            datasets: [{
              label: 'Soil Contents',
              data: [
                Average, High_humidity
              ],
              //backgroundColor:'green',
              backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)',
                'rgba(255, 99, 132, 0.6)'
              ],
              borderWidth: 1,
              borderColor: '#777',
              hoverBorderWidth: 3,
              hoverBorderColor: '#000'
            }]
          },
          options: {
            circumference: 180,
            rotation: -90,
            cutout: 50
          },
          plugins: {
            datalabels: {
              display: true,
              align: 'bottom',
              backgroundColor: '#ccc',
              borderRadius: 3,
              font: {
                size: 18,
              }
            },
          }

        })
        let moist_guage = new Chart(M_guage, {
          type: 'doughnut',
          data: {
            labels: ['Avarage', 'Max'],
            datasets: [{
              label: ['Max', 'Min'],
              data: [
                Average_Moist, high_moist
              ],
              //backgroundColor:'green',
              backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)',
                'rgba(255, 99, 132, 0.6)'
              ],
              borderWidth: 1,
              borderColor: '#777',
              hoverBorderWidth: 3,
              hoverBorderColor: '#000'
            }]
          },
          options: {
            circumference: 180,
            rotation: -90,
            cutout: 50
          },
          plugins: {
            datalabels: {
              color: 'blue',
              labels: {
                title: {
                  font: {
                    weight: 'bold'
                  }
                },
                value: {
                  color: 'green'
                }
              }
            }
          }
        })
        let temp_guage = new Chart(T_guage, {
          type: 'doughnut',
          data: {
            labels: ['Average', 'Max'],
            datasets: [{
              label: 'Soil Contents',
              data: [
                Average_Temp, High_temperature
              ],
              //backgroundColor:'green',
              backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)',
                'rgba(255, 99, 132, 0.6)'
              ],
              borderWidth: 1,
              borderColor: '#777',
              hoverBorderWidth: 3,
              hoverBorderColor: '#000'
            }]
          },
          options: {
            circumference: 180,
            rotation: -90,
            cutout: 50
          }
        })


        var Hum_line = document.getElementById('Hum').getContext('2d')
        var Moist_line = document.getElementById('Moist').getContext('2d')
        var Temp_line = document.getElementById('Temp')

        let Hum_chart = new Chart(Hum_line, {
          type: 'line',
          data: {
            labels: last_10_time,
            datasets: [{
              label: 'Humidity',
              data: last_10_humidity,
              tension: 0.6,
              //backgroundColor:'green',
              backgroundColor: [
                'rgba(255, 99, 132, 0.6)',

              ],
              borderWidth: 1,
              borderColor: '#777',
              hoverBorderWidth: 3,
              hoverBorderColor: '#000'
            }]
          },
          options: {
            circumference: 180,
            rotation: -90,
            cutout: 50
          }
        })

        let Moist_chart = new Chart(Moist_line, {
          type: 'line',
          data: {
            labels: last_10_time,
            datasets: [{
              label: 'Moisture',
              data: last_10_moisture,
              tension: 0.6,
              //backgroundColor:'green',
              backgroundColor: [
                'rgba(54, 162, 235, 0.6)',

              ],
              borderWidth: 1,
              borderColor: '#777',
              hoverBorderWidth: 3,
              hoverBorderColor: '#000'
            }]
          },
          options: {
            circumference: 180,
            rotation: -90,
            cutout: 50
          }
        })

        let Temp_chart = new Chart(Temp_line, {
          type: 'line',
          data: {
            labels: last_10_time,
            datasets: [{
              label: 'Temperature',
              data: last_10_Temp,
              tension: 0.2,
              //backgroundColor:'green',
              backgroundColor: [
                'rgba(153, 102, 255, 0.6)',

              ],
              borderWidth: 1,
              borderColor: '#777',
              hoverBorderWidth: 3,
              hoverBorderColor: '#000'
            }]
          },
          options: {
            circumference: 180,
            rotation: -90,
            cutout: 50,
            scales: {
              xAxes: [{
                gridLines: {
                  display: false
                }
              }],
              yAxes: [{
                gridLines: {
                  display: false
                }
              }]
            }
          }
        })


      }
    });
  }