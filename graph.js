/* var myCanvas = document.getElementById("myCanvas");
myCanvas.width = 300;
myCanvas.height = 300;
   
var ctx = myCanvas.getContext("2d");
 
function drawLine(ctx, startX, startY, endX, endY,color){
    ctx.save();
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(startX,startY);
    ctx.lineTo(endX,endY);
    ctx.stroke();
    ctx.restore();
}
 
function drawBar(ctx, upperLeftCornerX, upperLeftCornerY, width, height,color){
    ctx.save();
    ctx.fillStyle=color;
    ctx.fillRect(upperLeftCornerX,upperLeftCornerY,width,height);
    ctx.restore();
}
 
var myVinyls = {
    "Classical music": 10,
    "Alternative rock": 14,
    "Pop": 2,
    "Jazz": 12
};
 
var Barchart = function(options){
    this.options = options;
    this.canvas = options.canvas;
    this.ctx = this.canvas.getContext("2d");
    this.colors = options.colors;
  
    this.draw = function(){
        var maxValue = 0;
        for (var categ in this.options.data){
            maxValue = Math.max(maxValue,this.options.data[categ]);
        }
        var canvasActualHeight = this.canvas.height - this.options.padding * 2;
        var canvasActualWidth = this.canvas.width - this.options.padding * 2;
 
        //drawing the grid lines
        var gridValue = 0;
        while (gridValue <= maxValue){
            var gridY = canvasActualHeight * (1 - gridValue/maxValue) + this.options.padding;
            drawLine(
                this.ctx,
                0,
                gridY,
                this.canvas.width,
                gridY,
                this.options.gridColor
            );
             
            //writing grid markers
            this.ctx.save();
            this.ctx.fillStyle = this.options.gridColor;
            this.ctx.textBaseline="bottom"; 
            this.ctx.font = "bold 10px Arial";
            this.ctx.fillText(gridValue, 10,gridY - 2);
            this.ctx.restore();
 
            gridValue+=this.options.gridScale;
        }      
  
        //drawing the bars
        var barIndex = 0;
        var numberOfBars = Object.keys(this.options.data).length;
        var barSize = (canvasActualWidth)/numberOfBars;
 
        for (categ in this.options.data){
            var val = this.options.data[categ];
            var barHeight = Math.round( canvasActualHeight * val/maxValue) ;
            drawBar(
                this.ctx,
                this.options.padding + barIndex * barSize,
                this.canvas.height - barHeight - this.options.padding,
                barSize,
                barHeight,
                this.colors[barIndex%this.colors.length]
            );
 
            barIndex++;
        }
 
        //drawing series name
        this.ctx.save();
        this.ctx.textBaseline="bottom";
        this.ctx.textAlign="center";
        this.ctx.fillStyle = "#000000";
        this.ctx.font = "bold 14px Arial";
        this.ctx.fillText(this.options.seriesName, this.canvas.width/2,this.canvas.height);
        this.ctx.restore();  
         
        //draw legend
        barIndex = 0;
        var legend = document.querySelector("legend[for='myCanvas']");
        var ul = document.createElement("ul");
        legend.append(ul);
        for (categ in this.options.data){
            var li = document.createElement("li");
            li.style.listStyle = "none";
            li.style.borderLeft = "20px solid "+this.colors[barIndex%this.colors.length];
            li.style.padding = "5px";
            li.textContent = categ;
            ul.append(li);
            barIndex++;
        }
    }
}
var myBarchart = new Barchart(
    {
        canvas:myCanvas,
        seriesName:"Vinyl records",
        padding:20,
        gridScale:5,
        gridColor:"#eeeeee",
        data:myVinyls,
        colors:["#a55ca5","#67b6c7", "#bccd7a","#eb9743"]
    }
); */
//myBarchart.draw();
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
barrow.appendChild(legend);
barchart.appendChild(barrow);
barchart.appendChild(legendrow);
chart.appendChild(barchart);
document.getElementById(chart_name).innerHTML = chart.outerHTML;

    
}

  let set_pos = function(o, x, y){
    o.style.top = y+"px";
    o.style.left = x+"px";
}

let set_dim = function(o,x,y,w,h){
    set_pos(o,x,y);
    o.style.width = w+"px";
    o.style.height = h+"px";
}

let get_ticks_step = function(max_value, max_ticks_count){
    let ticks_step = max_value / max_ticks_count;
    let normed_tick = ticks_step;
    let mult = 1;
    while(normed_tick > 5){
        normed_tick /= 10;
        mult *= 10;
    }
    //use multiples of 1
    if(normed_tick <= 1){
        ticks_step = 1 * mult;
    }
    //use multiples of 2
    else if(normed_tick <= 2){
        ticks_step = 2 * mult;
    }
    //use multiples of 3
    else{
        ticks_step = 5 * mult;
    }

    return ticks_step;
}


let lat_lon_to_xy = function(lat, lon, img_size){
    let deg_to_rad = function(deg){
        return deg / (180/Math.PI);
    }

    let ret = { x : lon, y : Math.log(Math.tan(Math.PI/4 + deg_to_rad(lat)/2))};
    ret.x = img_size.x * (ret.x + 180) / 360;
    ret.y = img_size.y/2 - img_size.x * ret.y / (2 * Math.PI);

    //console.log(lon + ", " + lat + " : " + ret.x + ", " + ret.y);

    return ret;
}

let create_map_point = function(lat, lon, radius, map_img){
    let pos = lat_lon_to_xy(lat, lon, { x: map_img.width, y : map_img.height });
    let pt = document.createElement("div");
    pt.className = "map_point";
    set_dim(pt, pos.x - radius/2, pos.y - radius/2, radius, radius);
    pt.style.lineHeight = pt.style.height;
    return pt;
}

let map_div = document.getElementById("map_container");
let map = document.getElementById("map");
console.log('h');
/* window.addEventListener("load", function() {
    let map_size = { x : map.width, y : map.height };
    console.log("image size : " + map_size.x + ", " + map_size.y);
    let paris = { lat : 48.8534, lon : 2.333333 };
    let dz = { lat : 29.926168, lon : 3.744182 };
    let isl = { lat : 63.942097, lon : -18.580037 };
    let pt = create_map_point(isl.lat, isl.lon, 30, map);
    pt.innerHTML = "15";
    map_div.appendChild(pt);

    pt = create_map_point(paris.lat, paris.lon, 20, map);
    pt.innerHTML = "12";
    map_div.appendChild(pt);

    pt = create_map_point(dz.lat, dz.lon, 40, map);
    pt.innerHTML = "20";
    map_div.appendChild(pt);
    console.log(map_div);
}); */