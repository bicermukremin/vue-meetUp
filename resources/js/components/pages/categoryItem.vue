<template>
 
    <div
        :style="{ 'min-height': '160px' }"
        class="column is-one-quarter is-rounded"
    >
     <router-link :to="{name: 'PageMeetupFindCategory',
     params: {category: category.name}}">
        <div class="tile is-parent">
            <article class="tile is-child notification is-white">
                <p class="title">{{ category.name | capitalize }}</p>

                <figure class="image is-4by3">
                    <img class="is-rounded" :src="category.image" />
                </figure>
            </article>
        </div>
        </router-link>
    </div>
  
</template>
<script>
export default {
  props: {
    category: {
      type: Object
    }
  }
};
</script>

<style scoped>
.is-rounded {
  border-radius: 10px !important;
}
</style>
