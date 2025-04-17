from django.test import TestCase
from rest_framework.test import APITestCase


class UsuarioAPITest(APITestCase):
    #def test_crear_usuario(self):
    #    url = "/api/usuarios/crear/"
    #    data = {
    #        "nombre": "Juan",
    #        "apellido": "Pérez",
    #        "run": "12345678-9",
    #        "correo": "juan.perez@example.com",
    #        "contraseña": "12345Aa!",
    #        "rol": "cliente",
    #    }
    #    response = self.client.post(url, data, format="json")
    #    self.assertEqual(response.status_code, 201)
#
    #def test_obtener_usuarios(self):
    #    url = "/api/usuarios/"
    #    response = self.client.get(url)
    #    self.assertEqual(response.status_code, 200)
    #    
    #def test_obtener_usuario(self):
    #    url = "/api/usuarios/1/"
    #    response = self.client.get(url)
    #    self.assertEqual(response.status_code, 200)
    #    
    #def test_actualizar_usuario(self):
    #    url = "/api/usuarios/1/actualizar"
    #    data = {
    #        "nombre": "Juan",
    #        "apellido": "Pérez",
    #        "run": "98765432-1",
    #        "correo": "test@correo.cl",
    #        "contraseña": "12345Aa!",
    #        "rol": "cliente",
    #    }
    #    response = self.client.put(url, data, format="json")
    #    self.assertEqual(response.status_code, 200)
        
    def test_crear_usuario_con_rol_invalido(self):
        url = "/api/usuarios/crear"
        data = {
            "nombre": "Juan",
            "apellido": "Pérez",
            "correo": "juan.perez@example.com",
            "clave": "password123",
            "run": "12345678-9",
            "rol": "inexistente"  # Rol inválido
        }
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, 400)
        self.assertIn("rol", response.data)
        self.assertEqual(response.data["rol"], "El rol proporcionado no existe.")
        
        