<template>
  <div>
    <base-dialog :show="!!error" title="An error occurred" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <base-dialog :show="isLoading" title="Authenticating..." fixed>
      <base-spinner></base-spinner>
    </base-dialog>

    <form @submit.prevent="submitForm">
  <div class="form-control" v-if="mode === 'signup'">
    <label for="username">Username</label>
    <input type="text" id="username" v-model.trim="username" />
  </div>
  <div class="form-control">
    <label for="email">E-Mail</label>
    <input type="email" id="email" v-model.trim="email" />
  </div>
  <div class="form-control">
    <label for="password">Password</label>
    <input type="password" id="password" v-model.trim="password" />
  </div>
  <p v-if="!formIsValid">
    {{ mode === 'signup' ? 'Please enter a valid username, email, and password (must be at least 6 characters long).' : 'Please enter a valid email and password (must be at least 6 characters long).' }}
  </p>
  <base-button>{{ submitButtonCaption }}</base-button>
  <base-button type="button" mode="flat" @click="switchAuthMode">{{ switchModeButtonCaption }}</base-button>
</form>


  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      formIsValid: true,
      mode: 'login',
      isLoading: false,
      error: null,
    };
  },
  computed: {
    submitButtonCaption() {
      if (this.mode === 'login') {
        return 'Login';
      } else {
        return 'Signup';
      }
    },
    switchModeButtonCaption() {
      if (this.mode === 'login') {
        return 'Signup instead';
      } else {
        return 'Login instead';
      }
    },
  },
  methods: {
    async submitForm() {
      this.formIsValid = true;
      if (
        (this.mode === 'signup' && (this.username === '' || this.email === '' || !this.email.includes('@'))) ||
        this.password.length < 6
      ) {
        this.formIsValid = false;
        return;
      }

      this.isLoading = true;

      const actionPayload = {
        email: this.email,
        password: this.password,
      };
      
      if (this.mode === 'signup') {
        actionPayload.username = this.username;
      }

      try {
        if (this.mode === 'login') {
          await this.$store.dispatch('login', actionPayload);
        } else {
          console.log("actionPayloadRegister", actionPayload)
          await this.$store.dispatch('signup', actionPayload);
        }
        const redirectUrl = '/' + (this.$route.query.redirect || 'games');
        this.$router.replace(redirectUrl);
      } catch (err) {
        this.error = err.message || 'Failed to authenticate, try later.';
      }

      this.isLoading = false;
    },
    switchAuthMode() {
      if (this.mode === 'login') {
        this.mode = 'signup';
      } else {
        this.mode = 'login';
      }
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 1rem 0;
}

.base-button {
  margin-top: 1rem;
}

form {
  margin: 1rem auto;
 width: 400px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}


label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}
</style>