<template>
  <b-card>

    <b-card-header class="pb-50 d-flex justify-content-center">
      <h2>
        Editar livro
      </h2>
    </b-card-header>

    <b-card-body>
      <validation-observer ref="simpleRules">

        <b-form
          id="form"
          @submit.prevent
        >
          <b-row>
            <b-col md="6">
              <b-form-group
                label="Título*"
                label-for="title"
                label-size="lg"
              >

                <validation-provider
                  #default="{ errors }"
                  rules="required|min:3"
                  name="title"
                >

                  <b-form-input
                    v-model="title"
                    :state="errors.length > 0 ? false : null"
                    placeholder="Insira o título do livro"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>

                </validation-provider>
              </b-form-group>
            </b-col>

            <b-col md="6">

              <b-form-group
                label="Descrição*"
                label-for="description"
                label-size="lg"
              >
                <b-form-textarea
                  id="description"
                  v-model="description"
                />
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group
                label="Idioma*"
                label-for="language"
                label-size="lg"
              >

                <validation-provider
                  #default="{ errors }"
                  rules="required"
                  name="language"
                >

                  <b-form-input
                    v-model="language"
                    :state="errors.length > 0 ? false : null"
                    placeholder="Insira o idioma do livro"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>

                </validation-provider>
              </b-form-group>
            </b-col>

            <b-col md="3">
              <b-form-group
                label="Nº de páginas"
                label-for="number_pages"
                label-size="lg"
              >
                <b-form-input
                  id="number_pages"
                  v-model="number_pages"
                  type="number"
                  placeholder=""
                />
              </b-form-group>
            </b-col>
            <b-col md="3">
              <b-form-group
                label="Ano"
                label-for="year"
                label-size="lg"
              >
                <b-form-input
                  id="year"
                  v-model="year"
                  type="number"
                  placeholder=""
                />
              </b-form-group>
            </b-col>
            <b-col md="3">
              <b-form-group
                label="Selecione a editora*"
                label-for="name"
                label-size="lg"
              >
                <v-select
                  v-model="publishing_company_id"
                  :value="editoras.name"
                  :reduce="editoras => editoras.id"
                  :options="
                    editoras"
                  label="name"
                />

              </b-form-group>
            </b-col>

            <b-col md="6">

              <b-form-group
                label="Selecione o(s) autor(es)"
                label-for="name"
                label-size="lg"
              >
                <v-select
                  v-model="authors"
                  multiple
                  label="name"
                  :value="autores.name"
                  :options="autores"
                  :reduce="autores => autores.id"
                />
              </b-form-group>

            </b-col>
            <b-col md="3">

              <b-form-group
                label="Selecione as categorias"
                label-for="name"
                label-size="lg"
              >
                <v-select
                  v-model="categories"
                  multiple
                  label="name"
                  :value="categorias.name"
                  :options="categorias"
                  :reduce="categorias => categorias.id"
                />

              </b-form-group>

            </b-col>

            <b-col>

              <b-tabs>

                <b-tab title="Autores">
                  <template #title>
                    <feather-icon icon="UserIcon" />
                    <span>Autores</span>
                  </template>
                  <h1 class="text-center">
                    Autores
                  </h1>
                  <span class="text-center d-flex justify-content-center">Procure aqui os autores para
                    o livro</span>

                  <div class="d-flex justify-content-start mt-2 flex-wrap">

                    <b-col
                      lg="12"
                      class="mb-3"
                    >
                      <!-- button on right -->
                      <b-input-group
                        label=""
                        label-cols-sm="2"
                        label-align-sm="right"
                        label-size="lg"
                        label-for="filterInput"
                        class="mb-0"
                      >
                        <b-form-input
                          v-model="autorNome"
                          size="lg"
                          type="search"
                          placeholder="Pesquise o autor..."
                        />
                        <b-input-group-append>
                          <b-button
                            variant="outline-primary"
                            @click="pesquisaAutPorNomeClick"
                          >
                            <feather-icon
                              size="16"
                              icon="SearchIcon"
                            />
                            Pesquisar
                          </b-button>
                        </b-input-group-append>
                      </b-input-group>
                    </b-col>

                  </div>

                  <div class="d-flex justify-content-between">
                    <b-col
                      lg="12"
                      class="mb-1"
                    >
                      <b-table
                        striped
                        hover
                        responsive
                        show-empty
                        class="position-relative"
                        :per-page="perPage"
                        :current-page="currentPage"
                        :items="autores"
                        :fields="fieldsAutores"
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

                      </b-table>

                      <b-card-body class="d-flex justify-content-start  flex-wrap pt-0">

                        <!-- page length -->

                        <b-form-group
                          label="Por Pág"
                          label-cols="6"
                          label-align="left"
                          label-size="sm"
                          label-for="sortBySelect"
                          class="text-nowrap mb-md-3 mr-5 align-items-center justify-content-start"
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
                            class="mb-0 align-items-center ml-5"
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
                    </b-col>
                  </div>

                </b-tab>

                <b-tab title="Categorias">
                  <template #title>
                    <feather-icon icon="BookOpenIcon" />
                    <span>Categorias</span>
                  </template>
                  <h1 class="text-center">
                    Categorias
                  </h1>
                  <span class="text-center d-flex justify-content-center">Procure aqui as categorias
                    para o livro</span>
                  <div class="d-flex justify-content-start mt-2 flex-wrap">

                    <b-col
                      lg="12"
                      class="mb-3"
                    >
                      <!-- button on right -->
                      <b-input-group
                        label=""
                        label-cols-sm="2"
                        label-align-sm="right"
                        label-size="lg"
                        label-for="filterInput"
                        class="mb-0"
                      >
                        <b-form-input
                          v-model="categoriaNome"
                          size="lg"
                          type="search"
                          placeholder="Pesquise a categoria..."
                        />
                        <b-input-group-append>
                          <b-button
                            variant="outline-primary"
                            @click="pesquisaCatPorNomeClick"
                          >
                            <feather-icon
                              size="16"
                              icon="SearchIcon"
                            />
                            Pesquisar
                          </b-button>
                        </b-input-group-append>
                      </b-input-group>
                    </b-col>

                  </div>

                  <div class="d-flex justify-content-between">
                    <b-col
                      lg="12"
                      class="mb-1"
                    >
                      <b-table
                        striped
                        hover
                        responsive
                        show-empty
                        class="position-relative"
                        :per-page="perPage"
                        :current-page="currentPage"
                        :items="categorias"
                        :fields="fieldsCategorias"
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
                              style="color:7367f0;"
                            >Categoria não
                              localizada</h3>
                          </div>
                        </template>

                      </b-table>

                      <b-card-body class="d-flex justify-content-start  flex-wrap pt-0">

                        <!-- page length -->

                        <b-form-group
                          label="Por Pág"
                          label-cols="6"
                          label-align="left"
                          label-size="sm"
                          label-for="sortBySelect"
                          class="text-nowrap mb-md-3 mr-5 align-items-center justify-content-start"
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
                            class="mb-0 align-items-center ml-5"
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
                    </b-col>
                  </div>

                </b-tab>

              </b-tabs>
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
                @click="editLivro()"
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
                @click="resetFormLivro()"
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
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BForm,
  BButton,
  BCard,
  BCardBody,
  BCardHeader,
  BFormTextarea,
  BFormSelect,
  BPagination,
  BInputGroup,
  BInputGroupAppend,
  BTable,
  BTabs,
  BTab,
  BSpinner,

} from 'bootstrap-vue'

