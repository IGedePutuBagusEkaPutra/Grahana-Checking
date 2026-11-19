import "./style.css";
import { CATEGORIES, STATUSES, SEED_BUSINESSES } from "./data.js";
import { validateBusiness, safeHttpUrl, parseBusinessArray } from "./security.js";
import { loadBusinesses, saveBusinesses, loadHistory, saveHistory } from "./store.js";

let businesses = loadBusinesses();
let historyItems = loadHistory();
let selectedCategory = "all";
const $ = id => document.getElementById(id);
const el = (tag, cls, value) => { const node=document.createElement(tag); if(cls) node.className=cls; if(value!==undefined) node.textContent=value; return node; };
const formatDate = value => new Date(value).toLocaleString("id-ID",{dateStyle:"medium",timeStyle:"short"});
const publicView = $("public-view"), dashboardView = $("dashboard-view");
const businessDialog = $("business-dialog"), detailDialog = $("detail-dialog");

function toast(message) {
  const box=$("toast"); box.textContent=message; box.classList.add("show");
  window.setTimeout(()=>box.classList.remove("show"),2600);
}
function addHistory(action,target) {
  historyItems.unshift({id:`h-${crypto.randomUUID()}`,action,target,at:new Date().toISOString()});
  historyItems=historyItems.slice(0,200); saveHistory(historyItems);
}
function persist() { saveBusinesses(businesses); renderAll(); }

const PHOTO_BY_CATEGORY = {
  Accommodation: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1100&q=85",
  Restaurant: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1100&q=85",
  Mall: "https://images.unsplash.com/photo-1519567241046-5f2c6c8b3f4b?auto=format&fit=crop&w=1100&q=85"
};
function businessPhoto(b) {
  const name = b.name.toLowerCase();
  if (name.includes("ubud") || name.includes("villa") || name.includes("stay")) return "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1100&q=85";
  if (name.includes("coastal") || name.includes("resort")) return "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1100&q=85";
  if (name.includes("coffee") || name.includes("warung") || name.includes("restaurant") || name.includes("kitchen")) return "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1100&q=85";
  return PHOTO_BY_CATEGORY[b.category] || PHOTO_BY_CATEGORY.Accommodation;
}

