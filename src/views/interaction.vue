<template>
  <div class="interaction">
    <el-row :gutter="10">
      <el-col :span="18">
        <div class="left-content">
          <div class="top-center">
            <h1 class="link-title" style="font-size: 28px;">友情链接</h1>
            <p class="link-title">(顺序随机,不分先后)</p>
            <hr class="parting-line">
          </div>
          <div class="link-list">
            <el-row :gutter="12">
              <el-col :span="8" class="link-item cssnice4" v-for="item in linkState.data">
                <div class="item-div">
                  <div class="avator">
                    <el-avatar class="item-avatar" id="green" :size="60"
                      :src='item.logo_url' />
                  </div>
                  <div class="info">
                    <div class="title" :style="{ color: authorstyle.namecolor }">{{item.title}}</div>
                    <div class="msg">{{item.description}}</div>
                  </div>
                </div>

              </el-col>
            </el-row>
          </div>
            <el-divider border-style="dashed" />
          <div class="submit-link">
            <div class="link-title" style="font-size: 21px;">欢迎各位大佬交换友链👏👏👏</div>
            <div class="linl-style">
              <div class="title">友链格式</div>
              <div class="txt">标题：lzp的个人网站</div>
              <div class="txt">地址：https://www.liuzepeng.com</div>
              <div class="txt">网站描述：唯有热爱，可抵岁月漫长</div>
              <div class="txt">logo：https://liuzepeng.com/author.png</div>
              <div class="txt">提示：申请提交后若无其它原因将在24小时内审核，如超过时间还未通过，请私信我</div>
            </div>
            <div class="link-ipt">
              <el-input class="ipt" v-model="linkState.title" placeholder="大佬网站名称" />
              <el-input class="ipt" v-model="linkState.url" placeholder="大佬网站地址(http,https开头）" />
              <el-input class="ipt" v-model="linkState.description" placeholder="大佬网站描述（或者主要内容）" />
              <el-input class="ipt" v-model="linkState.logo" placeholder="网站logo图(http,https开头）" />
            </div>
            <el-button style="margin: 15px;" type="primary" size="small" @click="linkState.submit">申请友链</el-button>
            <hr class="parting-line">
          </div>
          <comment-box type="3" targetId="0" targetName="互动页" />
        </div>
      </el-col>
      <el-col :span="6">
        <div class="right-content cssnice2">
          <Author />
          <your-info />
          <Skills></Skills>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang='ts' setup>
import { onMounted, reactive } from 'vue';
import Author from '../components/author.vue'
import yourInfo from '../components/your-info.vue'
import commentBox from '../components/comment/index.vue'
import { storeToRefs } from 'pinia'
import { useMainStore } from "../store";
import { addLink,queryLinkList } from '../apis/friendlink'
import ElMessage from '../utils/resetMessage'
const mainStore = useMainStore();
const { authorstyle } = storeToRefs(mainStore)
const linkState = reactive({
  title: '',
  url: '',
  description: '',
  logo: '',
  data:[],
  submit: () => {
    let params = {
      title: linkState.title,
      url: linkState.url,
      description: linkState.description,
      logo_url: linkState.logo,
      applicant_ip: returnCitySN["cip"]
    }
    addLink(params).then((res: any) => {
      if (res.code == 200) {
        ElMessage({
          message: '申请已提交，博主审批ing~',
          type: 'success',
        })
        linkState.title = ''
        linkState.url = ''
        linkState.description = ''
        linkState.logo = ''
      } else {
        ElMessage({
          message: res.msg,
          type: 'warning',
        })
        linkState.title = ''
        linkState.url = ''
        linkState.description = ''
        linkState.logo = ''
      }
    })
  },
  getList:()=> {
    let params = {
      pageSize:100,
      pageNo:1 
    }
    queryLinkList(params).then((res:any)=> {
      if(res.code==200) {
        linkState.data = res.data.data.filter(item=>item.status==1)
      }
    })
  }
})
onMounted(()=> {
  linkState.getList()
})
</script>

<style lang='scss' scoped>
.interaction {
  padding-top: 3.2rem;

  .left-content {
    border: 1px solid rgb(242, 235, 235);
    background-color: rgba(255, 255, 255, 0.4);
    border-radius: 5px;
    margin-right: 10px;

    .top-center {
      text-align: center;

      .link-title {
        color: rgb(122, 122, 122);
        margin: 30px 0px;
        font-weight: bold;
      }


    }

    .link-list {
      .link-item {
        margin-bottom: 10px;

        #green {
          background-image: linear-gradient(to right, #4311b9, #0ae720);
          box-shadow: 0 4px 15px 0 rgba(49, 196, 190, 0.75);
        }

        .item-div {
          display: flex;
          justify-content: space-around;
          align-items: center;
          margin-top: 10px;
          background-color: white;
          height: 90px;
          border: 1px solid rgba(225, 225, 225, 0.83);
          border-radius: 4px;
          transition: all 0.3s linear 0s;
          cursor: pointer;
          position: relative;

          &:before {
            content: '';
            display: block;
            background: linear-gradient(to left, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0.4) 50%);
            background-size: 210% 100%;
            background-position: right bottom;
            height: 100%;
            width: 100%;
            position: absolute;
            top: 0;
            bottom: 0;
            right: 0;
            left: 0;
            border-radius: 50px;
            transition: all 1s;
            -webkit-transition: all 1s;
          }

          &:hover:before {
            background-position: left bottom;
          }

          .item-avatar {
            transition: all 0.5s;
          }

          &:hover .item-avatar {
            transform: rotate(360deg);
          }


          .avator {
            margin-left: 10px;
            margin-right: 5px;
          }

          .info {
            .title {
              font-size: 16px;
              padding-bottom: 5px;
            }

            .msg {
              width: 90%;
              color: rgb(164, 164, 164);
              border-top: 2px dashed rgb(238, 238, 238);
              padding-top: 5px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }


      }
    }

    .submit-link {
      text-align: center;

      .linl-style {
        .title {
          font-size: 18px;
          color: rgb(92, 132, 220);
          margin-bottom: 5px;
        }

        .txt {
          color: rgb(161, 161, 161);
          margin-bottom: 5px;

          &:last-child {
            margin-bottom: 15px;
          }
        }
      }

      .link-title {
        color: rgb(122, 122, 122);
        margin: 30px 0px;
        font-weight: bold;
      }

      .link-ipt {
        width: 60%;
        margin: auto;

        .ipt {
          margin-bottom: 12px;
        }
      }
    }
  }

  .right-content {
    width: 100%;
  }

  .parting-line {
    height: 4px;
    border: 0px;
    background-color: rgb(221, 221, 221);
    margin: 20px 0px;
    background-image: repeating-linear-gradient(-45deg, rgb(255, 255, 255), rgb(8, 245, 150) 5px, transparent 0px, transparent 8px);
  }
}
</style>