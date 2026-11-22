import{mkdirSync,readdirSync,readFileSync,writeFileSync}from'node:fs';
import{join}from'node:path';
function run(p,q){
 const D=new Int32Array(256),C=new Int32Array(64),M=new Int32Array(256),o=[];
 let s=0,c=0,pc=0,ip=0,n=0;
 const f=x=>({o,x});
 for(;;){
  if(n===1e6)return f(10);
  if(pc<0||pc>=p.length)return f(9);
  const b=p[pc];
  let im=b==1?1:b==2?4:b>47&&b<52?2:0,po=0,pu=0;
  if(b<3)pu=b?1:0;
  else if(b<8){po=[1,1,2,2,3][b-3];pu=[0,2,2,3,3][b-3];}
  else if(b>15&&b<35&&b!=31){po=b==23||b==27?1:2;pu=1;}
  else if(b>47&&b<53)po=b==49||b==50?1:0;
  else if(b==64){po=1;pu=1;}
  else if(b==65)po=2;
  else if(b>79&&b<84){po=b==82?0:1;pu=b==82?1:0;}
  else return f(5);
  if(pc+im>=p.length)return f(9);
  n++;
  const nx=pc+1+im;
  if(s<po)return f(2);
  if(s-po+pu>256)return f(3);
  pc=nx;
  switch(b){
   case 0:return{x:0,o};
   case 1:D[s++]=(p[pc-1]<<24)>>24;break;
   case 2:D[s++]=p[pc-4]|p[pc-3]<<8|p[pc-2]<<16|p[pc-1]<<24;break;
   case 3:s--;break;
   case 4:D[s]=D[s-1];s++;break;
   case 5:{const t=D[s-1];D[s-1]=D[s-2];D[s-2]=t;break;}
   case 6:D[s]=D[s-2];s++;break;
   case 7:{const a=D[s-3];D[s-3]=D[s-2];D[s-2]=D[s-1];D[s-1]=a;break;}
   case 23:D[s-1]=-D[s-1]|0;break;
   case 27:D[s-1]=~D[s-1];break;
   case 48:case 49:case 50:{
    const r=((p[pc-2]|p[pc-1]<<8)<<16)>>16;
    let t=b==48;
    if(b!=48){const v=D[--s];t=b==49?v==0:v!=0;}
    if(t)pc+=r;
    break;}
   case 51:
    if(c==64)return f(7);
    C[c++]=pc;pc=p[pc-2]|p[pc-1]<<8;break;
   case 52:
    if(c==0)return f(8);
    pc=C[--c];break;
   case 64:{const a=D[s-1];if(a<0||a>255)return f(6);D[s-1]=M[a];break;}
   case 65:{const a=D[s-1],v=D[s-2];if(a<0||a>255)return f(6);s-=2;M[a]=v;break;}
   case 80:{const w=String(D[s-1]);if(o.length+w.length>65536)return f(11);s--;for(let i=0;i<w.length;i++)o.push(w.charCodeAt(i));break;}
   case 81:if(o.length+1>65536)return f(11);o.push(D[--s]&255);break;
   case 82:D[s++]=ip<q.length?q[ip++]:-1;break;
   case 83:return{x:D[--s]&255,o};
   default:{
    const y=D[s-1],a=D[s-2];let r;
    if(b==16)r=a+y|0;
    else if(b==17)r=a-y|0;
    else if(b==18)r=Math.imul(a,y);
    else if(b==19){if(!y)return f(4);r=a==-2147483648&&y==-1?a:(a/y)|0;}
    else if(b==20){if(!y)return f(4);r=y==-1?0:a%y|0;}
    else if(b==21){if(!y)return f(4);r=Math.floor((a>>>0)/(y>>>0))|0;}
    else if(b==22){if(!y)return f(4);r=(a>>>0)%(y>>>0)|0;}
    else if(b==24)r=a&y;
    else if(b==25)r=a|y;
    else if(b==26)r=a^y;
    else if(b==28)r=a<<(y&31);
    else if(b==29)r=a>>(y&31);
    else if(b==30)r=a>>>(y&31)|0;
    else if(b==32)r=a==y?1:0;
    else if(b==33)r=a<y?1:0;
    else r=(a>>>0)<(y>>>0)?1:0;
    s-=2;D[s++]=r;
   }
  }
 }
}
const I=process.env.MAKEFUN_INPUT_DIR??'/input',O=process.env.MAKEFUN_OUTPUT_DIR??'/output';
for(const id of readdirSync(I).sort()){
 const r=run(readFileSync(join(I,id,'program.bin')),readFileSync(join(I,id,'input.bin')));
 mkdirSync(join(O,id),{recursive:true});
 writeFileSync(join(O,id,'stdout.bin'),Uint8Array.from(r.o));
 writeFileSync(join(O,id,'exit.txt'),r.x+'\n');
}
