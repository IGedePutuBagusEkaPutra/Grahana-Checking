import { STATUSES } from "./data.js";
import { validateBusiness, safeHttpUrl, parseBusinessArray } from "./security.js";
import { loadBusinesses, saveBusinesses, loadHistory, saveHistory } from "./store.js";

let businesses = loadBusinesses(), historyItems = loadHistory(), selectedCategory = "all";
const $ = id => document.getElementById(id);
const el = (tag, cls, value) => { const node=document.createElement(tag); if(cls)node.className=cls; if(value!==undefined)node.textContent=value; return node; };
const formatDate = value => new Date(value).toLocaleString("id-ID",{dateStyle:"medium",timeStyle:"short"});
const publicView=$("public-view"), dashboardView=$("dashboard-view"), businessDialog=$("business-dialog"), detailDialog=$("detail-dialog"), accessDialog=$("access-dialog");
let demoOfficer = "Petugas Demo", demoRole = "Petugas Pemeriksa";
function toast(message){const box=$("toast");box.textContent=message;box.classList.add("show");window.setTimeout(()=>box.classList.remove("show"),2600);}
function addHistory(action,target){historyItems.unshift({id:`h-${crypto.randomUUID()}`,action,target,at:new Date().toISOString()});historyItems=historyItems.slice(0,200);saveHistory(historyItems);}
function persist(){saveBusinesses(businesses);renderAll();}

