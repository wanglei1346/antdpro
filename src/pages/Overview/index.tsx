import { useEffect, useRef } from 'react';
import { Card, Row, Col } from 'antd';
import * as echarts from 'echarts/core';
import {
  BarChart,
  // 系列类型的定义后缀都为 SeriesOption
  BarSeriesOption,
  LineChart,
  LineSeriesOption,
} from 'echarts/charts';
import {
  TitleComponent,
  // 组件类型的定义后缀都为 ComponentOption
  TitleComponentOption,
  TooltipComponent,
  TooltipComponentOption,
  GridComponent,
  GridComponentOption,
  // 数据集组件
  DatasetComponent,
  DatasetComponentOption,
  // 内置数据转换器组件 (filter, sort)
  TransformComponent,
} from 'echarts/components';
import { LabelLayout, UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import article from '../../assets/images/article.jpg';
import user from '../../assets/images/user.jpg';
import book from '../../assets/images/book.jpg';
import log from '../../assets/images/log.jpg';

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
type ECOption = echarts.ComposeOption<
  | BarSeriesOption
  | LineSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | DatasetComponentOption
>;

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  BarChart,
  LineChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
]);

const Overview = () => {
  // 定义文章趋势图ref
  const articleRef = useRef<HTMLDivElement>(null);
  let myChart: echarts.EChartsType | null = null;
  // 渲染文章趋势图
  const renderChart = () => {
    myChart = echarts.init(articleRef.current as HTMLDivElement);
    const chartInstance = myChart;
    const option: ECOption = {
      title: {
        text: '文章发布量趋势图',
      },
      xAxis: {
        data: [
          '2022-10-10 10:10:10',
          '2022-10-10 10:10:11',
          '2022-10-10 10:10:12',
          '2022-10-10 10:10:13',
          '2022-10-10 10:10:14',
          '2022-10-10 10:10:15',
        ],
      },
      yAxis: {},
      series: [
        {
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20],
        },
        {
          data: [5, 20, 36, 10, 10, 20],
          type: 'line',
        },
      ],
    };
    chartInstance.setOption(option);
  };

  useEffect(() => {
    renderChart();
    window.addEventListener('resize', () => {
      (myChart as echarts.EChartsType).resize();
    });
  }, []);

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 6 }}>
          {/* 文章总数 */}
          <Card
            bordered={false}
            hoverable
            cover={<img style={{ height: 200, objectFit: 'cover' }} alt="example" src={article} />}
          >
            <Card.Meta style={{ textAlign: 'center' }} title="文章总数" description="100篇" />
          </Card>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 6 }}>
          {/* 用户总数 */}
          <Card
            bordered={false}
            hoverable
            cover={<img style={{ height: 200, objectFit: 'cover' }} alt="example" src={user} />}
          >
            <Card.Meta style={{ textAlign: 'center' }} title="用户总数" description="100人" />
          </Card>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 6 }}>
          {/* 书籍总数 */}
          <Card
            bordered={false}
            hoverable
            cover={<img style={{ height: 200, objectFit: 'cover' }} alt="example" src={book} />}
          >
            <Card.Meta style={{ textAlign: 'center' }} title="书籍总数" description="100本" />
          </Card>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 6 }}>
          {/* 异常日志 */}
          <Card
            bordered={false}
            hoverable
            cover={<img style={{ height: 200, objectFit: 'cover' }} alt="example" src={log} />}
          >
            <Card.Meta style={{ textAlign: 'center' }} title="异常日志" description="100条" />
          </Card>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }}>
          {/* 文章趋势图 */}
          <Card bordered={false} hoverable>
            <div ref={articleRef} style={{ width: '100%', height: 400 }}></div>
          </Card>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }}>
          <Card bordered={false} hoverable id="log_chart">
            这是曲线图
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Overview;
