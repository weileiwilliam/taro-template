import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { MySwiper, GoodsList } from '../../components'
import './index.scss'
import PropTypes from 'prop-types'

@connect(({ home, cart, loading }) => ({
  ...home,
  ...cart,
  ...loading
}))
class Index extends Component {
  static propTypes = {
    banner: PropTypes.array,
    brands: PropTypes.array,
    products_list: PropTypes.array,
    effects: PropTypes.object,
    dispatch: PropTypes.func,
    page: PropTypes.number
  };

  config = {
    navigationBarTitleText: '首页'
  };

  componentDidMount = () => {
    this.props.dispatch({
      type: 'home/load',
      payload: {
        a: 1
      }
    })
    this.props.dispatch({
      type: 'home/product'
    })
  };

  // 分享
  onShareAppMessage () {
    return {
      title: '基于Taro框架开发的时装衣橱',
      path: '/pages/home/index'
    }
  }

  // 小程序上拉加载
  onReachBottom () {
    this.props.dispatch({
      type: 'home/save',
      payload: {
        page: this.props.page + 1
      }
    })
    this.props.dispatch({
      type: 'home/product'
    })
  }

  render () {
    const { banner, brands, products_list, effects } = this.props
    return (
      <View className="home-page">
        <MySwiper banner={banner} home />
        <View className="nav-list">
          {brands.map((item, index) => (
            <View className="nav-item" key={index}>
              <Image mode="widthFix" src={item.image_src} />
            </View>
          ))}
        </View>
        {/* 流量主广告 */}
        {Taro.getEnv() === Taro.ENV_TYPE.WEAPP && (
          <ad unit-id="adunit-dc1c0a38156fa412" />
        )}
        <Text className="recommend">为你推荐</Text>
        <GoodsList list={products_list} loading={effects['home/product']} />
      </View>
    )
  }
}

export default Index
