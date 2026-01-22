# ⬢ HEXADLE

> **Master Hexadecimal conversion through play.**
> Un juego estilo Wordle diseñado para estudiantes de Ciencias de la Computación y entusiastas de la programación.

<img width="1915" height="972" alt="image" src="https://github.com/user-attachments/assets/0c1bad28-e8f0-4d29-a848-67161d1d9f43" />

## 🧠 Sobre el Proyecto

**Hexadle** no es solo un juego de adivinanzas; es una herramienta educativa interactiva. El objetivo es ayudar a los desarrolladores a desarrollar una **intuición hexadecimal** (Base 16), una habilidad fundamental para entender direcciones de memoria, colores web y bajo nivel.

A diferencia de un convertidor estático, Hexadle te obliga a **pensar** en potencias de 16 ($16^0, 16^1, 16^2...$) para deducir el código correcto basado en un número decimal objetivo.

## ✨ Características Principales

### 🎮 Mecánica de Juego
* **Reto Infinito:** Convierte números decimales (ej. `40960`) a su representación Hex (`A000`).
* **Feedback Visual:**
    * 🟩 **Verde:** Dígito correcto en la posición correcta.
    * 🟨 **Amarillo:** El dígito existe en el código, pero en otra posición.
    * ⬛ **Gris:** El dígito no existe.

### 🎓 Herramientas Educativas (Smart Learning)
* **Modo Manual (ℹ️):** Guía interactiva que enseña el método de "Divisiones Sucesivas" y la tabla de conversión Decimal-Hex. 
<img width="1915" height="972" alt="image" src="https://github.com/user-attachments/assets/d5f96f5a-eaf9-42b1-925a-7cb021253d00" />
  
* **Sistema de Pistas Inteligente (💡):** Detecta cuando el reto es nivel "Experto" (4 cifras o más) y calcula dinámicamente **puntos de anclaje matemáticos**.
    * *Ejemplo:* "Tu número está cerca de 40960 ($16^3 \times 10$), intenta empezar con A...".
<img width="1915" height="972" alt="image" src="https://github.com/user-attachments/assets/6ae5965b-2346-4c9c-925a-ff21f84f406a" />

* **Validación Estricta:** El sistema evita errores de sintaxis y gestiona el foco del cursor para una experiencia de usuario fluida.

## 🛠️ Tech Stack & Arquitectura

El proyecto fue construido siguiendo principios de **Clean Code**, **SOLID** y metodologías ágiles de desarrollo.

| Área | Tecnología | Uso & Patrones |
| :--- | :--- | :--- |
| **Frontend** | React + TypeScript | Componentes funcionales, Hooks avanzados (`useMemo`, `useCallback`) para integridad referencial. |
| **Backend** | Node.js + Fastify | API REST de alto rendimiento con arquitectura en capas. |
| **Persistencia** | Prisma ORM | Modelado de datos declarativo y migraciones seguras. |
| **Testing** | Vitest + Mocks | Metodología **TDD** con aislamiento de dependencias. |
| **Estilos** | Tailwind CSS | Diseño responsivo y Grid Layout. |

## 🏗️ Ingeniería de Software (Backend Deep Dive)

El backend no es solo un servidor; es una implementación robusta de principios de diseño de software.

### 🧪 TDD (Test Driven Development)
El desarrollo siguió el ciclo *Red-Green-Refactor*. Se escribieron primero las pruebas unitarias para la lógica de validación Hexadecimal y generación de retos, asegurando la fiabilidad del núcleo del juego antes de escribir la implementación.
* **Mocking:** Se utilizaron Mocks para aislar la capa de servicios de la base de datos, permitiendo pruebas rápidas y deterministas.

### 🏛️ Arquitectura & Patrones de Diseño
El sistema sigue una arquitectura limpia para respetar los principios **SOLID**, destacando:

1.  **Repository Pattern (Persistencia):**
    * Uso de **Prisma** como capa de abstracción de datos. El código de negocio no conoce SQL, interactúa con repositorios tipados.
2.  **Service Layer (El Orquestador):**
    * Se implementó un `GameService` que actúa como orquestador principal. Este servicio encapsula la lógica de negocio (reglas del juego, validación de intentos) y coordina entre el controlador y la persistencia.
3.  **Dependency Injection:**
    * Los servicios y repositorios están desacoplados, lo que facilita la escalabilidad y el testing.

## 🚀 Instalación y Ejecución

Clona el repositorio e instala las dependencias:

```bash
# 1. Clonar repositorio
git clone [https://github.com/tu-usuario/hexadle.git](https://github.com/tu-usuario/hexadle.git)

# 2. Entrar a la carpeta
cd hexadle

# 3. Instalar dependencias
npm install

# 4. Configurar variables de entorno (Base de datos)
cp .env.example .env
npx prisma generate

# 5. Correr servidor de desarrollo
npm run dev
