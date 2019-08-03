<template>
  <div>
    <el-card
      v-for="(item, index) in tableData"
      :key="index"
      class="blogListCard"
    >
      <div @click="showBlogContent(item)">
        <div class="blogtitle">
          {{ item.blogtitle }}
        </div>
        <div class="briefContent">
          {{ item.briefcontent }}
        </div>
        <div class="iconGroup">
          <div class="publishTime">
            <Icon type="md-time" color="gray" size="19" />
            <p>{{ item.publishTime }}</p>
          </div>
          <div class="watchNum">
            <Icon
              type="ios-eye"
              color="gray"
              size="25"
              style="margin-top: -3px;"
            />
            <p>{{ item.watchnum }}</p>
          </div>
          <div class="label">
            <Icon
              type="ios-pricetag"
              color="gray"
              size="17"
              style="margin-top: 2px;"
            />
            <div class="labelArray">
              <div class="labelName">
                <Tag
                  v-for="(item, index) in item.tagList"
                  :key="index"
                  :color="item.color"
                  >{{ item.tagname }}</Tag
                >
              </div>
            </div>
          </div>
          <div class="fileType">
            <Icon
              type="ios-folder"
              color="gray"
              size="19"
              style="margin-top: 1px;"
            />
            <div class="fileTypeArray">
              <div class="fileLabelName">
                <Tag
                  v-for="(item, index) in item.selectedkind"
                  :key="index"
                  :color="item.color"
                  >{{ item.name }}</Tag
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script src="../controller/blogList.js"></script>

