import "element-plus/dist/index.css";
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
  ElAffix
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
};
