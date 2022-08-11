from django.contrib import admin
from .models import Order, Product, ProductCategory, OrderLine
from django.utils.safestring import mark_safe


class ProductCategoryAdmin(admin.ModelAdmin):
    list_display = ["name", "available_on_website"]

    ###def save_model(self,request,obj,form,change):
    ###   if 'available_on_website' in form.changed_data :
    ###      Product.objects.filter(product_category_id=obj.id).update(available_on_website=obj.available_on_website)
    ###  return super().save_model(request, obj, form, change)


admin.site.register(ProductCategory, ProductCategoryAdmin)


class ProductAdmin(admin.ModelAdmin):
    list_display = [
        "name",
        "price",
        "product_category_id",
        "count_sold",
        "available_on_website",
    ]
    search_fields = ["name", "price"]
    list_filter = ["product_category_id", "available_on_website"]
    ordering = ("id", "name")


admin.site.register(Product, ProductAdmin)


class OrderAdmin(admin.ModelAdmin):
    list_display = [
        "ref",
        "user_id",
        "date_order",
        "date_takeaway",
        "total_quantity",
        "total_price",
    ]


admin.site.register(Order, OrderAdmin)


class OrderLineAdmin(admin.ModelAdmin):
    list_display = ["order_id", "product_id", "price", "quantity", "image"]


admin.site.register(OrderLine, OrderLineAdmin)
