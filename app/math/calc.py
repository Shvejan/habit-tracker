import random
import math

days = 4
value=4
f=2
tc=1
pc=1
mc=1

def percentage(val,days):
    print(val*100/days)

def inc(days,value,f):
  value = value + 1 + ((days - value) * value) / days / f ** 2;
  return (value,days+1) if days else (days,days+1)

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
    value = (value-((c+(tc+mc+2)*0.2)**2)*math.sqrt(days)/20)
    percentage(value,days)
    return value ,c+1

def decision (days, value, f):
  value = value - (f[4] ** 2 * math.sqrt(days)) / 10
  percentage(value, days)
  f[4] += 1;

  return [value, f]


# print(inc(1,0,2))
v,d = inc(days=1,value=0,f=2)
print(v)

v,d=inc(d,v,2)
print(v)

v,d=inc(d,v,2)
print(v)


print(v)
print(d)





