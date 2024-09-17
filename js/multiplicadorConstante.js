function generatePseudorandomNumbers() {
    const seed = parseInt(document.getElementById('seed').value);
    const constant = parseInt(document.getElementById('constant').value);
    const iterations = parseInt(document.getElementById('iterations').value);
    const result = document.getElementById('result');
    const download = document.getElementById('download');

    let resultHtml = '';
    let showError = false;

    // Validate inputs
    if (isNaN(seed) || isNaN(constant) || isNaN(iterations) ||
        seed.toString().length < 4 || constant.toString().length < 4 ||
        seed.toString().length !== constant.toString().length) {
        resultHtml = '<p style="color: #000;">Error: Las semillas deben tener al menos 4 dígitos y ser de la misma longitud.</p>';
        showError = true;
    } else {
        const xInitialLength = seed.toString().length;
        let x = seed;
        const pseudorandomNumbers = [];
        let csvContent = 'number\n';

        for (let i = 0; i < iterations; i++) {
            let y = x * constant;
            let yString = y.toString();

            if ((yString.length % 2) !== (xInitialLength % 2)) {
                yString = '0' + yString;
            }

            const startIndex = (yString.length - xInitialLength) / 2;
            const r = yString.substring(startIndex, startIndex + xInitialLength);
            const number = parseFloat('0.' + r);
            pseudorandomNumbers.push(number);

            csvContent += `${number.toFixed(xInitialLength)}\n`;
            x = parseInt(r);

            if (x === 0) {
                break;
            }
        }

        // Statistical test
        resultHtml = statisticalTest(pseudorandomNumbers);
        resultHtml = resultHtml.replace(/\n/g, '<br>');

        // Download CSV
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        download.href = url;
        download.style.display = 'inline-block';
    }

    // Show results
    result.innerHTML = resultHtml;
    result.style.display = 'block';
}

function clearFields() {
    document.getElementById('seed').value = '';
    document.getElementById('constant').value = '';
    document.getElementById('iterations').value = '';
    document.getElementById('result').style.display = 'none';
    document.getElementById('download').style.display = 'none';
}
