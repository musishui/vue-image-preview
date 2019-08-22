# vue-image-preview

## npm 安装组件
```
npm install vue-image-preview
```

### 全局引用
```
import imgPreview from 'vue-image-preview'
Vue.use(imgPreview)

// vue 文件中使用
<template>
  <div>
    <image-preview :images="images" />
  </div>
</template>
<script>
export default {
  data () {
    return {
      images: [
        "https://static.pexels.com/photos/860935/pexels-photo-860935.jpeg",
        "https://images.pexels.com/photos/589810/pexels-photo-589810.jpeg",
        "https://static.pexels.com/photos/126793/pexels-photo-126793.jpeg",
        "https://static.pexels.com/photos/74775/pexels-photo-74775.jpeg",
        "https://static.pexels.com/photos/545968/pexels-photo-545968.jpeg"
      ]
    }
  }
}
</script>

```

### 局部引用
```
<template>
  <div>
    <image-preview :images="images" />
  </div>
</template>
<script>
import { imagePreview } from '../src/main'
export default {
  components: { imagePreview },
  data () {
    return {
      images: [
        "https://static.pexels.com/photos/860935/pexels-photo-860935.jpeg",
        "https://images.pexels.com/photos/589810/pexels-photo-589810.jpeg",
        "https://static.pexels.com/photos/126793/pexels-photo-126793.jpeg",
        "https://static.pexels.com/photos/74775/pexels-photo-74775.jpeg",
        "https://static.pexels.com/photos/545968/pexels-photo-545968.jpeg"
      ]
    }
  }
}
</script>

```

### props

  + **images**：`Array`，图片url地址集合  
  + **height**：[`Number`,  `String`]， preview 高度，单位像素（px）  
  + **width**：[`Number`,  `String`]， preview 宽度，单位像素（px）  
  + **index**：`Number`， 当前展示图片索引，支持`.sync`


