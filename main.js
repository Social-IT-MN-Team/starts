import { Component } from './src/core/component.js';
import { Router } from './src/core/router.js';

// Elemento DOM donde se renderizarán los componentes
const container = document.getElementById('main');

// Crear una instancia del Router con el contenedor
const router = new Router({ container });

// Configurar las rutas según sea necesario
const routesConfig = {
  routes: [
    // Define las rutas y sus componentes aquí
    // Ejemplo:
    // { path: '/button', component: ButtonComponent },
    // { path: '/counter', component: CounterComponent },
  ],
};
router.setRoutes(routesConfig.routes);

// Ahora, puedes utilizar el router y el núcleo para gestionar y renderizar componentes en tu aplicación.
// Sin embargo, como no hay clases hijas (como ButtonComponent o CounterComponent) definidas aquí,
// necesitarás crearlas en otros archivos y luego importarlas aquí para utilizarlas con el Router.
