
// Particles
(function(){
  const c=document.getElementById('particles');
  if(!c) return;
  for(let i=0;i<28;i++){
    const p=document.createElement('div');
    p.className='particle';
    p.style.left=Math.random()*100+'%';
    p.style.animationDuration=(8+Math.random()*12)+'s';
    p.style.animationDelay=Math.random()*10+'s';
    p.style.width=p.style.height=(2+Math.random()*3)+'px';
    if(Math.random()>0.5)p.style.background='var(--c-accent)';
    c.appendChild(p);
  }
})();

// Mobile nav
const navBtn=document.getElementById('navBtn');
if(navBtn){
  navBtn.addEventListener('click',()=>{document.getElementById('navLinks').classList.toggle('open')});
  document.querySelectorAll('.nav-links a').forEach(a=>{
    a.addEventListener('click',()=>{document.getElementById('navLinks').classList.remove('open')});
  });
}

// Scroll reveal
(function(){
  if(!('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));
    return;
  }
  const obs=new IntersectionObserver((entries)=>{
    entries.forEach((e,i)=>{
      if(e.isIntersecting){
        setTimeout(()=>e.target.classList.add('visible'),i*80);
        obs.unobserve(e.target);
      }
    });
  },{threshold:0.1});
  document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));
})();

// Video modal
function setupVideoModal(){
  const modal=document.getElementById('videoModal');
  const mWrap=document.getElementById('modalVideoWrap');
  const mTitle=document.getElementById('modalTitle');
  if(!modal) return;
  function closeModal(){modal.classList.remove('active');mWrap.innerHTML='';document.body.style.overflow=''}
  document.querySelectorAll('.course-card').forEach(card=>{
    card.addEventListener('click',()=>{
      const bvid=card.dataset.bvid,p=card.dataset.p||'',title=card.dataset.title;
      const src=`https://player.bilibili.com/player.html?bvid=${bvid}${p?'&p='+p:''}&autoplay=1&high_quality=1`;
      mWrap.innerHTML=`<iframe src="${src}" allowfullscreen allow="autoplay"></iframe>`;
      mTitle.textContent=title;
      modal.classList.add('active');
      document.body.style.overflow='hidden';
    });
  });
  const closeBtn=document.getElementById('modalClose');
  if(closeBtn) closeBtn.addEventListener('click',closeModal);
  modal.addEventListener('click',e=>{if(e.target===modal)closeModal()});
  document.addEventListener('keydown',e=>{
    if(e.key==='Escape'){
      closeModal();
      if(typeof closeDocModal==='function') closeDocModal();
    }
  });
}

// Course dual filter + path jump + reorder
function setupCourseFilters(){
  const grid=document.getElementById('coursesGrid');
  if(!grid) return;
  let activeCategory='all', activePath='all';
  function applyCourseFilters(){
    grid.querySelectorAll('.course-card').forEach(c=>{
      const okCat=activeCategory==='all'||c.dataset.category===activeCategory;
      const okPath=activePath==='all'||c.dataset.path===activePath;
      c.style.display=(okCat&&okPath)?'':'none';
    });
  }
  document.querySelectorAll('.filter-tab').forEach(tab=>{
    tab.addEventListener('click',()=>{
      document.querySelectorAll('.filter-tab').forEach(t=>t.classList.remove('active'));
      tab.classList.add('active');
      activeCategory=tab.dataset.filter;
      applyCourseFilters();
    });
  });
  document.querySelectorAll('.path-chip').forEach(chip=>{
    chip.addEventListener('click',()=>{
      document.querySelectorAll('.path-chip').forEach(c=>c.classList.remove('active'));
      chip.classList.add('active');
      activePath=chip.dataset.path;
      applyCourseFilters();
    });
  });
  document.querySelectorAll('[data-jump-path]').forEach(el=>{
    el.addEventListener('click',()=>{
      const p=el.getAttribute('data-jump-path');
      const chip=document.querySelector('.path-chip[data-path="'+p+'"]');
      if(chip) chip.click();
    });
  });
  // honor ?path= query
  const q=new URLSearchParams(location.search).get('path');
  if(q){
    const chip=document.querySelector('.path-chip[data-path="'+q+'"]');
    if(chip) chip.click();
  }
  // reorder by path
  const order={arcgis:0,intro:1,'1d':2,advanced:3};
  const cards=Array.from(grid.querySelectorAll('.course-card'));
  cards.sort((a,b)=>(order[a.dataset.path]??9)-(order[b.dataset.path]??9));
  cards.forEach(c=>grid.appendChild(c));
}

// Doc TOC active
function setupDocToc(){
  const tocLinks=document.querySelectorAll('.toc-link');
  const sections=[];
  tocLinks.forEach(link=>{
    const id=link.getAttribute('href')?.replace('#','');
    if(id){const el=document.getElementById(id);if(el)sections.push({el,link})}
  });
  if(!sections.length||!('IntersectionObserver' in window))return;
  const obs2=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        tocLinks.forEach(l=>l.classList.remove('active'));
        const match=sections.find(s=>s.el===e.target);
        if(match)match.link.classList.add('active');
      }
    });
  },{rootMargin:'-20% 0px -70% 0px'});
  sections.forEach(s=>obs2.observe(s.el));
}

// Doc detail modal (requires docs-data.js)
function setupDocModal(){
  const docModalEl=document.getElementById('docModal');
  if(!docModalEl||typeof docContent==='undefined') return;
  const docModalBody=document.getElementById('docModalBody');
  const docModalTitle=document.getElementById('docModalTitle');
  const docModalLink=document.getElementById('docModalLink');
  window.openDocModal=function(key){
    const d=docContent[key];
    if(!d) return;
    docModalTitle.textContent=d.title;
    docModalBody.innerHTML=d.html;
    docModalLink.href=d.link;
    docModalEl.classList.add('active');
    document.body.style.overflow='hidden';
  };
  window.closeDocModal=function(){
    docModalEl.classList.remove('active');
    document.body.style.overflow='';
  };
  document.querySelectorAll('.doc-section[data-doc]').forEach(sec=>{
    sec.addEventListener('click',()=>window.openDocModal(sec.dataset.doc));
  });
  document.getElementById('docModalClose').addEventListener('click',window.closeDocModal);
  docModalEl.addEventListener('click',e=>{if(e.target===docModalEl)window.closeDocModal()});
  const btn=document.querySelector('.doc-modal-footer .btn-primary');
  if(btn) btn.addEventListener('click',window.closeDocModal);
}

document.addEventListener('DOMContentLoaded',()=>{
  setupVideoModal();
  setupCourseFilters();
  setupDocToc();
  setupDocModal();
});
