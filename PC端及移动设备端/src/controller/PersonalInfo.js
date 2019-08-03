require("../viewstyle/personalInfo.scss");
import { getPersonalInfo } from "../api/personalInfo";
export default {
  data() {
    return {
      name: "W-qh",
      motto: "Keep&emsp;focus",
      Info: {}
    };
  },
  methods: {
    personalInfo() {
      getPersonalInfo()
        .then((response) => {
          if (response.data.code == 0) {
            this.Info = response.data.info[0];
          } else {
            this.$notify.error({
              title: "错误",
              message: response.msg
            });
          }
        })
        .catch((error) => {
          this.$notify.error({
            title: "错误",
            message: error
          });
        });
    }
  },
  mounted() {
    this.personalInfo();
  }
};
