<!--
  - Created by BeoHoang (hoangdanan98@gmail.com)
  - Created at 6/10/19 3:27 PM
  -
  -->

<template>
    <mu-flex direction="column" align-items="stretch">
        <mu-flex justify-content="between" align-items="end">
            <h1>{{$lang.REPORT.TITLE}}</h1>

            <mu-button flat>
                <mu-icon value="cloud_download" left></mu-icon>
                {{$lang.REPORT.EXPORT}}
            </mu-button>
        </mu-flex>
        <mu-flex fill class="report"
                 direction="column" align-items="stretch"
                 style="overflow: auto">
            <GChart :resize-debounce="100"
                    :settings="chartSettings"
                    :options="chartOptions"
                    class="report-chart"
                    type="LineChart"
                    :data="data"></GChart>

            <GChart :resize-debounce="100"
                    :settings="chartSettings"
                    :options="chartOptions"
                    class="report-chart"
                    :createChart="(el, google) => new google.charts.Bar(el)"
                    :data="data"></GChart>

            <GChart :resize-debounce="100"
                    :settings="chartSettings"
                    :options="chartOptions"
                    class="report-chart"
                    type="PieChart"
                    :data="data"></GChart>
        </mu-flex>
    </mu-flex>
</template>

<script lang='ts'>
    import Vue from 'vue';
    import {GChart} from 'vue-google-charts';

    export default Vue.extend({
        name: 'Report',
        components: {
            GChart,
        },
        data() {
            return {
                data: [
                    ['Year', 'Sales', 'Expenses', 'Profit'],
                    ['2014', 1000, 400, 200],
                    ['2015', 1170, 460, 250],
                    ['2016', 660, 1120, 300],
                    ['2017', 1030, 540, 350]
                ],
                chartOptions: {
                    bars: 'horizontal',
                    pieHole: 0.3,
                    curveType: 'function',
                },
                chartSettings: {
                    packages: ['bar', 'corechart'],
                    language: 'vi',
                }
            };
        },
    });
</script>

<style lang='scss'>
    .report {
        padding: 10px;
        &-chart {
            width: 100%;
            min-height: 500px;
            box-shadow: 0 10px 20px -5px #0003;
            margin: 1em 0;
            padding: 2em;
            background-color: white;
        }
    }
</style>
