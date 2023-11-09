from django.db import models
from django.db.models.signals import pre_save
from django.utils.text import slugify
from django.conf import settings

User = settings.AUTH_USER_MODEL


class Product(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=125)
    slug = models.SlugField(blank=True, null=True)
    image = models.ImageField(upload_to="products/")
    brand = models.CharField(max_length=125, blank=True, null=True)
    category = models.ForeignKey(
        "Category", on_delete=models.CASCADE, blank=True, null=True
    )
    description = models.TextField()
    rating = models.DecimalField(max_digits=7, decimal_places=2, blank=True, null=True)
    numReviews = models.IntegerField(blank=True, null=True, default=0)
    price = models.DecimalField(max_digits=7, decimal_places=2, blank=True, null=True)
    countinStock = models.IntegerField(blank=True, null=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Category(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    name = models.CharField(max_length=125)
    slug = models.SlugField(blank=True, null=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Categories"
        verbose_name_plural = "Categories"


def handle_slug(sender, instance, *args, **kwargs):
    try:
        if instance.slug is None or isinstance.slug == "":
            new_slug = slugify(instance.name)
            klass = instance.__class__
            qs = klass.objects.filter(slug__icontains=new_slug).exclude(
                _id=instance._id
            )
            if qs.count() == 0:
                instance.slug = new_slug
            else:
                instance.slug = f"{new_slug}-{qs.count()}"
    except:
        pass


pre_save.connect(handle_slug, sender=Product)
pre_save.connect(handle_slug, sender=Category)


class Review(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    name = models.CharField(max_length=125)
    rating = models.IntegerField(blank=True, null=True, default=0)
    comment = models.TextField(max_length=1000)
    create = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


#
