from django.urls import path
from .views import (
    salesperson_delete_edit_view,
    salesperson_list_or_create,
    customer_edit_view_delete,
    customer_list_or_create,
    sale_list_create,
    sale_delete_edit_view,
    )




urlpatterns = [
    path("salespeople/", salesperson_list_or_create),
    path("salespeople/<int:id>/", salesperson_delete_edit_view),
    path("customers/", customer_list_or_create),
    path("customers/<int:id>/", customer_edit_view_delete),
    path("sales/", sale_list_create),
    path("sales/<int:id>", sale_delete_edit_view),
]
