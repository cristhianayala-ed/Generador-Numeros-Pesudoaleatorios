function generatePseudorandomNumbers() {
    const seed = parseInt(document.getElementById('seed').value);
    const m = parseInt(document.getElementById('m').value);
    const a = parseInt(document.getElementById('a').value);
    const b = parseInt(document.getElementById('b').value);
    const c = parseInt(document.getElementById('c').value);
    const result = document.getElementById('result');
    const download = document.getElementById('download');

    let resultHtml = '';
    let showError = false;

    // Validate inputs
    if (isNaN(seed) || isNaN(m) || isNaN(a) || isNaN(b) || isNaN(c) ||
        seed < 1 || !isIntegerLog2(m) || a % 2 !== 0 || c % 2 === 0) { /* (b - 1) % 4 !== 1 || */
        resultHtml = '<p style="color: #000;">Error: Verifique que todos los campos estén correctamente llenos y cumplan con las restricciones específicas.</p>';
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
    let csvContent = 'number\n';
    const divider = (m - 1);

    for (let i = 0; i < m; i++) {
        x = (a * Math.pow(x, 2) + (b * x) + c) % m;
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

function isIntegerLog2(m) {
    if (m <= 0) return false;
    const minusOne = m - 1;
    const bitwiseAnd = m & minusOne;
    return bitwiseAnd === 0;
}

function clearFields() {
    document.getElementById('seed').value = '';
    document.getElementById('m').value = '';
    document.getElementById('a').value = '';
    document.getElementById('b').value = '';
    document.getElementById('c').value = '';
    document.getElementById('result').style.display = 'none';
    document.getElementById('download').style.display = 'none';
}