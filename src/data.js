export const CATEGORIES = ["Accommodation", "Restaurant", "Mall"];
export const STATUSES = ["Not Checked", "Under Review", "Needs Follow-up", "Completed"];
export const STORAGE_KEY = "grahana-checking:businesses:v1";
export const HISTORY_KEY = "grahana-checking:history:v1";

export const SEED_BUSINESSES = [
  { id:"gc-001", name:"Ubud Garden Stay", category:"Accommodation", location:"Ubud, Gianyar", status:"Completed", description:"Akomodasi dengan suasana taman tropis di kawasan Ubud.", facilities:["Wi-Fi","Parkir","Sarapan"], phone:"628123450001", website:"", parentMallId:null, publicInfoStatus:"Available", docStatus:"Available", source:"Informasi awal", checkedDate:"2026-11-19", inspectionNotes:"Catatan awal; verifikasi melalui instansi berwenang." },
  { id:"gc-002", name:"Coastal View Villas", category:"Accommodation", location:"Canggu, Badung", status:"Under Review", description:"Villa tropis dengan area kolam renang dan pemandangan hijau.", facilities:["Kolam renang","Wi-Fi"], phone:"", website:"", parentMallId:null, publicInfoStatus:"Available", docStatus:"Needs Review", source:"Belum ada sumber informasi", checkedDate:"", inspectionNotes:"" },
  { id:"gc-003", name:"Sari Rasa Kitchen", category:"Restaurant", location:"Sanur, Denpasar", status:"Completed", description:"Restoran dengan pilihan hidangan lokal dan suasana santai.", facilities:["Area makan","Parkir"], phone:"628123450003", website:"", parentMallId:null, publicInfoStatus:"Available", docStatus:"Available", source:"Informasi awal", checkedDate:"2026-11-19", inspectionNotes:"Catatan awal; verifikasi melalui instansi berwenang." },
  { id:"gc-004", name:"Warung Purnama", category:"Restaurant", location:"Tabanan", status:"Not Checked", description:"Tempat makan dengan area bersantap yang nyaman.", facilities:["Area makan"], phone:"", website:"", parentMallId:null, publicInfoStatus:"Available" },
  { id:"gc-005", name:"Bali Central Plaza", category:"Mall", location:"Denpasar", status:"Needs Follow-up", description:"Pusat perbelanjaan dengan beragam fasilitas publik.", facilities:["Parkir","Toilet umum","Food court"], phone:"", website:"", parentMallId:null, publicInfoStatus:"Available" },
  { id:"gc-006", name:"Central Plaza Coffee", category:"Restaurant", location:"Denpasar", status:"Not Checked", description:"Tenant yang berada di area pusat perbelanjaan.", facilities:["Wi-Fi","Area makan"], phone:"", website:"", parentMallId:"gc-005", publicInfoStatus:"Available" }
];

export const SEED_HISTORY = [
  { id:"h-001", action:"Data usaha dibuat", target:"Ubud Garden Stay", at:"2026-11-19T08:00:00.000Z" },
  { id:"h-002", action:"Status pemeriksaan diperbarui", target:"Bali Central Plaza", at:"2026-11-19T08:15:00.000Z" }
];
