import React from 'react';
import { Row, Col, Card } from 'antd';
import styles from './AccountCenter.less';

class AccountCenter extends React.PureComponent {
  render() {
    return (
      <div>
        <Row gutter={24}>
          <Col span={7}>
            <div className={styles.left}>
              <Card bordered={false}> 
                <div className={styles.avatarHolder}>
                  <img src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png" alt=""/>
                  <div className={styles['center-name']}>Madelife</div>
                  <div>人生苦短，及时行乐</div>
                </div>
              </Card>
            </div>
          </Col>
          <Col span={17}>
            <div className={styles.right}>1</div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default AccountCenter;