import { ref, reactive, toRefs } from 'vue';
import axios from 'axios';
export function useFetch(url) {
  const data = ref(null);
  const ui = reactive({
    loading: false,
    error: null
  })
  const fetchData = async (params = {}) => {
    ui.loading = true;
    ui.error = null;
    try {
      const response = await axios.get(url, {params});
      data.value = response.data;
    } catch (err) {
      ui.error = err.message;
    } finally {
      ui.loading = false;
    }
  };
  const postData = async (payload = {}) => {
    ui.loading = true;
    ui.error = null;
    try {
      const response = await axios.post(url, payload);
      data.value = response.data;
    } catch (err) {
      ui.error = err.message
    } finally {
      ui.loading = false;
    }
  }
  return { data, ...toRefs(ui), fetchData, postData};
 }
