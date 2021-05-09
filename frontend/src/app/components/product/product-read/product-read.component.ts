import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ProductDeleteComponent } from "../product-delete/product-delete.component";
import { Product } from "../product.model";
import { ProductService } from "../product.service";

@Component({
  selector: "app-product-read",
  templateUrl: "./product-read.component.html",
  styleUrls: ["./product-read.component.css"],
})
export class ProductReadComponent implements OnInit {
  products: Product[];

  displayedColumns = ["id", "name", "price", "action"];

  constructor(
    private productService: ProductService,
    public dialog: MatDialog
  ) {}

  openDialog(product: Product): void {
    const dialogRef = this.dialog.open(ProductDeleteComponent, {
      width: "500px",
      data: product,
    });

    dialogRef.afterClosed().subscribe(() => this.getProducts());
  }

  getProducts(): void {
    this.productService.read().subscribe((products) => {
      this.products = products;
    });
  }

  ngOnInit(): void {
    this.getProducts();
  }
}
