def add(a,b):
    carry=0
    a=list(map(int,list(bin(a)[2:])))
    b=list(map(int,list(bin(b)[2:])))
    if len(a)>len(b):
        for _ in range(len(a)-len(b)):
            b.insert(0,0)
    elif len(b)>len(a):
        for _ in range(len(b)-len(a)):
            a.insert(0,0)
    a.reverse()
    b.reverse()
    s=[]
    for i in range(len(a)):
        r=a[i]+b[i]+carry
        carry=0
        if r==2:
            r=0
            carry+=1
        elif r==3:
            r=1
            carry+=1
        s.append(r)
    if carry:
        s.append(carry)
    s.reverse()
    return int(''.join(s),2)
add(11,13)