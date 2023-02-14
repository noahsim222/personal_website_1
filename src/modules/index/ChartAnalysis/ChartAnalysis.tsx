import { Text } from '@/components/stitches/Text';
import { useEffect, useRef } from 'react';
import { styled } from 'stitches.config';
import DottedTopBorderBox from '@/components/DottedTopBorderBox';
import ReactECharts from 'echarts-for-react';
import { type EChartsOption } from 'echarts';
import type EChartsReact from 'echarts-for-react';
import { useTheme } from '@/contexts/ThemeProvider/ThemeProvider';
import useWidth from '@/helpers/hooks/useWidth';
import { initialChartOption } from './ChartAnalysisHelper';
import useChartData from './useChartData';

const ChartAnalysis = () => {
  const { chartData } = useChartData({ dataLength: 100 });

  const chartRef = useRef<EChartsReact>(null);

  const { resolvedTheme } = useTheme();

  const width = useWidth();

  /** Resize chart on window resize. */
  useEffect(() => {
    if (!chartRef.current) return;

    const chartInstance = chartRef.current.getEchartsInstance();

    chartInstance.resize();
  }, [width]);

  /** Update chart colors on theme change. */
  useEffect(() => {
    if (!chartRef.current) return;

    const chartInstance = chartRef.current.getEchartsInstance();

    const isLight: boolean = resolvedTheme === 'light';

    const newOption: EChartsOption = {
      series: [
        {
          color: isLight
            ? ['rgba(0, 0, 0, .6)']
            : ['rgba(153, 250, 255, .8)'],
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: isLight
                ? [{
                    offset: 0, color: 'rgba(0, 0, 0, .2)' // color at 0%
                  }, {
                    offset: 1, color: 'rgba(0, 0, 0, .01)' // color at 100%
                  }]
                : [{
                    offset: 0, color: 'rgba(153, 250, 255, .08)' // color at 0%
                  }, {
                    offset: 1, color: 'rgba(153, 250, 255, .01)' // color at 100%
                  }],
            },
            origin: 'start',
            opacity: 0.62
          },
        },
      ],
      tooltip: {
        show: true,
        trigger: 'axis',
        backgroundColor: isLight ? '#f7f7f7' : '#181923',
        borderRadius: 0,
      },
    };

    chartInstance.setOption(newOption);
  }, [resolvedTheme]);

  /** Update chart data upon chartData state change. */
  useEffect(() => {
    if (!chartRef.current) return;

    if (chartData?.length) {
      const chartInstance = chartRef.current.getEchartsInstance();
      const newOption: EChartsOption = {
        series: [
          {
            data: chartData,
          },
        ]
      };

      chartInstance.setOption(newOption);
    }
  }, [chartData]);

  return (
    <Wrapper>
      <DottedTopBorderBox>
        <Background>
          <TextWrapper>
            <TextRowWrapper>
              <TextGroupWrapper>
                <Text size={3} color="gray8" padding="tiny">ID 255212</Text>
                <Text size={3} color="gray8" padding="tiny">DATA SET: POLARIS </Text>
              </TextGroupWrapper>
              <TextGroupWrapper align="right">
                <Text size={3} color="gray8" padding="tiny">SOCKET_CONN_OK</Text>
              </TextGroupWrapper>
            </TextRowWrapper>
            <TextRowWrapper>
              <TextGroupWrapper>
                <Text size={3} color="gray8" padding="tiny">SAMPLE HEALTH: OK</Text>
                <Text
                  background="cyan1"
                  size={3}
                  color="gray1"
                  padding="tiny"
                >
                  CURRENT STREAM: {chartData?.slice(-1)[0].value.join(': ')}
                </Text>
              </TextGroupWrapper>
              <TextGroupWrapper align="right">
                <Text size={3} color="gray8" padding="tiny">APACHE ECHARTS</Text>
                <Text size={3} color="gray8" padding="tiny">V. 5.4.1 </Text>
              </TextGroupWrapper>
            </TextRowWrapper>
          </TextWrapper>
          <ChartWrapper>
            <ReactECharts
              ref={chartRef}
              option={initialChartOption}
              style={{ height: '300px' }}
              lazyUpdate={true}
              onChartReady={() => null}
            />
          </ChartWrapper>
          <DottedTopBorderBox />
        </Background>
      </DottedTopBorderBox>
    </Wrapper>
  );
};

const Wrapper = styled('div', {
  minWidth: 'calc($sizes$tileSize * 16)'
});

const Background = styled('div', {
  background: '$cyan14',
});

const ChartWrapper = styled('div', {
});

const TextWrapper = styled('div', {
  position: 'absolute',
  top: 0,
  bottom: 0,
  right: 0,
  left: 0,
  padding: '8px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
});

const TextRowWrapper = styled('div', {
  display: 'flex',
  justifyContent: 'space-between'
});

const TextGroupWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '3px',
  zIndex: 1,
  variants: {
    align: {
      right: {
        alignItems: 'flex-end'
      }
    }
  }
});

export default ChartAnalysis;
