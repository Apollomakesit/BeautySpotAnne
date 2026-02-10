export const SERVICE_CATALOG = [
  {
    name: '1D',
    description: 'Extensii clasice 1D cu efect curat si natural, aplicate fir cu fir.',
    duration_minutes: 90,
    price: 130,
    deposit_amount: 65,
    category: 'Extensii Gene',
    image_url: 'https://images.unsplash.com/photo-1583001931096-959e9a1a6223?auto=format&fit=crop&w=1200&h=800&q=80',
  },
  {
    name: '1&2D',
    description: 'Mix intre stilul 1D si 2D pentru un rezultat natural cu volum discret.',
    duration_minutes: 100,
    price: 140,
    deposit_amount: 70,
    category: 'Extensii Gene',
    image_url: 'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?auto=format&fit=crop&w=1200&h=800&q=80',
  },
  {
    name: '2D',
    description: 'Volum 2D echilibrat, ideal pentru densitate vizibila si aspect elegant.',
    duration_minutes: 100,
    price: 150,
    deposit_amount: 75,
    category: 'Extensii Gene',
    image_url: 'https://images.unsplash.com/photo-1512310604669-443f26c35f52?auto=format&fit=crop&w=1200&h=800&q=80',
  },
  {
    name: '2&3D',
    description: 'Combinatie 2D si 3D pentru un volum mediu, potrivit pentru look de zi si seara.',
    duration_minutes: 110,
    price: 160,
    deposit_amount: 80,
    category: 'Extensii Gene',
    image_url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&h=800&q=80',
  },
  {
    name: '3D',
    description: 'Volum 3D bine definit, cu efect glam si pastrare a confortului.',
    duration_minutes: 120,
    price: 170,
    deposit_amount: 85,
    category: 'Extensii Gene',
    image_url: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=1200&h=800&q=80',
  },
  {
    name: '3&4D',
    description: 'Mix 3D si 4D pentru intensitate mai mare si efect bogat, dar rafinat.',
    duration_minutes: 120,
    price: 180,
    deposit_amount: 90,
    category: 'Extensii Gene',
    image_url: 'https://images.unsplash.com/photo-1526045478516-99145907023c?auto=format&fit=crop&w=1200&h=800&q=80',
  },
  {
    name: '4D',
    description: 'Volum 4D intens, pentru un efect dramatic si ochi foarte expresivi.',
    duration_minutes: 130,
    price: 200,
    deposit_amount: 100,
    category: 'Extensii Gene',
    image_url: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&h=800&q=80',
  },
  {
    name: 'Whispy volume',
    description: 'Stil Whispy cu varfuri texturate si efect airy modern.',
    duration_minutes: 150,
    price: 270,
    deposit_amount: 135,
    category: 'Tehnici Speciale',
    image_url: 'https://images.unsplash.com/photo-1588514912908-8e32e4b43b1c?auto=format&fit=crop&w=1200&h=800&q=80',
  },
  {
    name: 'Russian volume',
    description: 'Tehnica Russian volume pentru gene pufoase, uniforme si de impact.',
    duration_minutes: 140,
    price: 250,
    deposit_amount: 125,
    category: 'Tehnici Speciale',
    image_url: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=1200&h=800&q=80',
  },
  {
    name: 'Mega volume',
    description: 'Mega volume cu densitate maxima pentru un look statement.',
    duration_minutes: 150,
    price: 280,
    deposit_amount: 140,
    category: 'Tehnici Speciale',
    image_url: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&h=800&q=80',
  },
  {
    name: 'Combi NC',
    description: 'Tehnica Combi NC pentru definitie, directie controlata si finisaj profesional.',
    duration_minutes: 130,
    price: 230,
    deposit_amount: 115,
    category: 'Tehnici Speciale',
    image_url: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=1200&h=800&q=80',
  },
  {
    name: 'Foxy eyeliner',
    description: 'Efect Foxy eyeliner care alungeste optic privirea si accentueaza coltul extern.',
    duration_minutes: 140,
    price: 250,
    deposit_amount: 125,
    category: 'Tehnici Speciale',
    image_url: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&h=800&q=80',
  },
  {
    name: 'Pensat',
    description: 'Pensat profesional pentru contur curat si simetrie naturala a sprancenelor.',
    duration_minutes: 15,
    price: 30,
    deposit_amount: 15,
    category: 'Sprancene',
    image_url: 'https://images.unsplash.com/photo-1540555700478-4be289fbec6d?auto=format&fit=crop&w=1200&h=800&q=80',
  },
  {
    name: 'Stilizat sprancene',
    description: 'Stilizare completa a sprancenelor pentru forma personalizata si aspect ingrijit.',
    duration_minutes: 30,
    price: 60,
    deposit_amount: 30,
    category: 'Sprancene',
    image_url: 'https://images.unsplash.com/photo-1540555700478-4be289fbec6d?auto=format&fit=crop&w=1200&h=800&q=80',
  },
]

export const SERVICE_CATEGORIES = ['Toate', 'Extensii Gene', 'Tehnici Speciale', 'Sprancene']

export const normalizeServiceName = (name = '') => name.trim().toLowerCase().replace(/\s+/g, ' ')

const SERVICE_MAP = new Map(
  SERVICE_CATALOG.map((service) => [normalizeServiceName(service.name), service])
)

export const getServiceMeta = (name = '') => SERVICE_MAP.get(normalizeServiceName(name))

export const FALLBACK_BOOKING_SERVICES = SERVICE_CATALOG.map((service, index) => ({
  id: index + 1,
  name: service.name,
  description: service.description,
  duration_minutes: service.duration_minutes,
  price: service.price,
  deposit_amount: service.deposit_amount,
  image_url: service.image_url,
}))
