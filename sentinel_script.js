Map.setOptions('HYBRID');

// Encierra el polígono del lote dentro de la variable table
var table = ee.FeatureCollection(geometry);

//Centra el mapa a la unicación de su lote. El nombre de la variable puede ser "table" u otro nombre 
Map.centerObject(geometry); 

// Crear colección de imágenes de S2 para el período 2016-2023.
//Cambiar "table" por el nombre de la variable que corresponda al poligono de su lote
var S2 = ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED")
              .select('B.*') //selecciono todas las bandas que tengan B.
              .filterBounds(geometry) //Esta función filra las imágenes que interceptan el punto del área de estudio. 
              .filterDate('2023-02-20','2023-03-09') //Modifica rango de tiempo 
              .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',0.2)) //Filtro según porcentaje de nubes.
              .sort('CLOUDY_PIXEL_PERCENTAGE')//ordenamos desde la imagen con el porcentaje más bajo hasta la más alta
Map.addLayer(table.draw({color:'black'}), {}, 'Lotes');
Map.centerObject(geometry,14);


// Función para calcular y agregar una banda NDVI
var addNDVI = function(image) {
return image.addBands(image.normalizedDifference(['B8', 'B4']));
};


// Agregar banda NDVI a la colección de imágenes
var S2 = S2.map(addNDVI);


// Extrae la banda NDVI y crea una imagen compuesta mediana de NDVI

var NDVI = S2.select(['nd']);
var NDVImed = NDVI.median();
// Crea paletas para mostrar NDVI
var ndvi_pal = ['FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163',
'99B718', '74A901',
'66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
'012E01', '011D01', '011301'];

//Generar gráfico
var chart = ui.Chart.image.seriesByRegion({
      imageCollection:S2,
      regions:geometry,
      reducer:ee.Reducer.mean(),
      band:'nd',
      scale: 20,
      xProperty:'system:time_start',
      seriesProperty:'label'
      })
      .setChartType('LineChart') // 'ScatterChart', 'LineChart', and 'ColumnChart'
      .setOptions({
            title: 'NDVI en el tiempo para lote seleccionado',
            vAxis: {title: 'NDVI'},
            lineWidth: 1,
            pointSize: 5,
            series: {
                  0: {pointShape: 'circle',color: 'blue'},
            }});
print(chart)

//Visualizamos NDVI medio
var ndviParams = {min: -1, max: 1, palette:['FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901', '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01', '012E01', '011D01', '011301']}
Map.addLayer(NDVImed.clip(geometry), ndviParams, 'NDVI medio');
print(ndviParams);

//Visualizamos la imagen del último pico de NDVI
//Busco el id de la imagen del 26-03-23
print(S2);
var img_feb23 =
ee.Image('COPERNICUS/S2_SR_HARMONIZED/20230223T140709_20230223T141449_T20JLL'); //en la consola buscar el nombre de la imagen que quiera descargar
print(img_feb23);

//Creo un vector que incluya todo el establecimiento (geometry2)
//Creo variable de visualización y cargo la capa
var viz = {bands:["B4","B3","B2"], min:0, max:255};
Map.addLayer(img_feb23.clip(geometry), viz, 'Imagen Febrero 2023');

// Exportar los datos a Google Drive
Export.image.toDrive({
image: img_feb23.select('B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8'),
description: 'S2_febrero_23',
scale: 10,
region: geometry});
