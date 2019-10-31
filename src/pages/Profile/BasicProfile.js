import React from 'react';
import router from 'umi/router';
import { Button } from 'antd';


class BasicProfile extends React.PureComponent {
  handleBtn = () => {
    router.push('/profile/basic/detail');
  }
  render() {
    return (
      <div>
        <Button onClick={this.handleBtn}>跳转详情</Button>
      </div>
    );
  }
}

export default BasicProfile;