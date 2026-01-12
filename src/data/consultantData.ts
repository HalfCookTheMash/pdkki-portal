// src/data/consultantData.ts

export type ConsultantStatus = 'aktif' | 'non aktif';
export type ConsultantGender = 'Laki-laki' | 'Perempuan';

export interface Consultant {
    name: string;
    firm: string;
    address: string;
    phone: string;
    email: string;
    status: ConsultantStatus;
    gender: ConsultantGender;
    imageUrl?: string; 
}

export const INDONESIA_PROVINCES = [
    "Aceh", "Sumatera Utara", "Sumatera Barat", "Riau", "Kepulauan Riau",
    "Jambi", "Bengkulu", "Sumatera Selatan", "Kepulauan Bangka Belitung", "Lampung",
    "DKI Jakarta", "Banten", "Jawa Barat", "Jawa Tengah", "DI Yogyakarta", "Jawa Timur",
    "Bali", "Nusa Tenggara Barat", "Nusa Tenggara Timur",
    "Kalimantan Barat", "Kalimantan Tengah", "Kalimantan Selatan", "Kalimantan Timur", "Kalimantan Utara",
    "Sulawesi Utara", "Gorontalo", "Sulawesi Tengah", "Sulawesi Barat", "Sulawesi Selatan", "Sulawesi Tenggara",
    "Maluku", "Maluku Utara", "Papua", "Papua Barat", "Papua Tengah", "Papua Pegunungan", "Papua Selatan", "Papua Barat Daya"
];

const generateRandomWeightedProvince = (): string => {
    const specialWeights: Record<string, number> = {
        "DKI Jakarta": 20,
        "Jawa Barat": 11,
        "Jawa Timur": 8,
        "Jawa Tengah": 8,
        "Banten": 8,
        "Sumatera Utara": 5,
        "Bali": 5,
        "DI Yogyakarta": 3,
        "Sumatera Selatan": 2,
    };

    const DEFAULT_WEIGHT = 1;

    const allWeightedProvinces = INDONESIA_PROVINCES.map(province => ({
        name: province,
        weight: specialWeights[province] || DEFAULT_WEIGHT
    }));

    const totalWeight = allWeightedProvinces.reduce((acc, curr) => acc + curr.weight, 0);
    
    let random = Math.random() * totalWeight;

    for (const item of allWeightedProvinces) {
        if (random < item.weight) {
            return item.name;
        }
        random -= item.weight;
    }

    return "DKI Jakarta";
};

const BASE_MALE_NAMES = ["Abdul Karim", "Rizki Putra", "Budi Santoso", "Eko Prasetyo", "Gatot Subroto", "Dedi Wijaya", "Fajar Pratama"];
const BASE_FEMALE_NAMES = ["Siti Rahayu", "Dewi Sartika", "Citra Dewi", "Fifi Afifah", "Hani Nurani", "Lestari Putri", "Sari Indah"];
const BASE_FIRMS = ["Bintang Terang", "Cipta Karya", "Jaya Abadi", "Amanah", "Sejahtera", "Sentosa", "Mitra Utama", "Perdana Konsultan"];

export const DUMMY_RESULTS: Consultant[] = [];

for (let i = 1; i <= 713; i++) {
    const isMale = Math.random() < 0.65; 
    const gender: ConsultantGender = isMale ? 'Laki-laki' : 'Perempuan';
    
    const baseName = isMale 
        ? BASE_MALE_NAMES[Math.floor(Math.random() * BASE_MALE_NAMES.length)] 
        : BASE_FEMALE_NAMES[Math.floor(Math.random() * BASE_FEMALE_NAMES.length)];
    
    const baseFirm = BASE_FIRMS[Math.floor(Math.random() * BASE_FIRMS.length)];
    
    const province = generateRandomWeightedProvince();
    
    const status: ConsultantStatus = Math.random() < 0.70 ? 'aktif' : 'non aktif'; 
    
    const phone = `021-${1000000 + i}`;
    const email = `${baseName.toLowerCase().replace(/\s/g, '.')}${i}@example.com`;

    DUMMY_RESULTS.push({
        name: `${baseName} (ID: ${i})`,
        firm: `Firma Hukum ${baseFirm}`,
        address: `Jl. Strategis No. ${i}, ${province}`,
        phone: phone,
        email: email,
        status: status,
        gender: gender
    });
}