"""Read-only film renders of the Chaos Riders Blender authoring models.
Opens the saved .blend, never saves it. Golden-hour sun + sky, shadow catcher floor,
transparent film so the car composites into the film's world.
blender -b -P film_orbit.py -- --vehicle survivor --out DIR --steps 120 --arc 360 --start 30
"""
import argparse, math, sys, hashlib
from pathlib import Path
import bpy
from mathutils import Vector
ROOT=Path('/Users/hopeatina/Code/chaos-riders-launch')
FILES={'survivor':'blender/source-attempt2/survivor-panel-rebuild-r5.blend',
       'needle':'blender/source-fleet-attempt2/needle-component-r6.blend',
       'tank':'blender/source-fleet-attempt2/tank-component-r6.blend'}
SIZE={'survivor':(2.5,5.2,2.2),'needle':(2.8,4.2,3.1),'tank':(3.1,6.8,4.1)}
a=argparse.ArgumentParser()
a.add_argument('--vehicle');a.add_argument('--out');a.add_argument('--steps',type=int,default=120)
a.add_argument('--arc',type=float,default=360);a.add_argument('--start',type=float,default=30)
a.add_argument('--elev',type=float,default=7);a.add_argument('--lens',type=float,default=50)
a.add_argument('--w',type=int,default=1600);a.add_argument('--h',type=int,default=900)
a.add_argument('--samples',type=int,default=32);a.add_argument('--fill',type=float,default=.78)
a=a.parse_args(sys.argv[sys.argv.index('--')+1:])
src=ROOT/FILES[a.vehicle];sha0=hashlib.sha256(src.read_bytes()).hexdigest()
bpy.ops.wm.open_mainfile(filepath=str(src))
for ob in list(bpy.data.objects):
    if ob.type in ('CAMERA','LIGHT') or ob.name.startswith(('GEO-QA','GEO-studio')):
        bpy.data.objects.remove(ob,do_unlink=True)
for ob in bpy.context.scene.objects:
    if ob.get('collision_proxy') or ob.get('lod_level') is not None or ob.get('highpoly_source'):ob.hide_render=True
s=bpy.context.scene
s.render.engine='CYCLES';s.cycles.samples=a.samples;s.cycles.use_denoising=True
s.cycles.use_adaptive_sampling=True;s.cycles.adaptive_threshold=.05
prefs=bpy.context.preferences.addons['cycles'].preferences
prefs.compute_device_type='METAL';prefs.get_devices()
for d in prefs.devices:d.use=d.type=='METAL'
s.cycles.device='GPU'
s.render.resolution_x=a.w;s.render.resolution_y=a.h;s.render.resolution_percentage=100
s.render.film_transparent=True;s.render.image_settings.file_format='PNG';s.render.image_settings.color_mode='RGBA'
s.view_settings.view_transform='AgX';s.view_settings.look='AgX - Medium High Contrast'
s.render.use_persistent_data=True
# world: warm dusty sky
w=s.world or bpy.data.worlds.new('W');s.world=w;w.use_nodes=True
nt=w.node_tree;nt.nodes.clear()
bg=nt.nodes.new('ShaderNodeBackground');out=nt.nodes.new('ShaderNodeOutputWorld')
sky=nt.nodes.new('ShaderNodeTexSky')
try: sky.sky_type='NISHITA';sky.sun_elevation=math.radians(14);sky.sun_rotation=math.radians(215);sky.air_density=3;sky.dust_density=6
except Exception: pass
nt.links.new(sky.outputs[0],bg.inputs[0]);bg.inputs[1].default_value=.55;nt.links.new(bg.outputs[0],out.inputs[0])
sd=bpy.data.lights.new('Sun','SUN');sd.energy=4.2;sd.color=(1,.78,.52);sd.angle=math.radians(2)
so=bpy.data.objects.new('Sun',sd);s.collection.objects.link(so);so.rotation_euler=(math.radians(72),0,math.radians(215))
for n,loc,en,col in [('rim',(-4,6,3),900,(1,.7,.4)),('fill',(-5,-4,2.5),260,(.7,.8,1))]:
    ld=bpy.data.lights.new(n,'AREA');ld.energy=en;ld.size=4;ld.color=col
    lo=bpy.data.objects.new(n,ld);s.collection.objects.link(lo);lo.location=loc
    d=Vector((0,0,1))-lo.location;lo.rotation_euler=d.to_track_quat('-Z','Y').to_euler()
bpy.ops.mesh.primitive_plane_add(size=60,location=(0,0,0));fl=bpy.context.active_object;fl.is_shadow_catcher=True
size=SIZE[a.vehicle];target=Vector((0,0,size[2]*.42))
cd=bpy.data.cameras.new('C');cd.lens=a.lens;cd.sensor_width=36
cam=bpy.data.objects.new('C',cd);s.collection.objects.link(cam);s.camera=cam
radius=math.hypot(size[0]/2,size[1]/2)
dist=radius*a.lens/(36*a.fill*.5)*.5+radius*.6
e=math.radians(a.elev);outd=Path(a.out);outd.mkdir(parents=True,exist_ok=True)
for i in range(a.steps):
    f=outd/f'{i:04d}.png'
    if f.exists():continue
    az=math.radians(a.start+a.arc*i/max(1,a.steps))
    cam.location=target+Vector((math.sin(az)*math.cos(e),-math.cos(az)*math.cos(e),math.sin(e)))*dist
    cam.rotation_euler=(target-cam.location).to_track_quat('-Z','Y').to_euler()
    s.render.filepath=str(f);bpy.ops.render.render(write_still=True);print('FRAME',a.vehicle,i,flush=True)
assert hashlib.sha256(src.read_bytes()).hexdigest()==sha0,'source changed'
