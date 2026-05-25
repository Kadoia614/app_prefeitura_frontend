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

```
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── context/
│   ├── middleware/
│   ├── pages/
│   └── service/
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## Como rodar o projeto

1. **Clone o repositório:**
   ```sh
   git clone git@github.com:DevItapecerica/Prefeitura_APP.git
   cd Prefeitura_APP
   ```

2. **Instale as dependências:**
   ```sh
   npm install
   ```

3. **Configure a API:**
   - Certifique-se de que a API está online e acessível no endereço configurado em `vite.config.js` (por padrão: http://192.168.16.80:3000).
   - Ajuste o proxy se necessário.

4. **Inicie o projeto:**
   ```sh
   npm run dev
   ```

5. **Acesse no navegador:**
   ```
   http://localhost:5173
   ```

## Funcionalidades

- Autenticação de usuários
- Gestão de demandas de TI
- Cadastro e edição de usuários, setores e funções administrativas
- Upload e visualização de documentos
- Acompanhamento em tempo real de chamados via SSE
- Atribuição de chamados via modal com seleção de usuário do setor 1
- Formulário de chamados com seleção de setor por nome
- Painel administrativo
- Notificações e feedbacks via Toast

## Observações

- O projeto utiliza aliases (`@`) para importações relativas à pasta `src`.
- Para personalizar estilos, edite os arquivos em `src/assets/sass/` ou o `tailwind.config.js`.
- Para rodar em rede local, o servidor Vite já está configurado para aceitar conexões externas.

## Licença

Este projeto foi desenvolvido por Miguel A. M. Moraes e é de uso interno da Prefeitura de Itapecerica da Serra.

### Contato

- Email: miguel_moraes2001@hotmail.com
- Celular: (11) 9 93737-9050

@texto gerado por inteligencia artificial