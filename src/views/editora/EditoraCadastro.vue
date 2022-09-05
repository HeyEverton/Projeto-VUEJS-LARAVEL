<template>
    <b-card>

        <b-card-header class="pb-50 d-flex justify-content-center">
            <h2>
                Cadastrar Editora
            </h2>
        </b-card-header>

        <b-card-body>
            <validation-observer ref="simpleRules">

                <b-form id="form" @submit.prevent>
                    <b-row>
                        <b-col md="6">

                            <b-form-group label="Nome*" label-for="name" label-size="lg">

                                <validation-provider #default="{ errors }" rules="required|min:3" name="name">

                                    <span class="text-muted fs-2">Obrigatório</span>
                                    <b-form-input v-model="name" :state="errors.length > 0 ? false : null"
                                        placeholder="Insira o nome da editora" />
                                    <small class="text-danger">{{ errors[0] }}</small>

                                </validation-provider>
                            </b-form-group>
                        </b-col>

                        <b-col md="6">
                            <b-form-group label="Endereço" label-for="address" label-size="lg">
                                <span class="text-muted fs-2 ">Opcional</span>
                                <b-form-input id="address" v-model="address"
                                    placeholder="Insira o endereço da editora" />
                            </b-form-group>
                        </b-col>

                        <b-col md="6">
                            <b-form-group label="Website" label-for="website" label-size="lg">
                                <span class="text-muted fs-2 ">Opcional</span>
                                <b-form-input type="text" id="website" v-model="website" placeholder="" />
                            </b-form-group>
                        </b-col>

                        <b-col md="6">
                            <b-form-group label="Nº telefone" label-for="phone_number" label-size="lg">
                                <span class="text-muted fs-2 ">Opcional</span>
                                <b-form-input type="number" id="phone_number" v-model="phone_number" placeholder="" />
                            </b-form-group>
                        </b-col>



                        <!-- submit and reset -->
                        <b-col cols="12" class="d-flex align-items-center justify-content-center mt-2">
                            <b-button @click="addEditora()" v-ripple.400="'rgba(186, 191, 199, 0.15)'" size="lg"
                                type="submit" variant="primary" class="mr-1">
                                Enviar
                                <feather-icon size="18" icon="SendIcon" />

                            </b-button>
                            <b-button size="lg" v-ripple.400="'rgba(255, 255, 255, 0.15)'" type="reset"
                                @click="resetFormEditora()" variant="outline-danger">
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

    data() {
        return {
            name: this.name = '',
            address: this.address = '',
            website: this.website = '',
            phone_number: this.phone_number = '',
        }
    },

    methods: {
        addEditora() {

            let _companies = {
                name: this.name,
                address: this.address,
                website: this.website,
                phone_number: this.phone_number,
            }


            if (this.name && this.last_name != '') {

                this.$http.post('/bookshelf/pub-companies/', _companies)
                    .then(response => {
                        if (response.status == 200) {
                            this.$swal({
                                title: 'Cadastrada com sucesso!',
                                text: 'A editora foi cadastrada com sucesso',
                                icon: 'success',
                                customClass: {
                                    confirmButton: 'btn btn-primary',
                                },
                                buttonsStyling: false,
                            })
                            router.push({ name: 'editora-list' })
                        } else {
                            this.$swal({
                                title: 'Falha ao cadastrar!',
                                text: 'Ocorreu um erro ao cadastrar a editora',
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
                    text: 'O nome da editora precisa ser preenchido!',
                    icon: 'error',
                    customClass: {
                        confirmButton: 'btn btn-primary',
                    },
                    buttonsStyling: false,
                })

            }

        },
        resetFormEditora() {
            
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

    directives: {
        Ripple,
    },

}
</script>

<style>
.margin-input {
    margin-top: 24px;
}
</style>