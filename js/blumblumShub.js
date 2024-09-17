function generatePseudorandomNumbers() {
    const seed = parseInt(document.getElementById('seed').value);
    const iterations = parseInt(document.getElementById('iterations').value);
    const result = document.getElementById('result');
    const download = document.getElementById('download');

    let resultHtml = '';
    let showError = false;

    // Validate inputs
    if (isNaN(seed) || isNaN(iterations) || seed < 1 || iterations <= 0) {
        resultHtml ='<p style="color: #000;">Error: Por favor ingrese valores válidos según las especificaciones indicadas.</p>';
        showError = true;
    }

    if (showError) {
        result.innerHTML = resultHtml;
        result.style.display = 'block';
        document.getElementById('download').style.display = 'none';
        return;
    }


    const pseudorandomNumbers = [];
    let x = seed;
    // El valor del modulo estara definido por dos numeros primos de la forma 4k + 3
    const p = 4003;
    const q = 1003;
    const m = p * q;
    let csvContent = 'number\n';
    const divider = (m - 1);

    for (let i = 0; i < iterations; i++) {
        x = (x * x) % m;
        const r = x / divider;
        pseudorandomNumbers.push(r);
        csvContent += `${r.toFixed(4)}\n`;
    }

    // Statistical test
    resultHtml = statisticalTest(pseudorandomNumbers);
    resultHtml = resultHtml.replace(/\n/g, '<br>');

    // Download CSV
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    download.href = url;
    download.style.display = 'inline-block';

    // Show results
    result.innerHTML = resultHtml;
    result.style.display = 'block';
}

function clearFields() {
    document.getElementById('seed').value = '';
    document.getElementById('iterations').value = '';
    document.getElementById('result').style.display = 'none';
    document.getElementById('download').style.display = 'none';
}

