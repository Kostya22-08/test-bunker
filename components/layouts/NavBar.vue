<template>
  <LayoutsNavBarPartsHeader/>

  <div class="layout" v-if="isAuth">
    <slot />
  </div>

  <div v-else class="navbar__auth">
    <div class="navbar__auth-form"> 
      <p>
        Login
      </p>
      <input placeholder="login" v-model="login"/>
      <p>
        Password
      </p>
      <input placeholder="password" type="password" v-model="password"/>
      <button @click="setTokenBtn">Submit</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "LayoutsNavBar",

  components: {

  },

  props: {

  },

  data: () => ({
    isAuth: true,
    login: '',
    password: '',
  }),

  mounted() {
    if (localStorage?.getItem('tokenAddition')) {
      this.isAuth = true;
    } else {
      this.isAuth = false;
    }
  },

  methods: {
    setTokenBtn() {
      if (this.login == 'admin' && this.password == 'iX8r9FxnteA8') {
        localStorage?.setItem('tokenAddition', 'Basic YmFja2VuZEBncmV5aHVudGVyLmNvOnNLIzdNS2d6XT4zS3BkLQ==');
        // setToken('Basic YmFja2VuZEBncmV5aHVudGVyLmNvOnNLIzdNS2d6XT4zS3BkLQ==')
        this.isAuth = true;
      } else {
        this.login = ''
        this.password = ''
      }
    },
  },

  computed: {

  },

  watch: {
  }
}
</script>

<style lang="scss" scoped>
.layout {
  padding-top: 64px;
}

.navbar__auth {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.navbar__auth-form {
  display: flex;
  flex-direction: column;
  min-width: 280px;
}

.navbar__auth-form>input {
  padding: 10px 20px;
  background: #fff;
  margin: 20px 0;
}

.navbar__auth-form>button {
  padding: 10px 20px;
  background: linear-gradient(90deg, #6d4aff 0%, #31d1d0 100%);
  border-radius: 10px;
  color: #fafafd;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
}
</style>