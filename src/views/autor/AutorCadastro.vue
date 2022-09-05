<template>
    <b-card>
        <b-card-header class="pb-50 d-flex justify-content-center">
            <h2>
                Cadastrar Autor
            </h2>

        </b-card-header>
        <b-card-body>
            <validation-observer ref="simpleRules">
                <b-form @submit.prevent>
                    <b-row>

                        <b-col md="6">

                            <b-form-group label="Nome*" label-for="name" label-size="lg">

                                <validation-provider #default="{ errors }" rules="required|alpha|min:5" name="name">

                                    <span class="text-muted fs-2">Obrigatório</span>
                                    <b-form-input v-model="name" :state="errors.length > 0 ? false:null"
                                        placeholder="Insira o nome do autor" />
                                    <small class="text-danger">{{ errors[0] }}</small>

                                </validation-provider>
                            </b-form-group>
                        </b-col>

                        <b-col md="6">

                            <validation-provider #default="{ errors }" rules="required|alpha|min:5" name="last name">
                                <b-form-group label="Sobrenome*" label-for="last_name" label-size="lg">
                                    <span class="text-muted fs-2">Obrigatório</span>
                                    <b-form-input id="last_name" v-model="last_name"
                                        :state="errors.length > 0 ? false:null"
                                        placeholder="Insira o sobrenome do autor" />
                                    <small class="text-danger">{{ errors[0] }}</small>
                                </b-form-group>
                            </validation-provider>

                        </b-col>

                        <b-col md="6">

                            <b-form-group label="Email" label-for="email" label-size="lg">
                                <span class="text-muted fs-2 ">Opcional</span>
                                <b-form-input type="email" id="email" v-model="email" placeholder="" />
                            </b-form-group>

                        </b-col>

                        <b-col md="2">

                            <b-form-group label="Idade" label-for="age" label-size="lg">
                                <span class="text-muted fs-2 ">Opcional</span>
                                <b-form-input type="number" id="age" v-model="age" placeholder="" />
                            </b-form-group>

                        </b-col>

                        <b-col md="4">
                            <b-form-group label="Nº telefone" label-for="phone" label-size="lg">

                                <div class="form-label-group">
                                    <span class="text-muted fs-2 ">Opcional</span>
                                    <b-form-input type="number" id="phone" v-model="phone" placeholder="" />
                                </div>

                            </b-form-group>

                        </b-col>


                        <!-- submit and reset -->
                        <b-col class="d-flex align-items-center justify-content-center">
                            <b-button @click="addAutor()" v-ripple.400="'rgba(186, 191, 199, 0.15)'" type="submit"
                                variant="primary" class="mt-4 mr-2" size="lg">
                                Enviar
                                <feather-icon size="18" icon="SendIcon" />
                            </b-button>

                            <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" type="reset" variant="outline-danger"
                                @click="resetFormAutor()" class="mr-1 mt-4" size="lg">
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
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BForm,
    BButton,
    BCard,
    BCardBody,
    BCardHeader,

} from 'bootstrap-vue'

import Ripple from 'vue-ripple-directive'

import {
    ValidationProvider,
    ValidationObserver
} from 'vee-validate'

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

import router from '@/router'

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
        ValidationProvider,
        ValidationObserver,
        

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
    methods: {
        addAutor() {
            let _author = {
                name: this.name,
                last_name: this.last_name,
                email: this.email,
                age: this.age,
                phone: this.phone,
            }
            if (this.name && this.last_name != '') {

                this.$http.post('/bookshelf/authors/', _author)
                    .then(response => {
                        if (response.status == 200) {
                            this.$swal({
                                title: 'Cadastrado com sucesso!',
                                text: 'O autor foi cadastrado com sucesso',
                                icon: 'success',
                                customClass: {
                                    confirmButton: 'btn btn-primary',
                                },
                                buttonsStyling: false,
                            })
                            router.push({ name: 'autor-list' })
                        } else {
                            this.$swal({
                                title: 'Falha ao cadastrar!',
                                text: 'Ocorreu um erro ao cadastrar o autor',
                                icon: 'error',
                                customClass: {
                                    confirmButton: 'btn btn-primary',
                                },
                                buttonsStyling: false,
                            })
                        }
                    })
                    
            } else {
                this.$swal({
                    title: 'Falha ao cadastrar!',
                    text: 'O nome precisa ter no mínimo 5 caracteres!',
                    icon: 'error',
                    customClass: {
                        confirmButton: 'btn btn-primary',
                    },
                    buttonsStyling: false,
                })

            }

        },
        resetFormAutor() {
            this.$swal({
                title: 'Cadastro cancelado!',
                text: 'Redirecionando para todos os livros',
                icon: 'success',
                customClass: {
                    confirmButton: 'btn btn-primary',
                },
                buttonsStyling: false,
            })
                .then(
                    router.push({ name: 'livro-list' })
            )
        }
    },
    
}
</script>