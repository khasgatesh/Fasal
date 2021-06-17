<script>
    AWS.config.update({
      "region": "us-east-2",
      "endpoint": "http://dynamodb.us-east-2.amazonaws.com",
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

          document.getElementsByClassName('count')[0].innerHTML = data.Count;
          var Data = data


          var container = document.getElementById('table')

          var x = []
          var y = []
          var z = []

          for (var i = 0; i < data.Items.length; i++) {
            // console.log(parseInt(data.Items[i].Tmpr.Humidity))
            //console.log(parseInt(data.Items[i].Tmpr.Moisture))
            x.push(parseInt(data.Items[i].Tmpr.Humidity))
            y.push(parseInt(data.Items[i].Tmpr.Moisture))
            z.push(parseInt(data.Items[i].Tmpr.Temperature))

            //  var div=document.createElement("div");
            //  var br=document.createElement("br")
            //  div.innerHTML=JSON.stringify(data.Items[i],2)
            // container.appendChild(br)
            // container.appendChild(div)
          }
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

           var High_temperature=Math.max(...z)
           var High_humidity=Math.max(...x)
           var high_moist=Math.max(...y)

          // let myChart = document.getElementById('myChart').getContext('2d');
          // let piechart = document.getElementById('linechart').getContext('2d')
          // let polararea = document.getElementById('polararea').getContext('2d')
          

          // let massPopChart = new Chart(myChart, {
          //   type: 'doughnut', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
          //   data: {
          //     labels: ['Humidity', 'Moisture', 'Temperature'],
          //     datasets: [{
          //       label: 'Soil Contents',
          //       data: [
          //         Average, Average_Moist, Average_Temp
          //       ],
          //       //backgroundColor:'green',
          //       backgroundColor: [
          //         'rgba(255, 99, 132, 0.6)',
          //         'rgba(54, 162, 235, 0.6)',
          //         'rgba(255, 206, 86, 0.6)',
          //         'rgba(75, 192, 192, 0.6)',
          //         'rgba(153, 102, 255, 0.6)',
          //         'rgba(255, 159, 64, 0.6)',
          //         'rgba(255, 99, 132, 0.6)'
          //       ],
          //       borderWidth: 1,
          //       borderColor: '#777',
          //       hoverBorderWidth: 3,
          //       hoverBorderColor: '#000'
          //     }]
          //   },
          //   options: {
          //     title: {
          //       display: true,
          //       text: 'Largest Cities In Massachusetts',
          //       fontSize: 25
          //     },
          //     legend: {
          //       display: true,
          //       position: 'right',
          //       labels: {
          //         fontColor: '#000'
          //       }
          //     },
          //     layout: {
          //       padding: {
          //         left: 50,
          //         right: 0,
          //         bottom: 0,
          //         top: 0
          //       }
          //     },
          //     tooltips: {
          //       enabled: true
          //     }
          //   }
          // });
          // let piecharts = new Chart(piechart, {
          //   type: 'pie', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
          //   data: {
          //     labels: ['Humidity', 'Moisture', 'Temperature'],
          //     datasets: [{
          //       label: 'Soil Contents',
          //       data: [
          //         Average, Average_Moist, Average_Temp
          //       ],
          //       //backgroundColor:'green',
          //       backgroundColor: [
          //         'rgba(255, 99, 132, 0.6)',
          //         'rgba(54, 162, 235, 0.6)',
          //         'rgba(255, 206, 86, 0.6)',
          //         'rgba(75, 192, 192, 0.6)',
          //         'rgba(153, 102, 255, 0.6)',
          //         'rgba(255, 159, 64, 0.6)',
          //         'rgba(255, 99, 132, 0.6)'
          //       ],
          //       borderWidth: 1,
          //       borderColor: '#777',
          //       hoverBorderWidth: 3,
          //       hoverBorderColor: '#000'
          //     }]
          //   },
          //   options: {
          //     title: {
          //       display: true,
          //       text: 'Largest Cities In Massachusetts',
          //       fontSize: 25,
          //       responsive: true
          //     },
          //     legend: {
          //       display: true,
          //       position: 'right',
          //       labels: {
          //         fontColor: '#000'
          //       }
          //     },
          //     layout: {
          //       padding: {
          //         left: 50,
          //         right: 0,
          //         bottom: 0,
          //         top: 0
          //       }
          //     },
          //     tooltips: {
          //       enabled: true
          //     }
          //   }
          // });

          // let polars = new Chart(polararea, {
          //   type: 'polarArea', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
          //   data: {
          //     labels: ['Humidity', 'Moisture', 'Temperature'],
          //     datasets: [{
          //       label: 'Soil Contents',

          //       data: [Average, Average_Moist, Average_Temp],
          //       fill: true,
          //       borderColor: 'rgb(75, 192, 192)',
          //       tension: 0.1,
          //       //backgroundColor:'green',
          //       backgroundColor: [
          //         'rgba(255, 99, 132, 0.6)',
          //         'rgba(54, 162, 235, 0.6)',
          //         'rgba(255, 206, 86, 0.6)',
          //         'rgba(75, 192, 192, 0.6)',
          //         'rgba(153, 102, 255, 0.6)',
          //         'rgba(255, 159, 64, 0.6)',
          //         'rgba(255, 99, 132, 0.6)'
          //       ],
          //       borderWidth: 1,
          //       borderColor: '#777',
          //       hoverBorderWidth: 3,
          //       hoverBorderColor: '#000'
          //     }]
          //   },
          //   options: {
          //     title: {
          //       display: true,
          //       text: 'Largest Cities In Massachusetts',
          //       fontSize: 25
          //     },
          //     legend: {
          //       display: true,
          //       position: 'right',
          //       labels: {
          //         fontColor: '#000'
          //       }
          //     },
          //     layout: {
          //       padding: {
          //         left: 50,
          //         right: 0,
          //         bottom: 0,
          //         top: 0
          //       }
          //     },
          //     tooltips: {
          //       enabled: true
          //     }
          //   }
          // });
             var H_guage=document.getElementById('hum').getContext('2d')
             var M_guage=document.getElementById('moist').getContext('2d')
             var T_guage=document.getElementById('temp').getContext('2d')

            
          let hum_guage=new Chart(H_guage,{
            type:'doughnut',
            data:{
              labels: ['Average','Max'],
              datasets: [{
                label: 'Soil Contents',
                data: [
                  Average,High_humidity
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
            options:{
              circumference: 180,
              rotation:-90,
              cutout:150
            }
          })
          let moist_guage=new Chart(M_guage,{
            type:'doughnut',
            data:{
              labels: ['Avarage','Max'],
              datasets: [{
                label: 'Soil Contents',
                data: [
                  Average_Moist,high_moist
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
            options:{
              circumference: 180,
              rotation:-90,
              cutout:150
            }
          })
          let temp_guage=new Chart(T_guage,{
            type:'doughnut',
            data:{
              labels: ['Average','Max'],
              datasets: [{
                label: 'Soil Contents',
                data: [
                  Average_Temp,High_temperature
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
            options:{
              circumference: 180,
              rotation:-90,
              cutout:150
            }
          })
        
        }
      });
    }
  </script>
