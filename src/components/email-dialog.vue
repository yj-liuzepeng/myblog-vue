<template>
  <!-- <div class="email-dialog"> -->
  <el-dialog v-model="emailDialogVisible" title="绑定邮箱">
    <div>请绑定邮箱，以便收到回复！！！</div>
    <el-form :model="form">
      <el-form-item label="邮箱：" :label-width="formLabelWidth">
        <el-input
          v-model="form.email"
          autocomplete="off"
          placeholder="请输入邮箱"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">不需要</el-button>
        <el-button type="primary" @click="close">确定</el-button>
      </span>
    </template>
  </el-dialog>
  <!-- </div> -->
</template>

<script lang="ts" setup>
import { ref, reactive, watch } from "vue";
const props = defineProps({
  // 是否允许评论
  show: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["close"]);
const emailDialogVisible = ref(false);
const formLabelWidth = "140px";

const form = reactive({
  email: "",
});
const close = () => {
  emailDialogVisible.value = false;
  emit("close");
};
watch(
  () => props.show,
  (val) => {
    if (val) {
      emailDialogVisible.value = true;
    }
  }
);
</script>

<style scoped>
.email-dialog {
  z-index: 3000 !important;
}
</style>
