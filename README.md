# Visualización de Regresión Lineal y Árboles de Decisión - Tendencias de Tasa de Natalidad en Guatemala

Este proyecto demuestra el uso de la regresión lineal y árboles de decisión para analizar y visualizar las tendencias de la tasa de natalidad en Guatemala utilizando JavaScript, Google Charts y la biblioteca MlearnJS.

## Características

- **Regresión Lineal**: Implementa un modelo de regresión lineal para ajustar y predecir datos de tasa de natalidad.
- **Árboles de Decisión**: Utiliza un modelo de árbol de decisión para clasificar los niveles de tasa de natalidad (Bajo, Medio, Alto).
- **Visualización de Datos**: Utiliza Google Charts para mostrar gráficos de dispersión, líneas de regresión y resultados de clasificación.
- **Análisis de Datos CSV**: Procesa datos históricos de tasa de natalidad directamente en JavaScript.
- **Cálculo de Métricas**: Calcula el Error Cuadrático Medio (MSE), el coeficiente de determinación (R²) y la precisión del modelo de árbol de decisión.
- **Predicciones Futuras**: Predice tendencias futuras de la tasa de natalidad basándose en los modelos.

## Archivos

- `natalidad_regression.html`: Archivo HTML para visualizar las tendencias de la tasa de natalidad en Guatemala utilizando regresión lineal.
- `natalidad_regression.js`: Lógica en JavaScript para analizar datos CSV, entrenar el modelo de regresión lineal y visualizar los resultados.
- `11-decision-tree.html`: Archivo HTML para visualizar la clasificación de niveles de tasa de natalidad utilizando árboles de decisión.
- `fallecimientos_transito_por_sexo_decision-tree.js`: Lógica en JavaScript para procesar datos, entrenar el modelo de árbol de decisión y mostrar los resultados.
- `11-decision-tree.css`: Estilos CSS para la visualización de los resultados del árbol de decisión.

## Requisitos

- Un navegador web moderno con JavaScript habilitado.
- Conexión a Internet para cargar bibliotecas externas (Google Charts y MlearnJS).

## Cómo Usar

1. Clona el repositorio o descarga los archivos.
2. Abre `natalidad_regression.html` o `11-decision-tree.html` en un navegador web.
3. Visualiza los resultados, incluyendo la línea de regresión, métricas, predicciones y clasificaciones.

## Bibliotecas Utilizadas

- [Google Charts](https://developers.google.com/chart)
- [MlearnJS](https://luisespino.github.io/mlearnjs/)

## Ejemplo de Salida

- **Gráfico de Dispersión**: Muestra los puntos de datos originales de la tasa de natalidad.
- **Línea de Regresión**: Muestra la tendencia predicha.
- **Clasificación**: Muestra los niveles de tasa de natalidad (Bajo, Medio, Alto) utilizando árboles de decisión.
- **Métricas**: Incluye valores de MSE, R² y precisión del modelo.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.
