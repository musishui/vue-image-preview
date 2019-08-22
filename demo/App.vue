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


