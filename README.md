````markdown
# MiFichaMed Frontend

Frontend web de **MiFichaMed**, desarrollado con **Next.js** y **React**, que proporciona una interfaz moderna para la gestión de fichas médicas personales. La aplicación consume la API REST del backend y permite a los usuarios administrar su historial clínico mediante una experiencia intuitiva y responsive.

El proyecto está organizado siguiendo una arquitectura basada en **features**, separando claramente la lógica de negocio, los componentes reutilizables y la comunicación con la API.

---

# Características

- Interfaz web moderna y responsive.
- Autenticación de usuarios.
- Registro de nuevas cuentas.
- Onboarding para completar el perfil.
- Dashboard con resumen clínico.
- Gestión de enfermedades.
- Gestión de síntomas.
- Registro diario de síntomas.
- Gestión de tratamientos.
- Gestión de alergias.
- Gestión de cirugías.
- Gestión del perfil médico.
- Generación y descarga de informes médicos.
- Componentes reutilizables.
- Hooks personalizados para la lógica de negocio.
- Comunicación centralizada con la API REST.

---

# Tecnologías

| Tecnología | Uso |
|------------|-----|
| TypeScript | Lenguaje principal |
| React | Biblioteca UI |
| Next.js (App Router) | Framework |
| Tailwind CSS | Estilos |
| Lucide React | Iconografía |
| Motion | Animaciones |
| Fetch API | Consumo de servicios REST |

---

# Arquitectura

El frontend sigue una arquitectura modular basada en funcionalidades (**Feature Based Architecture**).

```
Usuario

↓

Pages (App Router)

↓

Features

↓

Hooks

↓

Services

↓

API REST

↓

Backend FastAPI
```

Cada módulo mantiene encapsulada su lógica, componentes y comunicación con la API.

---

# Organización del proyecto

```
app/
│
├── dashboard/
│   ├── allergies/
│   ├── conditions/
│   ├── profile/
│   ├── report/
│   ├── surgeries/
│   ├── symptoms/
│   ├── treatments/
│   └── layout.tsx
│
├── onboarding/
│
└── page.tsx

components/

features/

hooks/

lib/

public/
```

---

# Arquitectura por Features

Cada funcionalidad importante posee su propio módulo.

Ejemplo:

```
features/

conditions/

    components/

    hooks/

    services/

    utils/

symptoms/

allergies/

treatments/

surgeries/

report/

profile/
```

Esta organización evita dependencias entre módulos y facilita la escalabilidad del proyecto.

---

# Componentes globales

El proyecto dispone de componentes reutilizables para toda la aplicación.

Entre ellos destacan:

- Sidebar
- DashboardHeader
- BaseModal
- DashboardCard
- FormField
- Input
- Select
- TextArea
- StatusSelector
- SummaryChipList
- ProtectedRoute
- LoginForm
- RegisterForm
- AuthModal
- FeatureCard

Estos componentes son utilizados por las distintas funcionalidades del sistema para mantener una interfaz consistente.

---

# Dashboard

El Dashboard constituye la pantalla principal del usuario autenticado.

Desde él es posible acceder a:

- Perfil
- Enfermedades
- Síntomas
- Tratamientos
- Alergias
- Cirugías
- Informes

La información mostrada proviene de la API del backend.

---

# Módulos funcionales

## Profile

Permite completar o editar la información clínica básica del paciente.

Se utiliza tanto durante el proceso de onboarding como posteriormente desde el Dashboard.

---

## Conditions

Permite administrar enfermedades registradas por el usuario.

Incluye:

- listado
- búsqueda
- detalle
- edición
- eliminación
- creación mediante modal

---

## Symptoms

Administra los síntomas registrados.

Además incorpora el registro diario de evolución mediante un selector de fechas.

---

## Treatments

Gestiona los tratamientos médicos asociados al usuario.

Permite visualizar, crear, editar y eliminar tratamientos.

