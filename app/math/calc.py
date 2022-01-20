import random
import math

days = 5
value=5
f=2
tc=1
pc=1
mc=1

def percentage(val,days):
    print(val*100/days)

def inc(days,value,f):
    value=  value+1+(days-value)*value/days/f**2
    return value,days+1

def dec(days,value,f):
    component = (4-value/days)*f**(-2-days*0.05)
    if(component<0.15):
        component = 0.10+random.random()/10
    value = (1-component)*value
    percentage(value,days)
    return value,f+1

def thought(days,value,c):
    value = (value-(c**2)*math.sqrt(days)/100)
    percentage(value,days)

    return value ,c+1


def media(days,value,c,tc):
    value = (value-((c+tc*0.8)**2)*math.sqrt(days)/80)
    percentage(value,days)
    return value ,c+1

def po(days,value,c,tc,mc):
    value = (value-((c+(tc+mc)*0.2)**2)*math.sqrt(days)/20)
    percentage(value,days)
    return value ,c+1

value,tc = thought(days,value,tc)
value,tc = thought(days,value,tc)
value,tc = thought(days,value,tc)

value,mc = media(days,value,mc,tc)
value,mc = media(days,value,mc,tc)

value,pc = po(days,value,pc,mc,tc)
value,pc = po(days,value,pc,mc,tc)

value,f=dec(days,value,f)









