from django.http import HttpResponse
from django.shortcuts import render
from upvote.settings import BASE_DIR

def index(request):
    #print(BASE_DIR)
    return render(request, "main/Upvote_Login.html")
    #return HttpResponse("Hello, world. You're at the polls index.")



def loginIndex(request):
   # request.session.flush()
    return render(request, "Usermanagement/Upvote_Login.html")