---

## Allergies

Permite administrar las alergias registradas.

Incluye catálogo y elementos personalizados provenientes del backend.

---

## Surgeries

Administra el historial de intervenciones quirúrgicas del paciente.

---

## Reports

Permite generar informes médicos personalizados.

El usuario puede seleccionar qué información incluir antes de generar el informe.

---

# Hooks personalizados

Gran parte de la lógica del proyecto se encuentra encapsulada mediante hooks propios.

Ejemplos:

```
useFetch

useDebounce

useUserConditions

useUserSymptoms

useSymptomDetail

useSymptomDaily

useUserTreatments

useUserAllergies

useUserSurgeries

useReport
```

Estos hooks encapsulan:

- carga de datos
- actualización de estado
- filtrado
- comunicación con la API
- eliminación de registros
- sincronización de la interfaz

---

# Comunicación con la API

La comunicación con el backend está centralizada mediante la carpeta:

```
lib/
```

y particularmente mediante:

```
api.ts
```

Los servicios de cada módulo utilizan este cliente común para realizar peticiones HTTP.

Ejemplo de organización:

```
services/

conditionServices.ts

symptomServices.ts

treatmentServices.ts

allergyServices.ts

surgeryServices.ts

reportServices.ts
```

Cada servicio encapsula las operaciones REST correspondientes.

---

# Navegación

El proyecto utiliza el **App Router** de Next.js.

Las principales rutas son:

```
/

dashboard

dashboard/profile

dashboard/conditions

dashboard/symptoms

dashboard/treatments

dashboard/allergies

dashboard/surgeries

dashboard/report

onboarding/profile
```

---

# Flujo de una petición

```
Usuario

↓

Página

↓

Hook

↓

Service

↓

api.ts

↓

Backend FastAPI

↓

Respuesta JSON

↓

Actualización del estado

↓

Renderizado de la interfaz
```

---

# Gestión del estado

El proyecto utiliza principalmente el estado local de React mediante:

- useState
- useEffect
- useMemo
- useCallback

Cada feature administra su propio estado mediante hooks personalizados, evitando una dependencia de librerías externas de manejo global de estado.

---

# Diseño de la interfaz

La interfaz utiliza **Tailwind CSS** para la composición visual.

Las pantallas mantienen un diseño consistente mediante:

- tarjetas (Cards)
- modales
- formularios reutilizables
- iconografía consistente
- colores uniformes
- componentes compartidos

---

# Recursos gráficos

Los recursos estáticos se almacenan dentro de:

```
public/

images/
```

incluyendo imágenes utilizadas por la interfaz y material de presentación del proyecto.

---

# Seguridad

El frontend implementa:

- Protección de rutas mediante componentes dedicados.
- Consumo de endpoints autenticados.
- Separación entre lógica de negocio y presentación.
- Cliente HTTP centralizado.

La autenticación es gestionada mediante el backend utilizando JWT.

---

# Instalación

```bash
git clone <repositorio>

cd frontend

npm install
```

Ejecutar en modo desarrollo:

```bash
npm run dev
```

Compilar para producción:

```bash
npm run build
```

Iniciar la aplicación:

```bash
npm start
```

---

# Principios de diseño

El proyecto fue desarrollado buscando mantener:

- Arquitectura basada en features.
- Separación de responsabilidades.
- Componentes reutilizables.
- Código mantenible.
- Escalabilidad.
- Bajo acoplamiento entre módulos.
- Comunicación centralizada con la API.

---

# Estado del proyecto

El frontend proporciona una interfaz completa para la administración de la ficha médica personal del usuario. Actualmente integra autenticación, onboarding, dashboard clínico, administración de enfermedades, síntomas, tratamientos, alergias, cirugías, perfil del paciente y generación de informes médicos, consumiendo la API REST desarrollada en FastAPI mediante una arquitectura modular basada en React y Next.js.
````
