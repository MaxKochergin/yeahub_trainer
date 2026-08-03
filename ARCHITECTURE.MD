# Project Architecture Guide

Универсальная методичка по архитектуре, соглашениям и паттернам.
Не привязана к конкретному домену — применима в любом React-проекте.

---

## Содержание

1. [Architecture — FSD](#1-architecture--fsd)
2. [Path Aliases](#2-path-aliases)
3. [State Management](#3-state-management)
4. [Code Style](#4-code-style)
5. [Naming Conventions](#5-naming-conventions)
6. [Patterns Used](#6-patterns-used)
7. [How to Run](#7-how-to-run)

---

## 1. Architecture — FSD

Проект построен по методологии **Feature-Sliced Design (FSD)**.

### Структура слоёв

```
src/
├── app/        # Инициализация приложения
├── pages/      # Страницы (роуты)
├── widgets/    # Сложные самодостаточные UI-блоки
├── features/   # Пользовательские действия / бизнес-логика
├── entities/   # Бизнес-сущности
└── shared/     # Переиспользуемые утилиты, UI-кит, конфиги
```

### Правила импортов (что куда может обращаться)

```
app      → pages, widgets, features, entities, shared
pages    → widgets, features, entities, shared
widgets  → features, entities, shared
features → entities, shared
entities → shared
shared   → ничего из src (только внешние пакеты)
```

**Главное правило:** каждый слой импортирует только слои **ниже** себя.
Импорт из слоя выше — запрещён. Импорт между соседями одного слоя — запрещён.

### Структура внутри слайса

Каждый слайс (например `entities/user`) имеет одинаковую структуру:

```
entities/user/
├── api/        # Запросы к серверу
├── model/      # Типы, константы, хуки модели
├── ui/         # React-компоненты
│   └── user-card/
│       ├── UserCard.tsx
│       ├── UserCard.module.scss
│       └── index.ts        # Реэкспорт только публичного API
└── index.ts    # Публичный API слайса
```

### Public API (index.ts)

Каждый слайс экспортирует наружу **только** то, что нужно другим слоям.
Внутренние детали реализации не экспортируются.

```ts
// entities/user/index.ts — только публичное
export { UserCard } from './ui/user-card';
export type { User } from './model/types';
export { useGetUsersQuery } from './api/userApi';
```

Снаружи всегда импортируют через корневой `index.ts` слайса:

```ts
// Правильно
import { UserCard } from '@/entities/user';

// Неправильно — залезаем во внутренности
import { UserCard } from '@/entities/user/ui/user-card/UserCard';
```

---

## 2. Path Aliases

Вместо относительных путей (`../../shared/ui`) используется алиас `@/`, который всегда указывает на папку `src/`.

```ts
// До
import { Button } from '../../../shared/ui/Button';

// После
import { Button } from '@/shared/ui/Button';
```

### Где настраивается

Алиас нужно прописать в **двух** местах одновременно:

**`vite.config.ts`** — для сборщика:

```ts
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
```

**`tsconfig.app.json`** — для TypeScript и IDE:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

> Если настроить только одно место — либо IDE будет показывать ошибки, либо сборка упадёт.

### Добавление нового алиаса

Если нужен ещё один алиас (например `#types`), добавить в оба файла:

```ts
// vite.config.ts
alias: {
  '@': path.resolve(__dirname, 'src'),
  '#types': path.resolve(__dirname, 'src/shared/types'),
}
```

```json
// tsconfig.app.json
"paths": {
  "@/*": ["src/*"],
  "#types/*": ["src/shared/types/*"]
}
```

---

## 3. State Management

В проекте используются **три разных инструмента** для трёх разных задач.
Смешивать их назначения — антипаттерн.

### RTK Query — серверное состояние (data fetching)

Для загрузки, кэширования и синхронизации данных с сервером.

**Когда использовать:** список сущностей, детальная страница, любые GET/POST/PUT/DELETE запросы.

Принцип организации — один базовый `createApi` в `shared/api/baseApi.ts`, каждая entity инжектирует свои endpoint'ы:

```ts
// shared/api/baseApi.ts
export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: ['Tag1', 'Tag2'],
  endpoints: () => ({}),
});
```

```ts
// entities/something/api/somethingApi.ts
export const somethingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getItems: builder.query<Response, Params>({
      query: (params) => ({ url: '/items', params }),
    }),
  }),
});

export const { useGetItemsQuery } = somethingApi;
```

Это позволяет держать endpoint'ы рядом с сущностью, а не в одном огромном файле.

### Context API — UI-состояние

Для глобального UI-состояния, которое не нужно хранить на сервере и не влияет на URL.

**Когда использовать:** открыт ли сайдбар, мобильное меню, тема оформления.

Разделяем контекст и провайдер на два файла:

```ts
// SomePanelContext.ts — только тип и createContext
export type SomePanelCtx = {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
};

export const SomePanelContext = createContext<SomePanelCtx | null>(null);
```

```ts
// SomePanelProvider.tsx — логика и состояние
export const SomePanelProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SomePanelContext.Provider value={{ isOpen, toggle: () => setIsOpen(p => !p), close: () => setIsOpen(false) }}>
      {children}
    </SomePanelContext.Provider>
  );
};
```

Доступ через кастомный хук:

```ts
// useSomePanel.ts
export const useSomePanel = () => {
  const ctx = useContext(SomePanelContext);
  if (!ctx) throw new Error('useSomePanel must be used within SomePanelProvider');
  return ctx;
};
```

### URL Search Params — состояние фильтров

Для фильтров, пагинации, поиска — всего, что должно сохраняться при обновлении страницы и шариться через ссылку.

**Когда использовать:** фильтры списка, поисковый запрос, номер страницы, любые параметры, которые пользователь должен иметь возможность передать в URL.

```ts
const [searchParams, setSearchParams] = useSearchParams();

const page = Number(searchParams.get('page') ?? '1');
const query = searchParams.get('query') ?? '';

const setPage = (p: number) => {
  setSearchParams(prev => { prev.set('page', String(p)); return prev; }, { replace: true });
};
```

### Когда что использовать — шпаргалка

| Вопрос | Инструмент |
|---|---|
| Данные с сервера? | RTK Query |
| Открыт/закрыт элемент UI? | Context API или useState |
| Фильтр / поиск / страница? | URL Search Params |
| Глобальный счётчик, корзина? | Redux slice |

---

## 4. Code Style

### ESLint

Линтер проверяет качество кода и единый стиль.

Ключевые плагины:
- `typescript-eslint` — правила для TypeScript
- `eslint-plugin-react-hooks` — правила `exhaustive-deps`, корректный порядок хуков

Запуск:

```bash
npm run lint
```

### Prettier

Форматирует код автоматически. Не спорим о пробелах — просто запускаем.

Запуск:

```bash
npm run format
```

### Husky + lint-staged (pre-commit hooks)

Перед каждым коммитом **автоматически** запускается lint + format для изменённых файлов.
Коммит не пройдёт, если есть ошибки линтера.

Настроено в `package.json`:

```json
"lint-staged": {
  "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
  "*.{js,json,scss,md}": ["prettier --write"]
}
```

> Это означает: ты не можешь случайно закоммитить "грязный" код.

### Инициализация в новом проекте

```bash
npm install -D husky lint-staged
npx husky init
echo "npx lint-staged" > .husky/pre-commit
```

---

## 5. Naming Conventions

### Файлы и папки

| Что | Стиль | Пример |
|---|---|---|
| Папки слайсов | `kebab-case` | `question-card/` |
| React-компоненты | `PascalCase.tsx` | `QuestionCard.tsx` |
| Хуки | `camelCase.ts` с префиксом `use` | `useDebounce.ts` |
| Утилиты / хелперы | `camelCase.ts` | `mapFiltersToQuery.ts` |
| Типы | `camelCase.ts` | `types.ts` |
| Стили | `ComponentName.module.scss` | `QuestionCard.module.scss` |
| Индексы | `index.ts` | `index.ts` |
| Константы | `camelCase.ts` или `constants.ts` | `constants.ts` |

### Компоненты

```tsx
// Именованный экспорт (не default)
export const UserCard = ({ name, age }: Props) => { ... };

// Props описывать как отдельный тип
type Props = {
  name: string;
  age: number;
};
```

> Не использовать `export default` — именованные экспорты лучше для рефакторинга и автоимпорта IDE.

### Хуки

- Всегда начинаются с `use`: `useDebounce`, `useMobilePanel`
- Один хук — одна ответственность
- Хуки из `shared/lib/hooks` — универсальные (без бизнес-логики)
- Хуки из `features/*/model` — с бизнес-логикой конкретной фичи

### Интерфейсы и типы

```ts
// Интерфейсы — для объектов и props
interface UserCard { ... }

// type — для union, пересечений, утилит
type Status = 'active' | 'inactive' | 'pending';
type UserWithMeta = User & { meta: Meta };
```

---

## 6. Patterns Used

### Provider Composition

Все провайдеры оборачиваются в один корневой компонент. Каждый провайдер — отдельный файл с одной ответственностью.

```tsx
// app/providers/AppProviders.tsx
export const AppProviders = ({ children }) => (
  <StoreProvider>
    <RouterProvider>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </RouterProvider>
  </StoreProvider>
);
```

### Custom Hook как единица логики

Логика не живёт в компонентах — она выносится в хуки. Компонент только рендерит.

```ts
// Хук инкапсулирует всю логику
const useFilters = () => { ... return { filters, setFilter, reset } };

// Компонент только использует
const FiltersPanel = () => {
  const { filters, setFilter } = useFilters();
  return <div>...</div>;
};
```

### Skeleton Screen

Вместо спиннера показываются заглушки, повторяющие форму реального контента. Это снижает ощущение загрузки.

```tsx
if (isLoading) return <ItemListSkeleton />;
```

`Skeleton` — переиспользуемый компонент из `shared/ui` с параметрами `height`, `width`, `borderRadius`.

### URL как источник состояния (URL as State)

Фильтры и пагинация хранятся в URL, а не в Redux. Преимущества:
- Сохраняются при F5
- Можно поделиться ссылкой с нужными фильтрами
- Кнопка "назад" в браузере работает корректно

### Route Constants + Path Helpers

Все маршруты — константы. Для динамических маршрутов — хелпер-функция:

```ts
export const ROUTES = {
  HOME: '/',
  ITEM_DETAIL: '/items/:id',
} as const;

export const getItemPath = (id: number | string) => `/items/${id}`;
```

### Debounce Hook

Задержка значения для инпутов поиска — не делать запрос на каждый символ:

```ts
const debouncedQuery = useDebounce(query, 300);
useEffect(() => { fetchData(debouncedQuery) }, [debouncedQuery]);
```

### Collapsible (Accordion)

Разворачиваемый контент с локальным состоянием и `aria-expanded` для доступности:

```tsx
const [isOpen, setIsOpen] = useState(false);
<button aria-expanded={isOpen} onClick={() => setIsOpen(p => !p)}>...</button>
{isOpen && <div>...</div>}
```

---

## 7. How to Run

```bash
# Установить зависимости
npm install

# Запустить дев-сервер (порт 3000)
npm run dev

# Собрать продакшн-билд
npm run build

# Предпросмотр продакшн-билда
npm run preview

# Проверить код линтером
npm run lint

# Отформатировать весь код
npm run format
```
