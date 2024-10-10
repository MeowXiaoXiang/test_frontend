<template>
  <div class="container d-flex flex-wrap">
    <div class="col-12 col-md-6 p-3">
      <div class="border rounded p-3">
        <h2>操作</h2>
        <form @submit.prevent>
          <BFormControls
              class="mb-3"
              label="名字"
              v-model="formData.name"
              :id="getNewComponentId('name')"/> <!-- 使用 ID 生成方法 -->

          <BFormControls
              class="mb-3"
              label="年齡"
              type="number"
              v-model="formData.age"
              :id="getNewComponentId('age')"/> <!-- 使用 ID 生成方法 -->

          <div class="d-flex gap-1">
            <button class="btn btn-success" @click="edit">修改</button>
            <button class="btn btn-warning" @click="create">新增</button>
          </div>
        </form>
      </div>
    </div>

    <div class="col-12 col-md-6 p-3">
      <div class="border rounded p-3">
        <table class="table">
          <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">名字</th>
            <th scope="col">年齡</th>
            <th scope="col">操作</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="v in users" :key="v.id">
            <th scope="row">{{ v.id }}</th>
            <td>{{ v.name }}</td>
            <td>{{ v.age }}</td>
            <td class="d-flex gap-1">
              <button class="btn btn-success" @click="selectUser(v)">
                修改
              </button>
              <button class="btn btn-danger" @click="remove(v)">
                刪除
              </button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref, reactive } from 'vue';
import BFormControls from './components/BFormControls.vue';
import { getNewComponentId } from './utils/idGenerator';

interface User {
  id: number;
  name: string;
  age: number;
}

const baseUrl = 'https://v0bcwbup.sjzhuiju.com';
const users = ref<User[]>([]);
const formData = reactive({
  id: 0,
  name: '',
  age: 0,
});

let isFirstLoad = true;

const create = async () => {
  if (confirm('確定要新增嗎？')) {
    try {
      const response = await axios.post(`${baseUrl}/api/user`, { ...formData });
      if (response.data.code === 200) {
        users.value.push({ id: response.data.data.id, name: formData.name, age: formData.age });
        resetFormData();
      }
    } catch (error) {
      handleError(error);
    }
  }
};

const edit = async () => {
  if (confirm('確定要修改嗎？')) {
    try {
      const response = await axios.put(`${baseUrl}/api/user`, { ...formData });
      if (response.data.code === 200) {
        const index = users.value.findIndex(user => user.id === formData.id);
        if (index !== -1) {
          users.value[index] = { id: formData.id, name: formData.name, age: formData.age };
        }
        resetFormData();
      }
    } catch (error) {
      handleError(error);
    }
  }
};

const selectUser = (user: User) => {
  Object.assign(formData, user);
};

const remove = async (user: User) => {
  if (confirm('確定要刪除嗎？')) {
    try {
      await axios.delete(`${baseUrl}/api/user`, { data: { id: user.id } });
      users.value = users.value.filter(u => u.id !== user.id);
    } catch (error) {
      handleError(error);
    }
  }
};

const getUsers = async () => {
  if (isFirstLoad) {
    try {
      const response = await axios.get(`${baseUrl}/api/user`);
      console.log(response.data);
      if (response.data.code === 200) {
        users.value = response.data.data;
        isFirstLoad = false;
      } else {
        console.error('API response error:', response.data.message);
      }
    } catch (error) {
      handleError(error);
    }
  }
};

const handleError = (error: any) => {
  if (error.response && error.response.status === 500) {
    console.error('Server error:', error);
  } else {
    console.error('Error:', error);
  }
};

const resetFormData = () => {
  formData.id = 0;
  formData.name = '';
  formData.age = 0;
};

onMounted(getUsers);
</script>

<style scoped>
</style>
