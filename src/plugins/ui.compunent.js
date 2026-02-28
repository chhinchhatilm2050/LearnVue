import AppButton from "@/views/plugin/AppButton.vue";
export default {
  install(app) {
    app.component('TestButton', AppButton);
  }
}
