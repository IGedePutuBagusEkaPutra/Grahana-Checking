export const CATEGORIES = ["Accommodation", "Restaurant", "Mall"];
export const STATUSES = ["Not Checked", "Under Review", "Needs Follow-up", "Completed"];
export const STORAGE_KEY = "grahana-checking:businesses:v1";
export const HISTORY_KEY = "grahana-checking:history:v1";

export const SEED_BUSINESSES = [
  { id:"gc-001", name:"Ubud Garden Stay", category:"Accommodation", location:"Ubud, Gianyar", status:"Completed", description:"Akomodasi contoh dengan suasana taman tropis di kawasan Ubud.", facilities:["Wi-Fi","Parkir","Sarapan"], phone:"628123450001", website:"", parentMallId:null, publicInfoStatus:"Available" },
  { id:"gc-002", name:"Coastal View Villas", category:"Accommodation", location:"Canggu, Badung", status:"Under Review", description:"Contoh vila untuk demonstrasi pencarian direktori.", facilities:["Kolam renang","Wi-Fi"], phone:"", website:"", parentMallId:null, publicInfoStatus:"Available" },
  { id:"gc-003", name:"Sari Rasa Kitchen", category:"Restaurant", location:"Sanur, Denpasar", status:"Completed", description:"Restoran contoh dengan menu makanan lokal dan suasana santai.", facilities:["Area makan","Parkir"], phone:"628123450003", website:"", parentMallId:null, publicInfoStatus:"Available" },
  { id:"gc-004", name:"Warung Purnama", category:"Restaurant", location:"Tabanan", status:"Not Checked", description:"Contoh tempat makan untuk data demonstrasi, bukan data terverifikasi.", facilities:["Area makan"], phone:"", website:"", parentMallId:null, publicInfoStatus:"Available" },
  { id:"gc-005", name:"Bali Central Plaza", category:"Mall", location:"Denpasar", status:"Needs Follow-up", description:"Contoh pusat perbelanjaan. Pengelola mall dan tenant merupakan entitas berbeda.", facilities:["Parkir","Toilet umum","Food court"], phone:"", website:"", parentMallId:null, publicInfoStatus:"Available" },
  { id:"gc-006", name:"Central Plaza Coffee", category:"Restaurant", location:"Denpasar", status:"Not Checked", description:"Contoh tenant fiktif yang terhubung ke pusat perbelanjaan contoh.", facilities:["Wi-Fi","Area makan"], phone:"", website:"", parentMallId:"gc-005", publicInfoStatus:"Available" }
];

export const SEED_HISTORY = [
  { id:"h-001", action:"Data demonstrasi dibuat", target:"Ubud Garden Stay", at:"2026-11-19T08:00:00.000Z" },
  { id:"h-002", action:"Status simulasi diperbarui", target:"Bali Central Plaza", at:"2026-11-19T08:15:00.000Z" }
];