function renderPublic(){
  const q=$("search-input").value.trim().toLocaleLowerCase("id"),sort=$("sort-select").value;
  const list=businesses.filter(b=>(selectedCategory==="all"||b.category===selectedCategory)&&`${b.name} ${b.location} ${b.category}`.toLocaleLowerCase("id").includes(q));
  list.sort((a,b)=>sort==="name-desc"?b.name.localeCompare(a.name):sort==="category"?a.category.localeCompare(b.category)||a.name.localeCompare(b.name):a.name.localeCompare(b.name));
  const grid=$("business-grid");grid.replaceChildren();$("public-total").textContent=String(businesses.length).padStart(2,"0");
  if(!list.length){grid.append(el("p","empty-state","Tidak ada usaha yang cocok. Coba kata kunci atau kategori lain."));return;}
  list.forEach((b,i)=>{const card=el("article","business-card"),art=el("div",`business-art art-${(i%4)+1} art-category-${b.category==="Accommodation"?"villa":b.category==="Restaurant"?"restaurant":"mall"} art-record-${b.id}`);art.append(el("span","art-category",b.category),el("span","art-number",String(i+1).padStart(2,"0")));const body=el("div","business-card-body");body.append(el("p","card-location",`⌖ ${b.location}`),el("h3","",b.name),el("p","card-description",b.description));const meta=el("div","card-meta");meta.append(el("span","info-pill",`${b.facilities.length} fasilitas`),el("span","public-status","Informasi usaha"));const action=el("button","card-link","Lihat informasi ↗");action.type="button";action.addEventListener("click",()=>showDetails(b.id));body.append(meta,action);card.append(art,body);grid.append(card);});
}
function showDetails(id){
  const b=businesses.find(x=>x.id===id);if(!b)return;const wrap=$("detail-content");wrap.replaceChildren();
  wrap.append(el("p","eyebrow",b.category.toUpperCase()),el("h2","detail-title",b.name),el("p","detail-location",`⌖ ${b.location}`),el("p","detail-description",b.description));
  wrap.append(el("h3","detail-subtitle","Fasilitas"));const list=el("div","facility-list");(b.facilities.length?b.facilities:["Informasi fasilitas belum tersedia"]).forEach(x=>list.append(el("span","facility-chip",x)));wrap.append(list);
  if(b.phone)wrap.append(el("p","detail-contact",`Kontak: ${b.phone}`));
  if(b.website&&safeHttpUrl(b.website)){const a=el("a","detail-website","Kunjungi website ↗");a.href=safeHttpUrl(b.website);a.target="_blank";a.rel="noopener noreferrer";wrap.append(a);}
  wrap.append(el("p","detail-footnote","Informasi umum tempat. Untuk kepastian perizinan, lakukan konfirmasi kepada instansi berwenang."));detailDialog.showModal();
}
function renderStats(){
  const counts=[["Total Usaha",businesses.length,"Semua data"],["Belum Diperiksa",businesses.filter(x=>x.status==="Not Checked").length,"Not Checked"],["Dalam Pemeriksaan",businesses.filter(x=>x.status==="Under Review").length,"Under Review"],["Perlu Tindak Lanjut",businesses.filter(x=>x.status==="Needs Follow-up").length,"Needs Follow-up"],["Selesai",businesses.filter(x=>x.status==="Completed").length,"Completed"]];
  const box=$("dashboard-stats");box.replaceChildren();
  counts.forEach(([label,num,sub],i)=>{const item=el("article",`stat-card gc-stat-card gc-stat-${i+1}`);item.append(el("span","gc-stat-label",label),el("strong","",String(num).padStart(2,"0")),el("small","",sub));box.append(item);});
}
function renderRecent(){
  const box=$("gc-recent-businesses");if(!box)return;box.replaceChildren();
  businesses.slice(0,4).forEach(b=>{const row=el("div","gc-recent-row"),left=el("div","gc-recent-name");left.append(el("strong","",b.name),el("small","",`${b.category} · ${b.location}`));row.append(left,el("span",`status-badge status-${b.status.toLowerCase().replaceAll(" ","-")}`,b.status));box.append(row);});
  if(!businesses.length)box.append(el("p","empty-state","Belum ada data usaha."));
}
function renderStatusSummary(){
  const box=$("gc-status-summary");if(!box)return;box.replaceChildren();
  STATUSES.forEach(status=>{const count=businesses.filter(b=>b.status===status).length, row=el("div","gc-status-row"),label=el("span","",status),track=el("div","gc-status-track"),fill=el("span","gc-status-fill");fill.style.width=`${businesses.length?count/businesses.length*100:0}%`;track.append(fill);row.append(label,track,el("strong","",String(count)));box.append(row);});
}
function renderAdminTable(){
  const q=$("admin-search").value.trim().toLowerCase(),status=$("admin-status").value,body=$("admin-table-body");body.replaceChildren();
  const list=businesses.filter(b=>`${b.name} ${b.location}`.toLowerCase().includes(q)&&(status==="all"||b.status===status));
  if(!list.length){const tr=el("tr"),td=el("td","empty-cell","Tidak ada data.");td.colSpan=5;tr.append(td);body.append(tr);return;}
  list.forEach(b=>{const tr=document.createElement("tr");[b.name,b.category,b.location].forEach(v=>tr.append(el("td","",v)));const statusCell=el("td");statusCell.append(el("span",`status-badge status-${b.status.toLowerCase().replaceAll(" ","-")}`,b.status));tr.append(statusCell);const actions=el("td","action-cell");const detail=el("button","table-action","Detail");detail.type="button";detail.addEventListener("click",()=>showDetails(b.id));const edit=el("button","table-action","Edit");edit.type="button";edit.addEventListener("click",()=>openEdit(b.id));const remove=el("button","table-action danger","Hapus");remove.type="button";remove.addEventListener("click",()=>deleteBusiness(b.id));actions.append(detail,edit,remove);tr.append(actions);body.append(tr);});
}
function renderHistory(){
  const box=$("history-list");box.replaceChildren();if(!historyItems.length){box.append(el("p","empty-state","Belum ada aktivitas."));return;}
  historyItems.forEach(item=>{const row=el("article","history-item"),content=el("div");row.append(el("span","history-dot","•"),content);content.append(el("strong","",item.action),el("p","",item.target),el("small","",formatDate(item.at)));box.append(row);});
}
function renderReport(){const box=$("report-grid");box.replaceChildren();STATUSES.forEach(status=>{const card=el("div","report-card");card.append(el("span","",status),el("strong","",String(businesses.filter(b=>b.status===status).length)));box.append(card);});}
function renderAll(){renderPublic();renderStats();renderRecent();renderStatusSummary();renderAdminTable();renderHistory();renderReport();}
function activateAdminPanel(panelId){
  document.querySelectorAll(".gc-side-link").forEach(button=>button.classList.toggle("active",button.dataset.adminPanel===panelId));
  document.querySelectorAll("#dashboard-view .dash-panel").forEach(panel=>panel.hidden=panel.id!==panelId);
  const titles={"overview-panel":"Dashboard Overview","business-panel":"Data Usaha","history-panel":"Riwayat Aktivitas","report-panel":"Laporan"};
  $("gc-page-title").textContent=titles[panelId]||"Dashboard";
}
function openDashboard(){publicView.hidden=true;dashboardView.hidden=false;document.body.classList.add("gc-dashboard-mode");activateAdminPanel("overview-panel");renderAll();window.scrollTo(0,0);$("gc-page-title").textContent="Dashboard Overview";const who=$("gc-officer-identity");if(who)who.textContent=`${demoOfficer} · ${demoRole}`;}
function requestDashboardAccess(){$("officer-name-input").value="";accessDialog.showModal();}
function openPublic(){dashboardView.hidden=true;publicView.hidden=false;document.body.classList.remove("gc-dashboard-mode");window.scrollTo(0,0);}
function populateMallOptions(selected=""){const select=$("field-parent-mall");if(!select)return;select.replaceChildren(new Option("Bukan tenant / tidak ditentukan",""));businesses.filter(x=>x.category==="Mall").forEach(m=>select.add(new Option(m.name,m.id)));select.value=selected||"";}
function openCreate(){$("business-form").reset();populateMallOptions();$("record-id").value="";$("form-heading").textContent="Tambah Usaha";$("form-error").textContent="";businessDialog.showModal();}
function openEdit(id){const b=businesses.find(x=>x.id===id);if(!b)return;$("business-form").reset();$("record-id").value=b.id;$("form-heading").textContent="Edit Usaha";$("field-name").value=b.name;$("field-category").value=b.category;$("field-location").value=b.location;$("field-status").value=b.status;$("field-description").value=b.description;$("field-facilities").value=b.facilities.join(", ");$("field-phone").value=b.phone;$("field-website").value=b.website;populateMallOptions(b.parentMallId);$("field-doc-status").value=b.docStatus||"Needs Review";$("field-source").value=b.source||"";$("field-checked-date").value=b.checkedDate||"";$("field-inspection-notes").value=b.inspectionNotes||"";$("form-error").textContent="";businessDialog.showModal();}
function deleteBusiness(id){const b=businesses.find(x=>x.id===id);if(!b||!window.confirm(`Hapus data ${b.name}?`))return;businesses=businesses.filter(x=>x.id!==id);addHistory("Data usaha dihapus",b.name);persist();toast("Data usaha berhasil dihapus.");}
$("business-form").addEventListener("submit",event=>{event.preventDefault();const raw={name:$("field-name").value,category:$("field-category").value,location:$("field-location").value,status:$("field-status").value,description:$("field-description").value,facilities:$("field-facilities").value.split(",").map(x=>x.trim()).filter(Boolean),phone:$("field-phone").value,website:$("field-website").value,parentMallId:$("field-parent-mall").value||null,docStatus:$("field-doc-status").value,source:$("field-source").value,checkedDate:$("field-checked-date").value,inspectionNotes:$("field-inspection-notes").value};const checked=validateBusiness(raw);if(!checked.ok){$("form-error").textContent=checked.error;return;}const id=$("record-id").value;if(id){businesses=businesses.map(x=>x.id===id?{id,...checked.value}:x);addHistory("Data simulasi diperbarui",checked.value.name);}else{businesses.unshift({id:`gc-${crypto.randomUUID()}`,...checked.value});addHistory("Data simulasi ditambahkan",checked.value.name);}businessDialog.close();persist();toast("Data berhasil disimpan.");});
function downloadBlob(blob,name){const url=URL.createObjectURL(blob),a=document.createElement("a");a.href=url;a.download=name;document.body.append(a);a.click();a.remove();URL.revokeObjectURL(url);}
function exportJSON(){downloadBlob(new Blob([JSON.stringify({exportedAt:new Date().toISOString(),notice:"Grahana Checking data export",businesses},null,2)],{type:"application/json"}),"grahana-checking-data.json");}
function exportCSV(){const rows=[["Nama","Kategori","Lokasi","Status Pemeriksaan"],...businesses.map(b=>[b.name,b.category,b.location,b.status])];const csv=rows.map(row=>row.map(v=>`"${String(v).replaceAll('"','""')}"`).join(",")).join("\r\n");downloadBlob(new Blob(["\uFEFF"+csv],{type:"text/csv;charset=utf-8"}),"grahana-checking-report.csv");}
$("import-json").addEventListener("change",async event=>{const file=event.target.files?.[0];event.target.value="";if(!file)return;if(file.size>1024*1024){toast("File maksimal 1 MB.");return;}try{const parsed=JSON.parse(await file.text()),arr=Array.isArray(parsed)?parsed:parsed.businesses,checked=parseBusinessArray(JSON.stringify(arr),[]);if(!checked.ok){toast("Import ditolak: struktur data tidak valid.");return;}businesses=checked.value;addHistory("Data usaha diimpor","File JSON");persist();toast("Import data berhasil.");}catch{toast("File JSON tidak dapat dibaca.");}});
$("category-tabs").addEventListener("click",event=>{const button=event.target.closest("button[data-category]");if(!button)return;selectedCategory=button.dataset.category;document.querySelectorAll(".category-tab").forEach(x=>x.classList.toggle("active",x===button));renderPublic();});
$("search-input").addEventListener("input",renderPublic);$("sort-select").addEventListener("change",renderPublic);$("admin-search").addEventListener("input",renderAdminTable);$("admin-status").addEventListener("change",renderAdminTable);
$("open-dashboard").addEventListener("click",requestDashboardAccess);
$("access-form").addEventListener("submit",event=>{event.preventDefault();demoOfficer=$("officer-name-input").value.trim().slice(0,60);demoRole=$("officer-role-select").value;if(!demoOfficer){toast("Isi nama petugas.");return;}accessDialog.close();openDashboard();});
$("close-access").addEventListener("click",()=>accessDialog.close());$("cancel-access").addEventListener("click",()=>accessDialog.close());$("back-public").addEventListener("click",openPublic);$("add-business").addEventListener("click",openCreate);$("overview-add-business").addEventListener("click",()=>{activateAdminPanel("business-panel");openCreate();});
$("export-json").addEventListener("click",exportJSON);$("export-csv").addEventListener("click",exportCSV);
$("close-dialog").addEventListener("click",()=>businessDialog.close());$("cancel-form").addEventListener("click",()=>businessDialog.close());$("close-detail").addEventListener("click",()=>detailDialog.close());
document.querySelectorAll(".gc-side-link").forEach(button=>button.addEventListener("click",()=>activateAdminPanel(button.dataset.adminPanel)));
document.querySelectorAll("[data-go-panel]").forEach(button=>button.addEventListener("click",()=>activateAdminPanel(button.dataset.goPanel)));
$("menu-toggle").addEventListener("click",()=>{const nav=$("main-nav"),open=nav.classList.toggle("nav-open");$("menu-toggle").setAttribute("aria-expanded",String(open));});
$("main-nav").addEventListener("click",event=>{if(event.target.closest("a"))$("main-nav").classList.remove("nav-open");});
$("gc-today").textContent=new Date().toLocaleDateString("id-ID",{day:"numeric",month:"long",year:"numeric"});
renderAll();


document.querySelectorAll("[data-showcase-category]").forEach(link=>link.addEventListener("click",()=>{
  const category=link.dataset.showcaseCategory;
  const tab=document.querySelector(`.category-tab[data-category="${category}"]`);
  if(tab) tab.click();
}));
