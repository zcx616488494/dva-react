import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import { urlToList } from '../_utils/pathTools';
import { getDefaultCollapsedSubMenus, getMenuMatches } from './SiderMenuUtils';
import Link from 'umi/link';
import styles from './index.less';

const { Sider } = Layout;
const { SubMenu } = Menu;

class SiderMenu extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      openKeys: getDefaultCollapsedSubMenus(props),
    };
  }
  // 新增加的生命周期 替代 componentWillReceiveProps
  static getDerivedStateFromProps(props, state) {
    const { pathname, flatMenuKeysLen } = state;
    if (props.location.pathname !== pathname || props.flatMenuKeys.length !== flatMenuKeysLen) {
      return {
        pathname: props.location.pathname,
        flatMenuKeysLen: props.flatMenuKeys.length,
        openKeys: getDefaultCollapsedSubMenus(props),
      };
    }
    return null;
  }

  isMainMenu = key => {
    const { menuData } = this.props;
    return menuData.some(item => {
      if (key) {
        return item.key === key || item.path === key;
      }
      return false;
    });
  };

  handleOpenChange = openKeys => {
    const moreThanOne = openKeys.filter(openKey => this.isMainMenu(openKey)).length > 1;
    this.setState({
      openKeys: moreThanOne ? [openKeys.pop()] : [...openKeys],
    });
  };
  /**
  * 获得菜单子节点
  * @memberof SiderMenu
  */
  getNavMenuItems = menusData => {
    if (!menusData) {
      return [];
    }
    return menusData.filter(item => item.name && !item.hideInMenu)
    .map(item => this.getSubMenuOrItem(item))
    .filter(item => item); // 去掉空数组空字符串、undefined、null
  };

  /**
  * get SubMenu or Item
  */
  getSubMenuOrItem = item => {
    // doc: add hideChildrenInMenu
    // 是否存在子菜单且子菜单存在name属性
    if (item.children && item.children.some(child => child.name)) {
      const { name } = item;
      return (
        <SubMenu
          title={
            item.icon ? (
              <span>
                <Icon type={item.icon} />
                <span>{name}</span>
              </span>
            ) : (
                name
              )
          }
          key={item.path}
        >
          {this.getNavMenuItems(item.children)}
        </SubMenu>
      );
    }
    return <Menu.Item key={item.path}>{this.getMenuItemPath(item)}</Menu.Item>;
  };
  /**
    * 判断是否是http链接.返回 Link 或 a
    * Judge whether it is http link.return a or Link
    * @memberof SiderMenu
    */
  getMenuItemPath = item => {
    const { name } = item;
    const itemPath = this.conversionPath(item.path);
    const { target } = item;
    // Is it a http link
    if (/^https?:\/\//.test(itemPath)) {
      return (
        <a href={itemPath} target={target}>
          <Icon type={item.icon} />
          <span>{name}</span>
        </a>
      );
    }
    const { location } = this.props;
    return (
      <Link
        to={itemPath}
        target={target}
        replace={itemPath === location.pathname}
      >
        {
          item.icon ? <Icon type={item.icon} /> : ''
        }
        <span>{name}</span>
      </Link>
    );
  };
  conversionPath = path => {
    if (path && path.indexOf('http') === 0) {
      return path;
    }
    return `/${path || ''}`.replace(/\/+/g, '/');
  };

  // Get the currently selected menu
  getSelectedMenuKeys = pathname => {
    const { flatMenuKeys } = this.props;
    return urlToList(pathname).map(itemPath => getMenuMatches(flatMenuKeys, itemPath).pop());
  };
  
  render() {
    const { menuData, location: { pathname } } = this.props;
    let selectedKeys = this.getSelectedMenuKeys(pathname);
    const { openKeys } = this.state;
    if (!selectedKeys.length && openKeys) {
      selectedKeys = [openKeys[openKeys.length - 1]];
    }
    return (
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        width={256}
      >
        <div className={styles.logo} />
        <Menu
          key="Menu"
          theme="dark"
          mode="inline"
          openKeys={openKeys}
          selectedKeys={selectedKeys}
          onOpenChange={this.handleOpenChange}
          style={{ width: 256 }}
        >
          {this.getNavMenuItems(menuData)}
        </Menu>
      </Sider>
    );
  }
}

export default SiderMenu;