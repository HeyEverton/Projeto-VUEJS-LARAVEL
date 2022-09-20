<template>
  <b-card
    title="Todos os autores"
    no-body
  >
    <b-card-body>
      <div class="d-flex justify-content-between  flex-wrap">

        <b-col
          lg="6"
          class="mb-1"
        >
          <!-- button on right -->
          <b-input-group
            label-cols-md="2"
            label-align-sm="left"
            label-size="lg"
          >
            <b-input-group-prepend>

              <v-select
                id="dropdownPesquisar"
                v-model="placeholder"
                placeholder="Pesquisar por"
                :options="selectAutores"
                label="nome"
                @input="setSelected"
              />

            </b-input-group-prepend>

            <b-form-input
              v-model="campoDaPesquisa"
              placeholder="Pesquisando por..."
              @input="handleInput"
            />
            <b-input-group-append>

              <b-button
                size="16"
                variant="outline-primary"
                @click="pesquisar"
              >
                <feather-icon icon="SearchIcon" />
                <!-- Pesquisar -->
              </b-button>

            </b-input-group-append>
          </b-input-group>

        </b-col>

        <b-col
          lg="6"
          class="mb-1"
        >
          <b-form-group
            label=""
            label-size="md"
            label-align-sm="right"
            label-cols-sm="7"
            label-for="sortBySelect"
            class="mr-1 mb-md-0 align-items-center"
          >
            <b-input-group size="lg">
              <b-button
                size="md"
                variant="primary"
                :to="{ name: 'autor-cadastro' }"
              >
                <feather-icon
                  size="18"
                  icon="UserPlusIcon"
                />
                Novo autor
              </b-button>
            </b-input-group>
          </b-form-group>

        </b-col>
      </div>
    </b-card-body>

    <b-table
      striped
      hover
      responsive
      show-empty
      class="position-relative"
      :per-page="perPage"
      :current-page="currentPage"
      :items="autores"
      :fields="fields"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection"
    >

      <template #empty>

        <div class="d-flex justify-content-center">
          <b-spinner
            variant="primary"
            label="Carregando..."
          />
          <h3
            class="text-center ml-1"
            style="color:#7367f0;"
          >Autor não
            localizado</h3>
        </div>

      </template>

      <template #cell(actions)="data">

        <b-button
          variant="primary"
          class="mr-1"
          :to="{ name: 'autor-edit', params: { id: data.item.id } }"
        >
          <feather-icon
            size="18"
            icon="EditIcon"
          />
        </b-button>

        <b-button
          variant="danger"
          @click="() => deleteAutor(data.item.id)"
        >
          <feather-icon
            size="18"
            icon="Trash2Icon"
          />
        </b-button>

      </template>
    </b-table>

    <b-card-body class="d-flex justify-content-between flex-wrap pt-0">

      <!-- page length -->
      <b-form-group
        label="Por Pág"
        label-cols="6"
        label-align="left"
        label-size="sm"
        label-for="sortBySelect"
        class="text-nowrap mb-md-0 mr-1 align-items-center"
      >
        <b-form-select
          id="perPageSelect"
          v-model="perPage"
          size="sm"
          inline
          :options="pageOptions"
        />
      </b-form-group>

      <!-- pagination -->
      <div>
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          first-number
          last-number
          prev-class="prev-item"
          next-class="next-item"
          class="mb-0 align-items-center"
        >
          <template #prev-text>
            <feather-icon
              icon="ChevronLeftIcon"
              size="18"
            />
          </template>
          <template #next-text>
            <feather-icon
              icon="ChevronRightIcon"
              size="18"
            />
          </template>
        </b-pagination>
      </div>
    </b-card-body>

  </b-card>
</template>

<script>

import {
  BTable,
  BAvatar,
  BBadge,
  BFormGroup,
  BFormSelect,
  BPagination,
  BInputGroup,
  BFormInput,
  BInputGroupAppend,
  BInputGroupPrepend,
  BButton,
  BCardBody,
  BCard,
  BCol,
  BSpinner,

} from 'bootstrap-vue'

