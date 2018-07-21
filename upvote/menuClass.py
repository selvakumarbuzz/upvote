from django import template
from Core import menumodel_class


register = template.Library()
class Task():
    def foo(self):
        return "bar"


# @register.tag(name="any_function")
# @register.simple_tag(takes_context=True)
# @register.inclusion_tag('mainLayout.html')
@register.simple_tag(takes_context=True)
def any_function(context):
    request=context['request']
    if(context['request'].session.get('Emp_gid',None)== None):
         return False
    else:
        result = menumodel_class.menulist(1)
        if (result[1][0] == 'FOUND'):
            output =list(result[0])
        return output

@register.filter
def filter_parent(menu):
    er= len(menu)
    t=filter(lambda p:p['menu_parent_gid']==0,menu)
    r=sorted(t,key=lambda k:k['menu_displayorder'])
    return r

@register.filter
def filter_children(menu_id,menu):
    t=filter(lambda p:p['menu_parent_gid']==menu_id,menu)
    r = sorted(t, key=lambda k: k['menu_displayorder'])
    return r

@register.filter
def checkLength(menu_id,menu):
    t = filter(lambda p: p['menu_parent_gid'] == menu_id, menu)
    r = sorted(t, key=lambda k: k['menu_displayorder'])
    return len(r)