document.addEventListener("DOMContentLoaded", function() {
    const points = [
        { x: 1, y: 2, color: 'red' },
        { x: -1, y: -1, color: 'blue' },
        { x: 0.5, y: -0.5, color: 'green' },
        { x: -1.5, y: 2.5, color: 'purple' }
    ];

    function mapComplex(z) {
        // Mapeo: f(z) = z^2
        return { x: z.x*z.x - z.y*z.y, y: 2*z.x*z.y };
    }

    // Generar los puntos mapeados
    const mappedPoints = points.map(p => ({
        x: mapComplex(p).x,
        y: mapComplex(p).y,
        color: p.color
    }));

    // Función para graficar
    function plotPoints(divId, data) {
        const traces = data.map(point => ({
            x: [point.x],
            y: [point.y],
            mode: 'markers',
            marker: {
                size: 12,
                color: point.color
            },
            type: 'scatter'
        }));

        Plotly.newPlot(divId, traces, {
            xaxis: { range: [-10, 10] },
            yaxis: { range: [-10, 10] },
            title: 'Graficar Puntos Complejos'
        });
    }

    // Graficar puntos originales y mapeados
    plotPoints('original-plot', points);
    plotPoints('mapped-plot', mappedPoints);
});