import vSelect from 'vue-select'

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

export default {
  components: {
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BForm,
    BButton,
    BCard,
    BCardBody,
    BCardHeader,
    BFormTextarea,
    BFormSelect,
    BPagination,
    BInputGroup,
    BInputGroupAppend,
    BTable,
    ValidationProvider,
    ValidationObserver,
    BTabs,
    BTab,
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
      fieldsAutores: [
        {
          key: 'id', thClass: 'd-none', tdClass: 'd-none',
        },
        {
          key: 'name', label: 'Nome',
        },
        {
          key: 'last_name', label: 'Sobrenome',
        },

      ],

      fieldsCategorias: [
        {
          key: 'id', thClass: 'd-none', tdClass: 'd-none',
        },
        {
          key: 'name', label: 'Nome',
        },
        {
          key: 'description', label: 'Descrição',
        },

      ],

      // fieldsAutoresSelecionados: [
      //     {
      //         key: 'id', thClass: 'd-none', tdClass: 'd-none',
      //     },
      //     {
      //         key: 'name', label: 'Nome',
      //     },
      //     {
      //         key: 'last_name', label: 'Sobrenome',
      //     },

      // ],

      title: '',
      description: '',
      language: '',
      number_pages: '',
      year: '',
      publishing_company_id: '',
      categories: '',
      authors: '',

      editoras: [],
      autores: [],
      categorias: [],

      // PESQUISAR NOMES FILTROS
      autorNome: '',
      categoriaNome: '',

    }
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fieldsAutores
        .filter(f => f.sortable)
        .map(f => ({ text: f.label, value: f.key }))
    },
    sortOptions() {
      // Create an options list from our fields
      return this.fieldsCategorias
        .filter(f => f.sortable)
        .map(f => ({ text: f.label, value: f.key }))
    },

  },

  mounted() {
    // Set the initial number of items
    this.totalRows = this.autores.length
    this.totalRows = this.categorias.length

    this.$http.get('bookshelf/authors/')
      .then(response => this.autores = response.data.data)

    this.$http.get('bookshelf/categories/')
      .then(response => this.categorias = response.data.data)

    this.$http.get('bookshelf/pub-companies/')
      .then(response => this.editoras = response.data.data)
  },

  created() {
    this.$http
      .get(`bookshelf/books/edit/${router.currentRoute.params.id}`)
      .then(response => {
        this.title = response.data.data.title
        this.description = response.data.data.description
        this.language = response.data.data.language
        this.number_pages = response.data.data.number_pages
        this.year = response.data.data.year
        this.publishing_company_id = response.data.data.publishing_company_id
        this.authors = response.data.data.authors
        this.categories = response.data.data.categories
      })
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

    editLivro() {
      // var autores = this.authors.id
      const ids_categoria = this.categories.map(categoria => categoria.id)
      const ids_autores = this.authors.map(autor => autor.id)

      console.log('CATEGORIAS')
      console.log(ids_categoria)
      console.log('-----------------------------')
      console.log('AUTORES')
      console.log(ids_autores)
      const _book = {
        title: this.title,
        description: this.description,
        language: this.language,
        year: this.year,
        number_pages: this.number_pages,
        publishing_company_id: this.publishing_company_id,

        categories: ids_categoria,
        authors: ids_autores,
        // categories: [18],
        // authors: [41,44],
      }

      this.$http
        .put(`/bookshelf/books/${router.currentRoute.params.id}`, _book)
        .then(response => {
          if (response.status == 200) {
            this.$swal({
              title: 'Editado com sucesso!',
              text: 'O livro foi editado com sucesso',
              icon: 'success',
              customClass: {
                confirmButton: 'btn btn-primary',
              },
              buttonsStyling: false,
            })
            router.push({ name: 'livro-list' })
          } else {
            this.$swal({
              title: 'Falha ao editar!',
              text: 'Ocorreu um erro ao editar este livro',
              icon: 'error',
              customClass: {
                confirmButton: 'btn btn-primary',
              },
              buttonsStyling: false,
            })
          }
        })
    },

    // PESQUISAR AUTOR CLICK
    pesquisaAutPorNomeClick() {
      this.$http.get(`bookshelf/authors/pesquisar/nome/${this.autorNome}`)
        .then(response => this.autores = response.data.data)
    },

    // PESQUISAR CATEGORIA CLICK
    pesquisaCatPorNomeClick() {
      this.$http.get(`bookshelf/categories/pesquisar/nome/${this.categoriaNome}`)
        .then(response => this.categorias = response.data.data)
    },

    resetFormLivro() {
      this.$swal({
        title: 'Edição cancelada!',
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

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
