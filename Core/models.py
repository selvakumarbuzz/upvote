from django.db import models
from django.db import connection

def get_login(str1, str2):
    cursor = connection.cursor()
    cursor.callproc("sp_Login_Get", (0, str1, converttoascii(str2), ''))
    columns = [d[0] for d in cursor.description]
    ldict = [dict(zip(columns, row)) for row in cursor.fetchall()]
    cursor.execute('select @_sp_Login_Get_3')
    id = cursor.fetchone()
    ldist = [ldict, id]
    return ldist

def converttoascii(password):
    l = len(password)
    newuser = ''
    for i in range(0, l):
        tmp = ord(password[i])
        temp = tmp - l
        g = len(str(temp))
        newuser = newuser + ("0" if g < 3 else "") + str(temp)
    return newuser

