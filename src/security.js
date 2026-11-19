import { CATEGORIES, STATUSES } from "./data.js";

const cleanString = (value, max) => typeof value === "string" ? value.trim().slice(0, max) : "";

export function validateBusiness(input) {
  if (!input || typeof input !== "object" || Array.isArray(input)) return { ok:false, error:"Format data tidak valid." };
  const name = cleanString(input.name, 80);
  const location = cleanString(input.location, 100);
  const description = cleanString(input.description, 240);
  const phone = cleanString(input.phone, 20);
  const website = cleanString(input.website, 160);
  const facilities = Array.isArray(input.facilities) ? input.facilities.slice(0, 12).map(x => cleanString(x, 40)).filter(Boolean) : [];
  if (!name || input.name.trim().length > 80) return { ok:false, error:"Nama usaha wajib diisi dan maksimal 80 karakter." };
  if (!location || input.location.trim().length > 100) return { ok:false, error:"Lokasi wajib diisi dan maksimal 100 karakter." };
  if (!CATEGORIES.includes(input.category)) return { ok:false, error:"Kategori tidak valid." };
  if (!STATUSES.includes(input.status)) return { ok:false, error:"Status pemeriksaan tidak valid." };
  if (typeof input.description !== "string" || input.description.length > 240) return { ok:false, error:"Deskripsi maksimal 240 karakter." };
  if (phone && !/^[0-9+()\-\s]{7,20}$/.test(phone)) return { ok:false, error:"Format nomor kontak tidak valid." };
  if (website && !safeHttpUrl(website)) return { ok:false, error:"Website harus menggunakan http:// atau https://." };
  if (input.parentMallId !== null && input.parentMallId !== undefined && (typeof input.parentMallId !== "string" || input.parentMallId.length > 60)) return { ok:false, error:"Relasi tenant tidak valid." };
  if (input.category === "Mall" && input.parentMallId) return { ok:false, error:"Mall tidak dapat menjadi tenant." };
  const docStatus = ["Available","Not Found","Needs Review"].includes(input.docStatus) ? input.docStatus : "Needs Review";
  const source = cleanString(input.source,120), checkedDate = cleanString(input.checkedDate,10), inspectionNotes = cleanString(input.inspectionNotes,500);
  if (checkedDate && !/^\d{4}-\d{2}-\d{2}$/.test(checkedDate)) return { ok:false, error:"Tanggal pemeriksaan tidak valid." };
  return { ok:true, value:{ name, category:input.category, location, status:input.status, description, phone, website, facilities, parentMallId:input.parentMallId || null, publicInfoStatus:"Available", docStatus, source, checkedDate, inspectionNotes } };
}

export function safeHttpUrl(value) {
  try {
    const url = new URL(value);
    return ["http:", "https:"].includes(url.protocol) ? url.href : null;
  } catch { return null; }
}

export function parseBusinessArray(raw, fallback) {
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length > 300) return { ok:false, value:fallback };
    const result = [];
    for (const item of parsed) {
      if (!item || typeof item.id !== "string" || item.id.length > 60) return { ok:false, value:fallback };
      const checked = validateBusiness(item);
      if (!checked.ok) return { ok:false, value:fallback };
      result.push({ id:item.id, ...checked.value });
    }
    const ids = new Set(result.map(x => x.id));
    for (const record of result) {
      if (record.parentMallId) {
        const parent = result.find(x => x.id === record.parentMallId);
        if (!ids.has(record.parentMallId) || !parent || parent.category !== "Mall" || record.category === "Mall") return { ok:false, value:fallback };
      }
    }
    return { ok:true, value:result };
  } catch { return { ok:false, value:fallback }; }
}

export function parseHistory(raw, fallback) {
  try {
    const value = JSON.parse(raw);
    if (!Array.isArray(value) || value.length > 500) return fallback;
    return value.filter(x => x && typeof x.id === "string" && typeof x.action === "string" && typeof x.target === "string" && typeof x.at === "string").slice(0,200);
  } catch { return fallback; }
}
