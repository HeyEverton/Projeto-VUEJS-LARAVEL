import store from '@/store'
import axiosIns from '@/libs/axios'


export default {

    // SE ->NAO<- ESTA AUTENTICADO
    redirectIfNotAuthenticated(to, from, next) {
        const token = localStorage.getItem('token')

        if (!token) {
            next({ name: 'user-login' })
        }

        axiosIns.get('bookshelf/auth/me')
            .then((response) => {
                if (!store?.state?.user?.id) {
                    store.commit('user/STORE_USER', response.data.data)
                }
            })
            .catch(() => {
                localStorage.removeItem('userData')
                localStorage.removeItem('token')
                //this.$router.replace('/user-login');
                next({ name: 'user-login' })
                return 
            })
            
            next()
    },


    redirectIfAuthenticated(to, from, next) {
        const token = localStorage.getItem('token')
        let n
        if (token) {
            n = { name: 'home' }
        }
        next(n)
    }
}