import router from '@/router'

import { debounce } from 'lodash';

import Ripple from 'vue-ripple-directive'

import vSelect from 'vue-select'

export default {
  components: {
    BCard,
    BCol,
    BTable,
    BAvatar,
    BBadge,
    BFormGroup,
    BFormSelect,
    BPagination,
    BInputGroup,
    BFormInput,
    BInputGroupAppend,
    BInputGroupPrepend,
    BButton,
    BCardBody,
    BSpinner,
    vSelect,

  },

  directives: {
    Ripple,
  },
  data() {
    return {
      perPage: 5,
      pageOptions: [3, 5, 10],
      totalRows: 1,
      currentPage: 1,
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      filterOn: [],
      infoModal: {
        id: 'info-modal',
        title: '',
        content: '',

      },
      autores: [],

      fields: [
        {
          key: 'id', thClass: 'd-none', tdClass: 'd-none',
        },
        {
          key: 'name', label: 'Nome',
        },
        {
          key: 'last_name', label: 'Sobrenome',
        },
        {
          key: 'actions', label: 'Ações',
        },

      ],

      // PESQUISA FILTROS AUTORES
      campoDaPesquisa: '',
      placeholder: 'Pesquisar por',
      selectAutores: [
        'Nome',
        'Sobrenome',
      ],
      campo: '',

    }
  },

  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => ({ text: f.label, value: f.key }))
    },
  },

  mounted() {
    // Set the initial number of items

    this.totalRows = this.autores.length
  },

  created() {
    this.$http.get('bookshelf/authors/')
      .then(response => this.autores = response.data.data)
  },

  methods: {

    info(item, index, button) {
      this.infoModal.title = `Row index: ${index}`
      this.infoModal.content = JSON.stringify(item, null, 2)
      this.$root.$emit('bv::show::modal', this.infoModal.id, button)
    },
    resetInfoModal() {
      this.infoModal.title = ''
      this.infoModal.content = ''
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },

    deleteAutor(id) {

      this.$swal({
        title: 'Tem certeza?',
        text: 'Você não conseguirá desfazer isso.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, excluir',
        cancelButtonText: 'Cancelar',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-danger ml-1',
        },
        buttonsStyling: false,
      })
        .then(res => {
          if (res.isConfirmed) {
            this.$http
              .delete(`/bookshelf/authors/${id}`)
              .then(response => {
                if (response.status == 200) {
                  this.$swal({
                    icon: 'success',
                    title: 'Excluído',
                    text: 'O autor foi excluído com sucesso!',
                    customClass: {
                      confirmButton: 'btn btn-success',
                    },
                  })
                  this.$http.get('bookshelf/authors/')
                    .then(response => this.autores = response.data.data)
                } else {
                  this.$swal({
                    title: 'Falha ao excluir!',
                    text: 'Ocorreu um erro ao excluir o autor',
                    icon: 'error',
                    customClass: {
                      confirmButton: 'btn btn-primary',
                    },
                    buttonsStyling: false,
                  })
                }
              })
              .catch(error => {
                reject(error)
              })
          }
        })
    },

    setSelected(value) {
      this.campo = value
    },

    pesquisar() {
      if (this.campo == 'Nome') {
        this.pesquisarNome(this.campoDaPesquisa)
      } else {
        this.pesquisarSobrenome(this.campoDaPesquisa)
      }
    },
    handleInput: debounce(function () {
      if (this.campo == 'Nome') {
        this.pesquisarNome(this.campoDaPesquisa)
      } else {
        this.pesquisarSobrenome(this.campoDaPesquisa)
      }
    }, 300),

    pesquisarNome(nome) {
      this.$http
        .get(`bookshelf/authors/pesquisar/nome/${nome}`)
        .then(response => this.autores = response.data.data)
    },

    pesquisarSobrenome(sobrenome) {
      this.$http
        .get(`bookshelf/authors/pesquisar/sobrenome/${sobrenome}`)
        .then(response => this.autores = response.data.data)
    },

  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
