from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import IdeaSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Idea

class IdeaListCreate(generics.ListCreateAPIView):
    serializer_class = IdeaSerializer
    permission_classes = [IsAuthenticated]


    def get_queryset(self):
        # Filter ideas shown to creator only 
        return Idea.objects.filter(author=self.request.user)
        # return Idea.objects.all()

    def perform_create(self, serializer):
        # Auto set the author to the currently logged-in User
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)

class IdeaDelete(generics.DestroyAPIView):
    serializer_class = IdeaSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Idea.objects.filter(author=self.request.user)

# class NoteListCreate(generics.ListCreateAPIView):
#     serializer_class = NoteSerializer
#     permission_classes = [IsAuthenticated]

#     def get_queryset(self):
#         user = self.request.user 
#         return Note.objects.filter(author=user)
    
#     def perform_create(self, serializer):
#         if serializer.is_valid():
#             serializer.save(author=self.request.user)
#         else:
#             print(serializer.errors)

# class NoteDelete(generics.DestroyAPIView):
#     queryset = NoteSerializer
#     permission_classes = [IsAuthenticated]

#     def get_queryset(self):
#         user = self.request.user
#         return Note.objects.filter(author=user)

# class CreateUserView(generics.CreateAPIView):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer
#     permission_classes = [AllowAny]

