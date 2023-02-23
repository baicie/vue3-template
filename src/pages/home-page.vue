<template>
  <HelloWorld msg="vite+vue3+element-plus">
    <el-row justify="center" style="background-color: rgb(205 132 132)">
      <el-col :span="8">
        <el-countdown format="DD [days] HH:mm:ss" :value="dateValue">
          <template #title>
            <div style="display: inline-flex; align-items: center">
              <el-icon style="margin-right: 4px" :size="12">
                <Calendar />
              </el-icon>
              Still to go until next month
            </div>
          </template>
        </el-countdown>
        <div class="countdown-footer">{{ dateValue.format('YYYY-MM-DD') }}</div>
      </el-col>
    </el-row>
  </HelloWorld>
</template>
<script lang="ts" setup>
// # config import
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import { Calendar } from '@element-plus/icons-vue';
import { ref } from 'vue';
// # base state
const dateValue = ref<Dayjs>(dayjs().add(1, 'month').startOf('month'));
// # pinia
// # computed
// # watch
// # function
// # lifecycle
// # style
</script>
<style lang="less" scoped>
.el-col {
  text-align: center;
}

.countdown-footer {
  margin-top: 8px;
}
</style>
