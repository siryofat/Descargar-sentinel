

# Análisis de NDVI con Sentinel-2 en Google Earth Engine

Este repositorio contiene un script de Google Earth Engine (GEE) que permite descargar imágenes de Sentinel-2, calcular el Índice de Vegetación de Diferencia Normalizada (NDVI) y visualizar estos resultados en herramientas como QGIS o ArcGIS.

## Descripción

El script realiza las siguientes acciones:

### Descargar imágenes de Sentinel-2:

Selecciona imágenes del satélite Sentinel-2 para un área de interés, utilizando filtros como la fecha y el porcentaje de nubes.

### Cálculo de NDVI:

Calcula el NDVI utilizando las bandas del infrarrojo cercano (B8) y el rojo (B4) para monitorear la salud de la vegetación.

### Visualización:

Visualiza el NDVI en Google Earth Engine y exporta las imágenes para su uso en aplicaciones SIG como QGIS o ArcGIS.

### Gráficos:

Genera gráficos de la evolución temporal del NDVI para un área seleccionada.


## Requisitos

1. Cuenta de Google Earth Engine (GEE): Es necesario tener acceso a Google Earth Engine para ejecutar el código.
2. QGIS o ArcGIS: **Opcional**, para la visualización y análisis de los resultados exportados.

## Instrucciones de Uso

### Configurar Google Earth Engine:

Asegúrate de tener una cuenta de Google Earth Engine. Si no tienes una, puedes solicitar acceso aquí.

### Ejecutar el código:

Copia el script contenido en este repositorio.
Pega el código en el Editor de Código de Google Earth Engine.
Asegúrate de definir el área de interés (polígono o table en el código).
Ejecuta el script y ajusta los parámetros como las fechas o el porcentaje de nubes según sea necesario.

### Exportar los resultados:

Una vez que hayas calculado el NDVI, puedes exportar las imágenes a Google Drive utilizando el comando de exportación.
Descarga las imágenes desde Google Drive y visualízalas en QGIS o ArcGIS para análisis más avanzados.

### Visualizar el gráfico de NDVI:

El script también genera un gráfico con la evolución del NDVI a lo largo del tiempo, lo que te permite hacer un seguimiento de la vegetación de tu área de estudio.
