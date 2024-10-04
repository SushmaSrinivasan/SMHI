document.getElementById('location-form').addEventListener('submit', function (event) {
    event.preventDefault(); // prevents the page from refreshing when form is submitted

    const lat = document.getElementById('lat').value;
    const lon = document.getElementById('lon').value;

    fetchWeatherData(lat, lon); // fetches data based on user input
});

//Fetching forecast Data
async function fetchWeatherData(lat, lon) {
    const apiUrl = 'https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/16.158/lat/58.5812/data.json';
    const response = await fetch(apiUrl);
    const weatherData = await response.json();
    console.log(weatherData); // see fetched data

    renderChart(weatherData); //process the data and renders as chart
}

//Rendering the data as a line chart
function renderChart(data) {
    const chartDom = document.getElementById('weatherChart'); //html id where chart is rendered
    const myChart = echarts.init(chartDom); // initializes instance of echarts on selected DOM element

    const forecastTimes = data.list ? data.list.map(item => new Date(item.dt_txt).toLocaleString()):[]; //converts into readable date and time
    const temperatures = data.list ? data.list.map(item.main.temp):[]; // extracts the temperature for each item in data list

    console.log("Forecast Times:",forecastTimes);
    console.log("Temperatures:", temperatures);

    const option = {
        title: {   //sets the chart title
            text: ' Weather Forecast for Norrköping'
    },
        tooltip: { //enables mouse hovers over the chart
            trigger: 'axis'
        },
        xAxis: {
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon']
        },
        yAxis: {
            type: 'value', //numeric values
            axisLabel: {
                formatter: '{value} °C'
            }
        },
        series: [
            {
                name: 'Temperature',
                type: 'line',
                data: temperatures,
                markPoint: {
                    data: [
                        { type: 'max', name: 'Max' },
                        { type: 'min', name: 'Min' }
                    ]
                },
                markLine: {
                    data: [
                        { type: 'average', name: 'Avg' } // adds a line for average temperature
                    ]
                }
            }
        ]
};

option && myChart.setOption(option); // above option is applied to myChart instance


// // hardcoded data

/* const data = [10, 5, 16, 12, 3, 10, 14, 6];
        const option = {
            title: {
                text: 'Line Chart'
            },
            xAxis: {
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: data,
                    type: 'line'
                }
            ]
        }; */
}
