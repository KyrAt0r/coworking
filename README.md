## Разработка для фронт-энд в Docker

1. Для разработки на стороне фронт-энд на компьютере должен быть установлен докер.

2. После установки докера, нужно перейти в командной строке в каталог проекта

3. Далее создаем Docker образ, с помощью команды:
   ```bash
   docker build -t coworking .
   ```
   или если есть утилита Make :
   ```bash
   make build
   ```

4. Запускаем Docker контейнер:
   ```bash
   docker-compose up
   ```
   или:
   ```bash
   make run
   ```

5. Остановка Docker контейнера:
   ```bash
   docker stop coworking
   ```
   или:
   ```bash
   make stop
   ```


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md)
  uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast
  Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked`
  or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and
  add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
