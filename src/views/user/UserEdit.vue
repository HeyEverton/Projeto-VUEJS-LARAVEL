<template>
    <b-form id="form" @submit.prevent>
        <b-row>
            <b-col md="12">
                <b-form-group label="Nome*" label-for="name" label-size="lg">
                    <b-form-input v-model="name" />
                </b-form-group>
            </b-col>

            <b-col md="12">
                <b-form-group label="Email" label-for="email" label-size="lg">

                    <b-form-input id="email" v-model="email" />
                </b-form-group>
            </b-col>


            <!-- submit and reset -->
            <b-col cols="12" class="d-flex align-items-center justify-content-center mt-2">
                <b-button @click="editUser()" v-ripple.400="'rgba(186, 191, 199, 0.15)'" size="lg" type="submit"
                    variant="primary" class="mr-1">
                    Enviar
                    <feather-icon size="18" icon="SendIcon" />

                </b-button>
                <b-button size="lg" v-ripple.400="'rgba(255, 255, 255, 0.15)'" type="reset" variant="outline-danger">
                    Cancelar
                    <feather-icon size="18" icon="XIcon" />

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

        }
    },
    methods: {
        editUser() {
            let _categories = {
                name: this.name,
                email: this.email,
              
            }
            this.$http
                .put('/bookshelf/users/' + router.currentRoute.params.id, _categories)
                .then(response => {                    
                    if (response.status == 200) {
                        this.$swal({
                            title: 'Editado com sucesso!',
                            text: 'O usuário foi editada com sucesso',
                            icon: 'success',
                            customClass: {
                                confirmButton: 'btn btn-primary',
                            },
                            buttonsStyling: false,
                        })
                        router.push({ name: 'user-list' })
                    } else {
                        this.$swal({
                            title: 'Falha ao editar!',
                            text: 'Ocorreu um erro ao editar esta categoria',
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
    created() {
        this.$http
            .get('bookshelf/users/'+ router.currentRoute.params.id)
            .then(response => {
                this.name = response.data.data.name
                this.email = response.data.data.email
              
            })
    },
}
</script>