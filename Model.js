AWS.config.update({
    "region": "us-east-2",
    "endpoint": "https://dynamodb.us-east-2.amazonaws.com",
    "accessKeyId": "AKIAZ7JJJKGEBF52EU66",
    "secretAccessKey": "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"
  });
  var docClient = new AWS.DynamoDB.DocumentClient();
 
  function Checktemperature(){
    
    var params = {
        TableName: "nodemcu2db"
      };
 
     docClient.scan(params,(err,data)=>{
         if(err){
            console.log(ads)
         }else{
            
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
          
            var sum = x => x.reduce((a, b) => a + b, 0); // summation function
     
            var Temperature = sum(z)
            var Average_Temp = Temperature / z.length
             
             var Celsius=(Average_Temp)/10
             console.log(Celsius)
             document.getElementById('ideal').innerHTML="Current Temperature :"+" "+ Celsius.toFixed(2)+"&#8451;"
            if(Celsius>24){
                 $('button').click(function(){
               $('#myModal').modal('show');
               });
            }

         }
  }) 
}
function CheckMoisture(){
    var params = {
        TableName: "nodemcu2db"
      };
 

      docClient.scan(params,(err,data)=>{
          if(err){
              alert("Error in connecting aws")
          }else{

            var z = []
            for (var i = 0; i < data.Items.length; i++) {
                z.push(parseInt(data.Items[i].Tmpr.Moisture))
            }

            var sum = x => x.reduce((a, b) => a + b, 0); // summation function

            var Total_moisture=sum(z)

            var Average_moisture=Total_moisture/z.length
            document.getElementById('Moist').innerHTML="Current Moisture:"+" "+ Average_moisture.toFixed(2)+"%"
            if(Average_moisture<24){
                $('button').click(function(){
                    $('#Sugarcane').modal('show');
                    });
            }







          }
      })
}