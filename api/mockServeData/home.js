// mock数据模拟
import Mock from 'mockjs'

// 图表数据
let List = []
for (let i = 0; i < 200; i++) {
  List.push(
    Mock.mock({
      //Mock.Random.float 产生随机数100到8000之间 保留小数 最小0位 最大0位
      // 苹果: Mock.Random.float(100, 8000, 0, 0),
      // vivo: Mock.Random.float(100, 8000, 0, 0),
      // oppo: Mock.Random.float(100, 8000, 0, 0),
      // 魅族: Mock.Random.float(100, 8000, 0, 0),
      // 三星: Mock.Random.float(100, 8000, 0, 0),
      // 小米: Mock.Random.float(100, 8000, 0, 0),
      'name|1': ['苹果', '三星', 'oppo', 'vivo', '魅族', '小米'],
      id: Mock.Random.guid(),
      count: Mock.Random.float(100, 8000, 0, 0),
      'date|1': ['2020-10-01', '2020-10-02', '2020-10-03', '2020-10-04', '2020-10-05', '2020-10-06', '2020-10-07']
    })
  )
}

for (let i = 0; i < List.length; i++) {
  for (let j = 0; j < List.length; j++) {
    if (List[0].name === List[j].name && List[0].date === List[j].date) {
      List.splice(j, 1)
    }
  }
}

//处理get数据
function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) return {}
  return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '//"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
}

export default {
  getStatisticalData: () => {
    return {
      code: 20000,
      data: {
        // 饼图
        videoData: [
          {
            name: '小米',
            value: 2999
          },
          {
            name: '苹果',
            value: 5999
          },
          {
            name: 'vivo',
            value: 1500
          },
          {
            name: 'oppo',
            value: 1999
          },
          {
            name: '魅族',
            value: 2200
          },
          {
            name: '三星',
            value: 4500
          }
        ],
        // 柱状图
        userData: [
          {
            date: '周一',
            new: 5,
            active: 200
          },
          {
            date: '周二',
            new: 10,
            active: 500
          },
          {
            date: '周三',
            new: 12,
            active: 550
          },
          {
            date: '周四',
            new: 60,
            active: 800
          },
          {
            date: '周五',
            new: 65,
            active: 550
          },
          {
            date: '周六',
            new: 53,
            active: 770
          },
          {
            date: '周日',
            new: 33,
            active: 170
          }
        ],
        // 折线图
        orderData: {
          // date: ['20191001', '20191002', '20191003', '20191004', '20191005', '20191006', '20191007'],
          // data: List
          list: List


        },

        tableData: [
          {
            name: 'oppo',
            todayBuy: 500,
            monthBuy: 3500,
            totalBuy: 22000
          },
          {
            name: 'vivo',
            todayBuy: 300,
            monthBuy: 2200,
            totalBuy: 24000
          },
          {
            name: '苹果',
            todayBuy: 800,
            monthBuy: 4500,
            totalBuy: 65000
          },
          {
            name: '小米',
            todayBuy: 1200,
            monthBuy: 6500,
            totalBuy: 45000
          },
          {
            name: '三星',
            todayBuy: 300,
            monthBuy: 2000,
            totalBuy: 34000
          },
          {
            name: '魅族',
            todayBuy: 350,
            monthBuy: 3000,
            totalBuy: 22000
          }
        ]
      }
    }
  },

  getMallList: config => {
    const { keywords, page = 1, limit = 20 } = param2Obj(config.url)
    // 搜索
    const mackList = List.filter(item => {
      if (keywords && item.name.indexOf(keywords) === -1) return false //找不到的return false
      return true
    })
    // 分页显示
    const pageList = mackList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

    return {
      code: 2000,
      // data: pageList,
      list: pageList,
      counts: mackList.length
    }

  },
  addRecord: config => {
    const { date, name, count, } = JSON.parse(config.body)
    List.unshift({
      id: Mock.Random.guid(),
      name: name,
      count: count,
      date: date
    })
    console.log(List);
    return {
      code: 20000,
      data: {
        message: '添加成功'
      }
    }

  },

  editRecord: config => {
    // console.log(config);
    const { id, date, name, count, } = JSON.parse(config.body)
    List.some(p => {
      if (p.id === id) {
        p.date = date;
        p.name = name;
        p.count = count;
      }
    })
    return {
      code: 20000,
      data: {
        message: '修改成功'
      }
    }

  },
  deleteRecord: config => {
    // console.log(config);
    const id = config.body
    if (!id) {
      return {
        code: -999,
        data: {
          message: '参数错误'
        }
      }
    } else {
      List.some((p, index) => {
        if (p.id === id) {
          List.splice(index, 1)
        }
      })
      return {
        code: 20000,
        data: {
          message: '删除成功'
        }
      }

    }

  }
}