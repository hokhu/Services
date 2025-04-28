
import requests
from django.shortcuts import render

JUDGE0_URL = 'https://judge0-ce.p.rapidapi.com/submissions/?base64_encoded=false&wait=true'
HEADERS = {
    "X-RapidAPI-Key": "e6702dea22mshd949f6a55ea88dep1f43a1jsn0df63cdf8efc",
    "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com"
}

def index(request):
    output = None
    error = None
    error_message = None  # Variable para mostrar errores generales

    if request.method == "POST":
        source_code = request.POST.get("code")
        language_id = 71  # Python 3

        payload = {
            "source_code": source_code,
            "language_id": language_id
        }

        try:
            response = requests.post(JUDGE0_URL, headers=HEADERS, json=payload)

            if response.status_code == 200:  # Estado 200 es el correcto para una respuesta exitosa
                result = response.json()
                output = result.get('stdout')
                error = result.get('stderr') or result.get('compile_output')

                if error:
                    error_message = f"Error: {error}"  # Si hay errores, mostrarlos
            else:
                error_message = f"Error al ejecutar el código. Estado: {response.status_code}"

        except requests.exceptions.RequestException as e:
            error_message = f"Error de conexión con Judge0: {str(e)}"

    return render(request, 'ejecutor/index.html', {
        "output": output,
        "error": error,
        "error_message": error_message  # Pasa el mensaje de error al contexto
    })

