<template>
  <b-card>

    <b-card-header class="pb-50 d-flex justify-content-center">
      <h2>
        Se cadastre na Bookshelf
      </h2>
    </b-card-header>

    <b-card-body>
      <validation-observer ref="simpleRules">
        <b-form @submit.prevent>

          <b-row>

            <b-col cols="12">

              <b-form-group label="Nome*" label-for="name" label-size="lg">

                <validation-provider #default="{ errors }" rules="required|min:5" name="name">

                  <b-form-input v-model="name" :state="errors.length > 0 ? false:null" placeholder="Insira o seu nome"
                    type="text" />
                  <small class="text-danger">{{ errors[0] }}</small>

                </validation-provider>
              </b-form-group>

            </b-col>

            <b-col cols="12">

              <b-form-group label="E-mail*" label-for="email" label-size="lg">

                <validation-provider #default="{ errors }" rules="required|email" name="email">

                  <b-form-input v-model="email" :state="errors.length > 0 ? false:null" placeholder="Insira o seu e-mail"
                    type="email" />
                  <small class="text-danger">{{ errors[0] }}</small>

                </validation-provider>
              </b-form-group>

            </b-col>

            <!-- description -->
            <b-col cols="12">

              <b-form-group label="Senha" label-for="password" label-size="lg">

                <validation-provider #default="{ errors }" rules="required|password" name="password">

                  <b-form-input v-model="password" :state="errors.length > 0 ? false:null" placeholder="Insira a sua senha"
                    type="password" />
                  <small class="text-danger">{{ errors[0] }}</small>

                </validation-provider>
              </b-form-group>

            </b-col>

            <!-- submit and reset -->
            <b-col cols="12" class="d-flex align-items-center justify-content-center">
              <b-button @click="createUser()" v-ripple.400="'rgba(186, 191, 199, 0.15)'" size="lg" type="submit"
                variant="primary" class="mr-1">
                Enviar
                <feather-icon size="18" icon="SendIcon" />
              </b-button>

              <b-button @click="resetFormCategoria()" size="lg" v-ripple.400="'rgba(255, 255, 255, 0.15)'" type="reset"
                variant="outline-danger">
                Cancelar
                <feather-icon size="18" icon="XIcon" />

              </b-button>
            </b-col>
          </b-row>
        </b-form>

      </validation-observer>
    </b-card-body>
  </b-card>


</template>

<script>
  import {
    required,
    email,
    confirmed,
    alpha,
    integer,
    password,
    min,
    digits,
  
  } from '@validations'
  
  import {
    ValidationProvider,
    ValidationObserver
  } from 'vee-validate'
  
  import router from '@/router'
  
import Ripple from 'vue-ripple-directive'
  
import {
  BCard,
  BCardText,
  BButton,
  BFormInput,
  BRow,
  BCol,
  BFormGroup,
  BForm,
  BCardBody,
  BCardHeader,

} from 'bootstrap-vue'

export default {
  components: {
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BForm,
    BForm,
    BButton,
    BCard,
    BCardBody,
    BCardHeader,
    ValidationProvider,
    ValidationObserver,
  },

  data() {
    return {
      name: this.name,
      email: this.email,
      password: this.password,
    }
  },

  methods: {
    
    createUser() {

      let _user = {
        name: this.name,
        email: this.email,
        password: this.password,
      }

      this.$http.post('/bookshelf/user/create/', _user)
        .then(response => {
          if (response.status == 200) {
            this.$swal({
              title: 'Cadastrado com sucesso!',
              text: 'Você foi cadastrado com sucesso',
              icon: 'success',
              customClass: {
                confirmButton: 'btn btn-primary',
              },
              buttonsStyling: false,
            })
            .then( router.push({ name: 'login' }) )


          } else {

            this.$swal({
              title: 'Falha ao cadastrar!',
              text: 'Ocorreu um erro ao se cadastrar',
              icon: 'error',
              customClass: {
                confirmButton: 'btn btn-primary',
              },
              buttonsStyling: false,
            })

          }
        })
      

    },
    resetFormCategoria() {
      this.$swal({
        title: 'Cadastro cancelado!',
        text: 'Redirecionando para registrar-se',
        icon: 'success',
        customClass: {
          confirmButton: 'btn btn-primary',
        },
        buttonsStyling: false,
      })
      router.push({ name: 'livro-list' })
    }

      
    },

  
  directives: {
    Ripple,
  },

}
</script>

<style>
</style>
