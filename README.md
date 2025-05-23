# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Prefeitura-APP

Aplicação web desenvolvida em React + Vite para gestão de demandas, usuários, setores e serviços da Prefeitura de Itapecerica da Serra.

## Tecnologias Utilizadas

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [PrimeReact](https://primereact.org/)
- [Axios](https://axios-http.com/)
- ESLint, PostCSS

## Estrutura do Projeto

## Como rodar o projeto

1. **Clone o repositório:**

   ```sh
   git clone <url-do-repositorio>
   cd Prefeitura-APP

   ```

2. **Instale as dependências:**
   npm install
3. **Configure a API:**
   Certifique-se de que a API está online e acessível no endereço configurado em vite.config.js (por padrão: http://192.168.16.13:3000).
   Ajuste o proxy se necessário.

4. **Inicie o projeto:**
   npm run dev

5. **Acesse no navegador:**
   http://localhost:5173

## Funcionalidades

    ° Autenticação de usuários
    ° Gestão de demandas de TI
    ° Cadastro e edição de usuários, setores e funções administrativas
    ° Upload e visualização de documentos
    ° Painel administrativo
    ° Notificações e feedbacks via Toast

## Observações
   °O projeto utiliza aliases (@) para importações relativas à pasta src.
   °Para personalizar estilos, edite os arquivos em src/assets/sass/ ou o tailwind.config.js.
   °Para rodar em rede local, o servidor Vite já está configurado para aceitar conexões externas.

## Licença
Este projeto foi desenvolvido por Miguel A. M. Moraes e é de uso interno da Prefeitura de Itapecerica da Serra.

### Contato
   email: miguel_moraes2001@hotmail.com
   celular: (11) 9 93737-9050

@texto gerado por inteligencia artificial