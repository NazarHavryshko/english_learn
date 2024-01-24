from rest_framework import mixins
from rest_framework.viewsets import GenericViewSet


class ExtendedGenericViewSet(GenericViewSet):
    pass


class ListViewSet(ExtendedGenericViewSet, mixins.ListModelMixin):
    pass


class CRUViewSet(ExtendedGenericViewSet,
                 mixins.CreateModelMixin,
                 mixins.RetrieveModelMixin,
                 mixins.UpdateModelMixin,
                 ):
    pass


class CRUDViewSet(CRUViewSet,
                  mixins.DestroyModelMixin):
    pass


class ListCreateDestroyUpdateViewSet(ExtendedGenericViewSet,
                                     mixins.CreateModelMixin,
                                     mixins.UpdateModelMixin,
                                     mixins.ListModelMixin,
                                     mixins.DestroyModelMixin):
    pass
