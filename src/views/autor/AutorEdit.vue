<template>
  <b-form @submit.prevent>

    <b-row>
      <b-col md="6">
        <b-form-group
          label="Nome*"
          label-for="name"
          label-size="lg"
        >
          <span class="text-muted fs-2">Obrigatório</span>
          <b-form-input
            id="mc-first-name"
            v-model="name"
            placeholder="Insira o nome do autor"
          />
        </b-form-group>
      </b-col>
      <b-col md="6">
        <b-form-group
          label="Sobrenome*"
          label-for="last_name"
          label-size="lg"
        >
          <span class="text-muted fs-2">Obrigatório</span>
          <b-form-input
            id="last_name"
            v-model="last_name"
            placeholder="Insira o sobrenome do autor"
          />
        </b-form-group>
      </b-col>
      <b-col md="6">
        <b-form-group
          label="Email"
          label-for="email"
          label-size="lg"
        >
          <span class="text-muted fs-2 ">Opcional</span>
          <b-form-input
            id="email"
            v-model="email"
            type="email"
            placeholder=""
          />
        </b-form-group>
      </b-col>
      <b-col md="1">
        <b-form-group
          label="Idade"
          label-for="age"
          label-size="lg"
        >
          <span class="text-muted fs-2 ">Opcional</span>
          <b-form-input
            id="age"
            v-model="age"
            type="number"
            placeholder=""
          />
        </b-form-group>
      </b-col>
      <b-col md="5">
        <b-form-group
          label="Nº telefone"
          label-for="phone"
          label-size="lg"
        >
          <div class="form-label-group">
            <span class="text-muted fs-2 ">Opcional</span>
            <b-form-input
              id="phone"
              v-model="phone"
              type="number"
              placeholder=""
            />
          </div>
        </b-form-group>
      </b-col>

      <!-- submit and reset -->
      <b-col class="d-flex align-items-center justify-content-center">
        <b-button
          v-ripple.400="'rgba(186, 191, 199, 0.15)'"
          type="submit"
          variant="primary"
          class="mt-4 mr-1"
          size="lg"
          @click="editAutor()"
        >
          Enviar
        </b-button>

        <b-button
          v-ripple.400="'rgba(255, 255, 255, 0.15)'"
          type="reset"
          variant="outline-secondary"
          class="mr-1 mt-4"
          size="lg"
        >
          Cancelar
        </b-button>
      </b-col>b-col>
    </b-row>
  </b-form>
</template>

<script>
import {
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BForm,
  BButton,

} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import router from '@/router'
import 'animate.css'

export default {
  components: {
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BForm,
    BButton,

  },
  directives: {
    Ripple,
  },
  data() {
    return {
      name: '',
      email: '',
      last_name: '',
      phone: '',
      age: '',
    }
  },
  created() {
    this.$http
      .get(`bookshelf/authors/${router.currentRoute.params.id}`)
      .then(response => {
        this.name = response.data.data.name
        this.last_name = response.data.data.last_name
        this.email = response.data.data.email
        this.age = response.data.data.age
        this.phone = response.data.data.phone
      })
  },
  methods: {
    editAutor() {
      const _author = {
        name: this.name,
        last_name: this.last_name,
        email: this.email,
        age: this.age,
        phone: this.phone,
      }
      this.$http
        .put(`/bookshelf/authors/${router.currentRoute.params.id}`, _author)
        .then(response => {
          if (response.status == 200) {
            this.$swal({
              title: 'Editado com sucesso!',
              text: 'O autor foi editado com sucesso',
              icon: 'success',
              customClass: {
                confirmButton: 'btn btn-primary',
              },
              buttonsStyling: false,
            })
            router.push({ name: 'autor-list' })
          } else {
            this.$swal({
              title: 'Falha ao editar!',
              text: 'Ocorreu um erro ao editar este autor',
              icon: 'error',
              customClass: {
                confirmButton: 'btn btn-primary',
              },
              buttonsStyling: false,
            })
          }
        })
    },

  },
}
</script>
