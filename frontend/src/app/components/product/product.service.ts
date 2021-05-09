import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { EMPTY, Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { METHODS } from "src/app/utils/enum";
import { Product } from "./product.model";

interface ShowMessage {
  message: string;
  isError?: boolean;
}

@Injectable({
  providedIn: "root",
})
export class ProductService {
  private baseURL = "http://localhost:3001/products";

  constructor(private snackBar: MatSnackBar, private http: HttpClient) {}

  showMessage({ message, isError = false }: ShowMessage): void {
    this.snackBar.open(message, "x", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: [isError ? "error" : "success"],
    });
  }

  handleError(type: string): Observable<any> {
    const message = `Erro ao ${type}!`;
    this.showMessage({ message, isError: true });
    return EMPTY;
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseURL, product).pipe(
      map((product) => product),
      catchError(() => this.handleError(METHODS.CREATE))
    );
  }

  read(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseURL).pipe(
      map((product) => product),
      catchError(() => this.handleError(METHODS.READ))
    );
  }

  readById(id: string): Observable<Product> {
    const url = `${this.baseURL}/${id}`;
    return this.http.get<Product>(url).pipe(
      map((product) => product),
      catchError(() => this.handleError(METHODS.READ))
    );
  }

  update(product: Product): Observable<Product> {
    const url = `${this.baseURL}/${product.id}`;
    return this.http.put<Product>(url, product).pipe(
      map((product) => product),
      catchError(() => this.handleError(METHODS.UPDATE))
    );
  }

  delete(id: number): Observable<Product> {
    const url = `${this.baseURL}/${id}`;
    return this.http.delete<Product>(url).pipe(
      map((product) => product),
      catchError(() => this.handleError(METHODS.DELETE))
    );
  }
}
