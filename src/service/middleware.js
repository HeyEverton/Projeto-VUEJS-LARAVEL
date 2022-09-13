import Cookie from '@/service/cookie'
import axios from 'axios'
import store from '@/store'
import useJwt from '@/auth/jwt/useJwt'

export default {

  // SE ->NAO<- ESTA AUTENTICADO
  redirectIfNotAuthenticated(to, from, next) {
    // let valor = useJwt.isUserLoggedIn;
    // console.log('-------------------------')
    // console.log(valor)
    // alert('oi')

    const token = localStorage.getItem('userData')

    if (!token) {
      next({ name: 'user-login' })
    }

    // if (to.name !== "user-login" && to.name !== "user-cadastro" && !localStorage.getItem('UserData') && !localStorage.getItem('token')) {
    //     next({ name: 'user-login' })
    // }
    // // else {
    // //     next({ name: 'livro-list' })
    // // }
    // this.$http.get('bookshelf/auth/me')
    // .then((response) => {
    //     console.log(response)
    // })
    // axios.get('http://127.0.0.1:8000/api/bookshelf/auth/me')

    // AINDA TEM QUE CHECAR SE O TOKEN ESTA VALIDO
    // next({ name: 'home' })
  },

  // SE ESTA AUTENTICADO
  // redirectIfAuthenticated(to, from, next) {
  //     const token = localStorage.getToken()
  //     let n

  //     if (token) {
  //         n = { name: 'home' }
  //     }

  //     next(n)
  // },
}
