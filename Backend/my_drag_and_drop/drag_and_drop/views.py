from django.http import HttpResponse, JsonResponse
from bs4 import BeautifulSoup
import requests
import lxml
from transformers import pipeline


generator = pipeline('text-generation', model='gpt2')

def remove_prefix(text, prefix):
    if text.startswith(prefix):
        return text[len(prefix):]
    return text

def summarize(request):
    URL = request.GET.get('url')
    try:
        response = requests.get(URL)
    except:
        return JsonResponse({"message":"Invalid URL"},status=400)
    web_page = response.text
    soup = BeautifulSoup(web_page,"lxml")
    prompt = f"Can you please describe the purpose of this website based on its title: {soup.title.string}"
    try:
        results = generator(prompt, max_length=100, num_return_sequences=1)
        summary = results[0]['generated_text']
        prefix = "Can you please describe the purpose of this website based on its title: "
        cleaned_summary = remove_prefix(summary, prefix)
    except:
        return JsonResponse({"message":"Failed to generate summary"},status=500)
    return JsonResponse({"message":f"{cleaned_summary}"},status=200) 

