import CornerDotsBox from '@/components/ui/corner-dots-box';
import { Box, ColoredBox, WidgetWrapper, T } from '@/components/stitches';
import { styled } from 'stitches.config';
import LoadThresMetrics from './load-thres-metrics';
import TableMetrics from './table-metrics';
import TableMetrics2 from './table-metrics-2';

const RuntimeMetricsContainer = () => {
  return (
    <>
      <WidgetWrapper>
        <ColoredBox color="cyan14" size="max" >
          <T color="cyan1" weight={2}>RUNTIME  </T>
          <T color="cyan1" weight={1}>METRICS</T>
        </ColoredBox>
        <Box css={{ h: 10 }} />
        <LoadThresMetrics />
        <Box css={{ h: 30 }} />
        <TableDataRow>
          <TableMetrics />
          <TableMetrics2 />
        </TableDataRow>
      </WidgetWrapper>
      <CornerDotsBox />
    </>
  );
};

const TableDataRow = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  gap: '30px',
  '@bp570': {
    gap: '10px',
  },
  '& > *': {
    flex: 1,
    // minWidth: '200px'
  }
});

export default RuntimeMetricsContainer;
