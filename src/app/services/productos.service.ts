import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: Producto[] = [];
  productosFiltrado: Producto[] = [];

  constructor(private http: HttpClient) {

    this.cargarProductos();

   }

   private cargarProductos() {

    return new Promise(  ( resolve, reject ) => {

      this.http.get('https://angular-html-25cf9.firebaseio.com/productos_idx.json')
          .subscribe( (resp: Producto[]) => {
            this.productos = resp;
            this.cargando = false;
            resolve();
          });

    });

  }

   getProducto(id:string){

      return this.http.get(`https://angular-html-ee349.firebaseio.com/productos/${ id }.json`)

   }

   buscarProducto(termino:string){

    if(this.productos.length === 0){
      //cargar productos
      this.cargarProductos().then( () => {

        //despues de tener los productos
        //aplicar filtro
        this.filtrarProducto(termino);
      });

    }else{
      //Aplicar filtro normalmente
      this.filtrarProducto(termino);
    }

   }

   private filtrarProducto(termino:string){

    console.log(this.productos);
    
    //vaciamos el arreglo cada vez que llamamos al buscar
    //Osino se agregarian constantemente mas y mas productos al buscador
    this.productosFiltrado = [];


    termino = termino.toLocaleLowerCase();

    this.productos.forEach(prod => {

      const tituloLower = prod.titulo.toLocaleLowerCase();

      if(prod.categoria.indexOf(termino) >= 0 || tituloLower.indexOf(termino) >= 0){
          this.productosFiltrado.push(prod);
      }

    });

   }

}
