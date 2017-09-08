'use strict';

var svg = d3.select('svg');
var margin = {top: 20, right: 0, bottom: 20, left: 0};
var width = +svg.attr("width") - margin.left - margin.right;
var height = +svg.attr("height") - margin.top - margin.bottom;

var g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var x = d3.scaleLinear()
    .domain([1, 12])
    .range([25, 900]);

var y = d3.scaleLinear()
    .domain([0, 100])
    .range([height, 0]);

var xAxis = d3.axisBottom(x)
    .tickSize(465)  //各竖轴长度
    // .ticks(d3.timeMonth); //x轴坐标单位步长
    // .ticks(12);  //轴的个数
    .tickFormat(function(d) {
      // var s = formatNumber(d / 1e4);
      return this.parentNode.nextSibling ? `${d}` : `${d} Month`;
    });

var yAxis = d3.axisRight(y)
    .tickSize(900)  //各横轴长度
    .tickFormat(function(d) {
      // var s = formatNumber(d / 1e4);
      return this.parentNode.nextSibling
          ? '\xa0' + d
          : d + " Thousands Events";
    });

function customXAxis(g) {
  g.call(xAxis);
  g.select(".domain").remove();
  g.selectAll(".tick:not(:first-of-type) line").attr("stroke", "#777").attr("stroke-dasharray", "2,2");
}

function customYAxis(g) {
  g.call(yAxis);
  g.select(".domain").remove();
  g.selectAll(".tick:not(:first-of-type) line").attr("stroke", "#777").attr("stroke-dasharray", "2,2");
  g.selectAll(".tick text").attr("x", -1).attr("dy", -4);
}

g.append("g")
    // .attr("transform", "translate(0," + height + ")")
    .call(customXAxis);

g.append("g")
    .call(customYAxis);

var dataArray0 = [[0, 0],[1, 15],[2, 25],[3, 35],[4, 45],[5, 55],[6, 65],[7, 75],[8, 80],[9, 85],[10, 90],[11, 95],[12, 100]];

var color = d3.scaleOrdinal(d3.schemeCategory10);

for (let j=0; j < 6; j++) {

    let line = d3.line()
        .x(function(d) { return 25+(d[0]*73); })
        .y(function(d, i) { 
        if (i==0) { return height; }
        else { return height-((d[1] + j*10) * 3); }
    }).curve(d3.curveCardinal);

    g.append('path')
        .style('fill', 'none')
        .style('stroke', color(j))
        .style('stroke-width', '2px')
        .attr('d', function(d, i) { return line(dataArray0); });
}

var lengendArea = svg.append('g').attr('transform', 'translate(600,20)');

var lengendData = new Array();
for(let j=0; j < 6; j++) {
  lengendData[j] = `区域${j+1}`;
}

        //绑定数据，设置每个图例的位置
var legend = lengendArea.selectAll("g")
        .data(lengendData)
        .enter()
        .append("g")
        .attr("transform", function (d, i) {
            // return "translate(" + i * 120 + ",0)";
            return `translate(320, ${i * 30 + 10})`;
        });
//添加图例的矩形色块
legend.append("rect")
        .attr("width", 30)
        .attr("height", 2)
        .style("fill", function (d, i) {
            return color(i);
        });

//添加图例文字
legend.append("text")
        .attr("x", 35)
        .attr("y", 5)
        /*.style("fill", function (d, i) {
            return color(i)
        })*/
        // .attr("dy", ".35em")
        .text(function (d, i) {
            // return d.data.city + "[" + d.data.population + "]";
            return lengendData[i];
});




