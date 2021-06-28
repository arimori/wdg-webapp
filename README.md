<h1 align="center">📈 WDG Automation - Technical Assesment</h1>
<p align="center">Dashboard system built with ReactJS, Typescript, NextJS and ChakraUI</p>

</br>

## 💡 What is it?
This is a system requested as a technical assessment by WDG Automation.

### Login
- The authentication was built using the context provided by `AuthContext.tsx` in order to manage the cookies that store the response token from the authentication route as well as the user's e-mail.

### API
- For the API calls I built two *interceptors* for the responses in order to check wheter the status code could be *401 Unauthorized* and for the requests
so that check and update the store data in cookies. Nevertheless, all API calls use an Authorization header with the `bearer` and the stored token

### Queries using cache
- For queries to user data (`https://reqres.in/api/users`) I used react-query to cache the results and revalidate this every 10 minutes.

### UI
- I've choose to use ChakraUI due to the pure and customizable components, as well as the breakpoints for the mobile interface. Also, this was used as a Design System in order to guarantee standardization in styling, so that each component had its unique and non-shareable styling.
- Also, the UI was first created using [Figma](https://www.figma.com/file/xQFSSZGxXeJoK3dxF1m33j/WDG?node-id=5%3A19939).

## 🚀 Built With
* [NextJS](https://nextjs.org/)
* [Typescript](https://www.typescriptlang.org/)
* [React](https://reactjs.org/)
* [ChakraUI](https://chakra-ui.com/)
* [React-Hook-Form](https://react-hook-form.com/)
* [Axios](https://github.com/axios/axios)
* [Yup](https://github.com/jquense/yup)
* [React-icons](https://react-icons.github.io/react-icons/icons?name=ri)
* [React-query](https://react-query.tanstack.com/)

## Getting Started

First, install all dependencies:
```bash
npm install
# or
yarn
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

For the authentication, use this:
```json
{
    "email": "eve.holt@reqres.in",
    "password": "cityslicka"
}
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
