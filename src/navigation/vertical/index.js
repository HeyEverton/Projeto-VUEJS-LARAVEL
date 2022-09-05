export default [
  {
    title: 'Home',
    route: 'home',
    icon: 'HomeIcon',
  },
  {
    title: 'Seu perfil',
    route: 'perfil',
    icon: 'UserCheckIcon',
  },
  {
    title: 'Todos os livros',
    route: 'livro-list',
    icon: 'BookOpenIcon',
  },
  {
    header: 'Cadastre um livro',
  },
  {
    title: 'Livros',
    
    icon: 'BookIcon',
    children: [
      {
        title: 'Cadastrar livro',
        route: 'livro-cadastro',
        icon: 'PlusCircleIcon',
      },
      {
        title: 'Listar livros',
        route: 'livro-list',
        icon: 'ListIcon',
      }
    ]
  },
  {
    title: 'Categorias',
    icon: 'FileIcon',
    children: [
      {
        title: 'Cadastrar categoria',
        route: 'categoria-cadastro',
        icon: 'PlusCircleIcon',
      },
      {
        title: 'Listar categorias',
        route: 'categoria-list',
        icon: 'ListIcon',
      },
    ]
  },
  {
    title: 'Editoras',
    icon: 'FileTextIcon',
    children: [
      {
        title: 'Cadastrar editora',
        route: 'editora-cadastro',
        icon: 'PlusCircleIcon',
      },
      {
        title: 'Listar editoras',
        route: 'editora-list',
        icon: 'ListIcon',
      },
    ]
  },

  {
    title: 'Autores',
    icon: 'UserIcon',
    children: [
      {
        title: 'Cadastrar autor',
        route: 'autor-cadastro',
        icon: 'UserPlusIcon',
      },

      {
        title: 'Listar autores',
        route: 'autor-list',
        icon: 'ListIcon',
      },
      
    ]
  },

 

  {
    header: 'Usuários',
  },

  {
    title: 'Users',
    icon: 'UserIcon',
    children: [
      {
        title: 'Cadastrar usuário',
        route: 'user-cadastro',
        icon: 'UserPlusIcon',
      },

      {
        title: 'Listar usuários',
        route: 'user-list',
        icon: 'ListIcon',
      },

    ]
  },
  
  // {
  //   title: 'Configurações',
  //   route: 'config',
  //   icon: 'SettingsIcon',
  // },

]
