import requests
from rest_framework.decorators import api_view
from rest_framework.response import Response

JUDGE0_URL = 'https://judge0-ce.p.rapidapi.com/submissions/?base64_encoded=false&wait=true'
HEADERS = {
    "X-RapidAPI-Key": "e6702dea22mshd949f6a55ea88dep1f43a1jsn0df63cdf8efc",
    "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com"
}

@api_view(['POST'])
def ejecutar_codigo(request):
    source_code = request.data.get("code")
    language_id = 71  # Python 3

    payload = {
        "source_code": source_code,
        "language_id": language_id
    }

    try:
        response = requests.post(JUDGE0_URL, headers=HEADERS, json=payload)

        if response.status_code == 200:
            result = response.json()
            output = result.get('stdout')
            error = result.get('stderr') or result.get('compile_output')

            return Response({
                "output": output,
                "error": error
            })

        else:
            return Response({"error": "Error al ejecutar el código"}, status=response.status_code)

    except requests.exceptions.RequestException as e:
        return Response({"error": f"Error de conexión con Judge0: {str(e)}"}, status=500)
