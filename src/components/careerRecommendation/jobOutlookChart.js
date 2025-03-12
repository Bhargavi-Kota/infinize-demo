'use client';
import {useEffect, useState} from 'react';
import jStat from 'jstat';
import {Box, Typography} from '@mui/material';

export default function SalaryChart() {
    const [chart, setChart] = useState(null);
    const meanSalary = 79440;
    const minSalary = 50440;
    const maxSalary = 137440;
    const stndDev = (maxSalary - minSalary) / 6;

    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (!window.google) {
                const script = document.createElement('script');
                script.src = 'https://www.gstatic.com/charts/loader.js';
                script.async = true;
                script.onload = () => {
                    window.google.charts.load('current', {
                        packages: ['corechart']
                    });
                    window.google.charts.setOnLoadCallback(drawChart);
                };
                document.body.appendChild(script);
            } else {
                window.google.charts.load('current', {packages: ['corechart']});
                window.google.charts.setOnLoadCallback(drawChart);
            }
        }
    }, []);

    function drawChart() {
        const data = new window.google.visualization.DataTable();
        data.addColumn('number', 'X Value');
        data.addColumn('number', 'Y Value');
        data.addColumn({type: 'string', role: 'style'});

        let chartData = [];
        for (let i = minSalary; i <= maxSalary; i += 1000) {
            chartData.push([
                i,
                jStat.normal.pdf(i, meanSalary, stndDev),
                'color: #1A80D1; opacity: 1; stroke-width: 2;'
            ]);
        }
        data.addRows(chartData);

        const options = {
            title: '',
            legend: 'none',
            hAxis: {
                title: '',
                format: 'currency', // Ensures numbers are formatted correctly
                ticks: [
                    {v: minSalary, f: `$${minSalary.toLocaleString()}`},
                    {v: meanSalary, f: `$${meanSalary.toLocaleString()}`},
                    {v: maxSalary, f: `$${maxSalary.toLocaleString()}`}
                ],
                gridlines: {color: 'transparent'},
                textStyle: {fontSize: 12} // Adjust font size if needed
            },
            vAxis: {
                title: '',
                textPosition: 'none',
                gridlines: {color: 'transparent'}
            },
            chartArea: {width: '80%', height: '70%'},
            colors: ['#1A80D1']
        };

        const chart = new window.google.visualization.AreaChart(
            document.getElementById('chart_div')
        );
        chart.draw(data, options);
        setChart(chart);
    }

    return (
        <Box>
            <Typography variant="h6">Salary:</Typography>
            <div id="chart_div" style={{width: '100%', height: '150px'}}></div>
        </Box>
    );
}
