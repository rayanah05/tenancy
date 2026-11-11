// Sample data for the front-end skeleton. Replaced by API calls in the next milestone.
export const properties = [
  { id: 'flat-12', name: 'Flat 12', area: 'Juffair', type: 'flat', bedrooms: 2, tenant: 'Sara Ahmed', tenantEmail: 'sara@email.com', rent: 300, dueDay: 1, start: '2026-01-01', end: '2026-12-31', status: 'pending', openRequests: 1 },
  { id: 'flat-4', name: 'Flat 4', area: 'Juffair', type: 'flat', bedrooms: 1, tenant: 'Ali Hasan', tenantEmail: 'ali@email.com', rent: 250, dueDay: 1, start: '2026-03-01', end: '2027-02-28', status: 'late', openRequests: 1 },
  { id: 'villa-2', name: 'Villa 2', area: 'Saar', type: 'villa', bedrooms: 4, tenant: null, tenantEmail: 'mona@email.com', rent: 450, dueDay: 5, start: '2026-12-01', end: '2027-11-30', status: 'inviteSent', openRequests: 0 },
]

export const months = [
  { id: 'nov', label: 'November 2026', amount: 300, status: 'pending', uploaded: '1 Nov 2026', paidOn: '1 Nov' },
  { id: 'oct', label: 'October 2026', amount: 300, status: 'paid', paidOn: '2 Oct' },
  { id: 'sep', label: 'September 2026', amount: 300, status: 'late', paidOn: '4 Sep' },
  { id: 'aug', label: 'August 2026', amount: 300, status: 'paid', paidOn: '1 Aug' },
  { id: 'jul', label: 'July 2026', amount: 300, status: 'paid', paidOn: '1 Jul' },
]

export const receipts = [
  { no: '0011', month: 'October 2026', amount: 300 },
  { no: '0010', month: 'September 2026', amount: 300 },
  { no: '0009', month: 'August 2026', amount: 300 },
  { no: '0008', month: 'July 2026', amount: 300 },
]

export const requests = [
  { id: 'r1', title: 'Leaking kitchen tap', category: 'plumbing', status: 'new', by: 'Sara Ahmed', date: '3 Nov 2026', description: 'The kitchen tap has been dripping since Sunday and water collects under the sink.', reply: '' },
  { id: 'r2', title: 'AC not cooling in bedroom', category: 'ac', status: 'inProgress', by: 'Sara Ahmed', date: '28 Oct 2026', description: 'The bedroom AC runs but blows warm air.', reply: 'A technician will visit on Thursday morning.' },
  { id: 'r3', title: 'Bathroom door handle', category: 'other', status: 'fixed', by: 'Sara Ahmed', date: '2 Sep 2026', description: 'The handle came off.', reply: 'Replaced on 5 Sep.' },
]

export const tenantLease = { property: 'Flat 7', area: 'Seef', landlord: 'Fatima Saleh', rent: 300, dueDay: 1, start: '2026-01-01', end: '2026-12-31', nextDue: '1 Dec 2026', nextMonth: 'December 2026' }

export const findProperty = (id) => properties.find((p) => p.id === id)
export const findRequest = (id) => requests.find((r) => r.id === id)
