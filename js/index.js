var count = 2000;
var features = new Array(count);
for (var i = 0; i < count; ++i) {
    var Beijing =  [116.23, 39.54];
    var x = Beijing[0]+(4*Math.random()-4);
    var y = Beijing[1]+(4*Math.random()-4);
    features[i] = new ol.Feature(new ol.geom.Point([x, y]));
}

var source = new ol.source.Vector({
    features: features
});

var clusterSource = new ol.source.Cluster({
    distance: 40,//两事件进行聚合的距离
    source: source
});

var styleCache = {};
var clusters = new ol.layer.Vector({
    source: clusterSource,
    style: function(feature) {
        var size = feature.get('features').length;
        var style = styleCache[size];
        var radius;
        if(size > 0 && size<=99){
            radius = 10;
        } else if(size > 99 && size <= 999) {
            radius = 15;
        } else if(size > 999 && size <= 9999) {
            radius = 20;
        } else if(size > 9999 && size <= 99999) {
            radius = 25;
        }
        if (!style) {
            style = new ol.style.Style({
                image: new ol.style.Circle({
                    radius: radius,
                    fill: new ol.style.Fill({
                        color: 'red'
                    })
                }),
                text: new ol.style.Text({
                    text: size.toString(),
                    fill: new ol.style.Fill({
                        color: '#fff'
                    })
                })
            });
            styleCache[size] = style;
        }
        return style;
    }
});

var raster = new ol.layer.Tile({
    // source: new ol.source.OSM()
    source: new ol.source.XYZ({
        url:'http://www.google.cn/maps/vt/pb=!1m4!1m3!1i{z}!2i{x}!3i{y}!2m3!1e0!2sm!3i345013117!3m8!2szh-CN!3scn!5e1105!12m4!1e68!2m2!1sset!2sRoadmap!4e0'
    })
});


var center = [
    ol.proj.transform([116.23, 39.54], 'EPSG:4326', 'EPSG:3857'),
    [116.23, 39.54],
    [167.95, 4.56]
]

var map = new ol.Map({
    target: 'map',
    layers: [raster, clusters],
    view: new ol.View({
        center: center[2],
        projection: 'EPSG:4326',
        zoom: 2.5,
        minZoom: 2.5,
        maxZoom: 18
    }),
    controls: ol.control.defaults({
        attribution: false
    }).extend([
        new ol.control.FullScreen(),
        new ol.control.ZoomSlider(),
        new ol.control.ScaleLine()
    ]),
    logo: false
});