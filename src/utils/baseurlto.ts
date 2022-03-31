/*
 * @Author: lzp
 * @Date: 2022-03-29 14:00:58
 * @Description: file content
 */
const statistics = [
  // 数组第一项,即为,当路径匹配不到时,默认传送的统计网址,可以是开发环境下测试统计的地址
    {
      staUrl: '//analytics.baowei-inc.com/', // 统计网址
      staId: '2', // 统计ID
      environmentUrl: '默认'
    },
    {
      staUrl: '//analytics.baowei-inc.com/', // 开发环境统计网址
      staId: '2', // 统计ID
      environmentUrl: 'http://bwcaigou.baowei-inc.com'
    },
    {
      staUrl: '//analytics.baowei-inc.com/', // 生产环境统计网址
      staId: '1', // 统计ID
      environmentUrl: 'http://portal.baowei-inc.com'
    },
    {
      staUrl: '//106.12.95.245:8888/', // 本地环境统计网址
      staId: '2', // 统计ID
      environmentUrl: 'http://localhost:'
    }
  ]
  
  export default statistics
  