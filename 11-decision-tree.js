async function fit_predict() {
    const { DecisionTreeClassifier, LabelEncoder, accuracyScore } = await import('https://luisespino.github.io/mlearnjs/mlearn.mjs');

    // --- Data ---
    const csvData = `Anio,Total,Hombre,Mujer
2008,5.9,2.2,9.5
2009,6.3,2.3,10.1
2010,5.1,8.5,1.9
2011,4.1,6.6,1.7
2012,4.4,7.5,1.5
2013,5.0,8.3,1.8
2014,9.2,15.9,2.8
2015,10.4,17.7,3.2
2016,12.1,20.7,3.8
2017,8.7,14.7,3.0
2018,9.0,15.2,2.9
2019,10.6,17.6,3.6
2020,9.2,15.8,2.6
2021,12.6,22.1,3.1
2022,12.5,21.8,3.5`;

    // --- Parse CSV Data ---
    const lines = csvData.trim().split('\n');
    let header = lines[0].split(','); // Original header
    if (header[0].charCodeAt(0) === 0xFEFF) { // Remove BOM if present
        header[0] = header[0].substring(1);
    }

    let data = lines.slice(1).map(line => {
        const values = line.split(',');
        return {
            Anio: parseInt(values[0], 10),
            Total: parseFloat(values[1]),
            Hombre: parseFloat(values[2]),
            Mujer: parseFloat(values[3])
        };
    });

    // --- Create New Target Column: NivelTasa ---
    const umbralBajo = 7.0;
    const umbralMedio = 10.5; // Tasa >= umbralMedio serA 'Alto'

    data = data.map(row => {
        let nivel;
        if (row.Total < umbralBajo) {
            nivel = 'Bajo';
        } else if (row.Total < umbralMedio) {
            nivel = 'Medio';
        } else {
            nivel = 'Alto';
        }
        return { ...row, NivelTasa: nivel }; // Add the new column
    });

    // Add the new column name to the header for display
    const displayHeader = [...header, 'NivelTasa'];

    // Display data including the new column
    showTable(data, displayHeader); // Pass the extended header

    // --- Prepare Features (X) and Target Labels (y) ---
    const years_categorical = data.map(row => row.Anio.toString()); // Years as strings for encoding
    const hombre_numerical = data.map(row => row.Hombre);
    const mujer_numerical = data.map(row => row.Mujer);
    const labels_nivel_tasa = data.map(row => row.NivelTasa); // Target column

    // --- Encode Categorical Features and Target Labels ---
    const myLabelEncoder = await LabelEncoder();
    const encoderAnio = new myLabelEncoder(); // Encoder for the 'Anio' feature
    const encoderNivel = new myLabelEncoder(); // Encoder for the 'NivelTasa' target

    const years_encoded = encoderAnio.fitTransform(years_categorical);
    const labels_encoded = encoderNivel.fitTransform(labels_nivel_tasa); // Encoded target

    // Combine features: encoded 'Anio', numerical 'Hombre', numerical 'Mujer'
    const features = years_encoded.map((year_enc, i) => [
        year_enc,
        hombre_numerical[i],
        mujer_numerical[i]
    ]);

    // --- Train Decision Tree Model ---
    const myDecisionTree = await DecisionTreeClassifier();
    const model = new myDecisionTree();

    // Fit the model: features -> encoded target labels
    model.fit(features, labels_encoded);

    // --- Predict using the Model ---
    const labels_pred_encoded = model.predict(features); // Predicts encoded labels

    // --- Decode Predictions ---
    const labels_pred_actual = encoderNivel.inverseTransform(labels_pred_encoded); // Decode back to 'Bajo', 'Medio', 'Alto'

    // --- Evaluate Model ---
    const myAccuracyScore = await accuracyScore();
    const accuracy = myAccuracyScore(labels_encoded, labels_pred_encoded); // Compare encoded labels

    // --- Display Results ---
    const log = document.getElementById('log');
    log.innerHTML = '<br><h3>Prediccion de Nivel de Tasa de Fallecidos (Bajo/Medio/Alto)</h3>';
    log.innerHTML += '<p>Usando Anio, Tasa Hombres, Tasa Mujeres como caracteristicas.</p>';
    log.innerHTML += '<b>Caracteristicas (Anio codificado, Tasa Hombre, Tasa Mujer):</b><pre>' + JSON.stringify(features, null, 2) + '</pre>';
    log.innerHTML += '<b>Niveles Reales (Target):</b><pre>' + JSON.stringify(labels_nivel_tasa, null, 2) + '</pre>';
    log.innerHTML += '<b>Niveles Predichos:</b><pre>' + JSON.stringify(labels_pred_actual, null, 2) + '</pre>';
    log.innerHTML += '<br><b>Accuracy Score:</b> ' + accuracy.toFixed(4);
    log.innerHTML += '<br><br><strong>Arbol Descriptivo:</strong><br>';
    // Need feature names for printTree to be more readable
    const feature_names = ['Anio_encoded', 'Tasa_Hombre', 'Tasa_Mujer'];
    log.innerHTML += model.printTree(model.tree, feature_names, encoderNivel.classes); // Pass feature and class names

}

// Updated showTable to handle array of objects and specific headers dynamically
function showTable(data, headers) {
    let container = document.getElementById('table-container');
    container.innerHTML = ''; // Clear previous table if any

    // Create the table element
    let tableElement = document.createElement('table');

    // Create the table header
    let headerElement = tableElement.createTHead();
    let headerRow = headerElement.insertRow();
    headers.forEach(headerText => {
        let cell = headerRow.insertCell();
        cell.textContent = headerText.trim();
        cell.style.textAlign = 'center';
    });

    // Create the table body
    let body = tableElement.createTBody();
    data.forEach(rowData => {
        let row = body.insertRow();
        headers.forEach(header => { // Iterate through headers to ensure order
            let cell = row.insertCell();
            let cellValue = rowData[header.trim()]; // Get value by header name
            // Format numerical values (assuming they have decimals)
            if (typeof cellValue === 'number' && !Number.isInteger(cellValue)) {
                cell.textContent = cellValue.toFixed(1);
            } else {
                cell.textContent = cellValue;
            }
        });
    });

    // Append the table to the container
    container.appendChild(tableElement);
}

// Run the main function
fit_predict();
