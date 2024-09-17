function generatePseudorandomNumbers() {
    const seed = parseInt(document.getElementById('seed').value);
    const a = parseInt(document.getElementById('a').value);
    const c = parseInt(document.getElementById('c').value);
    const m = parseInt(document.getElementById('m').value);
    const result = document.getElementById('result');
    const download = document.getElementById('download');

    let resultHtml = '';
    let showError = false;

    // Validate inputs
    if (isNaN(seed) || isNaN(a) || isNaN(c) || isNaN(m) || seed <= 0 || a <= 0 || c <= 0 || m <= 0) {
        resultHtml = '<p style="color: #000;">Error: Todos los campos deben contener números enteros positivos.</p>';
        showError = true;
    } else if ((a - 1) % 4 !== 0) {
        resultHtml = '<p style="color: #000;">Error: La constante A debe ser de la forma A = 1 + 4k, siendo k un valor entero.</p>';
        showError = true;
    } else if (!isIntegerLog2(m)) {
        resultHtml = '<p style="color: #000;">Error: La constante M debe ser de la forma 2^G.</p>';
        showError = true;
    } else if (calcularMCD(c, m) !== 1) {
        resultHtml = '<p style="color: #000;">Error: Las constantes C y M deben ser relativamente primos.</p>';
        showError = true;
    }

    if (showError) {
        result.innerHTML = resultHtml;
        result.style.display = 'block';
        document.getElementById('download').style.display = 'none';
        return;
    }

    let x = seed;
    const divider = (m - 1);
    const pseudorandomNumbers = [];
    let csvContent = 'number\n';

    for (let i = 0; i < m; i++) {
        x = ((a * x) + c) % m;
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

function calcularMCD(a, b) {
    while (b != 0) {
        const temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

function isIntegerLog2(m) {
    return m > 0 && (m & (m - 1)) === 0;
}

function clearFields() {
    document.getElementById('seed').value = '';
    document.getElementById('a').value = '';
    document.getElementById('c').value = '';
    document.getElementById('m').value = '';
    document.getElementById('result').style.display = 'none';
    document.getElementById('download').style.display = 'none';
}