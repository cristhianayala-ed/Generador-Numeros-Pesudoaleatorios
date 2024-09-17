function statisticalTest(pseudorandomNumbers) {
    const result = pseudorandomNumbers;
    const tresult = result.length;
    let report = '';
    const significanceLevel = 0.05;
    const halfCriticalValue = 1.96;

    // PRUEBA DE MEDIAS
    let sum = 0.0, mean, lowerLimitMean, upperLimitMean;
    for (let i = 0; i < tresult; i++) {
        sum += result[i];
    }
    mean = sum / tresult;
    lowerLimitMean = 0.5 - halfCriticalValue * (1 / Math.sqrt(12 * tresult));
    upperLimitMean = 0.5 + halfCriticalValue * (1 / Math.sqrt(12 * tresult));

    report += "\nTotal de Números Generados: " + tresult
        + "\n\nPRUEBA ESTADÍSTICA PARA NÚMEROS PSEUDOALEATORIOS";

    report += "\n\nPRUEBA DE MEDIAS"
        + "\nH0: media == 0.5"
        + "\nH1: media != 0.5"
        + "\nMedia: " + mean.toFixed(5)
        + "\nIntervalo de Confianza: [" + lowerLimitMean.toFixed(5) + ", " + upperLimitMean.toFixed(5) + "]"
        + "\nResultado: ";
    if (mean >= lowerLimitMean && mean <= upperLimitMean) {
        report += "\nSe acepta H0. Los resultados tienen un valor esperado de 0.5.";
    } else {
        report += "\nSe rechaza H0. Los resultados NO tienen una media de 0.5";
    }

    // PRUEBA DE VARIANZA
    let sumSquaredDifferences = 0.0, variance, lowerLimitVariance, upperLimitVariance;
    const degreesOfFreedom = tresult - 1;
    for (let i = 0; i < tresult; i++) {
        sumSquaredDifferences += Math.pow(result[i] - mean, 2);
    }
    variance = sumSquaredDifferences / degreesOfFreedom;

    const lowerChiSquared = jStat.chisquare.inv(significanceLevel / 2, degreesOfFreedom);
    const upperChiSquared = jStat.chisquare.inv(1 - (significanceLevel / 2), degreesOfFreedom);

    lowerLimitVariance = lowerChiSquared / (12 * degreesOfFreedom);
    upperLimitVariance = upperChiSquared / (12 * degreesOfFreedom);

    report += "\n\nPRUEBA DE VARIANZA "
        + "\nH0: varianza == 1/12"
        + "\nH1: varianza != 1/12"
        + "\nVarianza: " + variance.toFixed(5)
        + "\nIntervalo de Confianza: [" + lowerLimitVariance.toFixed(5) + ", " + upperLimitVariance.toFixed(5) + "]"
        + "\nResultado: ";

    if (variance >= lowerLimitVariance && variance <= upperLimitVariance) {
        report += "\nSe acepta H0. Los resultados tienen una varianza de 1/12.";
    } else {
        report += "\nSe rechaza H0. Los resultados NO tienen una varianza de 1/12.";
    }

    // PRUEBA DE UNIFORMIDAD
    const sortedResult = [...result].sort((a, b) => a - b);
    let D = 0.0;
    for (let i = 0; i < tresult; i++) {
        const dPlus = (i + 1.0) / tresult - sortedResult[i]; // theoreticalCDF
        const dMinus = sortedResult[i] - (i / tresult); // empiricalCDF
        D = Math.max(D, Math.max(dPlus, dMinus));
    }
    const criticalValueKS = 1.358 / (Math.sqrt(tresult) + 0.12 + (0.11 / Math.sqrt(tresult)));

    report += "\n\nPRUEBA DE UNIFORMIDAD (KOLMOGOROV-SMIRNOV)"
        + "\nH0: Los números siguen una distribución uniforme."
        + "\nH1: Los números NO siguen una distribución uniforme."
        + "\nEstadístico de Prueba: " + D.toFixed(3)
        + "\nValor crítico: " + criticalValueKS.toFixed(3)
        + "\n¿" + D.toFixed(3) + " < " + criticalValueKS.toFixed(3) + "?"
        + "\nResultado: ";

    if (D < criticalValueKS) {
        report += "\nSe acepta H0. Los números siguen una distribución uniforme.";
    } else {
        report += "\nSe rechaza H0. Los números NO siguen una distribución uniforme.";
    }

    // PRUEBA DE INDEPENDENCIA
    const sequence = [];
    let expectedValue, varianceOfRuns, statistic;
    let observedRuns = 1;

    for (let i = 1; i < tresult; i++) {
        if (result[i] > result[i - 1]) {
            sequence.push(1);
        } else {
            sequence.push(0);
        }
    }

    for (let i = 1; i < sequence.length; i++) {
        if (sequence[i] !== sequence[i - 1]) {
            observedRuns += 1;
        }
    }

    expectedValue = (2 * tresult - 1) / 3;
    varianceOfRuns = (16 * tresult - 29) / 90;
    statistic = Math.abs((observedRuns - expectedValue) / Math.sqrt(varianceOfRuns));

    report += "\n\nPRUEBA DE INDEPENDENCIA (CORRIDAS ARRIBA y ABAJO)"
        + "\nH0: Los números son independientes."
        + "\nH1: Los números NO son independientes."
        + "\nEstadístico de Prueba: " + statistic.toFixed(3)
        + "\nValor crítico: " + halfCriticalValue
        + "\n¿" + statistic.toFixed(3) + " < " + halfCriticalValue + "?"
        + "\nResultado: ";

    if (statistic < halfCriticalValue) {
        report += "\nSe acepta H0. Los números son independientes.";
    } else {
        report += "\nSe rechaza H0. Los números NO son independientes.";
    }

    return report;
}
