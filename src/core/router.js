export class Router {
    constructor(options) {
      this.routes = [];
      this.container = options.container || null;
    }
  
    setRoutes(routes) {
      this.routes = routes;
    }
  
    async navigate(path) {
      const route = this.routes.find(r => r.path === path);
      if (route) {
        const { component } = route;
        this.loadComponent(component);
      }
    }
  
    loadComponent(ComponentClass) {
      this.container.innerHTML = '';
      const componentInstance = new ComponentClass({ container: this.container });
      componentInstance.render();
    }
  }
  