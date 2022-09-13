<template>
  <b-form
    id="form"
    @submit.prevent
  >
    <b-row>
      <b-col md="6">

        <b-form-group
          label="Nome*"
          label-for="name"
          label-size="lg"
        >

          <span class="text-muted fs-2">Obrigatório</span>
          <b-form-input
            v-model="name"
            placeholder="Insira o nome do autor"
          />

        </b-form-group>
      </b-col>

      <b-col md="6">
        <b-form-group
          label="Endereço"
          label-for="address"
          label-size="lg"
        >
          <span class="text-muted fs-2 ">Opcional</span>
          <b-form-input
            id="address"
            v-model="address"
            placeholder="Insira o endereço da editora"
          />
        </b-form-group>
      </b-col>

      <b-col md="6">
        <b-form-group
          label="Website"
          label-for="website"
          label-size="lg"
        >
          <span class="text-muted fs-2 ">Opcional</span>
          <b-form-input
            id="website"
            v-model="website"
            type="text"
            placeholder=""
          />
        </b-form-group>
      </b-col>

      <b-col md="6">
        <b-form-group
          label="Nº telefone"
          label-for="phone_number"
          label-size="lg"
        >
          <span class="text-muted fs-2 ">Opcional</span>
          <b-form-input
            id="phone_number"
            v-model="phone_number"
            type="number"
            placeholder=""
          />
        </b-form-group>
      </b-col>

      <!-- submit and reset -->
      <b-col
        cols="12"
        class="d-flex align-items-center justify-content-center mt-2"
      >
        <b-button
          v-ripple.400="'rgba(186, 191, 199, 0.15)'"
          size="lg"
          type="submit"
          variant="primary"
          class="mr-1"
          @click="editEditora()"
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
      .get(`bookshelf/pub-companies/${router.currentRoute.params.id}`)
      .then(response => {
        this.name = response.data.data.name
        this.address = response.data.data.address
        this.website = response.data.data.website
        this.phone_number = response.data.data.phone_number
      })
  },
  methods: {
    editEditora() {
      const _companies = {
        name: this.name,
        address: this.address,
        website: this.website,
        phone_number: this.phone_number,
      }
      this.$http
        .put(`/bookshelf/pub-companies/${router.currentRoute.params.id}`, _companies)
        .then(response => {
          if (response.status == 200) {
            this.$swal({
              title: 'Editado com sucesso!',
              text: 'A editora foi editada com sucesso',
              icon: 'success',
              customClass: {
                confirmButton: 'btn btn-primary',
              },
              buttonsStyling: false,
            })
            router.push({ name: 'editora-list' })
          } else {
            this.$swal({
              title: 'Falha ao editar!',
              text: 'Ocorreu um erro ao editar esta editora',
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
