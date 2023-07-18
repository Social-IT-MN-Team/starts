class Router {
    constructor(routes, container) {
      this.routes = routes; // Array de objetos que contienen información sobre las rutas y los componentes asociados
      this.container = container; // Elemento DOM donde se renderizarán los componentes
    }
  
    async navigate(path) {
      const route = this.routes.find(r => r.path === path); // Buscar la ruta correspondiente en el arreglo de rutas
      if (route) {
        const { componentPath } = route; // Obtener la ruta del módulo del componente asociado
        // Cargar dinámicamente el módulo del componente utilizando import()
        const componentModule = await import(componentPath);
        // Obtener la clase del componente del módulo cargado (por defecto o con .default)
        const ComponentClass = componentModule.default || componentModule;
        // Cargar y mostrar el componente
        this.loadComponent(ComponentClass);
      }
    }
  
    loadComponent(ComponentClass) {
      // Limpiar el contenedor antes de cargar el nuevo componente
      this.container.innerHTML = '';
  
      // Crear una instancia del componente y renderizarlo dentro del contenedor
      const componentInstance = new ComponentClass({ container: this.container });
      componentInstance.render();
    }
}
  