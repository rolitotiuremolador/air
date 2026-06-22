import pytest
from django.urls import reverse
from rest_framework import status
from django.contrib.auth import get_user_model

User = get_user_model()

@pytest.mark.django_db
def test_user_registration(client):
    url = reverse('register')
    data = {'username': 'testuser', 'password': 'testpassword123'}
    response = client.post(url, data, format='json')
    assert response.status_code == status.HTTP_201_CREATED
    assert User.objects.count() == 1
    assert User.objects.get().username == 'testuser'

@pytest.mark.django_db
def test_get_token(client):
    # Setup: create user
    User.objects.create_user(username='testuser', password='testpassword123')
    
    # Action: get token
    url = reverse('get_token')
    data = {'username': 'testuser', 'password': 'testpassword123'}
    response = client.post(url, data, format='json')
    
    assert response.status_code == status.HTTP_200_OK
    assert 'access' in response.data