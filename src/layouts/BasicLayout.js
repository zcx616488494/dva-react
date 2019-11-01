import React from 'react';
import { Layout, Icon, Tooltip, Dropdown, Menu } from 'antd';
import { connect } from 'dva';
import router from 'umi/router';
import SiderMenu from '@/components/SiderMenu';
import { getFlatMenuKeys } from '@/components/SiderMenu/SiderMenuUtils';
import memoizeOne from 'memoize-one';
import isEqual from 'lodash/isEqual';
import styles from './BasicLayout.less';

const { Header, Content } = Layout;

function getMenuItem(route) {
  if (route.name) {
    const menuItem = {
      name: route.name,
      path: route.path,
      icon: route.icon,
      hideInMenu: route.hideInMenu ? route.hideInMenu : false
    };
    if (Array.isArray(route.routes) && route.routes.length > 0 && !route.hideChildrenInMenu) {
      const children = [];
      route.routes.forEach((item) => {
        const child = getMenuItem(item);
        if (child) {
          children.push(child);
        }
      });
      if (children.length > 0) {
        menuItem.children = children;
      }
    }
    return menuItem;
  }
  return null;
}

function getMenu(routes) {
  const menu = [];
  routes.forEach((route) => {
    const menuItem = getMenuItem(route);
    if (menuItem) {
      menu.push(menuItem);
    }
  });
  return menu;
}

const memoizeOneGetMenu = memoizeOne(getMenu, isEqual);

@connect()

class BasicLayout extends React.PureComponent {
  handleMenuClick = ({ key }) => {
    // const { dispatch } = this.props;
    if (key === 'userCenter') {
      router.push('/account/center');
      return;
    }
    if (key === 'userinfo') {
      router.push('/account/settings');
      return;
    }
  };
  render() {
    const { route: { routes }, children } = this.props;
    const menuData = memoizeOneGetMenu(routes);
    const flatMenuKeys = getFlatMenuKeys(menuData);
    const menu = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={this.handleMenuClick}>
        <Menu.Item key="userCenter">
          <Icon type="user" />
          <span>个人中心</span>
        </Menu.Item>
        <Menu.Item key="userinfo">
          <Icon type="setting" />
          <span>个人设置</span>
        </Menu.Item>
        <Menu.Item key="triggerError">
          <Icon type="close-circle" />
          <span>触发报错</span>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout">
          <Icon type="logout" />
          <span>退出登录</span>
        </Menu.Item>
      </Menu>
    );
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <SiderMenu
          onCollapse="0"
          menuData={menuData}
          flatMenuKeys={flatMenuKeys}
          {...this.props}
        />
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <div className={styles['header-right']}>
              <span className={styles.search}>
                <Icon type="search" />
              </span>
              <Tooltip title="使用文档">
                <span className={styles.question}>
                  <Icon type="question-circle" />
                </span>
              </Tooltip>
              <span className={styles.bell}>
                <Icon type="bell" />
              </span>
              <Dropdown overlay={menu}>
                <span className={styles.user}>
                  <img src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png" alt="" />
                  <span>Madelife</span>
                </span>
              </Dropdown>
              <span className={styles.bell}>
                <Icon type="global" />
              </span>
            </div>
          </Header>
          <Content style={{ margin: '24px' }}>
            <div style={{ minHeight: 'calc(100vh - 112px)', overflow: 'hidden' }}>
              {children}
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default BasicLayout;