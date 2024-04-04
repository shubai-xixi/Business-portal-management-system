import moment from 'moment'

moment.locale("zh-cn") //好像没有成功

const formatTime = {
  getTime: (data) => {
    return moment().format('L');    // 2024/03/29
  }
}

export default formatTime