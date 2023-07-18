export class Component {
    constructor(options) {
      this.props = options.props || {};
      this.state = options.state || {};
      this.events = {};
      this.container = options.container || null;
      this.renderedContent = null;
    }
  
    setState(newState) {
      this.state = { ...this.state, ...newState };
      this.render();
    }
  
    on(eventName, callback) {
      if (!this.events[eventName]) {
        this.events[eventName] = [];
      }
      this.events[eventName].push(callback);
    }
  
    emit(eventName, data) {
      const eventCallbacks = this.events[eventName] || [];
      eventCallbacks.forEach(callback => callback(data));
    }
  
    render() {
      if (this.container) {
        const { state, props } = this;
  
        if (this.renderedContent !== null && !this.shouldUpdate(state, props)) {
          this.container.innerHTML = '';
          this.container.appendChild(this.renderedContent);
        } else {
          const content = this.renderContent(state, props);
  
          const fragment = document.createDocumentFragment();
          fragment.appendChild(content);
  
          const clonedFragment = fragment.cloneNode(true);
  
          this.container.innerHTML = '';
          this.container.appendChild(clonedFragment);
  
          this.renderedContent = clonedFragment;
        }
      }
    }
  
    shouldUpdate(newState, newProps) {
        // Función para comparar objetos de manera profunda
        const deepCompare = (obj1, obj2) => {
            // Si no son objetos, simplemente compararlos con operador de igualdad
            if (typeof obj1 !== 'object' || obj1 === null || typeof obj2 !== 'object' || obj2 === null) {
                return obj1 === obj2;
            }
        
            // Obtener las claves de ambos objetos
            const keys1 = Object.keys(obj1);
            const keys2 = Object.keys(obj2);
        
            // Si tienen diferentes números de claves, no son iguales
            if (keys1.length !== keys2.length) {
                return false;
            }
        
            // Verificar cada clave en obj1
            for (const key of keys1) {
                // Si la clave no existe en obj2, no son iguales
                if (!obj2.hasOwnProperty(key)) {
                return false;
                }
        
                // Comparar los valores de las claves recursivamente
                if (!deepCompare(obj1[key], obj2[key])) {
                return false;
                }
            }
        
            // Si no se encontraron diferencias, los objetos son iguales
            return true;
        };
    
        // Comprobar si tanto el estado como las propiedades han cambiado
        const propsChanged = !deepCompare(this.props, newProps);
        const stateChanged = !deepCompare(this.state, newState);
    
        // Devolver true si el componente debe actualizarse, o false si el contenido renderizado puede ser reutilizado sin cambios.
        return propsChanged || stateChanged;
    }
  
  
    renderContent(state, props) {
      throw new Error('El método "renderContent" debe ser implementado en las clases hijas.');
    }
  }
  