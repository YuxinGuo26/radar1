// 雷达图 5 个维度，最大值均为 5
const INDICATORS = [
    { name: 'Real-World', max: 5 },
    { name: 'Inquiry', max: 5 },
    { name: 'Scaffolding', max: 5 },
    { name: 'Assessment', max: 5 },
    { name: 'Collaboration', max: 5 }
];

// 初始化 ECharts
const chartDom = document.getElementById('chart');
const myChart = echarts.init(chartDom);

// 构建雷达图配置
function buildOption(values) {
    return {
        tooltip: {},
        legend: {
            bottom: 0,
            textStyle: { color: '#ffffff' }
        },
        radar: {
            indicator: INDICATORS,
            radius: '65%',
            splitNumber: 5,           // 刻度分为 5 段 => 1, 2, 3, 4, 5（无小数）
            axisName: {
                color: '#ffffff',
                fontSize: 14
            },
            axisLine: {
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.4)'
                }
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.25)'
                }
            },
            splitArea: {
                areaStyle: {
                    color: ['rgba(72, 156, 255, 0.15)', 'rgba(72, 156, 255, 0.05)']
                }
            }
        },
        series: [{
            type: 'radar',
            data: [{
                name: '综合评分',
                value: values,
                symbol: 'circle',
                symbolSize: 6,
                lineStyle: {
                    color: '#5a67f5',
                    width: 2
                },
                itemStyle: {
                    color: '#489cff'
                },
                // 半透明填充色
                areaStyle: {
                    color: 'rgba(90, 103, 245, 0.4)'
                }
            }]
        }]
    };
}

// 解析输入框数据：支持英文逗号、中文逗号、空格分隔，取前 5 个数字
function parseInput(raw) {
    return raw
        .split(/[,，\s]+/)
        .map(Number)
        .filter((n) => !isNaN(n))
        .slice(0, 5);
}

// 根据输入更新雷达图
function updateChart() {
    const raw = document.getElementById('data-input').value.trim();
    const values = parseInput(raw);

    if (values.length !== 5) {
        alert('请输入 5 个数字（用逗号分隔），例如：4,3,4,4,3');
        return;
    }

    myChart.setOption(buildOption(values), true);
}

// 监听按钮点击事件
document.getElementById('generate-btn').addEventListener('click', updateChart);

// 页面加载时根据默认值生成一次
updateChart();

// 窗口尺寸变化时自适应
window.addEventListener('resize', () => myChart.resize());
