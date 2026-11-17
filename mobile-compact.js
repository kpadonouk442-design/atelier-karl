/* MODE COMPACT MOBILE (≤ 700 px) : regroupe les blocs longs derrière une flèche qu'on touche pour déplier.
   La liste des blocs à replier est réglée ici, site par site. Sur ordinateur, rien ne change. */
(function(){
  if(!matchMedia('(max-width:700px)').matches) return;
  var site=document.documentElement.getAttribute('data-site');
  var A='<i aria-hidden="true">▾</i>';
  function btn(title,target){
    var b=document.createElement('button');b.type='button';b.className='mf-h';b.innerHTML='<span>'+title+'</span>'+A;b.setAttribute('aria-expanded','false');
    b.addEventListener('click',function(){var o=target.classList.toggle('mf-open');b.classList.toggle('mf-on',o);b.setAttribute('aria-expanded',o);});
    return b;
  }
  /* Bloc entier replié derrière un bouton placé juste avant lui */
  function fold(sel,title){document.querySelectorAll(sel).forEach(function(el){if(el.dataset.mf||el.closest('dialog,[role=dialog],[aria-modal],.modal,.drawer,.quote,.overlay'))return;el.dataset.mf=1;el.classList.add('mf-body');el.parentNode.insertBefore(btn(title,el),el);});}
  /* Colonnes de pied de page : le titre en gras devient le bouton */
  function cols(sel){document.querySelectorAll(sel).forEach(function(col,i){if(i===0||col.dataset.mf)return;var b=col.querySelector('b');if(!b)return;col.dataset.mf=1;
    var body=document.createElement('div');body.className='mf-body';while(b.nextSibling)body.appendChild(b.nextSibling);col.appendChild(body);
    var h=btn(b.textContent,body);h.classList.add('mf-col');b.replaceWith(h);});}
  var C={
    goi:function(){cols('footer .fcols>div');fold('form','Remplir le formulaire');},
    kasa:function(){cols('footer .fgrid>div');fold('#hostForm','Proposer mon logement');},
    ebene:function(){cols('footer .fgrid>div');fold('main dl, section dl','Adresse, horaires et accès');},
    kubik:function(){cols('footer .fgrid>div');fold('#specs table,#specs dl,#specs .spec-grid','Voir les caractéristiques');},
    baingres:function(){cols('footer .fgrid>div');fold('.visit-dl','Adresse, horaires et accès');fold('#cform','Écrire un message');fold('.pro ul','Nos services aux pros');fold('.sidebar','Filtrer les produits');},
    shop:function(){},
    studio:function(){fold('#cform','Écrire un message');}
  };
  function run(){if(C[site])C[site]();}
  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',run):run();
})();
