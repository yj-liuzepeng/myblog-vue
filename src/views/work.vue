<template>
  <div class="work">
    <el-row :gutter="10">
      <el-col :xs="24" :sm="18">
        <div class="left-content">
          <div class="left-content-header">
            <span>
              项目实战
              <span class="color-danger">{{ total || 0 }}</span> 篇
            </span>
            <el-input
              class="ipt-class"
              v-model="searchIpt"
              @change="hSearch"
              @input="hIpt"
              @blur="hBlur"
              :suffix-icon="Search"
              placeholder="搜索实战内容"
            />
          </div>
          <div class="left-content-items" v-if="total">
            <div
              class="left-content-item itemhover cssnice1"
              v-for="item in workList"
              :key="item.id"
              @click="openUrl(item.url)"
            >
              <!-- <div class="item-top"> -->
              <div
                class="item-top"
                :style="{
                  backgroundImage:
                    'url(https://liuzepeng.com/' + item.pic + ')',
                }"
              >
                <!-- <img v-lazy="'https://liuzepeng.com/' + item.pic" /> -->
                <div class="inner-info">
                  <div class="item-title">{{ item.title }}</div>
                  <div class="des">{{ item.description }}</div>
                </div>
              </div>
              <div class="item-info">
                <div class="date">
                  <span class="iconfont icon-icon pr-5px"></span>
                  <span style="color: #51aaad">{{
                    UnixToDate(new Date(item.create_time), 6)
                  }}</span>
                </div>
                <div class="type">
                  <span class="iconfont icon-24gl-tags4 pr-5px"></span>
                  <span style="color: #232831">项目实战</span>
                </div>
                <div class="author">
                  <span class="iconfont icon-203yonghu_yonghu4 pr-5px"></span>
                  <span style="color: #72abf9">liuzepeng</span>
                </div>
              </div>
            </div>
            <div class="pagination">
              <el-pagination
                background
                v-model:currentPage="pageNo"
                v-model:page-size="pageSize"
                :page-sizes="[3, 6, 9, 12]"
                small
                :disabled="disabled"
                :background="background"
                :layout="pageLayout"
                :total="total"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
              ></el-pagination>
            </div>
          </div>
          <div class="left-content-items nodata" v-else>
            <img
              style="width: 120px; height: 120px"
              src="../assets/nodata.png"
              alt="暂无数据"
            />
            <div style="color: #bbbbbb; font-size: 14px; margin-top: 10px">
              暂无数据
            </div>
          </div>
        </div>
      </el-col>
      <el-col :xs="0" :sm="6">
        <div class="right-content cssnice2">
          <Author />
          <your-info />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { Search } from "@element-plus/icons-vue";
import Author from "../components/author.vue";
import yourInfo from "../components/your-info.vue";
import { queryWorkList, likeQueryWork } from "../apis/work";
import { goTop } from "../utils/pageEffect";
import { UnixToDate } from "../utils/datetime";
import { isMobile } from "../utils/getInfo";
let searchIpt = ref("");
const pageNo = ref(1);
const pageSize = ref(6);
let pageLayout = ref("sizes, prev, pager, next, jumper");
let mobile = isMobile();
pageLayout.value = mobile
  ? "prev, pager, next"
  : "sizes, prev, pager, next, jumper";
const background = ref(false);
const disabled = ref(false);
let total = ref();
const workList = ref([]);

const getWorkList = () => {
  let params = {
    pageSize: pageSize.value,
    pageNo: pageNo.value,
  };
  queryWorkList(params).then((res: any) => {
    if (res.code == 200) {
      workList.value = res.data.data;
      total.value = res.data.total;
    }
  });
};
// 模糊查询
const hSearch = () => {
  likeQueryWork({
    queryipt: searchIpt.value,
    pageSize: pageSize.value,
    pageNo: pageNo.value,
  }).then((res: any) => {
    if (res.code == 200) {
      workList.value = res.data.data;
      total.value = res.data.total;
    } else {
      workList.value = [];
      total.value = 0;
    }
  });
};
const hIpt = () => {
  if (searchIpt.value == "") {
    getWorkList();
  }
};
const hBlur = () => {
  if (searchIpt.value == "") {
    getWorkList();
  }
};
const handleSizeChange = (val: number) => {
  pageSize.value = val;
  goTop();

  if (searchIpt.value) {
    hSearch();
  } else {
    getWorkList();
  }
};
const handleCurrentChange = (val: number) => {
  pageNo.value = val;
  goTop();

  if (searchIpt.value) {
    hSearch();
  } else {
    getWorkList();
  }
};
const openUrl = (url) => {
  window.open(url);
};
onMounted(() => {
  getWorkList();
  goTop();
});
</script>

<style lang="scss" scoped>
.work {
  padding-top: 3.2rem;
}

.left-content {
  width: 100%;
}

.left-content-header {
  padding: 0.625rem 0.625rem 0.5rem;
  width: 100%;
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  align-items: center;

  .ipt-class {
    width: 160px;
    border-radius: 5px;
    color: rgb(122, 122, 122);
  }
}

.left-content-items {
  .left-content-item {
    margin-top: 20px;
    border-radius: 20px 20px 0px 0px;

    .item-top {
      // position: relative;
      width: 100%;
      // height: 288px;
      height: 20vw;
      border-radius: 20px 20px 0px 0px;
      background-size: cover;
      background-position: center center;

      // img {
      //   position: absolute;
      //   border-radius: 20px 20px 0px 0px;
      //   top: 0;
      //   left: 0;
      //   width: 100%;
      //   height: 100%;
      // }
    }

    @media not screen and (min-width: 60em) {
      .item-top {
        height: 20vw;
      }
    }

    @media not screen and (min-width: 50em) {
      .item-top {
        height: 40vw;
      }
    }

    .inner-info {
      transition: all 0.4s;
      cursor: pointer;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      position: relative;
      color: white;
      border-radius: 20px 20px 0 0px;

      .item-title {
        width: 100%;
        text-align: center;
        transition: all 0.3s;
        font-size: 35px;
        text-shadow: rgb(255, 255, 255) 0px 0px 8px;
      }

      .des {
        padding: 0 4px;
        word-break: break-word;
        /* 文本行的任意字内断开 */
        transition: all 0.3s;
        position: absolute;
        bottom: 0;
        font-size: 18px;
        opacity: 0;
        transform: translateY(100%);
      }

      &:hover {
        background-color: rgba(0, 0, 0, 0.4);

        .item-title {
          transition: all 0.3s;
          transform: translateY(-100%);
        }

        .des {
          opacity: 1;
          bottom: 50%;
        }
      }
    }

    .item-info {
      display: flex;
      margin-top: 10px;
      margin-bottom: 10px;
      padding-bottom: 10px;
      font-size: 14px;

      .date {
        margin-right: 12px;
      }

      .type {
        margin-right: 12px;
      }

      .author {
      }
    }
  }

  .itemhover {
    transition: all linear 0.7s;
  }

  .itemhover:hover {
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
    transform: translate3d(0, -2px, 0);
    background-color: rgb(253, 253, 253);
  }

  .pagination {
    margin: 25px 0 10px;
    text-align: center;
  }

  .el-pagination {
    justify-content: center;
  }
}

.nodata {
  height: 825px;
  text-align: center;

  img {
    margin-top: 100px;
  }
}

.right-content {
  width: 100%;
}
</style>
