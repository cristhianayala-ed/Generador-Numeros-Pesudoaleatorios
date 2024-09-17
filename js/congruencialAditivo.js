function generatePseudorandomNumbers() {
    const initialNumbers = document.getElementById('initialNumbers').value.split(',').map(num => parseInt(num.trim()));
    const modulo = parseInt(document.getElementById('modulo').value);
    const quantity = parseInt(document.getElementById('quantity').value);
    const result = document.getElementById('result');
    const download = document.getElementById('download');

    let resultHtml = '';
    let showError = false;

    if (initialNumbers.some(isNaN) || isNaN(modulo) || isNaN(quantity) || modulo <= 0 || quantity <= 0) {
        resultHtml = '<p style="color: #000;">Error: Por favor ingrese números válidos y asegúrese de que los valores del módulo y la cantidad de números a generar sean positivos.</p>';
        showError = true;
    }

    if (showError) {
        result.innerHTML = resultHtml;
        result.style.display = 'block';
        document.getElementById('download').style.display = 'none';
        return;
    }

    const pseudorandomNumbers = [];
    let csvContent = 'number\n';
    const listNumbers = [...initialNumbers];
    const n = initialNumbers.length;
    const divider = (modulo - 1);

    for (let i = 0; i < quantity; i++) {
        const x = (listNumbers[listNumbers.length - 1] + listNumbers[listNumbers.length - n]) % modulo;
        listNumbers.push(x);
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
    document.getElementById('initialNumbers').value = '';
    document.getElementById('modulo').value = '';
    document.getElementById('quantity').value = '';
    document.getElementById('result').style.display = 'none';
    document.getElementById('download').style.display = 'none';
}
