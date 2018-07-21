from django.shortcuts import render
import json
from django.http import JsonResponse
from . import models as mCore

def loginIndex(request):
    request.session.flush()
    return render(request, "Template/Upvote_Login.html")

def loginpswd(request):
    if request.method == 'POST':
        jsondata = json.loads(request.body.decode('utf-8'))
        f1 = jsondata.get('parms').get('username')
        f2 = jsondata.get('parms').get('password')
        result = mCore.get_login(f1, f2)

        if (result[1][0] == 'SUCCESS'):

            emp_id = result[0][0].get('employee_gid')
            emp_name = result[0][0].get('employee_name')

            request.session.flush()

            request.session['Emp_gid'] = emp_id
            request.session['Emp_name'] = emp_name
            request.session['Entity_gid'] = 1

            output = result[1][0]
            return JsonResponse(json.dumps(output), safe=False)
        else:
            return JsonResponse(json.dumps('FAIL'), safe=False)
    else:
        return render(request, "Template/Upvote_Login.html")

def welcomeIndex(request):
    return render(request, "welcome.html")
