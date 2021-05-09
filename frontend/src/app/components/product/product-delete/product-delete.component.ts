import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { Product } from "../product.model";
import { ProductService } from "../product.service";

@Component({
  selector: "app-product-delete",
  templateUrl: "./product-delete.component.html",
  styleUrls: ["./product-delete.component.css"],
})
export class ProductDeleteComponent {
  constructor(
    private productService: ProductService,
    private router: Router,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: Product
  ) {}

  confirmDelete(): void {
    this.productService.delete(this.data.id).subscribe(() => {
      this.productService.showMessage({
        message: "Produto deletado com sucesso!",
      });
      this.onCancel();
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
