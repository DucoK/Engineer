var map = new ol.Map({
    target: 'map',
    view: new ol.View({
      center: ol.proj.fromLonLat([5.136048266683881, 52.09365866746383]),
      zoom: 8
    })
  });

  let OSMLayer = new ol.layer.Tile({
    source: new ol.source.OSM(),
    type: 'basemap',
    name: 'openStreetMap',
    visible: true,
    title: 'openStreetMap'
  });


  var ESRIsatteliet = new ol.layer.Tile({
    source: new ol.source.XYZ({
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        attributions: ['Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community']
    }),
    name: 'ESRI Satelliet',
    type: 'basemap',
    visible: false,
    title: 'ESRISatellite'
});

const baseLayerGroup = new ol.layer.Group({
    layers: [
      OSMLayer, ESRIsatteliet
    ]
  })
  map.addLayer(baseLayerGroup);

  
  var knooppuntenUrl = 'http://localhost:8080/geoserver/Engineer_GMD/wms';

  
  var knooppunten = new ol.layer.Image({
      source: new ol.source.ImageWMS({
        url: knooppuntenUrl,
        params: {'layers': 'Engineer_GMD:knooppuntennieuw'},
        serverType: 'geoserver',
        minZoom: 14,
      }),
      visible: false,
      title: 'knooppunten'
    });
  
    // var lvroutes = new ol.layer.Vector({
    //   source: new ol.source.VectorTile({
    //     url: lvroutesUrl,
    //     params: {'LAYERS': 'Engineer_GMD:lfroutes'},
    //     serverType: 'geoserver',
    //     minZoom: 14,
    //   }),
    //   visible: false,
    //   title: 'lvroutes'
    // });

//     const vectorSource = new ol.source.Source({
//         format: new ol.format.GeoJSON(),
//         url: lvroutesUrl
//     });

//     const lvroutes = new ol.layer.VectorLayer({
//         source: vectorSource,
//         style: new ol.layer.Style({
//             stroke: new ol.layer.Stroke({
//               color: 'rgba(0, 0, 255, 1.0)',
//               width: 2,
//             }),
//         }),
//         visible: true,
//         title: 'lvroutes'
//         });

// map.addLayer(lvroutes);

// var lvroutesUrl = 'C:\Users\Duco\Desktop\Jaar 4 - blok 1\Nieuwe map\Python\map.geojson'

// const lvroutes = new ol.layer.Vector({
//     source: new ol.source.Vector({
//         url: lvroutesUrl,
//         format: new ol.format.GeoJSON()
//     }),
//     visible: true,
//     title: 'lvroutes'
// })
// map.addLayer(lvroutes)


// let postData = {
//   'url': 'https://gmd.has.nl/geoserver/proefstudeerdag/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=proefstudeerdag:pandendb&maxFeatures=10000&outputFormat=application%2Fjson'
// };

// $.ajax({
//   url: 'php/geoproxycurl.php',
//   dataType: 'json',
//   method: 'post',
//   data: postData
// }).done(function(data) {
//   hasSource.addFeatures(new ol.format.GeoJSON().readFeatures(data, {
//       dataProjection: 'EPSG:4326',
//       featureProjection: 'EPSG:3857'
//   }));
// });

// let lvroutesUrl = {
//   'url': 'http://localhost:8080/geoserver/Engineer_GMD/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Engineer_GMD:lfroutes&maxFeatures=50&outputFormat=application%2Fjson'
// };


// $.ajax({
//   url: 'php/geoproxycurl.php',
//   dataType: 'json',
//   method: 'post',
//   data: lvroutesUrl
// }).done(function(data) {
//   hasSource.addFeatures(new ol.format.GeoJSON().readFeatures(data, {
//       dataProjection: 'EPSG:28992',
//       featureProjection: 'EPSG:28992'
//   }));
// });

// const lvRoutes = new ol.source.Vector();
// new 

// const lvroutes = new ol.layer.Vector({
//     source: new ol.source.Vector({
//         url: lvroutesUrl,
//         format: new ol.format.GeoJSON()
//     }),
//     visible: true,
//     title: 'lvroutes'
// })
// map.addLayer(lvroutes)

    // var grenzen = new ol.


// map.on('click', function(e){
//     map.forEachFeatureAtPixel(e.pixel, function(feature, layer){
//         console.log(feature);
//     })
// });

// var geojson = new ol.layer.Vector({
//   title: 'added Layer',
//   source: new ol.source.Vector({
//      url: 'map.geojson',
//      format: new ol.format.GeoJSON()
//   })
// })

// map.addLayer(geojson);


// var lvroutesUrl = 'http://localhost:8080/geoserver/Engineer_GMD/ows'



// var lvroutes = new ol.layer.Vector({
//   title: 'routes',
//   visible: true,
//   source: new ol.source.Vector({
//      url: 'routes.geojson',
//      format: new ol.format.GeoJSON()
//   }),

// })
// map.addLayer(lvroutes);

var postData = 'http://localhost:8080/geoserver/Engineer_GMD/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Engineer_GMD:lfroutes&maxFeatures=10000&outputFormat=application%2Fjson'

$.ajax({
  url: 'geoproxycurl.php',
  dataType: 'json',
  method: 'post',
  data: postData
}).done(function(data){
  pandenVectorSrouce.addFeatures(new ol.format.GeoJSON().readFeature(data, {
    dataProjection: 'EPSG:4326',
    featureProjection: 'EPSG:3857'
  }))
});



map.on('click', function(e){
  map.forEachFaetureAtPixel(e.pixel, function(feature,layer){
    console.log(feature);
  })
});


const overlayLayerGroup = new ol.layer.Group({
    layers: [
        knooppunten
    ]
  })
  map.addLayer(overlayLayerGroup);




//Layer Switcher Logic Basemap Layers
const baseLayerElements = document.querySelectorAll('.layerSwitcherContainer > input[type=radio]')
for(let baseLayerElement of baseLayerElements){
    baseLayerElement.addEventListener('change', function(){
        let baseLayerElementValue = this.value;
        baseLayerGroup.getLayers().forEach(function(element, index, array){
            let baseLayerTitle = element.get('title');
            element.setVisible(baseLayerTitle === baseLayerElementValue);
        })
    })
}

// Layer Switcher Logic Overlay Layers
const overlayLayerElements = document.querySelectorAll('.layerSwitcherContainer > input[type=checkbox]');
console.log(overlayLayerElements);
for (let overlayLayerElement of overlayLayerElements){
  overlayLayerElement.addEventListener('change', function(){
    let overlayLayerElementValue = this.value;
    let overlayLayer;
    
    overlayLayerGroup.getLayers().forEach(function(element, index, array){
      console.log(element.get('title'));
      if(overlayLayerElementValue === element.get('title')){
        overlayLayer = element;
        // console.log(overlayLayer)
      }
    })
    this.checked ? overlayLayer.setVisible(true) : overlayLayer.setVisible(false);
  })
}

