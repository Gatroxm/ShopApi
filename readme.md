# ShopApi Backend

Este proyecto es un backend básico desarrollado con Node.js y MongoDB. Los usuarios pueden registrarse, iniciar sesión, crear sus propias tiendas y subir productos a esas tiendas, con la posibilidad de categorizar los productos.

## Características

- **Autenticación**: Los usuarios pueden registrarse e iniciar sesión.
- **Tiendas**: Cada usuario puede crear una o varias tiendas.
- **Productos**: Los usuarios pueden agregar productos a sus tiendas.
- **Categorías**: Los productos están asociados a categorías para facilitar su clasificación.

### Facturas

Este módulo permite a los dueños de tiendas generar y buscar facturas de productos vendidos. Las facturas incluyen información detallada sobre el producto, el comprador, el vendedor, la cantidad, las direcciones, y un número de factura único.

#### Endpoints de Facturas

- **POST /api/invoices**: Crear una nueva factura.

  - **Body**:
    - `productId` (String): ID del producto que se está comprando.
    - `quantity` (Number): Cantidad de productos.
  - **Respuesta**: La factura creada.

- **GET /api/invoices**: Obtener todas las facturas del usuario autenticado (comprador).

- **GET /api/invoices/search**: Buscar facturas por número de factura o por fecha.
  - **Query Parameters**:
    - `invoiceNumber` (String, opcional): Número de la factura a buscar.
    - `startDate` (String, opcional): Fecha de inicio para la búsqueda (formato `YYYY-MM-DD`).
    - `endDate` (String, opcional): Fecha de fin para la búsqueda (formato `YYYY-MM-DD`).
  - **Respuesta**: Lista de facturas que coinciden con los criterios de búsqueda.

#### Ejemplos de Uso

- **Buscar por Número de Factura**:

  ```bash
  GET /api/invoices/search?invoiceNumber=INV-1691505285000-123
  ```

- **Buscar por Fechas**:
  ```bash
  GET /api/invoices/search?startDate=2022-01-01&endDate=2022-12-31
  ```
- **Buscar Por rango de fechas**:
  ```bash
  GET /api/invoices/search?startDate=2022-01-01&endDate=2022-12-31
  ```

## Tecnologías

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [JWT (JSON Web Tokens)](https://jwt.io/)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [CORS](https://www.npmjs.com/package/cors)

## Requisitos

- Node.js (v14 o superior)
- MongoDB (v4 o superior)

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/tu-usuario/mercado-clone-backend.git
   cd mercado-clone-backend
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Crea un archivo `.env` en la raíz del proyecto con las siguientes variables de entorno:

   ```bash
    MONGO_URI=mongodb://localhost:27017/mercado-clone
    JWT_SECRET=your_jwt_secret_key
   ```

4. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
   El servidor se ejecutará `http://localhost:5000`.

## Estructura del Proyecto

    ```bash
        ./backend
        ├── /config          # Configuración de la base de datos y otros parámetros
        ├── /controllers     # Lógica de negocio (registro, login, gestión de tiendas y productos)
        ├── /models          # Modelos de Mongoose (User, Store, Product, Category)
        ├── /routes          # Definición de rutas (auth, stores, products, categories)
        ├── /middleware      # Middleware (autenticación, validación)
        ├── /utils           # Utilidades y funciones auxiliares
        ├── server.js        # Punto de entrada del servidor
        ├── .env             # Variables de entorno
        ├── .gitignore       # Archivos y directorios que no se deben incluir en el repositorio
        ├── package.json     # Dependencias y scripts de npm
        └── README.md        # Documentación del proyecto
    ```

## API Endpoints

### Auth

| Método | Ruta                 | Descripción               |
| ------ | -------------------- | ------------------------- |
| `POST` | `/api/auth/register` | Registra un nuevo usuario |
| `POST` | `/api/auth/login`    | Autentica un usuario      |

### Stores

| Método | Ruta          | Descripción                                  |
| ------ | ------------- | -------------------------------------------- |
| `POST` | `/api/stores` | Crea una nueva tienda                        |
| `GET`  | `/api/stores` | Obtiene todas las tiendas del usuario actual |

### Products

| Método | Ruta                     | Descripción                               |
| ------ | ------------------------ | ----------------------------------------- |
| `POST` | `/api/products`          | Crea un nuevo producto                    |
| `GET`  | `/api/products/:storeId` | Obtiene todos los productos de una tienda |

### Categories

| Método   | Ruta                  | Descripción                  |
| -------- | --------------------- | ---------------------------- |
| `POST`   | `/api/categories`     | Crea una nueva categoría     |
| `GET`    | `/api/categories`     | Obtiene todas las categorías |
| `DELETE` | `/api/categories/:id` | Elimina una categoría        |

## Contribuir

Si deseas contribuir al proyecto, puedes hacerlo de varias maneras:

- Haz un fork del proyecto.
- Crea una nueva rama (git checkout -b feature/nueva-funcionalidad).
- Realiza los cambios y haz commit (git commit -m 'Añadir nueva funcionalidad').
- Sube los cambios a tu rama (git push origin feature/nueva-funcionalidad).
- Abre un Pull Request.

## Autor

[GatroxM](https://github.com/gatroxm)
