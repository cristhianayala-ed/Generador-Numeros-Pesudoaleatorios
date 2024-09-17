function generatePseudorandomNumbers() {
    const seed = parseInt(document.getElementById('seed').value);
    const a = parseInt(document.getElementById('a').value);
    const m = parseInt(document.getElementById('m').value);
    const result = document.getElementById('result');
    const download = document.getElementById('download');

    let resultHtml = '';
    let showError = false;

    // Validate inputs
    if (isNaN(seed) || isNaN(a) || isNaN(m) || seed < 1) {
        resultHtml = '<p style="color: #000;">Error: La semilla debe ser mayor a 0 y los otros valores deben ser números enteros.</p>';
        showError = true;
    } else if (seed % 2 === 0) {
        resultHtml = '<p style="color: #000;">Error: La semilla debe ser un número impar.</p>';
        showError = true;
    } else if ((a - 5) % 8 !== 0) {
        resultHtml = '<p style="color: #000;">Error: La constante A debe ser de la forma A = 5 + 8k, siendo k un valor entero.</p>';
        showError = true;
    } else if (!isIntegerLog2(m)) {
        resultHtml = '<p style="color: #000;">Error: La constante M debe ser de la forma 2^G.</p>';
        showError = true;
    }

    if (showError) {
        result.innerHTML = resultHtml;
        result.style.display = 'block';
        document.getElementById('download').style.display = 'none';
        return;
    }

    let x = seed;
    let divider = (m - 1);
    const pseudorandomNumbers = [];
    let csvContent = 'number\n';

    for (let i = 0; i < m/4; i++) {
        x = (a * x) % m;
        const r = (x / divider);
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

function isIntegerLog2(m) {
    return m > 0 && (m & (m - 1)) === 0;
}

function clearFields() {
    document.getElementById('seed').value = '';
    document.getElementById('a').value = '';
    document.getElementById('m').value = '';
    document.getElementById('result').style.display = 'none';
    document.getElementById('download').style.display = 'none';
}