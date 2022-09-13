<template>
  <b-card>

    <b-card-header class="pb-50 d-flex justify-content-center">
      <h2>
        Cadastrar Categoria
      </h2>
    </b-card-header>

    <b-card-body>
      <validation-observer ref="simpleRules">
        <b-form @submit.prevent>

          <b-row>

            <b-col cols="12">

              <b-form-group
                label="Nome*"
                label-for="name"
                label-size="lg"
              >

                <validation-provider
                  #default="{ errors }"
                  rules="required|min:5"
                  name="name"
                >

                  <span class="text-muted fs-2">Obrigatório</span>
                  <b-form-input
                    v-model="name"
                    :state="errors.length > 0 ? false:null"
                    placeholder="Insira o nome da categoria"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>

                </validation-provider>
              </b-form-group>

            </b-col>

            <!-- description -->
            <b-col cols="12">
              <b-form-group
                label="Descrição"
                label-for="description"
                label-size="lg"
              >

                <span class="text-muted">Opcional</span>
                <b-form-input
                  id="v-email"
                  v-model="description"
                  type="text"
                  placeholder="Insira uma descrição para a categoria"
                />
              </b-form-group>
            </b-col>

            <!-- submit and reset -->
            <b-col
              cols="12"
              class="d-flex align-items-center justify-content-center"
            >
              <b-button
                v-ripple.400="'rgba(186, 191, 199, 0.15)'"
                size="lg"
                type="submit"
                variant="primary"
                class="mr-1"
                @click="addCategory()"
              >
                Enviar
                <feather-icon
                  size="18"
                  icon="SendIcon"
                />

              </b-button>
              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                size="lg"
                type="reset"
                variant="outline-danger"
                @click="resetFormCategoria()"
              >
                Cancelar
                <feather-icon
                  size="18"
                  icon="XIcon"
                />

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
  ValidationObserver,
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

  directives: {
    Ripple,
  },

  data() {
    return {
      name: this.name,
      description: this.description,
    }
  },

  methods: {

    addCategory() {
      const _category = {
        name: this.name,
        description: this.description,
      }

      this.$http.post('/bookshelf/categories/', _category)
        .then(response => {
          if (response.status == 200) {
            this.$swal({
              title: 'Cadastrada com sucesso!',
              text: 'A categoria foi cadastrada com sucesso',
              icon: 'success',
              customClass: {
                confirmButton: 'btn btn-primary',
              },
              buttonsStyling: false,
            })
              .then(router.push({ name: 'categoria-list' }))
          } else {
            this.$swal({
              title: 'Falha ao cadastrar!',
              text: 'Ocorreu um erro ao cadastrar a categoria',
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
        text: 'Redirecionando para todos os livros',
        icon: 'success',
        customClass: {
          confirmButton: 'btn btn-primary',
        },
        buttonsStyling: false,
      })
      router.push({ name: 'livro-list' })
    },

  },

}
</script>

<style>
</style>
