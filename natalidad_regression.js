async function fit_predict_draw() {
    const log = document.getElementById('log');
    log.innerHTML = "Importando librerías y procesando datos...";

    try {
        // --- START OF CSV DATA ---
        // Added your CSV data directly here
        const csvData = `Año,República,Guatemala,El Progreso,Sacatepéquez,Chimaltenango,Escuintla,Santa Rosa,Sololá,Totonicapán,Quetzaltenango,Suchitepéquez,Retalhuleu,San Marcos,Huehuetenango,Quiché,Baja Verapaz,Alta Verapaz,Petén,Izabal,Zacapa,Chiquimula,Jalapa,Jutiapa
2022,19.9,14.7,18.1,15.1,19.3,18.1,17.3,20.1,24.0,19.2,20.0,18.7,21.1,24.0,26.2,21.5,24.3,21.8,20.1,19.9,22.9,22.0,18.3
2021,20.2,14.4,17.5,14.7,19.0,17.7,16.8,20.3,24.6,19.7,20.0,18.4,22.1,25.4,27.1,22.4,24.6,22.7,20.4,19.9,23.2,21.7,18.4
2020,20.2,15.6,18.5,15.6,19.2,17.8,17.5,20.1,24.3,20.0,20.0,19.1,22.4,24.7,26.4,22.2,23.8,21.8,20.3,18.7,22.0,21.5,18.2
2019,22.1,17.2,19.4,16.5,21.1,19.8,18.4,21.8,26.1,22.1,22.2,21.2,23.8,27.5,28.1,24.3,26.6,24.6,21.6,20.6,23.3,23.1,19.2
2018,23.4,18.9,20.6,17.4,22.0,21.2,19.2,22.5,27.5,23.1,23.1,22.9,25.9,29.0,29.5,25.4,27.3,25.9,23.7,22.3,24.9,24.5,19.8
2017,23.7,19.6,21.1,17.9,22.8,21.4,20.0,22.9,27.4,23.7,23.2,22.9,26.9,29.2,28.5,25.5,27.2,25.3,23.2,22.7,24.8,24.0,20.4
2016,24.7,20.1,21.6,18.5,24.4,21.8,21.7,23.6,28.7,24.7,23.2,23.3,28.9,30.2,29.9,26.9,28.1,26.9,23.5,21.2,27.3,25.4,21.6
2015,25.1,20.5,21.9,20.5,24.1,22.9,21.5,24.3,27.6,25.2,24.3,24.8,28.4,31.4,30.4,26.6,29.0,26.7,25.1,24.1,26.7,25.9,21.8
2014,25.2,20.6,23.1,20.0,24.1,23.5,22.6,23.6,27.5,25.2,24.8,24.6,28.5,31.4,30.4,27.0,28.3,27.8,25.0,23.8,26.6,26.8,22.0
2013,25.7,20.6,23.1,20.5,24.7,23.2,23.8,24.1,28.0,25.3,25.2,24.6,28.8,32.1,31.4,27.4,29.9,28.6,26.1,24.7,27.5,27.6,23.6
2012,26.3,20.5,22.5,20.9,25.5,23.7,24.4,24.0,28.3,26.7,25.9,25.1,29.4,33.5,32.2,28.1,31.4,29.0,25.7,25.0,29.3,27.4,23.8
2011,25.7,20.0,23.0,21.0,25.2,23.1,23.3,23.6,27.5,25.6,25.6,24.6,29.2,32.7,31.4,28.0,30.7,27.8,26.1,24.8,27.8,27.1,23.2
2010,25.4,19.3,21.4,21.0,25.3,21.4,21.7,23.7,27.2,24.9,24.4,23.5,29.3,33.2,31.2,28.0,31.6,28.1,25.8,23.7,27.4,26.3,23.0
2009,25.1,19.3,24.9,22.1,25.0,21.7,24.5,23.2,25.5,24.8,26.0,25.1,28.4,30.2,30.2,28.0,31.5,23.2,22.8,26.1,28.7,27.4,25.7
2008,27.0,21.2,25.3,22.8,27.4,23.4,26.2,26.2,27.7,25.0,29.2,27.0,30.1,31.8,33.4,29.8,35.3,25.0,24.5,26.6,29.8,30.2,26.2
2007,27.4,21.2,25.4,23.9,27.7,23.9,26.4,28.3,28.0,24.9,33.3,27.1,30.9,33.2,33.3,29.7,33.2,25.6,27.0,26.3,31.5,31.1,26.4
2006,28.3,22.3,26.5,24.6,28.0,25.0,27.0,28.7,29.6,25.9,35.0,28.8,33.2,33.1,34.5,31.4,32.6,26.5,27.0,27.1,31.5,30.1,28.4
2005,29.5,22.8,25.1,25.5,30.0,26.5,28.3,30.4,30.2,28.7,35.8,28.8,34.7,34.3,36.0,32.0,33.5,27.3,29.2,27.2,33.6,32.3,30.3`;
        // --- END OF CSV DATA ---

        // 1. Import MlearnJS Library
        // Using the dynamic import as in your example
        const { LinearRegression } = await import('https://luisespino.github.io/mlearnjs/mlearn.mjs');
        log.innerHTML = "Librería MlearnJS importada. Procesando CSV...";

        // 2. Parse the CSV Data
        const lines = csvData.trim().split('\n');
        const headers = lines[0].split(',').map(h => h.trim());
        const dataRows = lines.slice(1);

        const yearIndex = headers.indexOf('Año');
        const republicaIndex = headers.indexOf('República');

        if (yearIndex === -1 || republicaIndex === -1) {
            throw new Error("Las columnas 'Año' o 'República' no se encontraron en el CSV.");
        }

        const parsedData = dataRows.map(line => {
            const values = line.split(',');
            const year = parseFloat(values[yearIndex]);
            const rate = parseFloat(values[republicaIndex]);
            // Return null if data is invalid, filter out later
            return (!isNaN(year) && !isNaN(rate)) ? { year, rate } : null;
        }).filter(item => item !== null); // Remove any rows with invalid numbers

        // Sort data chronologically (oldest year first) for correct time series analysis/plotting
        parsedData.sort((a, b) => a.year - b.year);

        // Prepare data for MlearnJS (using flat arrays as in the example)
        const X = parsedData.map(item => item.year); // Array of years [2005, 2006, ...]
        const y = parsedData.map(item => item.rate); // Array of rates [29.5, 28.3, ...]

        if (X.length === 0 || y.length === 0) {
            throw new Error("No se encontraron datos válidos para procesar después del parseo.");
        }
        log.innerHTML = `Datos parseados. ${X.length} registros encontrados. Entrenando modelo...`;


        // 3. Create and Train the Linear Regression Model
        const myLinearRegression = await LinearRegression(); // Instantiate the class constructor
        const model = new myLinearRegression(); // Create an instance
        model.fit(X, y);
        log.innerHTML = "Modelo entrenado. Realizando predicciones...";

        // 4. Make Predictions for the existing data points (to draw the regression line)
        const yPredict = model.predict(X);

        // 5. Calculate Metrics
        const mse = model.mse(y, yPredict);
        const r2 = model.r2(y, yPredict);
        // Attempt to get coefficients (might be named differently, e.g., weights_, coef_, intercept_)
        const slope = model.weights_ ? model.weights_[0] : model.coef_ ? model.coef_[0] : 'N/A';
        const intercept = model.intercept_ !== undefined ? model.intercept_ : 'N/A';


        // 6. Predict Future Years
        const futureYears = [2023, 2024, 2025, 2030];
        const futurePredictions = model.predict(futureYears);

        // 7. Display Results in the Log Div
        let resultsText = `<b>Resultados de la Regresión Lineal:</b><br>`;
        resultsText += `Años (X): [${X.slice(0, 5).join(', ')}...]<br>`;
        resultsText += `Tasas Reales (y): [${y.slice(0, 5).map(n => n.toFixed(1)).join(', ')}...]<br>`;
        resultsText += `Tasas Predichas (regresión): [${yPredict.slice(0, 5).map(n => n.toFixed(1)).join(', ')}...]<br><br>`;
        resultsText += `<b>Métricas del Modelo:</b><br>`;
        resultsText += `Error Cuadrático Medio (MSE): ${mse.toFixed(4)}<br>`;
        resultsText += `Coeficiente de Determinación (R²): ${r2.toFixed(4)}<br>`;
        if (slope !== 'N/A' && intercept !== 'N/A') {
            resultsText += `Ecuación: Tasa ≈ ${slope.toFixed(4)} * Año + ${intercept.toFixed(4)}<br>`;
        } else {
            resultsText += `Ecuación: Coeficientes no disponibles directamente del modelo.<br>`;
        }
        resultsText += `<br><b>Predicciones Futuras:</b><br>`;
        futureYears.forEach((year, index) => {
            resultsText += `  Año ${year}: Tasa predicha ≈ ${futurePredictions[index].toFixed(2)}<br>`;
        });
        log.innerHTML = resultsText;


        // 8. Prepare Data for Google Charts
        // Google Charts' arrayToDataTable needs an array of arrays,
        // with the first row being the headers.
        const chartData = [['Año', 'Tasa Real', 'Tasa Predicha (Línea de Regresión)']];
        for (let i = 0; i < X.length; i++) {
            chartData.push([X[i], y[i], yPredict[i]]);
        }

        // 9. Draw the Chart using Google Charts
        google.charts.load('current', {'packages':['corechart']});
        google.charts.setOnLoadCallback(drawChart);

        function drawChart() {
            var data = google.visualization.arrayToDataTable(chartData);

            var options = {
                title: 'Tasa Bruta de Natalidad (República) vs Año',
                hAxis: {title: 'Año'},
                vAxis: {title: 'Tasa de Natalidad (por 1000 hab.)'},
                legend: { position: 'bottom' },
                // Use ComboChart: scatter for real data, line for regression prediction
                seriesType: 'scatter', // Default type
                series: {
                    0: { type: 'scatter', pointSize: 5, color: '#4285F4' }, // Tasa Real
                    1: { type: 'line', lineWidth: 2, color: '#DB4437', pointSize: 0 }  // Tasa Predicha (Regresión)
                },
                tooltip: { isHtml: true } // Optional: Allows HTML in tooltips if needed
            };

            var chart = new google.visualization.ComboChart(document.getElementById('chart_div'));
            chart.draw(data, options);
            log.innerHTML += "<br>Gráfico generado."; // Update log after chart is drawn
        }

    } catch (error) {
        console.error("Error en fit_predict_draw:", error);
        log.innerHTML = `<b>Error:</b> ${error.message}. <br>Revisa la consola del navegador para más detalles.`;
    }
}

// Run the main function
fit_predict_draw();
