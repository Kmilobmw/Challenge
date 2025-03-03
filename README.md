# Recaudo Contra Entrega - Pruebas API
Pruebas automatizadas para el servicio de *Recaudo Contra Entrega* de Coordinadora, implementadas con Playwright y el patrón Screenplay.

## 📑 Descripción

Este proyecto valida el comportamiento del API de generación de guías con el servicio de Recaudo Contra Entrega, asegurando:
- Creación exitosa de guías
- Validación de reglas de negocio (ej: rangos de valores, campos obligatorios)
- Respuestas de error según la documentación oficial

## ✅ Escenarios Cubiertos

1. Creación exitosa con datos válidos
2. Validación de valor mínimo (valorRecaudar < 1)
3. Validación de valor máximo (valorRecaudar > 16,000,000)
4. Referencia de recaudo vacía
5. Omisión de campo obligatorio (valorRecaudar)
6. Límites inferior (1) y superior (16,000,000)
7. Referencia con caracteres especiales
8. Datos mínimos requeridos
9. Longitud máxima de referencia (31 caracteres)

## 🛠 Tecnologías

- *Playwright*: Automatización de pruebas API
- *Screenplay Pattern*: Organización de código limpio y mantenible
- *JavaScript*: Lenguaje de implementación

## ⚙️ Configuración

### Prerrequisitos
- Node.js ≥ v18
- npm ≥ v9

### Instalación
bash
git clone https://github.com/tu-usuario/recaudo-contra-entrega.git
cd recaudo-contra-entrega
npm install

## 🚀 Ejecución de Pruebas
``
npx playwright test recaudo-contra-entrega.spec.js
``

##  📑 Generar Reporte HTML:
``
npx playwright show-report
``

## 📂 Estructura del Proyecto

tests/
├── recaudo-contra-entrega.spec.js    # Archivo principal de pruebas
└── screenplay/
    ├── actors/                       # Roles (Usuario del sistema)
    ├── abilities/                    # Habilidades (Ej: Realizar peticiones API)
    ├── tasks/                        # Acciones (Ej: Crear guía)
    ├── questions/                    # Validaciones (Ej: Códigos de estado)
    └── models/                       # Modelos de datos (Ej: Solicitud de guía)
