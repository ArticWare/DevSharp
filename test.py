from ursina import *
import copy

app=Ursina()

Sky()
EditorCamera()

a=Entity(model='cube', color=color.red)
b=Entity(x=2, color=color.blue)
b.model=copy.deepcopy(a.model)

app.run()