function renderPublic() {
  const q=$("search-input").value.trim().toLocaleLowerCase("id");
  const sort=$("sort-select").value;
  let list=businesses.filter(b => (selectedCategory==="all" || b.category===selectedCategory) && `${b.name} ${b.location} ${b.category}`.toLocaleLowerCase("id").includes(q));
  list.sort((a,b)=>sort==="name-desc"?b.name.localeCompare(a.name):sort==="category"?a.category.localeCompare(b.category)||a.name.localeCompare(b.name):a.name.localeCompare(b.name));
  const grid=$("business-grid"); grid.replaceChildren();
  $("public-total").textContent=String(businesses.length).padStart(2,"0");
  if(!list.length){grid.append(el("p","empty-state","Tidak ada usaha yang cocok. Coba kata kunci atau kategori lain."));return;}
  list.forEach((b,i)=>{
    const card=el("article","business-card");
    const art=el("div",`business-art art-${(i%4)+1}`);
    const photo=el("img","business-photo");
    photo.src=businessPhoto(b);
    photo.alt=`Foto representatif kategori ${b.category} di Bali`;
    photo.loading="lazy";
    photo.decoding="async";
    photo.referrerPolicy="no-referrer";
    photo.addEventListener("error",()=>{photo.remove();art.classList.add("photo-fallback");},{once:true});
    art.append(photo,el("span","art-category",b.category),el("span","art-number",String(i+1).padStart(2,"0")));
    const body=el("div","business-card-body");
    body.append(el("p","card-location",`⌖ ${b.location}`),el("h3","",b.name),el("p","card-description",b.description));
    const meta=el("div","card-meta");meta.append(el("span","info-pill",`${b.facilities.length} fasilitas`),el("span","public-status","Informasi demo"));
    const action=el("button","card-link","Lihat informasi ↗");action.type="button";action.addEventListener("click",()=>showDetails(b.id));
    body.append(meta,action);card.append(art,body);grid.append(card);
  });
}
function showDetails(id) {
  const b=businesses.find(x=>x.id===id);if(!b)return;
  const wrap=$("detail-content");wrap.replaceChildren();
  wrap.append(el("p","eyebrow",b.category.toUpperCase()),el("h2","detail-title",b.name),el("p","detail-location",`⌖ ${b.location}`),el("p","detail-description",b.description));
  const h=el("h3","detail-subtitle","Fasilitas");const list=el("div","facility-list");
  (b.facilities.length?b.facilities:["Informasi fasilitas belum tersedia"]).forEach(x=>list.append(el("span","facility-chip",x)));
  wrap.append(h,list);
  if(b.phone){const p=el("p","detail-contact",`Kontak: ${b.phone}`);wrap.append(p);}
  if(b.website && safeHttpUrl(b.website)){const a=el("a","detail-website","Kunjungi website ↗");a.href=safeHttpUrl(b.website);a.target="_blank";a.rel="noopener noreferrer";wrap.append(a);}
  wrap.append(el("p","detail-footnote","Informasi contoh untuk demonstrasi. Status internal dan dokumen pemeriksaan tidak tersedia pada halaman publik."));
  detailDialog.showModal();
}
function renderStats() {
  const stats=[
    ["Total Usaha",businesses.length],
    ["Accommodation",businesses.filter(x=>x.category==="Accommodation").length],
    ["Restaurant",businesses.filter(x=>x.category==="Restaurant").length],
    ["Mall",businesses.filter(x=>x.category==="Mall").length]
  ];
  const box=$("dashboard-stats");box.replaceChildren();
  stats.forEach(([label,num])=>{const item=el("div","stat-card");item.append(el("strong","",String(num).padStart(2,"0")),el("span","",label));box.append(item);});
}
function renderAdminTable() {
  const q=$("admin-search").value.trim().toLowerCase(),status=$("admin-status").value;
  const body=$("admin-table-body");body.replaceChildren();
  const list=businesses.filter(b=>`${b.name} ${b.location}`.toLowerCase().includes(q)&&(status==="all"||b.status===status));
  if(!list.length){const tr=el("tr");const td=el("td","empty-cell","Tidak ada data.");td.colSpan=5;tr.append(td);body.append(tr);return;}
  list.forEach(b=>{
    const tr=document.createElement("tr");
    [b.name,b.category,b.location].forEach(v=>tr.append(el("td","",v)));
    const statusCell=el("td");statusCell.append(el("span",`status-badge status-${b.status.toLowerCase().replaceAll(" ","-")}`,b.status));tr.append(statusCell);
    const actions=el("td","action-cell");
    const detail=el("button","table-action","Detail");detail.type="button";detail.addEventListener("click",()=>showDetails(b.id));
    const edit=el("button","table-action","Edit");edit.type="button";edit.addEventListener("click",()=>openEdit(b.id));
    const remove=el("button","table-action danger","Hapus");remove.type="button";remove.addEventListener("click",()=>deleteBusiness(b.id));
    actions.append(detail,edit,remove);tr.append(actions);body.append(tr);
  });
}
function renderHistory() {
  const box=$("history-list");box.replaceChildren();
  if(!historyItems.length){box.append(el("p","empty-state","Belum ada aktivitas."));return;}
  historyItems.forEach(item=>{const row=el("article","history-item");row.append(el("span","history-dot","•"),el("div","",undefined));row.lastChild.append(el("strong","",item.action),el("p","",item.target),el("small","",formatDate(item.at)));box.append(row);});
}
function renderReport() {
  const box=$("report-grid");box.replaceChildren();
  STATUSES.forEach(status=>{const count=businesses.filter(b=>b.status===status).length;const card=el("div","report-card");card.append(el("span","",status),el("strong","",String(count)));box.append(card);});
}
function renderAll(){renderPublic();renderStats();renderAdminTable();renderHistory();renderReport();}

