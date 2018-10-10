var mb=(f,...p)=>(o,i=o[f])=>i&&p[0]!=null?mb(...p)(i):i;

module.exports = mb;
