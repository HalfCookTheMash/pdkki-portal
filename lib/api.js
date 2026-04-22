const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://pdkki-backend.test/api/v1'

// Statistik umum (untuk widget angka di landing page)
export async function getStatistics() {
    const res = await fetch(`${API_URL}/statistics`)
    if (!res.ok) throw new Error('Failed to fetch statistics')
    return res.json()
}

// Statistik per provinsi (untuk peta Leaflet & bar chart)
export async function getStatisticsByProvince() {
    const res = await fetch(`${API_URL}/statistics/provinces`)
    if (!res.ok) throw new Error('Failed to fetch province statistics')
    return res.json()
}

// Statistik jenis kelamin (untuk donut chart)
export async function getStatisticsByGender() {
    const res = await fetch(`${API_URL}/statistics/gender`)
    if (!res.ok) throw new Error('Failed to fetch gender statistics')
    return res.json()
}

// Search & filter konsultan (untuk halaman search)
export async function getConsultants(params = {}) {
    const query = new URLSearchParams(params).toString()
    const res = await fetch(`${API_URL}/consultants?${query}`)
    if (!res.ok) throw new Error('Failed to fetch consultants')
    return res.json()
}

// Detail satu konsultan (untuk halaman detail)
export async function getConsultant(id) {
    const res = await fetch(`${API_URL}/consultants/${id}`)
    if (!res.ok) throw new Error('Failed to fetch consultant')
    return res.json()
}