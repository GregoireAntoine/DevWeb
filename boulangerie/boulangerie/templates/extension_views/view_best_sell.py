from ...models import   Order, Product, ProductCategory, OrderLine

### récupère dans la table produit le count_sold de chacun de eux, et récupère les 3 plus grand pour pouvoir les afficher dans les best-sellersµ

def bestsell():
   Product.objects.all().order_by('count_sold')[:10]:3
    
