function generatePseudorandomNumbers() {
    const seed1 = parseInt(document.getElementById('seed1').value);
    const seed2 = parseInt(document.getElementById('seed2').value);
    const iterations = parseInt(document.getElementById('iterations').value);
    const result = document.getElementById('result');
    const download = document.getElementById('download');

    let resultHtml = '';
    let showError = false;

    // Validate inputs
    if (
        isNaN(seed1) || isNaN(seed2) || isNaN(iterations) ||
        seed1.toString().length < 4 || seed2.toString().length < 4 ||
        seed1.toString().length !== seed2.toString().length
    ) {
        resultHtml = '<p style="color: #000;">Error: Las semillas deben tener al menos 4 dígitos y ser de la misma longitud.</p>';
        showError = true;
    } else {
        const xInitialLength = seed1.toString().length;
        let x1 = seed1;
        let x2 = seed2;
        const pseudorandomNumbers = [];
        let csvContent = 'number\n';

        for (let i = 0; i < iterations; i++) {
            let y = x1 * x2;
            let yString = y.toString();

            if ((yString.length % 2) !== (xInitialLength % 2)) {
                yString = '0' + yString;
            }

            const startIndex = (yString.length - xInitialLength) / 2;
            const r = yString.substring(startIndex, startIndex + xInitialLength);
            const number = parseFloat('0.' + r);
            pseudorandomNumbers.push(number);

            csvContent += `${number.toFixed(xInitialLength)}\n`;
            x1 = x2;
            x2 = parseInt(r);

            if (x2 === 0) {
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
    document.getElementById('seed1').value = '';
    document.getElementById('seed2').value = '';
    document.getElementById('iterations').value = '';
    document.getElementById('result').style.display = 'none';
    document.getElementById('download').style.display = 'none';
}
