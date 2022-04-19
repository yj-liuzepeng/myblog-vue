/*
 * @Author: lzp
 * @Date: 2022-03-18 11:36:06
 * @Description: element-plus按需引入
 */
import "element-plus/dist/index.css";
// import ElMessage from './resetMessage'
import { 
  ElButton,
  ElHeader, 
  ElContainer,
  ElRow,ElCol,
  ElMenu,
  ElInput,
  ElTag,
  ElAvatar,
  ElDivider,
  ElTooltip,
  ElPagination,
  ElIcon,
  ElBacktop,
  ElAffix,
  ElProgress,
  ElTimeline,
  ElCard,
  ElDialog,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElDrawer
} from "element-plus";
export default (app) => {
  app
  .use(ElButton)
  .use(ElTag)
  .use(ElHeader)
  .use(ElRow)
  .use(ElCol)
  .use(ElMenu)
  .use(ElInput)
  .use(ElContainer)
  .use(ElAvatar)
  .use(ElDivider)
  .use(ElTooltip)
  .use(ElPagination)
  .use(ElIcon)
  .use(ElBacktop)
  .use(ElAffix)
  .use(ElProgress)
  .use(ElTimeline)
  .use(ElCard)
  .use(ElDialog)
  .use(ElDropdown)
  .use(ElDropdownMenu)
  .use(ElDropdownItem)
  .use(ElDrawer)
  // .use(ElMessage)
};
