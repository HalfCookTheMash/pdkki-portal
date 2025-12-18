// src/data/consultantData.ts

// 1. Definisikan Tipe Data Konsultan
export type ConsultantStatus = 'aktif' | 'non aktif';
export type ConsultantGender = 'Laki-laki' | 'Perempuan'; // Tambah tipe gender

export interface Consultant {
    name: string;
    firm: string;
    address: string;
    phone: string;
    email: string;
    status: ConsultantStatus;
    gender: ConsultantGender; // Tambah properti gender
    imageUrl?: string; 
}

// Data Dasar yang akan divariasikan
const BASE_MALE_NAMES = ["Abdul Karim", "Rizki Putra", "Budi Santoso", "Eko Prasetyo", "Gatot Subroto"];
const BASE_FEMALE_NAMES = ["Siti Rahayu", "Dewi Sartika", "Citra Dewi", "Fifi Afifah", "Hani Nurani"];
const ALL_BASE_NAMES = [...BASE_MALE_NAMES, ...BASE_FEMALE_NAMES];

const BASE_FIRMS = [
    "Amarisdianpujawati", "Bintang Terang", "Cipta Karya", 
    "Jaya Abadi", "Amanah", "Sejahtera", "Sentosa", 
    "Mitra", "Utama", "Perdana"
];

const BASE_ADDRESSES = [
    { city: "Jakarta", address: "Jln. Perintis I/29, Kebayoran Lama." },
    { city: "Bandung", address: "Jl. Sudirman No. 12, Braga." },
    { city: "Surabaya", address: "Jl. Asia Afrika No. 45, Tunjungan." },
    { city: "Medan", address: "Jl. Merdeka No. 10, Amplas." },
    { city: "Yogyakarta", address: "Jl. Malioboro No. 20, Kraton." }
];

// Fungsi Utility untuk menghasilkan nomor acak dalam rentang
const getRandomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Fungsi Utility untuk memilih item acak dari array
const getRandomItem = <T>(arr: T[]): T => {
    return arr[Math.floor(Math.random() * arr.length)];
};

// 2. Data Dummy (DUMMY_RESULTS)
export const DUMMY_RESULTS: Consultant[] = [];

for (let i = 1; i <= 100; i++) {
    const isMale = Math.random() < 0.5; // Acak gender
    const baseName = isMale ? getRandomItem(BASE_MALE_NAMES) : getRandomItem(BASE_FEMALE_NAMES);
    const gender: ConsultantGender = isMale ? 'Laki-laki' : 'Perempuan';

    const baseFirm = getRandomItem(BASE_FIRMS);
    const baseAddress = getRandomItem(BASE_ADDRESSES);
    const status: ConsultantStatus = getRandomNumber(1, 10) > 8 ? 'non aktif' : 'aktif'; 
    
    // Generate nomor telepon acak
    const phonePrefix = ["021", "022", "031", "061", "0274"];
    const phone = `${getRandomItem(phonePrefix)}-${getRandomNumber(1000000, 9999999)}`;

    // Generate email acak
    const namePart = baseName.toLowerCase().replace(/\s/g, '.');
    const domainPart = ["gmail.com", "yahoo.co.id", "example.com", "web.id"];
    const email = `${namePart}${i}@${getRandomItem(domainPart)}`;

    DUMMY_RESULTS.push({
        name: `${baseName} (ID: ${i})`,
        firm: `Firma Hukum: ${baseFirm} & Rekan`,
        address: `${baseAddress.address}, ${baseAddress.city}`,
        phone: phone,
        email: email,
        status: status,
        gender: gender // Masukkan nilai gender
    });
}