# Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

## Просмотр по адресу

https://shop-admin-inky-one.vercel.app

# E-Commerce Front

Фронтовая часть интернет-магазина, построенная на **Next.js**. Этот пет-проект демонстрирует современный интерфейс для покупок с каталогом товаров, корзиной, поиском и оформлением заказов.

## О проекте

Этот проект — клиентская часть интернет-магазина, созданная для изучения и демонстрации навыков работы с **Next.js**, **React**, оптимизацией производительности и интеграцией с API. Основная цель — предоставить удобный и отзывчивый интерфейс для пользователей с акцентом на UX и скорость загрузки.

### Основные функции
- **Каталог товаров**: просмотр товаров с фильтрацией по категориям.
- **Корзина**: добавление/удаление товаров, подсчёт итоговой стоимости.
- **Поиск**: быстрый поиск товаров с debounce-оптимизацией.
- **Оформление заказа**: форма с валидацией и интеграцией с платёжным API.
- **Аутентификация**: вход/регистрация через NextAuth.js.

## Технологии

- **Frontend**: Next.js 14.1.0, React 18.2.0, styled-components
- **API**: Axios для запросов к бэкенду
- **Оптимизация**: next/image, динамический импорт, useMemo/useCallback
- **Инструменты**: Lodash (debounce), ESLint
- **Хранилище изображений**: Firebase Storage
- **Развёртывание**: Vercel
