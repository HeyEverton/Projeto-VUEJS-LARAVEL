<template>
  <div class="navbar-container d-flex content align-items-center">

    <!-- Nav Menu Toggler -->
    <ul class="nav navbar-nav d-xl-none">
      <li class="nav-item">
        <b-link
          class="nav-link"
          @click="toggleVerticalMenuActive"
        >
          <feather-icon
            icon="MenuIcon"
            size="21"
          />
        </b-link>
      </li>
    </ul>

    <!-- Left Col -->
    <div class="bookmark-wrapper align-items-center flex-grow-1 d-none d-lg-flex">
      <dark-Toggler class="d-none d-lg-block" />
    </div>

    <b-navbar-nav class="nav align-items-center ml-auto">
      <b-nav-item-dropdown
        right
        toggle-class="d-flex align-items-center dropdown-user-link"
        class="dropdown-user"
      >
        <template #button-content>
          <div class="d-sm-flex d-none user-nav">
            <p class="user-name font-weight-bolder mb-0">
              {{user.name}}
            </p>
            <span class="user-status">Administrador</span>
          </div>
          <b-avatar
            size="40"
            variant="light-primary"
            badge
            :src="require('@/assets/images/avatars/13-small.png')"
            class="badge-minimal"
            badge-variant="success"
          />
        </template>

        <b-dropdown-item link-class="d-flex align-items-center">
          <feather-icon
            size="16"
            icon="UserIcon"
            class="mr-50"
          />
          <span>
            <router-link to="user-perfil">
              Perfil
            </router-link>
          </span>
        </b-dropdown-item>

        <b-dropdown-item link-class="d-flex align-items-center">
          <feather-icon
            size="16"
            icon="MailIcon"
            class="mr-50"
          />
          <span>Inbox</span>
        </b-dropdown-item>

        <b-dropdown-item link-class="d-flex align-items-center">
          <feather-icon
            size="16"
            icon="BookOpenIcon"
            class="mr-50"
          />
          <span>
           <router-link to="livro-list">
             Livros
           </router-link>
          </span>
        </b-dropdown-item>

        <b-dropdown-item link-class="d-flex align-items-center">
          <feather-icon
            size="16"
            icon="MessageSquareIcon"
            class="mr-50"
          />
          <span>Chat</span>
        </b-dropdown-item>

        <b-dropdown-divider />

        <b-dropdown-item link-class="d-flex align-items-center">
          <feather-icon
            size="16"
            icon="LogOutIcon"
            class="mr-50"
          />
          <span @click="logoutUser">

            Logout

          </span>
        </b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
  </div>
</template>

<script>
import {
  BLink,
  BNavbarNav,
  BNavItemDropdown,
  BDropdownItem,
  BDropdownDivider,
  BAvatar,
} from 'bootstrap-vue'

import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

import DarkToggler from '@core/layouts/components/app-navbar/components/DarkToggler.vue'

export default {
  components: {
    BLink,
    BNavbarNav,
    BNavItemDropdown,
    BDropdownItem,
    BDropdownDivider,
    BAvatar,
    ToastificationContent,
    // Navbar Components
    DarkToggler,
  },

  data() {
    return {
      user: {}
    }
    
  },

  props: {
    toggleVerticalMenuActive: {
      type: Function,
      default: () => { },
    },
  },

  mounted () {
    this.$http.get('bookshelf/auth/me')
    .then(response => {
      this.user = response.data.data
      });
  },

  methods: {
    logoutUser() {
      this.$http
        .get('http://127.0.0.1:8000/api/bookshelf/auth/logout')
        .then(
          localStorage.removeItem('userData'),
          localStorage.removeItem('token'),
        )
        .then(this.$router.replace('/user-login'))
        .then(
          this.$toast({
            component: ToastificationContent,
            position: 'top-right',
            props: {
              title: `Até logo! ${user.name}`,
              icon: 'LogOutIcon',
              variant: 'success',
              text: 'Deslogado com sucesso!',
            },
          })
        )
      // this.$swal({
      //   title: 'Logout efetuado com sucesso',
      //   text: '',
      //   icon: 'success',
      //   customClass: {
      //     confirmButton: 'btn btn-primary',
      //   },
      //   buttonsStyling: false,
      // })
    },
  },
}
</script>
