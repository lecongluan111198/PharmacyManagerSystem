<template>
    <div v-if="loading">
        <mu-circular-progress :size='64' :stroke-width="5"></mu-circular-progress>
    </div>
    <div v-else id="app">
        <router-view/>
    </div>
</template>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

<script lang="ts">
import Vue from 'vue';
import axios from '@/axios';

export default Vue.extend({
    data() {
        return {
            loading: true,
        }
    },

    mounted() {
        if (this.$route.path === '/login') {
            this.loading = false;
        }

        axios.get('/api/user')
        .then(res=>{
            console.log(res);
            this.loading = false;
        }).catch(err=>{
            console.error(err);
            this.$router.push('/login');
        })
    }
})
</script>
