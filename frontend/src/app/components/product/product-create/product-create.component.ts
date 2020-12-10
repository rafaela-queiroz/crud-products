import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { take } from "rxjs/operators";
import { Product } from "../product.model";
import { ProductService } from "../product.service";

@Component({
  selector: "app-product-create",
  templateUrl: "./product-create.component.html",
  styleUrls: ["./product-create.component.css"],
})
export class ProductCreateComponent implements OnInit {
  product: Product = {
    name: "",
    price: null,
  };

  constructor(private productService: ProductService, private router: Router) {}

  createProduct(): void {
    this.productService
      .create(this.product)
      .pipe(take(1))
      .subscribe(() => {
        this.productService.showMessage("Produto criado com sucesso!");
        this.router.navigate(["/products"]);
      });
  }

  cancel(): void {
    this.router.navigate(["/products"]);
  }

  ngOnInit(): void {}
}
