# Frontend-Wompi ⚡️

**Frontend para pasarela de pago (Wompi)** — proyecto en React + Vite con tests automatizados (Jest + Testing Library). Este README explica cómo correr, testear y contribuir al proyecto de forma rápida y ordenada.

---

## 📌 Resumen

- **Stack:** React (19) + Vite + Redux Toolkit
- **Testing:** Jest, @testing-library/react, @testing-library/jest-dom
- **Transformación:** Babel (preset-env + preset-react) para soporte JSX/ESM en tests
- **Objetivos principales:**
  - **Pruebas:** Implementar pruebas *unitarias* y de *integración* para servicios, slices y componentes (mocks y tests reales donde aplique).
  - **Integración con API:** Conectar los flujos con la API (entornos local/staging) y cubrir llamadas reales con pruebas e2e o mocks según corresponda.
  - **Validación de campos:** Asegurar validaciones robustas (Yup) y agregar tests que verifiquen casos límite y mensajes de error.
  - **Páginas y UX:** Crear/ajustar páginas críticas (Product, Payment, Summary, TransactionStatus) con tests de interacción (formularios, navegación, mensajes de error/éxito).
  - **Thunks / Flujos asíncronos:** Probar rutas de éxito y fallo de thunks (uso de `rejectWithValue`), y manejar estados loading/error en UI.
  - **Pruebas end-to-end (E2E):** Integrar E2E (Cypress o Playwright) para los flujos críticos de pago y confirmación.
  - **CI y calidad:** Agregar jobs en CI para ejecutar tests y bloqueo de merges por cobertura mínima.
  - **Accesibilidad & Performance:** Audits básicos y tests/claves para asegurar usabilidad.
  - **Documentación y seguimiento:** Mantener tareas y roadmap en README/Issues para priorizar y asignar trabajo.

---

## 🚀 Requisitos

- Node.js >= 18
- npm (o yarn/pnpm)

> Asegúrate de tener instalado Node en una versión reciente para soportar VM modules usados en la configuración de tests.

---

## 📦 Instalación

1. Instala dependencias:

```bash
npm install
```

2. (Opcional) Configura variables de entorno en `.env` o exporta:

```bash
# ejemplo para desarrollo local
export VITE_API_URL=http://localhost:5173
```

**Nota importante sobre CORS (desarrollo local)** 🔒

Para que el frontend se ejecute correctamente en tu entorno local con Vite, el backend debe permitir peticiones CORS desde la URL del servidor de Vite. Asegúrate de que la configuración de CORS del backend incluya la siguiente URL:

```js
const allowedOrigins = [
  'http://localhost:5173' // Vite en local
];
```

Si esta entrada no está incluida, el front fallará al intentar conectarse al backend en desarrollo local debido a restricciones de CORS. Asegúrate de añadirla en el entorno de desarrollo o en la configuración del servidor local.

---

## 🧰 Scripts importantes

- `npm run dev` — Inicia Vite en modo desarrollo
- `npm run build` — Genera la build de producción
- `npm test` — Ejecuta Jest (modo desarrollo, sin coverage)
- `npm run test:ci` — Ejecuta Jest con cobertura (útil en CI)
- `npm run lint` — Ejecuta ESLint

> Para ejecutar un test específico:
> ```bash
> npm test -- tests/pages/PaymentPage.test.js
> # o con jest directamente
> npx jest tests/pages/PaymentPage.test.js
> ```

---

## ✅ Testing & Cobertura

- Ejecuta la suite con coverage:

```bash
npm run test:ci
```

- Reporte: Jest genera carpeta `coverage/` con `index.html` (abrelo en el navegador).
- Cobertura actual: hemos llevado la cobertura global por encima del **80%**. Puedes establecer umbrales en CI si deseas bloquear merges con cobertura baja.

---

## 🧪 Cómo están organizadas las pruebas

- `tests/` — carpeta raíz de tests replicando la estructura de `src/`
  - `tests/pages/` — pruebas de componentes/páginas con `@testing-library/react` (envuelto con `Provider` + `MemoryRouter`)
  - `tests/features/` — tests de reducers y slices (smoke tests + thunks)
  - `tests/services/` — tests unitarios para llamadas a `api` (mocks de axios)
  - `tests/schemas/` — validaciones (Yup)

---

## 👨‍💻 Autor

**Kevin Quintero**
Ingeniero Informatico, Desarrollador Full Stack y Técnico en Sistemas

