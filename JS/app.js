const url='https://api.rootnet.in/covid19-in/stats/latest';
var data;
var data_arr=new Array();
var state=new Array();
var confirmed=new Array();
var discharged=new Array();
var death=new Array();
var confirmed_foreign=new Array();
async function get_data(){
       const resp=await fetch(url);
       data=await resp.text();

       var p=data.split("\"loc\":")
       var c=0;
       for(var i=1;i<p.length;i++)
       {
          if(i!=p.length-1)
          data_arr[c]=p[i].substring(0,p[i].lastIndexOf("},"));
          else
          data_arr[c]=p[i].substring(0,p[1].length-6);
          c++;
       }
      storing_data();
}    
function storing_data(){
      var k=0;
  for (var i of data_arr) {
    var dat=i.split(",")
    dat[1]=dat[1].substring(1,dat[1].lastIndexOf("\""))+dat[1].substring(dat[1].lastIndexOf("\"")+1)
    dat[2]=dat[2].substring(1,dat[2].lastIndexOf("\""))+dat[2].substring(dat[2].lastIndexOf("\"")+1)
    dat[3]=dat[3].substring(1,dat[3].lastIndexOf("\""))+dat[3].substring(dat[3].lastIndexOf("\"")+1)
    dat[4]=dat[4].substring(1,dat[4].lastIndexOf("\""))+dat[4].substring(dat[4].lastIndexOf("\"")+1)
    state[k]=dat[0].substring(1,dat[0].length-1);
    confirmed[k]=dat[1].substring(dat[1].lastIndexOf(":")+1);
    discharged[k]=dat[2].substring(dat[2].lastIndexOf(":")+1);
    death[k]=dat[3].substring(dat[3].lastIndexOf(":")+1);
    confirmed_foreign[k]=dat[4].substring(dat[4].lastIndexOf(":")+1);
    k++;
  }
  create_Table();
}
function create_Table(){
  var perrow = 1
      html = "<table><tr>";
     html+="<td> State </td><td>Confirmed&ensp;</td><td>Discharged&ensp;</td><td>Deaths&ensp;&ensp;</td><td>Confirmed Foreigners</td> </tr>";
   for (var i=0; i<state.length; i++) {
    html += "<td>" + state[i] + "</td>";
    html += "<td>" + confirmed[i] + "</td>";    
    html += "<td>" + discharged[i] + "</td>";
    html += "<td>" + death[i] + "</td>";
    html += "<td>" + confirmed_foreign[i] + "</td>";

    var next = i+1;
    if (next%perrow==0 && next!=data.length) {
      html += "</tr><tr>";
    }
  }
  html += "</tr></table>";
  document.getElementById("container").innerHTML = html;
  chart();
}
function chart()
{
  var ctx = document.getElementById('myChart').getContext('2d');

  var chart = new Chart(ctx, {
    type: 'bar',

    data: {
        labels: state,
        datasets: [{
            label: 'Confirmed Cases',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: confirmed,
        }]
    },

    options: {}
}); 
var ctx = document.getElementById('myChart2').getContext('2d');

  var chart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: state,
        datasets: [{
            label: 'Deaths',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: death,
        }]
    },
    options: {}
}); 
}
get_data();
chart();