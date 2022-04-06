import { Card, Form as AntdForm, Input, Select, DatePicker, Button, Row, Col, Space } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import moment from 'moment';
import styles from './index.less';
import { useState } from 'react';
type IOptions = {
  type: string;
  label: string;
  key: string;
  placeholder?: string;
  status?: Record<string, any>[];
};
const Form = ({
  options,
  query,
  initialValues,
}: {
  options: IOptions[];
  query: (values: any) => void;
  initialValues?: any;
}) => {
  const [form] = AntdForm.useForm();
  const [isOpen, setIsOpen] = useState(false);
  const spans = options.length;
  const removeEmptyField = (obj: any) => {
    var newObj = {};
    if (typeof obj == 'string') {
      obj = JSON.parse(obj);
    }
    if (obj instanceof Array) {
      newObj = [];
    }
    if (obj instanceof Object) {
      for (var attr in obj) {
        if (
          obj.hasOwnProperty(attr) &&
          obj[attr] !== '' &&
          obj[attr] !== null &&
          obj[attr] !== undefined
        ) {
          if (obj[attr] instanceof Object) {
            newObj[attr] = removeEmptyField(obj[attr]);
          } else if (
            typeof obj[attr] == 'string' &&
            ((obj[attr].indexOf('{') > -1 && obj[attr].indexOf('}') > -1) ||
              (obj[attr].indexOf('[') > -1 && obj[attr].indexOf(']') > -1))
          ) {
            try {
              var attrObj = JSON.parse(obj[attr]);
              if (attrObj instanceof Object) {
                newObj[attr] = removeEmptyField(attrObj);
              }
            } catch (e) {
              newObj[attr] = obj[attr];
            }
          } else {
            newObj[attr] = obj[attr];
          }
        }
      }
    }
    return newObj;
  };
  const submitFieldsAdaptor = (values: any) => {
    const result = Object.assign({}, values);
    Object.keys(result).forEach((key) => {
      if (
        values[key] instanceof Array &&
        values[key].every((item: unknown) => moment.isMoment(item))
      ) {
        const keys = key.split('$');
        keys.forEach((_key, _index) => {
          result[_key] = moment(values[key][_index]).format('YYYY-MM-DD');
        });
        delete result[key];
      }
      if (moment.isMoment(values[key])) {
        result[key] = moment(values[key]).format('YYYY-MM-DD');
      }
    });
    return removeEmptyField(result);
  };
  const handleSubmit = () => {
    query(submitFieldsAdaptor(form.getFieldsValue()));
  };
  const handleReset = () => {
    form.resetFields();
    handleSubmit();
  };
  return (
    <Card className={styles.formBox} hoverable>
      <AntdForm layout="inline" form={form} initialValues={initialValues} onFinish={handleSubmit}>
        <Row className={isOpen ? styles : styles.formRow}>
          {options.map((item) => {
            switch (item.type) {
              case 'input':
                return (
                  <Col
                    xs={{ span: 24 }}
                    md={{ span: 12 }}
                    xl={{ span: 6 }}
                    key={item.key}
                    className={styles.formRowCol}
                  >
                    <AntdForm.Item label={item.label} name={item.key} key={item.key}>
                      <Input placeholder={item.placeholder} />
                    </AntdForm.Item>
                  </Col>
                );
              case 'select':
                return (
                  <Col xs={{ span: 24 }} md={{ span: 12 }} xl={{ span: 6 }} key={item.key}>
                    <AntdForm.Item
                      label={item.label}
                      name={item.key}
                      key={item.key}
                      initialValue={null}
                    >
                      <Select>
                        {item.status?.map((state, index) => {
                          return (
                            <Select.Option value={state.value} key={index}>
                              {state.label}
                            </Select.Option>
                          );
                        })}
                      </Select>
                    </AntdForm.Item>
                  </Col>
                );
              case 'dateRange':
                return (
                  <Col xs={{ span: 24 }} md={{ span: 12 }} xl={{ span: 6 }} key={item.key}>
                    <AntdForm.Item label={item.label} name={item.key} key={item.key}>
                      <DatePicker.RangePicker />
                    </AntdForm.Item>
                  </Col>
                );
              default:
                return null;
            }
          })}
          <Col
            xs={{ span: 24 }}
            md={{
              span: 12,
              offset: spans < 2 ? 12 * (2 - spans) : isOpen ? (1 - (spans % 2)) * 12 : 0,
            }}
            xl={{
              span: 6,
              offset: spans < 3 ? 6 * (3 - spans) : isOpen ? (4 - (spans % 3)) * 6 : 0,
            }}
            className={styles.formCol}
          >
            <AntdForm.Item>
              <Space>
                <Button type="default" onClick={handleReset}>
                  重置
                </Button>
                <Button type="primary" htmlType="submit">
                  查询
                </Button>
                <Button
                  type="link"
                  onClick={() => {
                    setIsOpen(!isOpen);
                  }}
                >
                  {isOpen ? '收起' : '展开'}
                  {isOpen ? <UpOutlined /> : <DownOutlined />}
                </Button>
              </Space>
            </AntdForm.Item>
          </Col>
        </Row>
      </AntdForm>
    </Card>
  );
};

export default Form;