function openCreate(){
  $("business-form").reset();$("record-id").value="";$("form-heading").textContent="Tambah Usaha";$("form-error").textContent="";businessDialog.showModal();
}
function openEdit(id){
  const b=businesses.find(x=>x.id===id);if(!b)return;
  $("business-form").reset();$("record-id").value=b.id;$("form-heading").textContent="Edit Usaha";
  $("field-name").value=b.name;$("field-category").value=b.category;$("field-location").value=b.location;$("field-status").value=b.status;
  $("field-description").value=b.description;$("field-facilities").value=b.facilities.join(", ");$("field-phone").value=b.phone;$("field-website").value=b.website;
  $("form-error").textContent="";businessDialog.showModal();
}
function deleteBusiness(id){
  const b=businesses.find(x=>x.id===id);if(!b||!window.confirm(`Hapus data simulasi ${b.name}?`))return;
  businesses=businesses.filter(x=>x.id!==id);addHistory("Data simulasi dihapus",b.name);persist();toast("Data simulasi dihapus.");
}
$("business-form").addEventListener("submit",event=>{
  event.preventDefault();
  const raw={name:$("field-name").value,category:$("field-category").value,location:$("field-location").value,status:$("field-status").value,description:$("field-description").value,facilities:$("field-facilities").value.split(",").map(x=>x.trim()).filter(Boolean),phone:$("field-phone").value,website:$("field-website").value,parentMallId:null};
  const checked=validateBusiness(raw);
  if(!checked.ok){$("form-error").textContent=checked.error;return;}
  const id=$("record-id").value;
  if(id){businesses=businesses.map(x=>x.id===id?{id,...checked.value}:x);addHistory("Data simulasi diperbarui",checked.value.name);}
  else{const newId=`gc-${crypto.randomUUID()}`;businesses.unshift({id:newId,...checked.value});addHistory("Data simulasi ditambahkan",checked.value.name);}
  businessDialog.close();persist();toast("Data berhasil disimpan.");
});
function exportJSON(){
  const blob=new Blob([JSON.stringify({exportedAt:new Date().toISOString(),notice:"DEMO DATA ONLY",businesses},null,2)],{type:"application/json"});
  downloadBlob(blob,"grahana-checking-demo.json");
}
function exportCSV(){
  const rows=[["Nama","Kategori","Lokasi","Status Simulasi"],...businesses.map(b=>[b.name,b.category,b.location,b.status])];
  const csv=rows.map(row=>row.map(v=>`"${String(v).replaceAll('"','""')}"`).join(",")).join("\r\n");
  downloadBlob(new Blob(["\uFEFF"+csv],{type:"text/csv;charset=utf-8"}),"grahana-checking-report-demo.csv");
}
function downloadBlob(blob,name){const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download=name;document.body.append(a);a.click();a.remove();URL.revokeObjectURL(url);}
$("import-json").addEventListener("change",async event=>{
  const file=event.target.files?.[0];event.target.value="";if(!file)return;
  if(file.size>1024*1024){toast("File maksimal 1 MB.");return;}
  try{
    const text=await file.text();const parsed=JSON.parse(text);
    const arr=Array.isArray(parsed)?parsed:parsed.businesses;
    const checked=parseBusinessArray(JSON.stringify(arr),[]);
    if(!checked.ok){toast("Import ditolak: struktur data tidak valid.");return;}
    businesses=checked.value;addHistory("Data demo diimpor","File JSON");persist();toast("Import data berhasil.");
  }catch{toast("File JSON tidak dapat dibaca.");}
});

$("category-tabs").addEventListener("click",event=>{
  const button=event.target.closest("button[data-category]");if(!button)return;
  selectedCategory=button.dataset.category;
  document.querySelectorAll(".category-tab").forEach(x=>x.classList.toggle("active",x===button));renderPublic();
});
$("search-input").addEventListener("input",renderPublic);$("sort-select").addEventListener("change",renderPublic);
$("admin-search").addEventListener("input",renderAdminTable);$("admin-status").addEventListener("change",renderAdminTable);
$("open-dashboard").addEventListener("click",()=>{publicView.hidden=true;dashboardView.hidden=false;window.scrollTo(0,0);renderAll();});
$("back-public").addEventListener("click",()=>{dashboardView.hidden=true;publicView.hidden=false;window.scrollTo(0,0);});
$("add-business").addEventListener("click",openCreate);
$("export-json").addEventListener("click",exportJSON);$("export-csv").addEventListener("click",exportCSV);
$("close-dialog").addEventListener("click",()=>businessDialog.close());$("cancel-form").addEventListener("click",()=>businessDialog.close());
$("close-detail").addEventListener("click",()=>detailDialog.close());
document.querySelectorAll(".dash-tab").forEach(tab=>tab.addEventListener("click",()=>{
  document.querySelectorAll(".dash-tab").forEach(x=>{x.classList.toggle("active",x===tab);x.setAttribute("aria-selected",String(x===tab));});
  document.querySelectorAll(".dash-panel").forEach(panel=>panel.hidden=panel.id!==tab.dataset.panel);
}));
$("menu-toggle").addEventListener("click",()=>{const nav=$("main-nav");const open=nav.classList.toggle("nav-open");$("menu-toggle").setAttribute("aria-expanded",String(open));});
$("main-nav").addEventListener("click",event=>{if(event.target.closest("a"))$("main-nav").classList.remove("nav-open");});
renderAll();
