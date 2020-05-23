function createGraph(chart_name, title, data, max_data){
console.log(data);
//chart data
var chartjson = {
  "title": title,
  "data": data,
  "xtitle": "Secured Marks",
  "ytitle": "Marks",
  "ymax": max_data,
  "ykey": 'score',
  "xkey": "name",
  "prefix": "%"

}
//chart colors
var colors = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen','fourteen'];
//constants
var TROW = 'tr',
  TDATA = 'td';
var chart = document.createElement('div');
//create the chart canvas
var barchart = document.createElement('table');
//create the title row
var titlerow = document.createElement(TROW);
//create the title data
var titledata = document.createElement(TDATA);
//make the colspan to number of records
titledata.setAttribute('colspan', chartjson.data.length+1);
titledata.setAttribute('class', 'charttitle');
titledata.innerText = chartjson.title;
titlerow.appendChild(titledata);
barchart.appendChild(titlerow);
chart.appendChild(barchart);
//create the bar row
var barrow = document.createElement(TROW);
//lets add data to the chart
for (var i = 0; i < chartjson.data.length; i++) {
  barrow.setAttribute('class', 'bars');
  var prefix = chartjson.prefix || '';
  //create the bar data
  var bardata = document.createElement(TDATA);
  var bar = document.createElement('div');
  bar.setAttribute('class', colors[i]);
  bar.style.height = (chartjson.data[i][chartjson.ykey]*40/max_data) + prefix;
  bardata.innerText = chartjson.data[i][chartjson.ykey];
  bardata.appendChild(bar);
  barrow.appendChild(bardata);
}
//create legends
var legendrow = document.createElement(TROW);
var legend = document.createElement(TDATA);
legend.setAttribute('class','legend');
legend.setAttribute('colspan', chartjson.data.length);
//add legend data
for (var i = 0; i < chartjson.data.length; i++) {
   var legbox = document.createElement('span');
   legbox.setAttribute('class','legbox');
   var barname = document.createElement('span');
   barname.setAttribute('class',colors[i] + ' xaxisname');
   var bartext = document.createElement('span');
   bartext.innerText = chartjson.data[i][chartjson.xkey];
   legbox.appendChild(barname);
   legbox.appendChild(bartext);
   legend.appendChild(legbox);
}
// Ajout des children 
barrow.appendChild(legend);
barchart.appendChild(barrow);
barchart.appendChild(legendrow);
chart.appendChild(barchart);
document.getElementById(chart_name).innerHTML = chart.outerHTML;   
}
// Changer la position de l'objet o en x,y 
  let change_position = function(o, x, y){
    o.style.top = y+"px";
    o.style.left = x+"px";
}
// Changer la dimension de l'objet 
let change_dimension = function(o,x,y,w,h){
    change_position(o,x,y);
    o.style.width = w+"px";
    o.style.height = h+"px";
}
// Convertir latitude et longitude en X, Y
let lat_lon_xy = function(lat, lon, size){
    let res = { x : lon, y : Math.log(Math.tan(Math.PI/4 + (lat / (180/Math.PI))/2))};
    res.x = size.x * (res.x + 180) / 360;
    res.y = size.y/2 - size.x * res.y / (2 * Math.PI);
    return res;
}
// Creation de la map 
let map_creation = function(lat, lon, radius, image){
    let position = lat_lon_xy(lat, lon, { x: image.width, y : image.height });
    let point = document.createElement("div");
    point.className = "map_point";
    change_dimension(point, position.x - radius/2, position.y - radius/2, radius, radius);
    point.style.lineHeight = point.style.height;
    return point;
}
