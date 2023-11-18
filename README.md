# PRYECTO EPAGAL - BACKEND

_Servidor backend para el poryecto de EPAGAL, lenguaje principal JAVASCRIPT_

### Pre-requisitos 📋

```
node        --version --> v12.18.2
npm         --version -->  6.14.5
sequelize   --version -->  6.5.0
```

### Instalación 🔧

_Ejecutar_

```
npm install
```

## Despliegue 📦

_proximamente_

## Construido con 🛠️

_Lenguaje JavaScript_

* [NODE JS](https://nodejs.org/es/) - Servidro web
* [EXPRESS](https://expressjs.com/es/) - Framework
* [SEQUELIZE](https://sequelize.org/master/index.html) - ORM - Un ORM es un modelo de programación que permite mapear las estructuras de una base de datos relaciona
* [POSTGRESQL](https://www.postgresql.org/) - Base de datos

## Contribuyendo 🖇️



## Wiki 📖

Lista de rutas:

* Tabla ***Tipos de Desperdicio***

| EndPoint | Parametros | Descripción |
| --- | --- | --- |
| `/api/tipodedesperdicio` | - | Listar todos los tipos de desperdicio  |
| `/api/tipodedesperdicio/:id_tipo_desperdicio` | ID del tipo de desperdicio | Obtener solo un tipo de desperdicio |
| `/api/tipodedesperdicio/crear` | JSON en el body de la petición. ``` {  "nombre":"xyz","detalle":"detalle xyz" }``` | Guardar el tipo de desperdicio |


## Versionado 📌

0.0.4

## Autores ✒️

* **Oscar Toaquiza** 

## Licencia 📄

MIT
