# Flujo React + TypeScript para obtener y mostrar datos

Este documento resume cómo viajan los datos en la app, desde la page hasta la API y de regreso a la UI.

## 1) Capa base de API (`lib/api.ts`)

- `apiFetch(path, options)` centraliza todas las llamadas HTTP.
- Obtiene el token desde `localStorage` y lo envía en header `Authorization: Bearer ...`.
- Agrega `Content-Type: application/json` por defecto.
- Si la respuesta es `401`, limpia token y redirige a `/`.
- Parsea la respuesta con `res.text()` + `JSON.parse` para tolerar respuestas vacías.
- Si `res.ok` es `false`, lanza error con código HTTP.

## 2) Servicios por dominio (`features/*/services/*`)

Cada dominio encapsula endpoints concretos y delega en `apiFetch`:

- Síntomas: `getUserSymptoms`, `createUserSymptom`, `updateUserSymptom`, `deleteUserSymptom`, `getDaily`, `upsertDaily`, etc.
- Enfermedades: `getUserConditions`, `createUserCondition`, `updateUserCondition`, `deleteUserCondition`.
- Cirugías: `getUserSurgeries`, `createUserSurgery`, `updateUserSurgery`, `deleteUserSurgery`.

La UI nunca llama `fetch` directo en componentes de dominio; usa estos servicios.

## 3) Hooks de estado + efectos (`features/*/hooks/*`)

Los hooks coordinan ciclo de vida React y consumo de servicios:

- `useUserSymptoms`:
  - `fetchSymptoms()` llama a `getUserSymptoms`.
  - Guarda datos en `symptoms` y `filtered`.
  - Calcula `selected` con `useMemo` desde `selectedId`.
  - Implementa `search(query)` en memoria (filtra por nombre).
  - Implementa `remove(id)` (DELETE + actualización optimista local).

- `useSymptomDetail`:
  - Sincroniza notas del síntoma seleccionado.
  - Debounce de 800ms con `useDebounce`.
  - Autosave de notas con `updateUserSymptom` cuando cambia el texto.

- `useSymptomDaily`:
  - Carga intensidad diaria con `getDaily(symptomId, date)`.
  - Debounce de 300ms para intensidad.
  - Hace autosave con `upsertDaily` y estado visual `saving/saved/error`.

Patrón equivalente en `useUserConditions` y `useUserSurgeries`.

## 4) Pages (composición UI)

Las pages conectan componentes visuales con hooks:

- `app/dashboard/symptoms/page.tsx`:
  - Obtiene `selected` desde querystring (`useSearchParams`).
  - Invoca `useUserSymptoms(initialSelectedId)`.
  - Renderiza:
    - `DashboardHeader` (buscador + botón añadir)
    - `SymptomList` (lista)
    - `SymptomDetail` (detalle)
    - `SymptomModal` (alta/edición)

El flujo en runtime:

1. Page monta -> hook ejecuta `fetchSymptoms()` en `useEffect`.
2. Servicio llama endpoint -> `apiFetch` agrega token y envía request.
3. Respuesta vuelve -> hook actualiza estado React.
4. Estado nuevo re-renderiza `SymptomList` y `SymptomDetail`.
5. Interacciones de usuario (buscar, editar, slider, notas, eliminar) disparan nuevas llamadas por servicios.

## 5) Debounce (utilidad transversal)

`hooks/useDebounce.ts` retorna una versión retrasada de un valor para evitar llamadas excesivas (por ejemplo autosave mientras el usuario escribe o mueve sliders).

## 6) Dashboard general

- `app/dashboard/page.tsx` usa `getDashboard()` para una vista agregada.
- `lib/dashboard.tsx` delega en `apiFetch('/dashboard')`.
- Si faltan datos de perfil (peso/altura), redirige a onboarding.
